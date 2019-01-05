#!/bin/bash

PROJECT_DIR=/home/huntmaster/thehuntgame
VENV=/home/huntmaster/.virtualenvs/thehuntgame
DEPLOY_LOG=/home/huntmaster/deploy_log
SERVER_LOG=/home/huntmatser/server_log

set -e
trap 'echo "Error at step $STEP, see $DEPLOY_LOG for details."' ERR

STEP="CHANGE_DIR"; echo "Changing to project dir..."
cd $PROJECT_DIR >> $DEPLOY_LOG 2>&1
STEP="GIT_PULL"; echo "Running git pull..."
git pull origin master >> $DEPLOY_LOG 2>&1

STEP="NPM_INSTALL"; echo "Setting up javascript dependencies..."
# progress bar doesn't show up in the redirected output
npm install
STEP="BUILD"; echo "Building javascript bundle..."
npm run build:prod >> $DEPLOY_LOG 2>&1

STEP="VENV"; echo "Activating virtualenv..."
.  $VENV/bin/activate >> $DEPLOY_LOG 2>&1
STEP="PIP_INSTALL"; echo "Setting up python dependencies..."
pip install -r server/requirements.txt >> $DEPLOY_LOG 2>&1 
STEP="SERVER_START"; echo "Starting server..."
# TODO: kill existing instance
python server/server.py >> $SERVER_LOG 2>&1 &

echo "Done!"
