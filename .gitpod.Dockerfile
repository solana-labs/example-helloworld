FROM gitpod/workspace-full

RUN sh -c "$(curl -sSfL https://release.solana.com/v1.4.8/install)"
RUN export PATH=~/.local/share/solana/install/active_release/bin:$PATH
RUN npm install
RUN npm run build:program-rust
RUN npm run cluster:devnet
