#!/usr/bin/env bash

REMOTE_USER='ubuntu'
REMOTE_HOST='52.28.9.188'
REMOTE_ROOT_FOLDER='/srv/palamar-group'
REMOTE_DIST_FOLDER='/srv/palamar-group/dist'
PACKAGE_JSON='./server/package.json'
LOCAL_DIST_FOLDER='./server/dist/*'
SSH_PORT=22
SSH_KEY=''
REMOTE_COMMAND="
    source ~/.nvm/nvm.sh \
    && cd ${REMOTE_ROOT_FOLDER} \
    && npm install --production --ignore-scripts \
    && pm2 restart 'palamar-group-server' \
    && sleep 5s \
    && pm2 status"

while test $# -gt 0; do
    case "$1" in
        -i)
            shift
            SSH_KEY="-i $1"
            ;;
        *)
            break
            ;;
    esac
    shift
done

# copy files to servers
echo -e "\nCopy files (scp)..."
scp -r -P ${SSH_PORT} ${SSH_KEY} ${LOCAL_DIST_FOLDER} ${REMOTE_USER}@${REMOTE_HOST}:${REMOTE_DIST_FOLDER}
scp -P ${SSH_PORT} ${SSH_KEY} ${PACKAGE_JSON} ${REMOTE_USER}@${REMOTE_HOST}:${REMOTE_ROOT_FOLDER}/package.json

# execute remote command
echo -e "\nExecute remote command..."
#ssh ${SSH_KEY} ${REMOTE_USER}@${REMOTE_HOST} -p${SSH_PORT} -t "${REMOTE_COMMAND}"
echo -e "\nDone"
