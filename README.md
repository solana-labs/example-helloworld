Forked from https://github.com/solana-labs/example-helloworld.git


#steps to run example helloworld project

#Commands to run in bash on ubuntu to install all relevant packages

echo "start installation"

sudo apt -y update -q

sudo apt -y upgrade -q

curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh

source $HOME/.cargo/env

rustup update

echo "rust installed"

sh -c "$(curl -sSfL https://release.solana.com/v1.10.25/install)"

export PATH="/home/yuong/.local/share/solana/install/active_release/bin:$PATH"

echo "solana installed"

sudo apt install pkg-config libssl-dev -y

echo "libssl-dev installed"

sudo apt-get update && sudo apt-get upgrade && sudo apt-get install -y pkg-config build-essential libudev-dev

cargo install --git https://github.com/project-serum/anchor avm --locked --force

avm install latest

avm use latest

echo "anchor installed"

curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -

sudo apt-get install -y nodejs

sudo apt-get install -y build-essential




#After packages are installed run the below

Create a new directory

cd into the new directory

git clone git clone https://github.com/yuong1979/example-helloworld

Open up another terminal and cd into the new directory created

Run the solana validator - solana-test-validator

Go back to the terminal where you just cloned the example-helloworld-project

cd into the directory - xxx/example-helloworld

Generate a new wallet named demo.json - solana-keygen new -o demo.json

Get the wallet address - solana address

Get airdrop - solana airdrop 1 "walletaddress"

run the command - npm run build:program-rust

The above command should suggest something like this - solana program deploy /xxx/example-helloworld/dist/program/helloworld.so

Ensure that everything is updated - npm update --all

Run the below to see the increments - npm run start
