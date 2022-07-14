pub mod error;
pub mod instruction;
pub mod processor;
pub mod state;
#[cfg(test)]
pub mod test;

use crate::processor::Processor;

use solana_program::{
  account_info::AccountInfo, entrypoint, entrypoint::ProgramResult, pubkey::Pubkey,
};

// Declare and export the program's entrypoint
entrypoint!(process_instruction);

// Program entrypoint's implementation
pub fn process_instruction(
  program_id: &Pubkey, // Public key of the account the hello world program was loaded into
  accounts: &[AccountInfo], // The account to say hello to
  instruction_data: &[u8], // Ignored, all helloworld instructions are hellos
) -> ProgramResult {
  Processor::process(program_id, accounts, instruction_data)
}
