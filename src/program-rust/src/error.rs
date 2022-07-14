//! Error types

use thiserror::Error;

use solana_program::program_error::ProgramError;

#[derive(Error, Debug, Copy, Clone)]
pub enum GreetingError {
  /// Invalid instruction
  #[error("Invalid Instruction")]
  InvalidInstruction,
}

impl From<GreetingError> for ProgramError {
  fn from(e: GreetingError) -> Self {
    ProgramError::Custom(e as u32)
  }
}
