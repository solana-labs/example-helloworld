[![Build status][travis-image]][travis-url]

[travis-image]: https://travis-ci.org/solana-labs/example-helloworld.svg?branch=master
[travis-url]: https://travis-ci.org/solana-labs/example-helloworld

# Hello world on Solana

This project demonstrates how to use the [Solana Javascript API](https://github.com/solana-labs/solana-web3.js)
to build, deploy, and interact with programs on the Solana blockchain.

The project comprises of:

* An on-chain hello world program
* Client that can send a "hello" to an account and get back the number of times hello has been sent

## Table of Contents
- [Hello world on Solana](#hello-world-on-solana)
  - [Table of Contents](#table-of-contents)
  - [Quick Start](#quick-start)
    - [Start local Solana cluster](#start-local-solana-cluster)
    - [Build the on-chain program](#build-the-on-chain-program)
    - [Run client](#run-client)
    - [Expected output](#expected-output)
      - [Not seeing the expected output?](#not-seeing-the-expected-output)
    - [Customizing the Program](#customizing-the-program)
  - [Learn about Solana](#learn-about-solana)
  - [Learn about the on-chain program](#learn-about-the-on-chain-program)
  - [Learn about the client](#learn-about-the-client)
  - [Pointing to the public Solana cluster](#pointing-to-the-public-solana-cluster)

## Quick Start

The following dependencies are required to build and run this example,
depending on your OS they may already be installed:

```bash
$ npm --version
$ docker -v
$ wget --version
$ rustc --version
```

Fetch the `npm` dependencies, including `@solana/web3.js`, by running:
```bash
$ npm install
```

### Start local Solana cluster

This example connects to a local Solana cluster by default.

Enable on-chain program logs:
```bash
$ export RUST_LOG=solana_runtime::system_instruction_processor=trace,solana_bpf_loader=debug,solana_rbpf=debug
```

Start a local Solana cluster:
```bash
$ npm run localnet:update
$ npm run localnet:up
```

Get cluster logs:
```bash
$ npm run localnet:logs
```

To stop the local Solana cluster run:
```bash
$ npm run localnet:down
```

### Build the on-chain program

```bash
$ npm run build:program
```

### Run client

```bash
$ npm run start
```

### Expected output

```bash
Lets say hello to a Solana account...
Connection to cluster established: http://localhost:8899 { 'solana-core': '1.1.1' }
Loading hello world program...
Program loaded to account 47bZX1D1tdmw3KWTo5MfBrAwwHBJQQzQL4VnNGT7HtyQ
Creating account Eys1jdLHdZ2AE56QAKpfadbjziMZ6NAvpL7qsdtM6sbk to say hello to
Saying hello to Eys1jdLHdZ2AE56QAKpfadbjziMZ6NAvpL7qsdtM6sbk
Eys1jdLHdZ2AE56QAKpfadbjziMZ6NAvpL7qsdtM6sbk has been greeted 1 times
Success
```

#### Not seeing the expected output?

- Ensure you've [Started the local cluster](Start-local-solana-cluster) and [Built the on-chain program](Build-the-on-chain-program).
- Ensure Docker us running.  You might try bumping up its resource settings, 16 GB of memory and 3 GB of Swap should help.
- Inspect the Solana cluster logs looking for any failed transactions or failed on-chain programs
  - Expand the log filter and restart the cluster to see more detail
    - ```bash
      $ npm run localnet:down
      $ export RUST_LOG=solana_runtime::native_loader=trace,solana_runtime::system_instruction_processor=trace,solana_runtime::bank=debug,solana_bpf_loader=debug,solana_rbpf=debug
      $ npm run localnet:up

### Customizing the Program

To customize the example, make changes to the files under `/src`.  If you change files under `/src/program` you will need to [rebuild the on-chain program](#Build-the-on-chain-program)

Now when you rerun `npm run start`, you should see the results of your changes.

## Learn about Solana

More information about how Solana works is available in the [Book](https://docs.solana.com/)

## Learn about the on-chain program

TODO

## Learn about the client

TODO

## Pointing to the public Solana cluster

Solana maintains a public development cluster called devnet.  To connect to the devnet instead of the local cluster set the environment variable `LIVE` to 1, unset to point back to the local cluster
```bash
$ export LIVE=1
```
