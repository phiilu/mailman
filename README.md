# Mailman

Mailman is a SPA written in React to help you to manage your email server database.

![Mailman Screenshot](screenshots/mailman.png)

## Prerequisites

You must have a functional mailserver with the database model provided by [Thomas Leister](https://github.com/ThomasLeister) in his awesome mailserver tutorial:
[Mailserver mit Dovecot, Postfix, MySQL und Rspamd unter Debian 9 Stretch](https://thomas-leister.de/mailserver-debian-stretch/)

Update the permissions of the vmail database user to allow insert, update and delete queries:

```sql
grant select, insert, update, delete on vmail.* to 'vmail'@'localhost' identified by 'vmaildbpass';
```

**Or** create a new user:

```sql
grant select, insert, update, delete on vmail.* to 'vmail_mailman'@'localhost' identified by 'vmaildbpass';
```

## Docker

If you have `docker` installed on your server you can run Mailman in a docker container otherwise go to the [Deployment](#deployment) section to see how to deploy it manually.

Download the `sample.env` file

```bash
wget https://github.com/phiilu/mailman/raw/master/sample.env -O .env
```

Update the variables in `.env` and then start mailman:

```bash
docker run -d -p 4000:4000 --net="host" --env-file .env --name mailman phiilu/mailman
```

Explanation:

* `-d` runs the container as a daemon process a.k.a. in the background
* `-p <HOST_PORT>:4000` exposes the port container 4000 to the specified `HOST_PORT`
* `--net="host"` instructs docker to share the network with the host. This is required to access the vmail database
* `--env-file .env` sets the environment variables in the container
* `--name mailman` sets the name for the docker container to mailman

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

### Build the app

```bash
cd mailman && npm install && cd client && npm install && cd - && npm run build
```

### Create a .env file

```bash
cp sample.env .env
```

Open .env with a text editor and adapt the environment variables with your configuration. 

To generate a random hash you can use command in your terminal:

```bash
head /dev/urandom | tr -dc A-Za-z0-9 | head -c 128 ; echo ''
```

### Start Mailman

```bash
npm start
```

Mailman is now running on port `4000`. If you wish to use another port set an environment variable in the .env file: `MAILMAN_PORT=50000`

## License 

This project is licensed under the MIT License

## Acknowledgments

* Thank you [Thomas Leister](https://github.com/ThomasLeister) for your excellent mailserver installation instructions
