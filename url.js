// To connect to a public cluster, set `export LIVE=1` in your
// environment. By default, `LIVE=1` will connect to the devnet cluster.

import {clusterApiUrl, Cluster} from '@solana/web3.js';
import fs from 'mz/fs';

function chooseCluster(): Cluster | undefined {
  let cluster;
  if (process.env.LIVE) {
    cluster = process.env.CLUSTER;
  } else if (fs.existsSync('cluster.txt')) {
    cluster = fs
      .readFileSync('cluster.txt')
      .toString()
      .replace(/(\r\n|\n|\r| )/gm, '');
  }

  if (cluster) {
    switch (cluster) {
      case 'devnet':
      case 'testnet':
      case 'mainnet-beta': {
        return cluster;
      }
      default:
        throw 'Unknown cluster: ' + cluster;
    }
  }
}

export const cluster = chooseCluster();

export const url =
  process.env.RPC_URL ||
  (cluster ? clusterApiUrl(cluster, false) : 'http://localhost:8899');

export const urlTls =
  process.env.RPC_URL ||
  (cluster ? clusterApiUrl(cluster, true) : 'http://localhost:8899');

export let walletUrl =
  process.env.WALLET_URL || 'https://solana-example-webwallet.herokuapp.com/';
