#!/usr/bin/env bash

cd "$(dirname "$0")"/..

aws --profile home s3 sync ./build s3://chat-saber.outerbody.com --delete --exclude '*.js'

aws --profile home s3 sync ./build s3://chat-saber.outerbody.com --delete --exclude '*' --include '*.js' --content-type 'application/javascript'

