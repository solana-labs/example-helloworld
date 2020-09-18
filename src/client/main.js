/**
 * Hello world
 *
 * @flow
 */

import {
  establishConnection,
  establishPayer,
  loadProgram,
  sayHello,
  reportHellos,
} from './hello_world';

async function main() {
  console.log("Let's say hello to a Solana account...");

  // Establish connection to the cluster
  await establishConnection();

  // Determine who pays for the fees
  await establishPayer();

  // Load the program if not already loaded
  await loadProgram();

  // Say hello to an account
  await sayHello();

  // Find out how many times that account has been greeted
  await reportHellos();

  console.log('Success');
}

main()
  .catch(err => {
    console.error(err);
    process.exit(1);
  })
  .then(() => process.exit());
