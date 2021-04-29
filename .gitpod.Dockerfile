FROM gitpod/workspace-full

RUN sh -c "$(curl -sSfL https://release.solana.com/v1.6.6/install)"
RUN export PATH=~/.local/share/solana/install/active_release/bin:$PATH
