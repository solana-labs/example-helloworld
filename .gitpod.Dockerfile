FROM gitpod/workspace-full

RUN sh -c "$(curl -sSfL https://release.solana.com/v1.7.8/install)"
RUN export PATH=~/.local/share/solana/install/active_release/bin:$PATH
