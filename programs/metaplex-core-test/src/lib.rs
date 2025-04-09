use anchor_lang::prelude::*;

mod errors;
mod instructions;
mod utils;
mod state;

use instructions::*;
use state::*;

use utils::*;
declare_id!("3cZRCznQLmZtzKiRYR1QX9H8WgA2fb4f4ELXGpasm1Mp");

#[program]
pub mod metaplex_core_test {
    use super::*;

    pub fn create_nft(ctx: Context<CreateNftContext>, name: String, uri: String) -> Result<()> {
        CreateNftContext::create_nft(ctx, name, uri)?;
        Ok(())
    }
}
