//! Program state processor

use crate::{
  instruction::GreetingInstruction,
  state::{GreetingAccount, SnapshotAccount},
};
use borsh::{BorshDeserialize, BorshSerialize};
use solana_program::{
  account_info::{next_account_info, AccountInfo},
  entrypoint::ProgramResult,
  msg,
  program_error::ProgramError,
  pubkey::Pubkey,
  sysvar::{clock::Clock, Sysvar},
};

/// Program state handler.
pub struct Processor {}
impl Processor {
  /// Processes an [InitializeMint](enum.TokenInstruction.html) instruction.
  pub fn process_hello(program_id: &Pubkey, accounts: &[AccountInfo]) -> ProgramResult {
    // Iterating accounts is safer than indexing
    let accounts_iter = &mut accounts.iter();

    // Get the account to say hello to
    let account = next_account_info(accounts_iter)?;

    // The account must be owned by the program in order to modify its data
    if account.owner != program_id {
      msg!("Greeted account does not have the correct program id");
      return Err(ProgramError::IncorrectProgramId);
    }

    // Increment and store the number of times the account has been greeted
    let mut greeting_account = GreetingAccount::try_from_slice(&account.data.borrow())?;
    greeting_account.counter += 1;
    greeting_account.serialize(&mut &mut account.data.borrow_mut()[..])?;

    msg!("Greeted {} time(s)!", greeting_account.counter);

    Ok(())
  }

  pub fn process_set_counter(
    program_id: &Pubkey,
    accounts: &[AccountInfo],
    counter: u32,
  ) -> ProgramResult {
    // Iterating accounts is safer than indexing
    let accounts_iter = &mut accounts.iter();

    // Get the account to say hello to
    let account = next_account_info(accounts_iter)?;

    // The account must be owned by the program in order to modify its data
    if account.owner != program_id {
      msg!("Greeted account does not have the correct program id");
      return Err(ProgramError::IncorrectProgramId);
    }

    // Increment and store the number of times the account has been greeted
    let mut greeting_account = GreetingAccount::try_from_slice(&account.data.borrow())?;
    greeting_account.counter = counter;
    greeting_account.serialize(&mut &mut account.data.borrow_mut()[..])?;

    msg!("Greeted {} time(s)!", greeting_account.counter);

    Ok(())
  }

  pub fn process_take_snapshot(program_id: &Pubkey, accounts: &[AccountInfo]) -> ProgramResult {
    // Iterating accounts is safer than indexing
    let accounts_iter = &mut accounts.iter();

    // Get the account to say hello to
    let account = next_account_info(accounts_iter)?;

    // The account must be owned by the program in order to modify its data
    if account.owner != program_id {
      msg!("Greeted account does not have the correct program id");
      return Err(ProgramError::IncorrectProgramId);
    }

    let clock = Clock::get().unwrap();

    // Increment and store the number of times the account has been greeted
    let mut snapshot_account = SnapshotAccount::try_from_slice(&account.data.borrow())?;
    snapshot_account.timestamp = clock.unix_timestamp as u64;
    snapshot_account.slot = clock.slot as u64;
    snapshot_account.serialize(&mut &mut account.data.borrow_mut()[..])?;

    msg!(
      "Snapshot time: {}, slot: {} !",
      snapshot_account.timestamp,
      snapshot_account.slot
    );

    Ok(())
  }

  /// Processes an [Instruction](enum.Instruction.html).
  pub fn process(program_id: &Pubkey, accounts: &[AccountInfo], input: &[u8]) -> ProgramResult {
    let instruction = GreetingInstruction::unpack(input)?;

    match instruction {
      GreetingInstruction::Hello {} => {
        msg!("Instruction: Hello");
        Self::process_hello(program_id, accounts)
      }
      GreetingInstruction::SetCounter { counter } => {
        msg!("Instruction: SetCounter");
        Self::process_set_counter(program_id, accounts, counter)
      }
      GreetingInstruction::TakeSnapshot {} => {
        msg!("Instruction: TakeSnapshot");
        Self::process_take_snapshot(program_id, accounts)
      }
    }
  }
}
