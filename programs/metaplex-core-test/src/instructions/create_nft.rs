use anchor_lang::{prelude::*, system_program};
use mpl_core::{
    instructions::{ CreateV2CpiBuilder}
};

/// Context structure for the `create_nft` instruction.
#[derive(Accounts)]
pub struct CreateNftContext<'info> {
    /// The authority who initiates the transaction.
    #[account(mut)]
    pub payer: Signer<'info>,

    /// Signer representing the new mint to be created.
    #[account(mut)]
    pub mint: Signer<'info>,

    /// CHECK: Verified in ownership.
    #[account(mut)]
    pub new_owner: AccountInfo<'info>,

    /// Optional log wrapper program for SPL Noop.
    /// CHECK: Verified in mpl-core.
    pub log_wrapper: Option<AccountInfo<'info>>,

    /// MPL Core program for managing assets.
    /// CHECK: Verified via the address constraint.
    #[account(address = mpl_core::ID)]
    pub mpl_core: AccountInfo<'info>,

    /// System program for standard Solana operations.
    #[account(address = system_program::ID)]
    pub system_program: Program<'info, System>,
}

impl CreateNftContext<'_> {
    /// Validation function to ensure the create nft process.
    pub fn validate(&self) -> Result<()> {
        Ok(())
    }

    #[access_control(ctx.accounts.validate())]
    pub fn create_nft(ctx: Context<CreateNftContext>, name:String, uri:String) -> Result<()> {
        CreateV2CpiBuilder::new(&ctx.accounts.mpl_core.to_account_info())
        .asset(&ctx.accounts.mint.to_account_info())
        .owner(Some(ctx.accounts.new_owner.as_ref()))
        .payer(&ctx.accounts.payer.to_account_info())
        .log_wrapper(ctx.accounts.log_wrapper.as_ref())
        .system_program(&ctx.accounts.system_program.to_account_info())
        .name(name.to_string())
        .uri(uri.to_string())
        .invoke()?;

        Ok(())
    }
}
