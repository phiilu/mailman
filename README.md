# Mailman

Mailman is a SPA written in React to help you to manage your email server database.

![Mailman Screenshot](screenshots/mailman.png)

## Installation

### Install required build tools

```bash
sudo apt install build-essential python
```

### Install Node.js with nvm

<<<<<<< HEAD
# Installation unter Ubuntu 16.04

Die Installation ist im Grunde die selbe wie vom [Chris](https://github.com/excid3) auf [GoRails.com](https://gorails.com/deploy/ubuntu/16.04). Ich habe sie übersetzt und für Mailman adaptiert, damit die komplizierte Installation nachverfolgt werden kann.

PS: Rechtschreibfehler inklusive 👇

## Benutzer erzeugen & SSH Key hinzufügen

Zunächst wird ein `deploy` Benutzer hinzugefügt.

```
sudo adduser deploy
sudo adduser deploy sudo
su deploy
```

Diesem Nutzer wird ein SSH Key hinzugefügt um das deployn zu automatisieren (es muss nicht jedesmal das Passwort des Benutzers eingegeben werden).

Auf dem **lokalen Rechner** generiert ihr euch einen neuen SSH Key (falls ihr bereits einen SSH Key habt könnt ihr diesen Schritt überspringen).

```
ssh-keygen -b 2048
```

Nun könnt ihr den SSH Key auf den Server kopieren.

```
ssh-copy-id deploy@SERVER_IP_ADRESSE
```

Mit `ssh deploy@SERVER_IP_ADRESSE` könnt ihr euch jetzt ohne Passwort am Server anmelden.

## Ruby am Server installieren

**Info:** Die Befehle werden alle als `deploy` Benutzer ausgeführt.

Zuerst werden Abhängigkeiten für Ruby installiert.

```
sudo apt-get update
sudo apt-get install git-core curl zlib1g-dev build-essential libssl-dev libreadline-dev libyaml-dev libsqlite3-dev sqlite3 libxml2-dev libxslt1-dev libcurl4-openssl-dev python-software-properties libffi-dev nodejs
```

Die einfachste Methode Ruby zu installieren ist mit `rbenv`:

```
cd
git clone https://github.com/rbenv/rbenv.git ~/.rbenv
echo 'export PATH="$HOME/.rbenv/bin:$PATH"' >> ~/.bashrc
echo 'eval "$(rbenv init -)"' >> ~/.bashrc
exec $SHELL

git clone https://github.com/rbenv/ruby-build.git ~/.rbenv/plugins/ruby-build
echo 'export PATH="$HOME/.rbenv/plugins/ruby-build/bin:$PATH"' >> ~/.bashrc
exec $SHELL

rbenv install 2.3.3
rbenv global 2.3.3
ruby -v
```

Als nächstes wird noch `bundler` installiert.

```
gem install bundler
```

Nun da Ruby installiert ist kann der Webserver eingerichtet werden.

## NGINX mit Phusion Passenger als Webserver einrichten

Phusion hat ein eigenes APT Paket veröffentlicht indem Passenger bereits in NGINX enthalten ist. Wenn ihr NGINX bereits installiert habt, dann updated das Paket von Phusion euren NGINX automatisch.

```
sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv-keys 561F9B9CAC40B2F7
sudo apt-get install -y apt-transport-https ca-certificates

# Add Passenger APT repository
sudo sh -c 'echo deb https://oss-binaries.phusionpassenger.com/apt/passenger xenial main > /etc/apt/sources.list.d/passenger.list'
sudo apt-get update

# Install Passenger & Nginx
sudo apt-get install -y nginx-extras passenger
```

In der Datei `/etc/nginx/nginx.conf` müssen die Konfigurationsdateien für Passenger inkludiert werden. Dazu öffnet ihr die Datei und sucht folgenden Block.

```
##
# Phusion Passenger config
##
# Uncomment it if you installed passenger or passenger-enterprise
##

include /etc/nginx/passenger.conf;
```

Bei der letzten Zeile muss das `#` entfernt werden.

Nun öffnet ihr `/etc/nginx/passenger.conf` und setzt das Verzeichnis wo sich die Ruby Installation befindet.

Die Datei sieht danach folgendermaßen aus:

```
passenger_root /usr/lib/ruby/vendor_ruby/phusion_passenger/locations.ini;
passenger_ruby /home/deploy/.rbenv/shims/ruby; # If you use rbenv
# passenger_ruby /usr/bin/passenger_free_ruby;
```

### NGINX Host

Da ihr eine eigene Domain besitzt ist es am besten wenn ihr euch bei eurem Domain Hoster (oder wo auch immer ihr DNS Einträge setzen könnt) eine eigene Subdomain für Mailman erzeugt.

Die Konfiguration sieht in NGINX dann folgendermaßen aus:

```nginx
# /etc/nginx/sites-available/mailman.conf
server {
        listen 80;
        listen [::]:80 ipv6only=on;

        server_name mailman.example.com;
        passenger_enabled on;
        rails_env    production;
        root         /home/deploy/mailman/current/public;

        # redirect server error pages to the static page /50x.html
        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   html;
        }
}
```

**Info:** Die Verzeichnisstruktur `/home/deploy/mailman/current/public` wird später erzeut.

Ersetzt `example.com` mit euer eigenen Domain und linkt die neue host Datei.

```
sudo ln -s /etc/nginx/sites-available/mailman.conf /etc/nginx/sites-enabled/mailman.conf
```

Eine Konfiguration für HTTPS wird später ergänzt.

### NGINX neustarten

```
sudo service nginx restart
```

## Apache mit Phusion Passenger als Webserver einrichten
Zuerst wird Passenger aus der offiziellen, Passenger-eigenen Paketquelle installiert. Dazu muss diese Paketquelle erst ins System aufgenommen werden.
```bash
sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv-keys 561F9B9CAC40B2F7
sudo apt-get install -y apt-transport-https ca-certificates

sudo sh -c 'echo deb https://oss-binaries.phusionpassenger.com/apt/passenger xenial main > /etc/apt/sources.list.d/passenger.list'
sudo apt-get update 
```
Nun kann die Passenger Erweiterung für Apache installiert und in Apache aktiviert werden.
```bash
sudo apt-get install libapache2-mod-passenger
sudo a2enmod passenger
sudo service apache2 restart
```

### Apache vHost
Am einfachsten kann man Mailman mit Apache einbinden, indem man eine (weitere) Subdomain auf den Server zeigen lässt (dazu müssen die DNS Einträge beim Hoster gesetzt werden) und dann zu dieser Subdomain einen virtuellen Host in apache erstellt.
Ich nehme hier an, dass die gewählte Subdomain mailman.example.com ist.
Nun solltet ihr eine neue Datei mit dem Namen mailman.conf im Verzeichnis `/etc/apache2/sites-available` erstellen.
```bash
#Natürlich ist auch jeder andere Texteditor statt 'vim' hier möglich.
vim /etc/apache2/sites-available/mailman.conf
```
In die Datei wird die folgende Konfiguration eingetragen:
```apache
<VirtualHost *:80>
	#Server ist unter mailman.example.com und www.mailman.example.com erreichbar
    ServerName mailman.example.com
    ServerAlias www.mailman.example.com
	#Bei Störungen zu kontaktierender Server Admin. Kann geändert oder gelöscht werden.
    ServerAdmin webmaster@localhost
	
	#Einstellungen für Passenger
    DocumentRoot /home/deploy/mailman/current/public
    RailsEnv production
    PassengerRuby /home/deploy/.rbenv/shims/ruby
	
    ErrorLog ${APACHE_LOG_DIR}/error.log
    CustomLog ${APACHE_LOG_DIR}/access.log combined
    <Directory "/home/deploy/mailman/current/public">
        Options FollowSymLinks
        Require all granted
    </Directory>
</VirtualHost>
```
Dieser vHost hört auf die Domains mailman.example.com und www.mailman.example.com unter Port 80 und übergibt die Anfragen an Passenger.
Die Domains, der Server Admin und eventuell abweichende Pfade sollten angepasst werden.
Nun muss die Seite noch aktiviert und Apache neugestartet werden.
```bash
sudo a2ensite mailman
sudo service apache2 restart
```

## MySQL Datenbanktreiber installieren

MySQL ist bereits auf eurem Mailserver intalliert. Damit sich Ruby mit der Datenbank verbinden kann muss noch folgendes Paket installiert werden.

```
sudo apt-get install libmysqlclient-dev
```

## Mailman auf den Server deployn

Nun klont ihr euch das Repository von GitHub auf euren **lokalen Rechner** (am besten ein Unix basiertes OS).

**Info:** `ruby` und `bundler` muss auf dem Rechner ebenfalls installiert sein.

```
git clone https://github.com/flowryaan/mailman.git
```

Als nächstes wechselt ihr in das Verzeichnis und installiert alle Abhängigkeiten von Mailman.

```
cd mailman
bundle install
```

Nun da die Abhängigkeiten vorhanden sind, kann mit Capistrano alles vorbereitet werden.

```
cap install STAGES=production
```

Capistrano erzeugt die Datei `config/deploy/production.rb`. Löscht den Inhalt der Datei und fügt folgendes ein:

```ruby
server 'SERVER_IP_ADRESSE', user: 'deploy', roles: %w{app db web}
```

Ersetzt SERVER_IP_ADRESSE mit der IP des Servers.

Abschließend kann Mailman nun auf den Server deployd werden.

```
cap production deploy
```

Beim ersten Versuch wird Capistrano euch einen Fehler anzeigen:

```
linked file /home/deploy/mailman/shared/config/database.yml does not exist on SERVER_IP_ADRESSE
```

Die Datei existiert auf dem Server noch nicht und muss von Hand erzeugt werden. Nehmt euren lieblings Editor (nano, vim, emacs, ....) und erzeugt diese.

```
vim /home/deploy/mailman/shared/config/database.yml
```

Fügt folgendes in die Datei ein:

```yml
production:
  adapter: mysql2
  host: 127.0.0.1
  database: vmail
  username: vmail
  password: MYSQL_DB_VMAIL_PASSWORT
  pool: 5
```

Ersetzt MYSQL_DB_VMAIL_PASSWORT mit dem Passwort vom MySQL Benutzer vmail.

Wenn ihr die Datei erzeugt habt führt `cap production deploy` von eurem **lokalen Rechner** erneut aus. Diesmal sollte der Rollout funktionieren.


## Letzte Konfigurationsschritte

Nachdem Mailman deployed wurde, muss in der `/etc/profile` das Secret und die Admin Email eingetragen werden.
=======
```bash
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.6/install.sh | bash
```

After the installation of nvm you must logout and login again

Now you can install node

```bash
nvm install 9.1.0
```

Verify if node is available
>>>>>>> rewrite

```bash
$ node -v
v9.1.0

$ npm -v
5.5.1
```
<<<<<<< HEAD
RAILS_ENV=production bundle exec rake secret
=======

### Install PM2 a Node.js process manager

```bash
npm i -g pm2
>>>>>>> rewrite
```

### Clone Mailman from GitHub

It is easiest if you clone Mailman in a non root user home directory.

```bash
git clone https://github.com/phiilu/mailman.git
```

<<<<<<< HEAD
export SECRET_KEY_BASE=012345567894324322432423...
export MAILMAN_ADMIN_EMAIL="admin@example.com"
```

Danach kann der Rails- Applikation mitgeteilt werden, dass Sie sich neustarten soll:

```
touch /home/deploy/mailman/current/tmp/restart.txt
```

Mailman ist nun unter `mailman.example.com` erreichbar.
=======
### Build the app

```bash
cd mailman && npm install && cd client && npm install && cd - && npm run build
```

### Create a .env file

```bash
cp sample.env .env
```

Open .env with a text editor and update the environment variables with yours. 

To generate a random hash you can use command in your terminal:

```bash
head /dev/urandom | tr -dc A-Za-z0-9 | head -c 128 ; echo ''
```

### Start Mailman

```bash
npm start
```

Mailman is now running on port `4000`. If you wish to use a other port set a environment variable in .env file for example `PORT=50000`
>>>>>>> rewrite
