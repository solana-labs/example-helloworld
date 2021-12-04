/**
 * Hello world
 */

import {
  establishConnection,
  establishPayer,
  checkProgram,
  sayHello,
  reportGreetings,
} from './hello_world';

async function main() {
  console.log("Let's say hello to a Solana account...");

  // Establish connection to the cluster
  console.log("Establishing Connection...");
  await establishConnection();

  // Determine who pays for the fees
  console.log("Establishing Payers Account...");
  await establishPayer();

  // Check if the program has been deployed
  console.log("Checking Deployment Status...");
  await checkProgram();

  // Say hello to an account
  console.log("Checking Account Status...");
  await sayHello();

  // Find out how many times that account has been greeted
  console.log("Greeting to the New Account...");
  await reportGreetings();

  console.log('Success !');
}

main().then(
  () => process.exit(),
  err => {
    console.error(err);
    process.exit(-1);
  },
);
