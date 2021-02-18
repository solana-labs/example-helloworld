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

此專案將展示如何使用 [Solana Javascript API](https://github.com/solana-labs/solana-web3.js) 在 Solana 區塊鏈上構建、部署和程式交互。

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
- 從 https://docs.solana.com/cli/install-solana-cli-tools 安裝 v1.5.3 的 Solana 命令列管理工具

如果這是您第一次使用 Docker 或 Rust，這些 [安裝筆記](README-installation-notes.md) 可能對您有幫助。

### 啟動本地 Solana 集群

默認情況下，此範例連接到本地Solana集群。

啟動鏈上程式日誌：
```bash
$ export RUST_LOG=solana_runtime::system_instruction_processor=trace,solana_runtime::message_processor=debug,solana_bpf_loader=debug,solana_rbpf=debug
```

啟動本地 Solana 集群：
```bash
$ solana-test-validator --log
```

### 安裝 npm 套件

```bash
$ npm install
```
### 部署鏈上程式

鏈上程式有 Rust 版本和 C 版本，最新的版本是運行範例時使用的版本。

```bash
$ npm run build:program-rust
```

```bash
$ npm run build:program-c
```

### 啟動客戶端

```bash
$ npm run start
```

### 期望產出

公鑰將會有所不同：

```bash
Lets say hello to a Solana account...
Connection to cluster established: http://localhost:8899 { solana-core: 1.1.2 }
Loading hello world program...
Program loaded to account 47bZX1D1tdmw3KWTo5MfBrAwwHBJQQzQL4VnNGT7HtyQ
Creating account Eys1jdLHdZ2AE56QAKpfadbjziMZ6NAvpL7qsdtM6sbk to say hello to
Saying hello to Eys1jdLHdZ2AE56QAKpfadbjziMZ6NAvpL7qsdtM6sbk
Eys1jdLHdZ2AE56QAKpfadbjziMZ6NAvpL7qsdtM6sbk has been greeted 1 times
Success
```

#### 沒有達到期望產出？

- 確保您已經 [啟動本地 Solana 集群](#start-local-solana-cluster) 並 [佈建鏈上程式](#build-the-on-chain-program).
- 集群的輸出日誌應包括程序日誌消息以及程式失敗的原因
  - `program log: <message>`   
- 檢查 Solana 集群日誌以尋找任何失敗的交易或失敗的鏈上程式
  - 擴展日誌過濾器並重啟集群以查看更多細節
    - ```bash
      $ export RUST_LOG=solana_runtime::native_loader=trace,solana_runtime::system_instruction_processor=trace,solana_runtime::bank=debug,solana_bpf_loader=debug,solana_rbpf=debug
      $ solana-test-validator --log
      ```

### 自定義程式

要自定義示例，請更改 `/src` 下的文件。如果您更改 `/src/program-rust` 或 `/src/program-c` 下的任何文件，你將需要[重新部署鏈上程式](#build-the-on-chain-program)

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

### 載入鏈上程式 Hello World（如果尚未加載）

在群集上載入程式的過程包括將共享對象的位元組儲存在 Solana 帳戶的數據向量中，並標記帳戶為可實行的。

客戶端通過調用 [`載入程式`](https://github.com/solana-labs/example-helloworld/blob/e936ab42e168f1939df0164d5996adf9ca635bd0/src/client/hello_world.js#L54)載入程式。並將第一次的 `loadProgram` 稱為客戶端：

- 從檔案系統中讀取共享對象
- 計算`載入程式`相關的手續費
- 空投時間戳記到付款人帳戶以支付費用
- 通過 Solana web3.js 函式載入 [`BPFLoader.load`]([TODO](https://github.com/solana-labs/solana-web3.js/blob/37d57926b9dba05d1ad505d4fd39d061030e2e87/src/bpf-loader.js#L36)) 程式
- 創建一個新的 `greeter` 帳戶，該帳戶將創建 `Hello` 交易
- 在配置文件中記錄已載入 `helloworld` 程式和 `greeter` 帳戶的 [公鑰](https://github.com/solana-labs/solana-web3.js/blob/37d57926b9dba05d1ad505d4fd39d061030e2e87/src/publickey.js#L10)。重複調用客戶端將載入相同的程式和 `greeter` 帳戶。（要強制重新加載程式，請執行 `npm clean：store`）

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
  
使用 npm 指令去選擇集群 

選擇 `devnet` 集群:
```bash
$ npm run cluster:devnet
```

選擇 `local` 集群:
```bash
$ npm run cluster:localnet
```

## 透過高級的範例擴展你的技能

還有更多的東西要學習。以下範例展示了更多高級功能，例如自定義錯誤、高級帳戶處理、數據序列化建議、基準測試...等。

- [Programming Examples](https://github.com/solana-labs/solana-program-library/tree/master/examples)
- [Token Program](https://github.com/solana-labs/solana-program-library/tree/master/token)
- [Token Swap Program](https://github.com/solana-labs/solana-program-library/tree/master/token-swap)
