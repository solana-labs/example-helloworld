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

此专案将展示如何使用 [Solana Javascript API](https://github.com/solana-labs/solana-web3.js) 在 Solana 区块链上和程式交互。

此专案包含：

* 链上的 Hello World 程式
* 可以向帐户发送 hello 并获取 hello 的发送次数。

## 翻译
- [英文](README.md)

## 目录
- [Hello world on Solana](#hello-world-on-solana)
  - [快速开始](#快速開始)
    - [启动本地 Solana 集群](#啟動本地-solana-集群)
    - [安装 npm 套件](#安裝-npm-套件)
    - [部署链上程式](#部署鏈上程式)
    - [启动客户端](#啟動客戶端)
    - [期望产出](#期望產出)
      - [没有达到期望产出？](#沒有達到期望產出)
    - [自定义程式](#自定義程式)
  - [学习 Solana](#學習-solana)
  - [学习 Client](#學習-client)
    - [进入点](#進入點)
    - [建立与集群的连接](#建立與集群的連接)
    - [载入链上程式 Hello World（如果尚未加载）](#載入鏈上程式-hello-world如果尚未加載)
    - [发送 Hello 交易至链上](#發送-Hello-交易至鏈上)
    - [查询使用过 Hello 交易的 Solana 帐户](#查詢使用過-Hello-交易的-Solana-帳戶)
  - [学习链上程式](#學習鏈上程式)
    - [在 Solana 上编写程式](#在-Solana-上編寫程式)
  - [指向公开 Solana 集群](#指向公開的-Solana-集群)
  - [透过高级的范例扩展你的技能](#透過高級的範例擴展你的技能)

## 快速开始

[![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/#https://github.com/solana-labs/example-helloworld)

如果您决定在 Gitpod 中打开，请参考 [README-gitpod.md](README-gitpod.md)，否则请继续阅读。


要创建和运行此范例，请确认并安装以下套件

- 安装 node
- 安装 npm
- 从 https://rustup.rs/ 安装最新的 Rust 稳定版本
- 从 https://docs.solana.com/cli/install-solana-cli-tools 安装 v1.6.6 的 Solana 命令列管理工具


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

**注意: 如果你要用 Windows 的话，你得先设置 WSL，才能用 `solana-test-validator` 的工具**

关注交易日志：
```bash
$ solana logs
```

### 安装 npm 套件

```bash
$ npm install
```

### 构建链上程式

链上程式有 Rust 版本和 C 版本，最新的版本是运行范例时使用的版本。

```bash
$ npm run build:program-rust
```

```bash
$ npm run build:program-c
```

### 部署链上程式

```bash
$ solana program deploy dist/program/helloworld.so
```

### 启动客户端

```bash
$ npm run start
```

### 期望产出
公钥将会有所不同：

```bash
Let's say hello to a Solana account...
Connection to cluster established: http://localhost:8899 { 'feature-set': 3714435735, 'solana-core': '1.6.6' }
Using account AiT1QgeYaK86Lf9kudqKthQPCWwpG8vFA1bAAioBoF4X containing 0.00141872 SOL to pay for fees
Using program Dro9uk45fxMcKWGb1eWALujbTssh6DW8mb4x8x3Eq5h6
Creating account 8MBmHtJvxpKdYhdw6yPpedp6X6y2U9dCpdYaZJdmwV3A to say hello to
Saying hello to 8MBmHtJvxpKdYhdw6yPpedp6X6y2U9dCpdYaZJdmwV3A
8MBmHtJvxpKdYhdw6yPpedp6X6y2U9dCpdYaZJdmwV3A has been greeted 1 times
Success
```

#### 没有达到期望产出？
- 确认您已经启动了本地 Solana 集群，构建 并 部署好了 链上程式。
- 集群的输出日志应包括程序日志消息以及程式失败的原因
  - program log: <message>
- 运行 solana logs 检查程式日志找出程式失败的原因。
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

### 自定义程式

要自定义示例，请更改 `/src` 下的文件。如果您更改 `/src/program-rust` 或 `/src/program-c` 下的任何文件，你将需要重新构建链上程式 并 重新部署链上程式。

现在，当您重新运行 `npm run start` 时，您应该看到更改的结果。

## 学习 Solana

Solana 文件提供了有关 Solana 的更多消息并且所有的源代码都在 github 上。


更多的问题？在 [Discord](https://discordapp.com/invite/pquxPsq) 告诉我们。

## 学习 Client

此范例中的客户端使用 JavaScript 语言撰写：

- Solana web3.js SDK
- Solana web3 API


### 进入点

客户端入口点做了四件事


### 建立与集群的连接

客户端通过调用 establishConnection 与客户端建立连接.

### 检查 helloworld 链上程序是否已经部署

客户端从 `./dist/program/helloworld-keypair.jso`n 加载已部署程序的密钥对，并使用密钥的公共密钥来获取程序帐户。如果该程序不存在，则客户端会因错误而暂停。如果程序确实存在，它将创建一个新帐户，并以该程序作为其所有者来存储程序状态（已处理的hello数量）。

### 发送 `Hello` 交易至链上

客户端将通过调用 sayHello 并向程式发送 Hello 交易。此交易包含一条非常简单的指令，此指令主要呼叫 helloworld 程式的帐户公钥希望向 greeter 帐户说 Hello。

### 查询使用过 Hello 交易的 Solana 帐户

客户端每次对帐户说 Hello 时，程式都会在 greeter 帐户的数据中增加一个计数。客户端查询 greeter 帐户的数据，并透过 reportHellos 查询此帐户当前被访问的次数。


## 学习链上程式

链上 HelloWorld 程式 是一个 Rust 程式编译成 Berkley Packet Format (BPF) 并储存为可执行和可链接格式（ELF）共享对象.

此程式是使用以下程式编写：

- Solana Rust SDK

### 在 Solana 上编写程式

要了解有关 Solana 程式设计模型的更多讯息，请参阅程式设计模型概述。

要了解有关在 Solana 上开发程式的更多讯息，请参阅已部署程式概述。

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
