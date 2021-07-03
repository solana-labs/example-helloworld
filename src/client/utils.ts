/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */

import os from 'os';
import fs from 'mz/fs';
import path from 'path';
import yaml from 'yaml';
import {Keypair, Connection} from '@solana/web3.js';

// zzz
export function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export async function newAccountWithLamports(
  connection: Connection,
  lamports = 1000000,
): Promise<Keypair> {
  const account = Keypair.generate();
  const signature = await connection.requestAirdrop(
    account.publicKey,
    lamports,
  );
  await connection.confirmTransaction(signature);
  return account;
}

/**
 * @private
 */
async function getConfig(): Promise<any> {
  // Path to Solana CLI config file
  const CONFIG_FILE_PATH = path.resolve(
    os.homedir(),
    '.config',
    'solana',
    'cli',
    'config.yml',
  );
  const configYml = await fs.readFile(CONFIG_FILE_PATH, {encoding: 'utf8'});
  return yaml.parse(configYml);
}

/**
 * Load and parse the Solana CLI config file to determine which RPC url to use
 */
export async function getRpcUrl(): Promise<string> {
  try {
    const config = await getConfig();
    if (!config.json_rpc_url) throw new Error('Missing RPC URL');
    return config.json_rpc_url;
  } catch (err) {
    console.warn(
      'Failed to read RPC url from CLI config file, falling back to localhost',
    );
    return 'http://localhost:8899';
  }
}

/**
 * Load and parse the Solana CLI config file to determine which payer to use
 */
export async function getPayer(): Promise<Keypair> {
  try {
    const config = await getConfig();
    if (!config.keypair_path) throw new Error('Missing keypair path');
    return readAccountFromFile(config.keypair_path);
  } catch (err) {
    console.warn(
      'Failed to read keypair from CLI config file, falling back to new random keypair',
    );
    return Keypair.generate();
  }
}

/**
 * Create an Account from a keypair file
 */
export async function readAccountFromFile(filePath: string): Promise<Keypair> {
  const keypairString = await fs.readFile(filePath, {encoding: 'utf8'});
  const keypairBuffer = Uint8Array.from(JSON.parse(keypairString));
  return Keypair.fromSecretKey(keypairBuffer);
}
