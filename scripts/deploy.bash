#!/bin/bash

PROJECT_DIR=/home/huntmaster/thehuntgame
VENV=/home/huntmaster/.virtualenvs/thehuntgame
DEPLOY_LOG=/home/huntmaster/deploy_log
SERVER_LOG=/home/huntmaster/server_log
SERVER_PIDFILE=/home/huntmaster/server.pid

set -e
trap 'echo "Error at step $STEP, see $DEPLOY_LOG for details."' ERR

STEP="CHANGE_DIR"; echo "Changing to project dir..."
cd $PROJECT_DIR >> $DEPLOY_LOG 2>&1
STEP="GIT_PULL"; echo "Running git pull..."
git pull origin master >> $DEPLOY_LOG 2>&1

STEP="NGINX"; echo "Updating nginx config..."
sudo cp server/nginx_config /etc/nginx/sites-available/thehuntgame
sudo ln -s /etc/nginx/sites-available/thehuntgame /etc/nginx/sites-enabled/thehuntgame
sudo systemctl restart nginx

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
if [ -f $SERVER_PIDFILE ]; then
  echo "Killing existing server"
  # TODO: check that this is a python server to make sure another process hasn't claimed this PID
  kill -2 `cat $SERVER_PIDFILE`
fi
echo "Starting server at `date -u`" >> $SERVER_LOG
python server/server.py >> $SERVER_LOG 2>&1 &
SERVER_PID=$!
echo $SERVER_PID > $SERVER_PIDFILE
echo "Server started in process $SERVER_PID"

echo "Done!"
