<p align="center">
  <a href="https://solana.com">
    <img alt="Solana" src="https://i.imgur.com/OMnvVEz.png" width="250" />
  </a>
</p>

[![Build status][travis-image]][travis-url]
[![Gitpod Ready-to-Code](https://img.shields.io/badge/Gitpod-Ready--to--Code-blue?logo=gitpod)](https://gitpod.io/#https://github.com/solana-labs/example-helloworld)

[travis-image]: https://travis-ci.org/solana-labs/example-helloworld.svg?branch=master
[travis-url]: https://travis-ci.org/solana-labs/example-helloworld

# Solana 的 Hello world 实例

本文将展示如何在 Solana 区块链使用 [Solana Javascript API](https://github.com/solana-labs/solana-web3.js) 进行编程交互。

此教程包含以下内容：

* 链上的 Hello World 编程
* 向某个帐户发送 hello 并获取发送次数。

## 翻译版本
- [英文](README.md)
- [繁体](README_ZH_TW.md)

## 目录
- [Solana 的 Hello world 实例](#hello-world-on-solana)
  - [快速开始](#快速开始)
    - [启动本地 Solana 集群](#启动本地-solana-集群)
    - [安装 npm 套件](#安裝-npm-套件)
    - [部署链上程序](#部署链上程序)
    - [启动客户端](#启动客户端)
    - [期望输出](#期望输出)
      - [没有输出期望值？](#没有输出期望值)
    - [自定义程序](#自定义程序)
  - [学习 Solana](#学习-solana)
  - [学习 Client](#学习-client)
    - [进入端点](#进入端点)
    - [与集群建立连接](#与集群建立连接)
    - [加载链上 Hello World 编程](#加载链上-hello-world-编程)
    - [发送 Hello 交易到区块链](#发送-Hello-交易到区块链)
    - [查询使用过 Hello 交易的 Solana 帐户](#查詢使用過-Hello-交易的-Solana-帳戶)
  - [学习链上程序](#学习链上程序)
    - [编写 Solana 程序](#编在-Solana-程序)
  - [指向公开 Solana 集群](#指向公開的-Solana-集群)
  - [透过高级的范例扩展你的技能](#透过高级的范例扩展你的技能)

## 快速开始

[![在 Gitpod 打开](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/#https://github.com/solana-labs/example-helloworld)

如果需要在 Gitpod 中打开，请参考 [README-gitpod.md](README-gitpod.md)，否则请继续阅读。

要创建和运行此范例，请确认并安装以下套件：

- 安装 node
- 安装 npm
- 从 https://rustup.rs/ 安装最新的 Rust（v1.56.1+）稳定版本
- 从 https://docs.solana.com/cli/install-solana-cli-tools 安装 v1.8.2+ 的 Solana 命令列管理工具

如果这是您第一次使用 Docker 或 Rust，这些 安装笔记 可能对您有帮助。

### 配置命令列
1. 将命令列配置的 url 设置成 localhost 集群

```bash
$ solana config set --url localhost
```

2. 创建命令列使用的密钥对

如果这是你第一次使用 solana 命令列，你先得生成一个新的密钥对

```bash
$ solana-keygen new
```

### 启动本地 Solana 集群

默认情况下，此范例连接到本地 Solana 集群。

启动本地 Solana 集群：
```bash
$ solana-test-validator
```

**注意: 如果使用 Windows 系统，则需要先设置 WSL，才能用 `solana-test-validator` 工具**

### 查看交易日志：
```bash
$ solana logs
```

### 安装 npm 套件

```bash
$ npm install
```

### 构建链上程序

链上程序有 Rust 版本和 C 版本，最新的版本是运行范例时使用的版本。

```bash
$ npm run build:program-rust
```

```bash
$ npm run build:program-c
```

### 部署链上程序

```bash
$ solana program deploy dist/program/helloworld.so
```

### 启动客户端

```bash
$ npm run start
```

### 期望输出

输出的公钥和示例不同：

```bash
Let's say hello to a Solana account...
Connection to cluster established: http://localhost:8899 { 'feature-set': 2045430982, 'solana-core': '1.7.8' }
Using account AiT1QgeYaK86Lf9kudqKthQPCWwpG8vFA1bAAioBoF4X containing 0.00141872 SOL to pay for fees
Using program Dro9uk45fxMcKWGb1eWALujbTssh6DW8mb4x8x3Eq5h6
Creating account 8MBmHtJvxpKdYhdw6yPpedp6X6y2U9dCpdYaZJdmwV3A to say hello to
Saying hello to 8MBmHtJvxpKdYhdw6yPpedp6X6y2U9dCpdYaZJdmwV3A
8MBmHtJvxpKdYhdw6yPpedp6X6y2U9dCpdYaZJdmwV3A has been greeted 1 times
Success
```

#### 没有输出期望值？

- 确认您已经启动了本地 Solana 集群，构建 并 部署好了 链上程序。
- 集群的输出日志应包括程序日志消息以及程序失败的原因
  - program log: <message>
- 运行 solana logs 检查程序日志找出程序失败的原因。
  - ```bash
    Transaction executed in slot 5621:
    Signature: 4pya5iyvNfAZj9sVWHzByrxdKB84uA5sCxLceBwr9UyuETX2QwnKg56MgBKWSM4breVRzHmpb1EZQXFPPmJnEtsJ
    Status: Error processing Instruction 0: Program failed to complete
    Log Messages:
      Program G5bbS1ipWzqQhekkiCLn6u7Y1jJdnGK85ceSYLx2kKbA invoke [1]
      Program log: Hello World Rust program entrypoint
      Program G5bbS1ipWzqQhekkiCLn6u7Y1jJdnGK85ceSYLx2kKbA consumed 200000 of 200000 compute units
      Program failed to complete: exceeded maximum number of instructions allowed (200000) at instruction #334
      Program G5bbS1ipWzqQhekkiCLn6u7Y1jJdnGK85ceSYLx2kKbA failed: Program failed to complete

### 自定义程序

要自定义示例，请更改 `/src` 目录的文件。如果更改了 `/src/program-rust` 或 `/src/program-c` 下的任何文件，您需要重新构建链上程序 并 重新部署链上程序。

现在，重新运行 `npm run start` 时，您应该看到更改的结果。

## 学习 Solana

Solana 开发文档提供了有关 Solana 的更多资料，并且所有的源代码都在 github 上。

遇到更多的问题？在 [Discord](https://discordapp.com/invite/pquxPsq) 告诉我们。

## 学习 Client

此范例中的客户端使用 JavaScript 语言撰写：

- Solana web3.js SDK
- Solana web3 API


### 进入端点

客户端入口点做了四件事：

### 与集群建立连接

客户端通过调用 establishConnection 与客户端建立连接.

### 检查 helloworld 链上程序是否已经部署

客户端从 `./dist/program/helloworld-keypair.json` 加载已部署程序的密钥对，并使用密钥的公共密钥来获取程序帐户。如果该程序不存在，则客户端会因错误而暂停。如果程序确实存在，它将创建一个新帐户，并以该程序作为其所有者来存储程序状态（已处理的 hello 数量）。

### 发送 `Hello` 交易至链上

客户端将通过调用 sayHello 并向程序发送 Hello 交易。此交易包含一条非常简单的指令，此指令主要呼叫 helloworld 程序的帐户公钥希望向 greeter 帐户说 Hello。

### 查询使用过 Hello 交易的 Solana 帐户

客户端每次对帐户说 Hello 时，程序都会在 greeter 帐户的数据中增加一个计数。客户端查询 greeter 帐户的数据，并透过 reportHellos 查询此帐户当前被访问的次数。

## 学习链上程序

链上 HelloWorld 编程 是一个 Rust 编程编译成 Berkley Packet Filter (BPF) 并储存为可执行和可链接格式（ELF）共享对象.
Solana 链上程序存储的可执行字节码都是 Berkley Packet Filter (BPF) 字节码。
Solana 命令列工具可以把 Rust 和 C 代码编译成 BPF 字节码。

所有 Rust 的链上程序都是使用以下程序套件编写：

- Solana Rust SDK

### 在 Solana 上编写编程

要了解 Solana 程序设计模型的更多信息，请参阅程序设计模型概述。
要了解在 Solana 上开发程序的更多信息，请参阅已部署程序概述。

## 指向公开的 Solana 集群

Solana 有三个公开集群：

- `devnet` - 启用空投的开发者集群
- `testnet` - Tour De Sol 没有空投的测试集群
- `mainnet-beta` - 主网集群

使用 Solana CLI 的 solana 指令去选择集群

选择 `devnet` 集群:

```bash
$ solana config set --url devnet
```

选择 local 集群:

```bash
$ solana config set --url localhost
```

## 透过高级的范例扩展你的技能

然后我们还需要学习更多的内容。以下范例展示了更多高级功能，例如自定义错误、高级帐户处理、数据序列化建议、基准测试...等。

- [Programming Examples](https://github.com/solana-labs/solana-program-library/tree/master/examples)
- [Token Program](https://github.com/solana-labs/solana-program-library/tree/master/token)
- [Token Swap Program](https://github.com/solana-labs/solana-program-library/tree/master/token-swap)
