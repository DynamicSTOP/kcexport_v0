#based on node package https://hub.docker.com/r/_/node/
FROM node:9.2.0

RUN apt-get update && apt-get install -y \
    less \
    man \
    ssh \
    optipng \
    python \
    python-dev \
    python-pip \
    python-virtualenv \
    vim

WORKDIR /root

RUN \
    mkdir aws && \
    virtualenv aws/env && \
    ./aws/env/bin/pip install awscli && \
    echo 'source $HOME/aws/env/bin/activate' >> .bashrc && \
    echo 'complete -C aws_completer aws' >> .bashrc