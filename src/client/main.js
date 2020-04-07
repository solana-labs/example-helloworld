/**
 * Hello world
 *
 * @flow
 */

import {
  establishConnection,
  loadProgram,
  sayHello,
  reportHellos,
} from './hello_world';

async function main() {
  console.log('Lets say hello to a Solana account...');

  // Establish connection to the cluster
  await establishConnection();

  // Load the program if not already loaded
  await loadProgram();

  // Say hello to an account
  await sayHello();

  // Find out how many times that account has been greeted
  await reportHellos();
}

main()
  .catch(err => {
    console.error(err);
  })
  .then(() => process.exit());
