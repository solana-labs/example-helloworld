
### Building

This project cannot be built directly via cargo and instead requires the build scripts located in Solana's BPF-SDK.

To build via NPM, from the repo's root directory:

`$ npm run build:program`

You can also build the project directly via:

`$ ./do.sh build`

### Testing

Unit tests contained within this project can be built via:

`$ ./do.sh test`

You can feed additional parameters to the test just like cargo:

`$ ./do.sh test -- --nocapture`

### Clippy

Clippy is also supported via:

`$ ./do.sh clippy`
