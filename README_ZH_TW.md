<p align="center">
  <a href="https://solana.com">
    <img alt="Solana" src="https://i.imgur.com/OMnvVEz.png" width="250" />
  </a>
</p>

[![Build status][travis-image]][travis-url]
[![Gitpod Ready-to-Code](https://img.shields.io/badge/Gitpod-Ready--to--Code-blue?logo=gitpod)](https://gitpod.io/#https://github.com/solana-labs/example-helloworld)

[travis-image]: https://travis-ci.org/solana-labs/example-helloworld.svg?branch=master
[travis-url]: https://travis-ci.org/solana-labs/example-helloworld

# Hello world on Solana

此專案將展示如何使用 [Solana Javascript API](https://github.com/solana-labs/solana-web3.js) 在 Solana 區塊鏈上和程式交互。

此專案包含：

* 鏈上的 Hello World 程式
* 可以向帳戶發送 `hello` 並獲取 `hello` 的發送次數。

## 翻譯
- [英文](README.md)

## 目錄
- [Hello world on Solana](#hello-world-on-solana)
  - [快速開始](#快速開始)
    - [啟動本地 Solana 集群](#啟動本地-solana-集群)
    - [安裝 npm 套件](#安裝-npm-套件)
    - [部署鏈上程式](#部署鏈上程式)
    - [啟動客戶端](#啟動客戶端)
    - [期望產出](#期望產出)
      - [沒有達到期望產出？](#沒有達到期望產出)
    - [自定義程式](#自定義程式)
  - [學習 Solana](#學習-solana)
  - [學習 Client](#學習-client)
    - [進入點](#進入點)
    - [建立與集群的連接](#建立與集群的連接)
    - [載入鏈上程式 Hello World（如果尚未加載）](#載入鏈上程式-hello-world如果尚未加載)
    - [發送 `Hello` 交易至鏈上](#發送-Hello-交易至鏈上)
    - [查詢使用過 `Hello` 交易的 Solana 帳戶](#查詢使用過-Hello-交易的-Solana-帳戶)
  - [學習鏈上程式](#學習鏈上程式)
    - [在 Solana 上編寫程式](#在-Solana-上編寫程式)
  - [指向公開 Solana 集群](#指向公開的-Solana-集群)
  - [透過高級的範例擴展你的技能](#透過高級的範例擴展你的技能)

## 快速開始

[![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/#https://github.com/solana-labs/example-helloworld)

如果您決定在 Gitpod 中打開，請參考 [README-gitpod.md](README-gitpod.md)，否則請繼續閱讀。


要創建和運行此範例，請確認並安裝以下套件

- 安裝 node
- 安裝 npm
- 從 https://rustup.rs/ 安裝最新的 Rust 穩定版本
- 從 https://docs.solana.com/cli/install-solana-cli-tools 安裝 v1.6.6 的 Solana 命令列管理工具

如果這是您第一次使用 Docker 或 Rust，這些 [安裝筆記](README-installation-notes.md) 可能對您有幫助。

### 配置命令列

1. 將命令列配置的 url 設置成 localhost 集群

```bash
$ solana config set --url localhost
```

2. 創建命令列使用的密鑰對

如果這是你第一次使用 solana 命令列，你先得生成一個新的密鑰對

```bash
$ solana-keygen new
```

### 啟動本地 Solana 集群

默認情況下，此範例連接到本地 Solana 集群。

啟動本地 Solana 集群：
```bash
$ solana-test-validator
```
**注意: 如果你要用 Windows 的話，你得先設置 WSL，才能用 `solana-test-validator` 的工具**

關注交易日誌：
```bash
$ solana logs
```

### 安裝 npm 套件

```bash
$ npm install
```
### 構建鏈上程式

鏈上程式有 Rust 版本和 C 版本，最新的版本是運行範例時使用的版本。

```bash
$ npm run build:program-rust
```

```bash
$ npm run build:program-c
```

### 部署鏈上程式

```bash
$ solana program deploy dist/program/helloworld.so
```

### 啟動客戶端

```bash
$ npm run start
```

### 期望產出

公鑰將會有所不同：

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

#### 沒有達到期望產出？

- 確認您已經[啟動了本地 Solana 集群](#start-local-solana-cluster)，[構建](#構建鏈上程式) 並 [部署好了](#部署鏈上程式) 鏈上程式。
- 集群的輸出日誌應包括程序日誌消息以及程式失敗的原因
  - `program log: <message>`   
- 運行 `solana logs` 檢查程式日誌找出程式失敗的原因。
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

### 自定義程式

要自定義示例，請更改 `/src` 下的文件。如果您更改 `/src/program-rust` 或 `/src/program-c` 下的任何文件，你將需要[重新構建鏈上程式](#構建鏈上程式) 並 [重新部署鏈上程式](#部署鏈上程式)。

現在，當您重新運行 `npm run start` 時，您應該看到更改的結果。

## 學習 Solana

[Solana 文件](https://docs.solana.com/)提供了有關 Solana 的更多消息並且所有的源代碼都在 [github](https://github.com/solana-labs/solana) 上。

更多的問題？在 [Discord](https://discordapp.com/invite/pquxPsq) 告訴我們。

## 學習 Client 

此範例中的客戶端使用 JavaScript 語言撰寫：
- [Solana web3.js SDK](https://github.com/solana-labs/solana-web3.js)
- [Solana web3 API](https://solana-labs.github.io/solana-web3.js)

### 進入點

[客戶端入口點](https://github.com/solana-labs/example-helloworld/blob/e936ab42e168f1939df0164d5996adf9ca635bd0/src/client/main.js#L14)做了四件事

### 建立與集群的連接

客戶端通過調用 [`establishConnection`](https://github.com/solana-labs/example-helloworld/blob/e936ab42e168f1939df0164d5996adf9ca635bd0/src/client/hello_world.js#L45) 與客戶端建立連接.

### 檢查一下這個 helloworld 鏈上程式是否已經部署好了

客戶端從 `./dist/program/helloworld-keypair.json` 這個文件加載程式的密鑰對。客戶端使用那個密鑰對的公鑰訪問程式帳戶。如果程式帳戶不存在，
客戶端就會報錯並停止運行。如果程式存在，客戶端會創建一個對於該程式指定好的帳戶。

### 發送 `Hello` 交易至鏈上

客戶端將通過調用 [`sayHello`](https://github.com/solana-labs/example-helloworld/blob/e936ab42e168f1939df0164d5996adf9ca635bd0/src/client/hello_world.js#L121) 並向程式發送 `Hello` 交易。此交易包含一條非常簡單的指令，此指令主要呼叫 `helloworld` 程式的帳戶公鑰希望向 `greeter` 帳戶說 `Hello`。

### 查詢使用過 `Hello` 交易的 Solana 帳戶

客戶端每次對帳戶說 `Hello` 時，程式都會在 `greeter` 帳戶的數據中增加一個計數。客戶端查詢 `greeter` 帳戶的數據，並透過 [`reportHellos`](https://github.com/solana-labs/example-helloworld/blob/e936ab42e168f1939df0164d5996adf9ca635bd0/src/client/hello_world.js#L138.) 查詢此帳戶當前被訪問的次數。

## 學習鏈上程式

[鏈上 HelloWorld 程式](/src/program-rust/Cargo.toml) 是一個 Rust 程式編譯成 [Berkley Packet Format (BPF)](https://en.wikipedia.org/wiki/Berkeley_Packet_Filter) 並儲存為[可執行和可鏈接格式（ELF）共享對象](https://en.wikipedia.org/wiki/Executable_and_Linkable_Format).

此程式是使用以下程式編寫：
- [Solana Rust SDK](https://github.com/solana-labs/solana/tree/master/sdk) 

### 在 Solana 上編寫程式

要了解有關 Solana 程式設計模型的更多訊息，請參閱[程式設計模型概述](https://docs.solana.com/developing/programming-model/overview)。

要了解有關在 Solana 上開發程式的更多訊息，請參閱[已部署程式概述](https://docs.solana.com/developing/deployed-programs/overview)。

## 指向公開的 Solana 集群

Solana 有三個公開集群：

- `devnet` - 啟用空投的開發者集群 
- `testnet` - Tour De Sol 沒有空投的測試集群
- `mainnet-beta` -  主網集群
  
使用 Solana CLI 的 `solana` 指令去選擇集群 

選擇 `devnet` 集群:
```bash
$ solana config set --url devnet
```

選擇 `local` 集群:
```bash
$ solana config set --url localhost
```

## 透過進階的範例擴展你的技能

還有更多的東西要學習。以下範例展示了更多進階功能，例如自定義錯誤、進階帳戶處理、數據序列化建議、基準測試...等。

- [Programming Examples](https://github.com/solana-labs/solana-program-library/tree/master/examples)
- [Token Program](https://github.com/solana-labs/solana-program-library/tree/master/token)
- [Token Swap Program](https://github.com/solana-labs/solana-program-library/tree/master/token-swap)
