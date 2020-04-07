// To connect to a public cluster, set `export LIVE=1` in your
// environment. By default, `LIVE=1` will connect to the devnet cluster.

import {clusterApiUrl, Cluster} from '@solana/web3.js';

function chooseCluster(): Cluster | undefined {
  if (!process.env.LIVE) return;
  switch (process.env.CLUSTER) {
    case 'devnet':
    case 'testnet':
    case 'mainnet-beta': {
      return process.env.CLUSTER;
    }
  }
  return 'devnet';
}

export const cluster = chooseCluster();

export const url =
  process.env.RPC_URL ||
  (process.env.LIVE ? clusterApiUrl(cluster, false) : 'http://localhost:8899');

export const urlTls =
  process.env.RPC_URL ||
  (process.env.LIVE ? clusterApiUrl(cluster, true) : 'http://localhost:8899');

export let walletUrl =
  process.env.WALLET_URL || 'https://solana-example-webwallet.herokuapp.com/';
