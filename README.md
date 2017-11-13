# Mailman

Mailman is a SPA written in React to help you to manage your email server database.

![Mailman Screenshot](screenshots/mailman.png)

## Prerequisites

You must have a functional mailserver with the database model provided by [Thomas Leister](https://github.com/ThomasLeister) in his awesome mailserver tutorial: 
[Mailserver mit Dovecot, Postfix, MySQL und Rspamd unter Debian 9 Stretch](https://thomas-leister.de/mailserver-debian-stretch/)

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

Mailman is now running on port `4000`. If you wish to use another port set an environment variable in the .env file: `PORT=50000`

## License 

This project is licensed under the MIT License

## Acknowledgments

* Thank you [Thomas Leister](https://github.com/ThomasLeister) for your excellent mailserver installation instructions
