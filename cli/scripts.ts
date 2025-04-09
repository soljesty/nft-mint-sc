import * as anchor from '@coral-xyz/anchor';
import fs from 'fs';
import NodeWallet from '@coral-xyz/anchor/dist/cjs/nodewallet';
import { MPL_STAKING_PROGRAM_ID, MPL_CORE, TOKEN_MINT, SPL_NOOP_PROGRAM_ID, COLLECTION_ADDRESS } from '../lib/constant';
import { ComputeBudgetProgram, PublicKey, Keypair, Connection } from '@solana/web3.js';
import idl from '../target/idl/metaplex_core_test.json'
import { MetaplexCoreTest } from '../target/types/metaplex_core_test';

let solConnection: Connection = null;
let program: anchor.Program = null;
let provider: anchor.Provider = null;
let payer: NodeWallet = null;

// Address of the deployed program.
let programId = new anchor.web3.PublicKey("7prpCfqMWtRdYxarF5Fvmcu6NwaTJbatNd5NAckNzu8h");
const IDL: MetaplexCoreTest = idl as MetaplexCoreTest;

/**
 * Set cluster, provider, program
 * If rpc != null use rpc, otherwise use cluster param
 * @param cluster - cluster ex. mainnet-beta, devnet ...
 * @param keypair - wallet keypair
 * @param rpc - rpc
 */

export const setClusterConfig = async (
    cluster: anchor.web3.Cluster,
    keypair: string,
    rpc?: string
) => {
    if (!rpc) {
        solConnection = new anchor.web3.Connection(anchor.web3.clusterApiUrl(cluster));
    } else {
        solConnection = new anchor.web3.Connection(rpc);
    }

    const walletKeypair = Keypair.fromSecretKey(
        Uint8Array.from(JSON.parse(fs.readFileSync(keypair, "utf-8"))),
        { skipValidation: true }
    );

    const wallet = new NodeWallet(walletKeypair);

    // Configure the client to use the local cluster.
    anchor.setProvider(
        new anchor.AnchorProvider(solConnection, wallet, {
            skipPreflight: false,
            commitment: "confirmed",
        })
    );
    payer = wallet;

    provider = anchor.getProvider();
    console.log("Wallet Address: ", wallet.publicKey.toBase58());

    // Generate the program client from IDL.
    console.log("Program ID: ", programId);
    program = new anchor.Program(IDL as anchor.Idl, provider);

};

export const createNft = async (receiver: PublicKey, name: String, metadatauri: String) => {
    console.log("Receiver Address: ", receiver.toBase58());

    const newMint = Keypair.generate();
    console.log("Mint Address: ", newMint.publicKey.toBase58());

    const tx = await program.methods
        .createNft(
            name.toString(),
            metadatauri.toString()
        )
        .accounts({
            payer: payer.publicKey,
            mint: newMint.publicKey,
            newOwner: receiver,
            logWrapper: SPL_NOOP_PROGRAM_ID,
            mplCore: MPL_CORE,
            systemProgram: anchor.web3.SystemProgram.programId
        })
        .transaction();

    tx.add(ComputeBudgetProgram.setComputeUnitLimit({ units: 2_000_000 }));

    const txId = await provider.sendAndConfirm(tx, [newMint], {
        commitment: "confirmed",
    });

    console.log("txHash: ", txId);
    return txId;
}