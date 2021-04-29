#!/usr/bin/env bash
set -e

installDir=$1
if [[ -z $installDir ]]; then
  installDir="$(cd "$(dirname "$0")"; pwd)"
fi

echo "Installing latest BPF SDK into $installDir"

set -x
cd "$installDir/"
curl -L  --retry 5 --retry-delay 2 -o bpf-sdk.tar.bz2 \
  https://solana-sdk.s3.amazonaws.com/stable/bpf-sdk.tar.bz2
rm -rf bpf-sdk
mkdir -p bpf-sdk
tar jxf bpf-sdk.tar.bz2
rm -f bpf-sdk.tar.bz2

cat bpf-sdk/version.txt