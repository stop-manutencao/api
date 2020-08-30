#!/usr/bin/env bash

set -x
dir=/opt/docker/stop

# build web
cd $dir/front
pwd
nvm use 8.9.3
rm -rf /opt/docker/stop/api/front/dist


npm install
npm run build
ls $dir/front/dist/
ls $dir/api/front/
mv -f /opt/docker/stop/front/dist /opt/docker/stop/api/front

cd $dir/api
ls -la $dir/api/front/




