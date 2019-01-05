Second version of The Hunt.

# Local Setup
TODO: fill out

# Prod Setup (one time)
__This assumes a clean Ubuntu box__
1. Install system packages: `python2.7`, `pip`, `virtualenv`, `npm`. `git` should already be installed.
```
sudo apt update
sudo apt upgrade
sudo apt install python-pip # installs python2.7
pip install --user virtualenv
pip install --user virtualenvwrapper
sudo apt install npm
```
2. Set up the virtualenv
```
echo "export PATH=$PATH:~/.local/bin" >> ~/.bashrc
echo "export VIRTUALENVWRAPPER_PYTHON=/usr/bin/python2" >> ~/.bashrc
echo "export WORKON_HOME=~/.virtualenvs" >> ~/.bashrc
echo "source ~/.local/bin/virtualenvwrapper.sh" >> ~/.bashrc
source ~/.bashrc
mkvirtualenv -p /usr/bin/python2 thehuntgame
workon thehuntgame
```
3. Clone the repo
```
cd ~
git clone https://github.com/iamsammak/thehuntgame.git
```

# Deployment
Once master is ready to be deployed, ssh into the machine and run `bash scripts/deploy.sh`.
