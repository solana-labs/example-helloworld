# Installation Notes
if you are a first-time user of Rust, the notes below may help you to install
some of the dependencies on a Mac or Linux workstation.
#  Installation WSL (Windows Subsystem For Linux) 
setup  https://www.windowscentral.com/install-windows-subsystem-linux-windows-10


```bash
apt upgrade
apt update
apt install nodejs
apt install npm
apt install python3-pip
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
sh -c "$(curl -sSfL https://release.solana.com/v1.6.2/install)"
source $HOME/.cargo/env
export PATH="/root/.local/share/solana/install/active_release/bin:$PATH"
export RUST_LOG=solana_runtime::system_instruction_processor=trace,solana_runtime::message_processor=debug,solana_bpf_loader=debug,solana_rbpf=debug
solana-test-validator --log
```


### Rust
We suggest that you install Rust using the 'rustup' tool. Rustup will install
the latest version of Rust, Cargo, and the other binaries used in Solana.

Follow the instructions at [Installing
Rust](https://www.rust-lang.org/tools/install).

For Mac users, Homebrew is also an option.  The Mac Homebrew command is `brew
install rustup` and then `rustup-init`. See [Mac
Setup](https://sourabhbajaj.com/mac-setup/Rust/) & [Installing
Rust](https://www.rust-lang.org/tools/install) for more details.

After installation, you should have `rustc`, `cargo`, & `rustup`. You should
also have `~/.cargo/bin` in your PATH environment variable.

### NodeJS/NPM
Fetch the `npm` dependencies, including `@solana/web3.js`, by running:
```bash
$ npm install
```

### Git Repository
Clone the 'example-helloworld' repository into your development machine:
```bash
$ cd /path/to/your/work/folder/
$ git clone https://github.com/solana-labs/example-helloworld.git
$ cd example-helloworld
```
(If you plan to submit changes in a pull request, be sure to create a fork first
and then clone your fork.)
