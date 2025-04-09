## Metaplex Core NFT Staking Contract (Built on Anchor Framework)

This smart contract allows users to mint and stake NFTs on the Solana blockchain using the Metaplex Core standard. 
Built on the Anchor framework, the contract allow users to delegate authority to others, freeze NFTs, and prevent unauthorized transfers.

### Features
- **Mint NFTs**: Users can mint NFTs and associate them with staking opportunities.
- **Delegated Authority**: Users can delegate authority to others within the same block, allowing for further interactions or transfer permissions.
- **NFT Freeze**: The contract holds the authority to freeze an NFT, preventing the original owner from transferring it out during the staking period.
- **Control Transfers**: After freezing, the NFT can only be transferred to specific addresses (like payers), preventing unauthorized movement.

### Flow
1. **Mint and Delegate Authority**: Users mint their NFTs and can immediately delegate authority to another account for further management. 
2. **Freeze NFT**: Once delegated, the contract holds the authority to prevent the NFT from being transferred to any address other than the designated ones (e.g., payers or other valid accounts).
3. **Transfer Restrictions**: Even if the NFT is associated with an account, the original owner cannot transfer it out unless explicitly allowed by the contract.
4. **Post-Delegation**: After the delegation, the NFT will be locked in place (frozen) until specific conditions are met, ensuring it cannot be moved out by unauthorized parties.

### Contract Overview
- **Authority Management**: The contract ensures that once authority is delegated, the owner loses the ability to transfer the NFT to anyone else, except for the specified recipients.
- **NFT Staking**: NFTs are staked and cannot be transferred out until all conditions are met, such as completing a staking period or fulfilling other criteria.
- **Security**: Authority delegation and NFT freezing are essential features to ensure that NFTs can only be moved under controlled conditions, preventing malicious transfers.

### Key Functions
- **mint_nft()**: Mints a new NFT and stakes it under the specified conditions.
- **delegate_authority()**: Delegates the transfer authority to another address for the NFT.
- **freeze_nft()**: Freezes the NFT to prevent it from being transferred by the owner.
- **unfreeze_nft()**: Unfreezes the NFT, allowing the owner to transfer it out after meeting conditions.
- **transfer_nft()**: Transfers the NFT to the designated address after conditions are met.

### Security Considerations
- Only authorized accounts (delegates) can execute specific actions related to the NFTs, ensuring the owner’s assets are secure.
- The contract uses the Anchor framework for security, simplifying the complex authorization and transfer logic.