use anchor_lang::prelude::*;

#[error_code]
pub enum FomoErrors {
    #[msg("Doesn't matched with token owner")]
    InvalidOwner
}
