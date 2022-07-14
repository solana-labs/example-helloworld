use borsh::{BorshDeserialize, BorshSerialize};

/// Define the type of state stored in accounts
#[derive(BorshSerialize, BorshDeserialize, Debug)]
pub struct GreetingAccount {
  /// number of greetings
  pub counter: u32,
}

/// Define the type of state stored in accounts
#[derive(BorshSerialize, BorshDeserialize, Debug)]
pub struct SnapshotAccount {
  /// Timestamp
  pub timestamp: u64,
  /// Slot number
  pub slot: u64,
}
