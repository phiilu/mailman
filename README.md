# Mailman

Mailman is a SPA written in React to help you to manage your email server
database.

![Mailman Screenshot](screenshots/mailman.png)

## Table of contents

* [Prerequisites](#prerequisites)
* [Docker](#docker)
* [Deployment](#deployment)
  * [Reverse Proxy](#reverse-proxy)
* [Update Mailman](#update-mailman)
* [Catch All email addresses](#catch-all-email-addresses)
* [License](#license)
* [Acknowledgments](#acknowledgments)

## Features

* [x] create, update and delete domains, accounts, aliases and TLS policies
* [x] accounts can create aliases and change their passwords
* [x] responsive web interface
* [ ] admins per domain
* [ ] UI customization

## Prerequisites

You must have a functional mailserver with the database model provided by
[Thomas Leister](https://github.com/ThomasLeister) in his awesome mailserver
tutorial:
[Mailserver mit Dovecot, Postfix, MySQL und Rspamd unter Debian 9 Stretch](https://thomas-leister.de/mailserver-debian-stretch/)

Update the permissions of the vmail database user to allow insert, update and
delete queries:

```sql
grant select, insert, update, delete on vmail.* to 'vmail'@'localhost' identified by 'vmaildbpass';
```

**Or** create a new user:

```sql
grant select, insert, update, delete on vmail.* to 'vmail_mailman'@'localhost' identified by 'vmaildbpass';
```

## Docker

If you have `docker` installed on your server you can run Mailman in a docker
container otherwise go to the [Deployment](#deployment) section to see how to
deploy it manually.

Download the `sample.env` file

```bash
wget https://github.com/phiilu/mailman/raw/master/sample.env -O .env
```

Update the variables in `.env` and then start mailman:

```bash
docker run -d --net="host" --env-file .env --restart=always --name mailman phiilu/mailman
```

Explanation:

* `-d` runs the container as a daemon process a.k.a. in the background
* `--net="host"` instructs docker to share the network with the host. This is
  required to access the vmail database
* `--env-file .env` sets the environment variables in the container
* `--name mailman` sets the name for the docker container to mailman

---

**Docker with Subfolder configuration:**

If you want to access mailman via a subfolder `/mailman` instead of the http
root `/`, you have to modify the following:

Download the `sample.subfolder.env` file

```bash
wget https://github.com/phiilu/mailman/raw/master/sample.subfolder.env -O .env
```

Update the variables in `.env` and then start mailman with the :subfolder tag:

```bash
docker run -d --net="host" --env-file .env --restart=always --name mailman phiilu/mailman:subfolder
```

**Note:** This Docker Image is for the path `/mailman` only! It can not be changed.

---

## Deployment

### Install required build tools

```bash
sudo apt install build-essential python
```

### Install Node.js with [nvm](https://github.com/creationix/nvm)

```bash
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.6/install.sh | bash
```

After nvm is installed you most logout and login again.

Install node with nvm

```bash
nvm install 9.1.0
```

### Verify if Node.js is installed

```bash
$ node -v
v9.1.0

$ npm -v
5.5.1
```

### Install PM2 a Node.js process manager

```bash
npm i -g pm2
```

### Clone Mailman from GitHub

It is easiest if you clone Mailman into a non-root user's home directory.

```bash
git clone https://github.com/phiilu/mailman.git
```

### Create a .env file

```bash
cp sample.env .env
```

Open .env with a text editor and adapt the environment variables with your
configuration:

* `MAILMAN_SECRET` a long unique random string to sign the JWT token
* `MAILMAN_DB_ENGINE` the engine used by mailman. defaults to maria if no value given.
* `MAILMAN_DB_USER` the `vmail` database user
* `MAILMAN_DB_PASSWORD` the password for the `vmail` database user
* `MAILMAN_DB_DATABASE` the `vmail` database
* `MAILMAN_HOST` the IP address which mailman binds to. Default is `0.0.0.0`
* `MAILMAN_PORT` the TCP port mailman binds to. Default is `4000`
* `MAILMAN_BASENAME` the HTTP base. Default is `/`
* `MAILMAN_ADMIN` the email address of the user, which is allowed to
  administrate the `vmail` database

---

**Subfolder configuration:**

If you want to access mailman via a subfolder `/mailman` instead of the http
root `/`, you have to modify the following:

_These steps need to be done BEFORE you build Mailman!_

1. open `mailman/client/package.json` and change `"homepage": "http://localhost:4000/"` to `"homepage": "http://localhost:4000/mailman"`
2. open `mailman/client/.env.production` and change `REACT_APP_BASENAME=/` to `REACT_APP_BASENAME=/mailman`
3. open `mailman/.env` and change `MAILMAN_BASENAME=/` to `MAILMAN_BASENAME=/mailman`
4. build Mailman `npm install && cd client && npm install && cd - && npm run build`
5. kill `pm2` if it is already running with `pm2 kill`
6. start Mailman again: `npm start`

---

To generate a random hash you can use command in your terminal:

```bash
head /dev/urandom | tr -dc A-Za-z0-9 | head -c 128 ; echo ''
```

### Build the app

```bash
cd mailman && npm install && cd client && npm install && cd - && npm run build
```

### Start Mailman

```bash
npm start
```

Mailman should now be running on port `4000` of the server.

## Update Mailman

### Manual deployment

Run the following command inside the mailman directory

```bash
git stash && git pull && npm install && cd client && npm install && cd - && npm run build && pm2 restart all
```

### Docker

```bash
docker pull phiilu/mailman:latest
```

After pulling the new image just start a new container.

### Reverse Proxy

#### NGINX

```nginx
server {
    listen 80;
    server_name mailman.example.org;

    ##
    ## Uncomment one of the two possibilities
    ##

    # Subdomain
    #location / {
    #  proxy_pass       http://localhost:4000;
    #  proxy_set_header Host      $host;
    #  proxy_set_header X-Real-IP $remote_addr;
    #}

    # Subfolder
    #location /mailman {
    #  proxy_pass       http://localhost:4000;
    #  proxy_set_header Host      $host;
    #  proxy_set_header X-Real-IP $remote_addr;
    #}
}
```

### Catch All email addresses

If you want to use Catch All email addresses please refer to Thomas's Guide:

[Wie kann ich mit diesem Setup Catch-All Adressen realisieren? (German)](https://thomas-leister.de/mailserver-debian-stretch/#wie-kann-ich-mit-diesem-setup-catch-all-adressen-realisieren)

## License

This project is licensed under the MIT License

## Acknowledgments

* Thank you [Thomas Leister](https://github.com/ThomasLeister) for your
  excellent mailserver installation instructions
