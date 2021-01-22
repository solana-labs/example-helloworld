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
- [繁體中文](README-ZH.md)

## Table of Contents
- [Hello world on Solana](#hello-world-on-solana)
  - [目錄](#table-of-contents)
  - [快速開始](#快速開始)
    - [啟動本地 Solana 集群](#啟動本地-Solana-集群)
    - [部署鏈上程式](#部署鏈上程式)
    - [啟動客戶端](#啟動客戶端)
    - [期望產出](#期望產出)
      - [沒有達到期望產出？](#沒有達到期望產出？)
    - [自定義程式](#自定義程式)
  - [學習 Solana](#學習-Solana)
  - [學習 Client](#學習-Client)
    - [進入點](#進入點)
    - [建立與集群的連接](#建立與集群的連接)
    - [載入鏈上程式 Hello World（如果尚未加載）](#載入鏈上程式-Hello-World（如果尚未加載）)
    - [發送 `Hello` 交易至鏈上](#發送-Hello-交易至鏈上)
    - [查詢使用過 `Hello` 交易的 Solana 帳戶](#查詢使用過-Hello-交易的-Solana-帳戶)
  - [學習鏈上的程式](#學習鏈上的程式)
    - [進入點](#進入點-1)
    - [處理指令](#處理指令)
    - [Rust 的限制](#Rust-的限制)
  - [指向公開 Solana 集群](#指向公開的-Solana-集群)
  - [透過高級的範例擴展你的技能](#透過高級的範例擴展你的技能)

## 快速開始

[![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/#https://github.com/solana-labs/example-helloworld)

如果您決定在 Gitpod 中打開，請參考 [README-gitpod.md](README-gitpod.md)，否則請繼續閱讀。


要創建和運行此範例，需要添加以下依賴，根據您的操作系統，它們可能已經安裝：

```bash
$ node --version
$ npm --version
$ docker -v
$ wget --version
$ rustup --version
$ rustc --version
$ cargo --version
```

如果這是您第一次使用 Docker 或 Rust，這些 [安裝筆記](README-installation-notes.md) 可能對您有幫助。

### 啟動本地 Solana 集群

默認情況下，此範例連接到本地Solana集群。

啟動鏈上程式日誌：
```bash
$ export RUST_LOG=solana_runtime::system_instruction_processor=trace,solana_runtime::message_processor=info,solana_bpf_loader=debug,solana_rbpf=debug
```

啟動本地 Solana 集群：
```bash
$ npm run localnet:update
$ npm run localnet:up
```

查看集群日誌：
```bash
$ npm run localnet:logs
```

注意：此步驟將停止本地 Solana 集群：
```bash
$ npm run localnet:down
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
- 確保 Docker 正在運行。您可以嘗試提高其資源設置，應該有 8 GB 的內存和 3 GB 的交換空間。
- 檢查 Solana 集群日誌以尋找任何失敗的交易或失敗的鏈上程式
  - 擴展日誌過濾器並重啟集群以查看更多細節
    - ```bash
      $ npm run localnet:down
      $ export RUST_LOG=solana_runtime::native_loader=trace,solana_runtime::system_instruction_processor=trace,solana_runtime::bank=debug,solana_bpf_loader=debug,solana_rbpf=debug
      $ npm run localnet:up
### 自定義程式

要自定義示例，請更改 /src 下的文件。如果您更改 /src/program-rust或 /src/program-c 下的任何文件，你將需要[重新部署鏈上程式](#build-the-on-chain-program)

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

客戶端通過調用 [`載入程式`](https://github.com/solana-labs/example-helloworld/blob/e936ab42e168f1939df0164d5996adf9ca635bd0/src/client/hello_world.js#L54)載入程式。並將第一次的`loadProgram` 稱為客戶端：

- 從檔案系統中讀取共享對象
- 計算`載入程式`相關的手續費
- 空投時間戳記到付款人帳戶以支付費用
- 通過 Solana web3.js 函式載入 [`BPFLoader.load`]([TODO](https://github.com/solana-labs/solana-web3.js/blob/37d57926b9dba05d1ad505d4fd39d061030e2e87/src/bpf-loader.js#L36)) 程式
- 創建一個新的 `greeter` 帳戶，該帳戶將創建 `Hello` 交易
- 在配置文件中記錄已載入 `helloworld` 程式和 `greeter` 帳戶的 [公鑰](https://github.com/solana-labs/solana-web3.js/blob/37d57926b9dba05d1ad505d4fd39d061030e2e87/src/publickey.js#L10)。重複調用客戶端將載入相同的程式和` greeter` 帳戶。（要強制重新加載程式，請執行 `npm clean：store`）

### 發送 `Hello` 交易至鏈上

客戶端將通過調用 [`sayHello`](https://github.com/solana-labs/example-helloworld/blob/e936ab42e168f1939df0164d5996adf9ca635bd0/src/client/hello_world.js#L121) 並向程式發送 `Hello` 交易。此交易包含一條非常簡單的指令，此指令主要呼叫 `helloworld` 程式的帳戶公鑰希望向 `greeter` 帳戶說 `Hello`。

### 查詢使用過 `Hello` 交易的 Solana 帳戶

客戶端每次對帳戶說 `Hello` 時，程式都會在 `greeter` 帳戶的數據中增加一個計數。客戶端查詢 `greeter` 帳戶的數據，並透過 [`reportHellos`](https://github.com/solana-labs/example-helloworld/blob/e936ab42e168f1939df0164d5996adf9ca635bd0/src/client/hello_world.js#L138.) 查詢此帳戶當前被訪問的次數。

## 學習鏈上程式
[鏈上 HelloWorld 程式](src/program/Cargo.toml) 是一個 Rust 程式編譯成 [Berkley Packet Format (BPF)](https://en.wikipedia.org/wiki/Berkeley_Packet_Filter) 並儲存為[可執行和可鏈接格式（ELF）共享對象](https://en.wikipedia.org/wiki/Executable_and_Linkable_Format).

### 進入點-1

該程式的[進入點](https://github.com/solana-labs/example-helloworld/blob/6508bdb54c4d7f60747263b4274283fbddfabffe/src/program/src/lib.rs#L12)帶有三個參數：
```rust
fn process_instruction<'a>(
    program_id: &Pubkey, // Public key of the account the hello world program was loaded into
    accounts: &'a [AccountInfo<'a>], // The account to say hello to
    _instruction_data: &[u8], // Ignored, all helloworld instructions are hellos
) -> ProgramResult {
```


- `program_id` 是當前執行程式的公鑰。可以使用不同的帳戶將同一程式上傳到集群，並且程式可以使用 `program_id` 確定當前正在執行該程式的哪個實體。
- `accounts` 是 [`Account Info's`](https://github.com/solana-labs/solana/blob/b4e00275b2da6028cc839a79cdc4453d4c9aca13/sdk/src/account_info.rs#L10) 的一部分代表指令中包含的每個帳戶。
- `_instruction_data` 是一個數據向量，包含[作為指令一部分傳遞的數據](https://github.com/solana-labs/solana-web3.js/blob/37d57926b9dba05d1ad505d4fd39d061030e2e87/src/transaction.js#L46). 在 helloworld 的情況下，不會傳遞任何指令數據並因此將其忽略（所有指令均被視為 `Hello` 指令）。通常，指令數據將包含有關程式應處理哪種命令的訊息以及有關該特定命令的詳細訊息。

### 處理指令

有了進入點的輸入，指令的結果就是對帳戶的時間戳記和數據向量的更新。對於 helloworld，`greeted` 帳戶的數據包含一個 32 位 Little-endian 編碼的 uInt，該整數將遞增。

該程式進行了一系列檢查以確保指令格式正確（`greeted` 帳戶歸程式所有，並具有足夠的數據來容納 32 位元 uInt）。

帳戶可能在切成相同等分在多個位置，在 Rust 上 `std protects any writable data::cell::RefCell`。

該程式通過調用  [`info!`](https://github.com/solana-labs/solana/blob/b4e00275b2da6028cc839a79cdc4453d4c9aca13/sdk/src/log.rs#L12) 將診斷訊息印到驗證者的日誌中。在本地集群上，可以通過在 `RUST_LOG`下`solana_bpf_loader_program=info` 指令來查看日誌。

如果程式失敗，則返回 `ProgramError`；否則，它返回 `Ok(())` 且帳戶的任何更新都可以記錄在鏈上。

### Rust 的限制

鏈上的 Rust 程式支持 Rust 的大多數 libstd、libcore 和liballoc，以及許多第三方程式庫。

由於這些程式在資源受限的單線程環境中運行，因此存在一些限制，並且必須具有確定性：

- 無法訪問：
  - `rand` 或任何依賴它的程式庫
  - `std::fs`
  - `std::net`
  - `std::os`
  - `std::future`
  - `std::net`
  - `std::process`
  - `std::sync`
  - `std::task`
  - `std::thread`
  - `std::time`
- 限制訪問：
  - `std::hash`
  - `std::os`
- 應避免使用二進制，因為在周期和調用深度上非常昂貴 
- 應避免字串格式化，因為在計算上很昂貴
- 不支持 `println!`、`print!`，應改用 `src/log.rs` 中的 Solana SDK幫助程式
- 限制程式在處理一條指令期間可以執行的指令數

## 指向公開的 Solana 集群

Solana 有三個公開集群：

- `devnet` - 啟用空投的開發者集群 
- `testnet` - Tour De Sol 沒有空投的測試集群
- `mainnet-beta` -  主網集群
  
使用 npm 指令去選擇集群 

選擇 `devnet`:
```bash
$ npm run cluster:devnet
```

選擇 `local` cluster:
```bash
$ npm run cluster:localnet
```

## 透過高級的範例擴展你的技能

還有更多的東西要學習。以下範例展示了更多高級功能，例如自定義錯誤、高級帳戶處理、數據序列化建議、基準測試...等。

- [Programming Examples](https://github.com/solana-labs/solana-program-library/tree/master/examples)
- [Token Program](https://github.com/solana-labs/solana-program-library/tree/master/token)
- [Token Swap Program](https://github.com/solana-labs/solana-program-library/tree/master/token-swap)
- 
