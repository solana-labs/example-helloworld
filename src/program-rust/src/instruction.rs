use crate::error::GreetingError::InvalidInstruction;

use solana_program::program_error::ProgramError;
use std::convert::TryInto;

#[repr(C)]
#[derive(Clone, Debug, PartialEq)]
pub enum GreetingInstruction {
  // Increase counter of greetings
  Hello {},
  // Set greeting counter manually
  SetCounter {
    /// Manual counter number
    counter: u32,
  },
  // Store current slot and timestamp
  TakeSnapshot {},
}

impl GreetingInstruction {
  pub fn unpack(input: &[u8]) -> Result<Self, ProgramError> {
    let (tag, rest) = input.split_first().ok_or(InvalidInstruction)?;

    Ok(match tag {
      0 => Self::Hello {},
      1 => Self::SetCounter {
        counter: Self::unpack_amount(rest)?,
      },
      2 => Self::TakeSnapshot {},
      _ => return Err(InvalidInstruction.into()),
    })
  }

  fn unpack_amount(input: &[u8]) -> Result<u32, ProgramError> {
    let amount = input
      .get(..4)
      .and_then(|slice| slice.try_into().ok())
      .map(u32::from_le_bytes)
      .ok_or(InvalidInstruction)?;
    Ok(amount)
  }
}
