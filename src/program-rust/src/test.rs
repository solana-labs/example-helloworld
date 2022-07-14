use crate::{processor::Processor, state::GreetingAccount};
use borsh::BorshDeserialize;
use solana_program::{account_info::AccountInfo, pubkey::Pubkey};

// Sanity tests
#[cfg(test)]
mod test {
  use super::*;
  use solana_program::clock::Epoch;
  use std::mem;

  #[test]
  fn test_hello() {
    let program_id = Pubkey::default();
    let key = Pubkey::default();
    let mut lamports = 0;
    let mut data = vec![0; mem::size_of::<u32>()];
    let owner = Pubkey::default();
    let account = AccountInfo::new(
      &key,
      false,
      true,
      &mut lamports,
      &mut data,
      &owner,
      false,
      Epoch::default(),
    );
    let instruction_data: Vec<u8> = vec![0];

    let accounts = vec![account];

    assert_eq!(
      GreetingAccount::try_from_slice(&accounts[0].data.borrow())
        .unwrap()
        .counter,
      0
    );
    Processor::process(&program_id, &accounts, &instruction_data).unwrap();
    assert_eq!(
      GreetingAccount::try_from_slice(&accounts[0].data.borrow())
        .unwrap()
        .counter,
      1
    );
    Processor::process(&program_id, &accounts, &instruction_data).unwrap();
    assert_eq!(
      GreetingAccount::try_from_slice(&accounts[0].data.borrow())
        .unwrap()
        .counter,
      2
    );
  }

  #[test]
  fn test_set_counter() {
    let program_id = Pubkey::default();
    let key = Pubkey::default();
    let mut lamports = 0;
    let mut data = vec![0; mem::size_of::<u32>()];
    let owner = Pubkey::default();
    let account = AccountInfo::new(
      &key,
      false,
      true,
      &mut lamports,
      &mut data,
      &owner,
      false,
      Epoch::default(),
    );
    let instruction_data: Vec<u8> = vec![1, 3, 0, 0, 0];

    let accounts = vec![account];

    assert_eq!(
      GreetingAccount::try_from_slice(&accounts[0].data.borrow())
        .unwrap()
        .counter,
      0
    );
    Processor::process(&program_id, &accounts, &instruction_data).unwrap();
    assert_eq!(
      GreetingAccount::try_from_slice(&accounts[0].data.borrow())
        .unwrap()
        .counter,
      3
    );
  }
}
