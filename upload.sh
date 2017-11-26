#!/bin/bash

yarn build

#optipng

find ./build -name "*.png" -exec optipng {} \;

echo
echo "uploading";

#60 days cache
aws s3 sync ./build/ s3://${AWS_CF_DOMAIN} \
    --acl public-read --metadata-directive REPLACE --cache-control public,max-age=5184000 \
    --exclude "index.html" --exclude "asset-manifest.json" --exclude "service-worker.js" --delete

#1 hour cache
aws s3 cp ./build/asset-manifest.json s3://${AWS_CF_DOMAIN}/asset-manifest.json \
    --acl public-read --metadata-directive REPLACE --cache-control public,max-age=3600

aws s3 cp ./build/index.html s3://${AWS_CF_DOMAIN}/index.html \
    --acl public-read --metadata-directive REPLACE --cache-control public,max-age=3600

aws s3 cp ./build/service-worker.js s3://${AWS_CF_DOMAIN}/service-worker.js \
    --acl public-read --metadata-directive REPLACE --cache-control public,max-age=3600

echo
echo "invalidating ${AWS_CF_DISTRIBUTION_ID}"
aws cloudfront create-invalidation --distribution-id=${AWS_CF_DISTRIBUTION_ID} \
    --paths /asset-manifest.json /index.html /service-worker.js

echo
echo "done"