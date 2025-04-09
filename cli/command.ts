import { program } from 'commander';
import {
    PublicKey
} from '@solana/web3.js';

import { setClusterConfig, createNft } from './scripts';

program.version('0.0.1');

programCommand('create-nft')
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    .option('-re, --receiver <string>', 'address')
    .option('-n, --name <string>', 'name')
    .option('-m, --metadatauri <string>', 'metadatauri')
    .action(async (directory, cmd) => {
        const { env, keypair, rpc, receiver, name, metadatauri } = cmd.opts();

        console.log('Solana Cluster:', env);
        console.log('Keypair Path:', keypair);
        console.log('RPC URL:', rpc);

        await setClusterConfig(env, keypair, rpc)

        const txId = await createNft(new PublicKey(receiver), name, metadatauri);
    });

function programCommand(name: string) {

    return program
        .command(name)
        .option('-e, --env <string>', 'Solana cluster env name', 'devnet') //mainnet-beta, testnet, devnet
        .option('-r, --rpc <string>', 'Solana cluster RPC name', 'https://yolo-attentive-theorem.solana-devnet.quiknode.pro/40e96f0a977cfdfb9800d3cbc65e5e5350155261/')
        .option('-k, --keypair <string>', 'Solana wallet Keypair Path', '/home/anti/development/metaplex-core-staking-contract/keys/test.json')
}

program.parse(process.argv);

// yarn script create-nft -re Bp9G3yT6oJTHWShisCHmLqvwERnJ2CmLtrnBwhhCssx7 -n test_name -m https://test_uri