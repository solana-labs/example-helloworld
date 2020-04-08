[![Build status][travis-image]][travis-url]
[![Gitpod Ready-to-Code](https://img.shields.io/badge/Gitpod-Ready--to--Code-blue?logo=gitpod)](https://gitpod.io/#https://github.com/solana-labs/example-helloworld) 

[travis-image]: https://travis-ci.org/solana-labs/example-helloworld.svg?branch=master
[travis-url]: https://travis-ci.org/solana-labs/example-helloworld

# Hello world on Solana (Gitpod version)

This project demonstrates how to use the [Solana Javascript API](https://github.com/solana-labs/solana-web3.js)
to build, deploy, and interact with programs on the Solana blockchain.

The project comprises of:

* An on-chain hello world program
* A client that can send a "hello" to an account and get back the number of times "hello" has been sent

## Table of Contents
- [Hello world on Solana (Gitpod version)](#hello-world-on-solana-gitpod-version)
  - [Table of Contents](#table-of-contents)
  - [Quick Start](#quick-start)
    - [Expected output](#expected-output)
    - [Customizing the Program](#customizing-the-program)
  - [Learn about Solana](#learn-about-solana)
  - [Learn about the client](#learn-about-the-client)
  - [Learn about the on-chain program](#learn-about-the-on-chain-program)

## Quick Start

This example connects to the public Solana `devnet` cluster by default

Run the client to load and interact with the on-chain program:
```bash
$ npm run start
```

### Expected output

```bash
Lets say hello to a Solana account...
Connection to cluster established: http://localhost:8899 { 'solana-core': '1.1.2' }
Loading hello world program...
Program loaded to account 47bZX1D1tdmw3KWTo5MfBrAwwHBJQQzQL4VnNGT7HtyQ
Creating account Eys1jdLHdZ2AE56QAKpfadbjziMZ6NAvpL7qsdtM6sbk to say hello to
Saying hello to Eys1jdLHdZ2AE56QAKpfadbjziMZ6NAvpL7qsdtM6sbk
Eys1jdLHdZ2AE56QAKpfadbjziMZ6NAvpL7qsdtM6sbk has been greeted 1 times
Success
```

### Customizing the Program

To customize the example, make changes to the files under `/src`.  If you change any files under `/src/program` you will need to [rebuild the on-chain program](README.md#build-the-on-chain-program)

Now when you rerun `npm run start`, you should see the results of your changes.

## [Learn about Solana](README.md#learn-about-solana)

## [Learn about the client](README.md#learn-about-the-client)

## [Learn about the on-chain program](README.md#learn-about-the-on-chain-program)

