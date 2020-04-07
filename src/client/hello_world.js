// @flow

import {
  Account,
  Connection,
  BpfLoader,
  PublicKey,
  SystemProgram,
  TransactionInstruction,
  Transaction,
} from '@solana/web3.js';
import fs from 'mz/fs';
import * as BufferLayout from 'buffer-layout';

import {url, urlTls} from '../../url';
import {Store} from './util/store';
import {newAccountWithLamports} from './util/new-account-with-lamports';
import {sendAndConfirmTransaction} from './util/send-and-confirm-transaction';

/**
 * Connection to the network
 */
let connection: Connection;

/**
 * Hello world's program id
 */
let programId: PublicKey;

/**
 * The public key of the account we are saying hello to
 */
let greetedPubkey: PublicKey;

/**
 * Layout of the greeted account data
 */
const greetedAccountDataLayout = BufferLayout.struct([
  BufferLayout.u32('numGreets'),
]);

/**
 * Establish a connection to the cluster
 */
export async function establishConnection(): Promise<void> {
  connection = new Connection(url, 'recent');
  const version = await connection.getVersion();
  console.log('Connection to cluster established:', url, version);
}

/**
 * Load the hello world BPF program if not already loaded
 */
export async function loadProgram(): Promise<void> {
  const store = new Store();

  // Check if the program has already been loaded
  try {
    let config = await store.load('config.json');
    programId = new PublicKey(config.programId);
    greetedPubkey = new PublicKey(config.greetedPubkey);
    await connection.getAccountInfo(programId);
    console.log('Program already loaded to account', programId.toBase58());
    return;
  } catch (err) {
    // try to load the program
  }

  // Read the BPF program bytes
  const data = await fs.readFile(
    'src/program/target/bpfel-unknown-unknown/release/solana_bpf_helloworld.so',
  );

  // Calculate the cost to load the program
  const {feeCalculator} = await connection.getRecentBlockhash();
  const NUM_RETRIES = 500; // allow some number of retries
  let cost =
    feeCalculator.lamportsPerSignature *
      (BpfLoader.getMinNumSignatures(data.length) + NUM_RETRIES) +
    (await connection.getMinimumBalanceForRentExemption(data.length));
  const bpf_payer = await newAccountWithLamports(connection, cost);

  // Load the program
  console.log('Loading hello world program...');
  programId = await BpfLoader.load(connection, bpf_payer, data);
  console.log('Program loaded to account', programId.toBase58());

  // Create the greeted account
  const greetedAccount = new Account();
  greetedPubkey = greetedAccount.publicKey;
  console.log('Creating account', greetedPubkey.toBase58(), 'to say hello to');
  const space = 4; // 64-bit number
  const lamports = await connection.getMinimumBalanceForRentExemption(space);
  const payer = await newAccountWithLamports(connection, lamports);
  const transaction = SystemProgram.createAccount({
    fromPubkey: payer.publicKey,
    newAccountPubkey: greetedPubkey,
    lamports,
    space,
    programId,
  });
  await sendAndConfirmTransaction(
    'createAccount',
    connection,
    transaction,
    payer,
    greetedAccount,
  );

  // Save this info for next time
  await store.save('config.json', {
    url: urlTls,
    programId: programId.toBase58(),
    greetedPubkey: greetedPubkey.toBase58(),
  });
}

/**
 * Say hello
 */
export async function sayHello(): Promise<void> {
  console.log('Saying hello to', greetedPubkey.toBase58());
  const instruction = new TransactionInstruction({
    keys: [{pubkey: greetedPubkey, isSigner: false, isWritable: true}],
    programId,
    data: Buffer.alloc(0), // All instructions are hellos
  });
  await sendAndConfirmTransaction(
    'sayHello',
    connection,
    new Transaction().add(instruction),
  );
}

/**
 * Report the number of times the greeted account has been said hello to
 */
export async function reportHellos(): Promise<void> {
  const accountInfo = await connection.getAccountInfo(greetedPubkey);
  if (accountInfo === null) {
    throw 'Error: cannot find the greeted account';
  }
  const info = greetedAccountDataLayout.decode(Buffer.from(accountInfo.data));
  console.log(
    greetedPubkey.toBase58(),
    'has been greeted',
    info.numGreets.toString(),
    'times',
  );
}
