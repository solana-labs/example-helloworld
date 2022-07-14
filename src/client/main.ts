/**
 * Hello world
 */

import {
  establishConnection,
  establishPayer,
  checkProgram,
  setCounter,
  reportGreetings,
  sayHello,
  takeSnapshot,
  reportSnapshot,
} from './hello_world';

async function main() {
  console.log("Let's say hello to a Solana account...");

  // Establish connection to the cluster
  await establishConnection();

  // Determine who pays for the fees
  await establishPayer();

  // Check if the program has been deployed
  await checkProgram();

  // // Say hello 3 times to an account
  // await sayHello();
  // await sayHello();
  // await sayHello();

  // // Find out how many times that account has been greeted
  // await reportGreetings();

  // // Set counter back to 2
  // await setCounter(2);

  // // Find out how many times that account has been greeted
  // await reportGreetings();

  // Take snapshot
  await takeSnapshot();

  await reportSnapshot();

  console.log('Success');
}

main().then(
  () => process.exit(),
  err => {
    console.error(err);
    process.exit(-1);
  },
);
