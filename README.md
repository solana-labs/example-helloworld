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
  - [Getting Started](#getting-started)
    - [Start local Solana cluster](#start-local-solana-cluster)
    - [Build the on-chain program](#build-the-on-chain-program)
    - [Run client](#run-client)
    - [Customizing the Program](#customizing-the-program)
  - [Learn about Solana](#learn-about-solana)
  - [Learn about the on-chain program](#learn-about-the-on-chain-program)
  - [Learn about the client](#learn-about-the-client)
  - [Public Solana cluster](#public-solana-cluster)

## Getting Started

The following dependencies are required to build and run this example,
depending on your OS they may already be installed:

```bash
$ npm --version
$ docker -v
$ wget --version
$ rustc --version
```

Next fetch the `npm` dependencies, including `@solana/web3.js`, by running:
```bash
$ npm install
```

### Start local Solana cluster

This example connects to a local Solana cluster by default.

Enable on-chain program logs:
```bash
$ export RUST_LOG=solana_runtime::native_loader=trace,solana_runtime::system_instruction_processor=trace,solana_runtime::bank=debug,solana_bpf_loader=debug,solana_rbpf=debug
```

Start a local Solana cluster:
```bash
$ npm run localnet:update
$ npm run localnet:up
```

Get cluster log:
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

### Customizing the Program

To customize the example, make changes to the files under `/src`.  If you change source under `/src/program` you will need to [rebuild the on-chain program](#Build-the-on-chain-program)

Now when you rerun `npm run start`, you should see the results of your changes.

## Learn about Solana

More information about how Solana works is available in the [Book](https://docs.solana.com/book/)

## Learn about the on-chain program

TODO

## Learn about the client

TODO

## Public Solana cluster

Solana maintains a public development cluster called devnet.  To connect to the devnet instead of the local cluster set the environment variable `LIVE` to 1, unset to point back to the local cluster
```bash
$ export LIVE=1
```
