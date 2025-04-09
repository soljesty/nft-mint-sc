use anchor_lang::prelude::* ;
use mpl_core::types::{
    Creator,
    Plugin,
    PluginAuthority,
    PluginAuthorityPair,
    Royalties
};

pub struct Config {
    pub name: String,
    pub uri: String,
    pub plugins: Vec<PluginAuthorityPair>,
}

impl Config {
    pub fn get_collection(creator: Pubkey) -> Config {
        Config {
            name: String::from("LOL-TEST"), // Not in use
            uri: String::from("https://purple-quickest-catshark-409.mypinata.cloud/ipfs/QmQPdc222VY46yLB25AHyAbAna9nLQ1YP5RGC5ewPvisfy"), // Not in use
            plugins: Vec::from([
                PluginAuthorityPair {
                    plugin: Plugin::Royalties(Royalties {
                        basis_points: 690,
                        creators: Vec::from([
                            Creator {
                                address: creator,
                                percentage: 100,
                            },
                        ]),
                        rule_set: mpl_core::types::RuleSet::None,
                    }),
                    authority: Some(PluginAuthority::UpdateAuthority),
                },
            ]),
        }
    }
}

