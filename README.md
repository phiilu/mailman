# Mailman

Mailman (eng. Postbote) ist eine webbasierte administrative Oberfläche für den Mailserver. Der Name kann für Mail Manager oder eben Postbote stehen :)

![Mailman Screenshot](screenshots/mailman.png)

# Voraussetzungen

Mailman wurde speziell für die Administrierung des Mailservers aus dem Tutorial von Thomas Leister entwickelt:

[Mailserver mit Dovecot, Postfix und MySQL unter Ubuntu 16.04 LTS](https://thomas-leister.de/sicherer-mailserver-dovecot-postfix-virtuellen-benutzern-mysql-ubuntu-server-xenial/)

Bevor Mailman installiert werden kann muss der Mailserver bereits funktionieren und es muss mindestens eine *Domain* und ein *Account* in der Datenbank sein.

# Installation

Danke an [GoRails.com](https://gorails.com/deploy/ubuntu/16.04) für das tolle Tutorial!

## Benutzer erzeugen & SSH Key hinzufügen

Zunächst wird ein `deploy` Benutzer hinzugefügt, der Mailman letztendlich ausführt.

```
sudo adduser deploy
sudo adduser deploy sudo
su deploy
```

Diesem Nutzer wird ein SSH Key hinzugefügt um das deployn zu automatisieren (es muss nicht jedesmal das Password des Benutzers eingegeben werden).

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

Damit NGINX die Anfragen an Ruby weiterleitet muss Passenger installiert werden. Phusion hat eine Version von NGINX die Passenger enthält in einem eigenen Paket veröffentlich.

Wenn ihr NGINX bereits installiert könnt ihr Passenger auch nach installierten.

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

Nun öffnet ihr `/etc/nginx/passenger.conf` und setzt das Verzeichnis wo sich die Ruby Installation befindert.

Die Datei sieht danach folgendermaßen aus:

```
passenger_root /usr/lib/ruby/vendor_ruby/phusion_passenger/locations.ini;
passenger_ruby /home/deploy/.rbenv/shims/ruby; # If you use rbenv
# passenger_ruby /usr/bin/passenger_free_ruby;
```

### NGINX Host mit Subdomain

Da ihr eine eigene Domain besitzt ist es am besten, wenn ihr euch bei eurem Domain Hoster eine eigene Subdomain für Mailman erzeugt.

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

Ersetzt example.com mit euer eigenen Domain und linkt die neue host Datei.

```
sudo ln -s /etc/nginx/sites-available/mailman.conf /etc/nginx/sites-enabled/mailman.conf
```

### NGINX neustarten

Zu guter Letzt muss NGINX muss neugestartet werden.

```
sudo service nginx restart
```

## MySQL Datenbanktreiber installieren

Ihr solltet bereits MySQL auf eurem Mailserver intalliert haben.
Damit sich Ruby mit der Datenbank verbinden kann muss noch folgendes Paket installiert werden.

```
sudo apt-get install libmysqlclient-dev
```

## Mailman auf den Server deployn

Nun klont ihr euch das Repository von GitHub auf euren **lokalen Rechner** (am besten einer mit einem Unix basierten OS).

```
git clone https://github.com/flowryaan/mailman.git
```

Als nächstes wechselt ihr in das Verzeichnis und installiert alle Abhängigkeiten von Mailman.

```
cd mailman
bundle install
```

Nun da die Abhängigkeiten vorhanden sind kann mit Capistrano alles vorbereitet werden.

```
cap install STAGES=production
```

Capistrano erzeugt die Datei `config/deploy/production.rb`.

Löscht den Inhalt der Datei und fügt folgendes ein:

```ruby
server 'SERVER_IP_ADRESSE', user: 'deploy', roles: %w{app db web}
```

Ersetzt SERVER_IP_ADRESSE mit der IP des Servers.

Jetzt kommt der Moment auf den alle gewartet haben: Die Applikation wird auf den Server kopiert.

Deployd Mailman mit folgenden Befehl:

```
cap production deploy
```

Jedoch beim ersten Mal wird Capistrano euch einen Fehler anzeigen:

```
linked file /home/deploy/mailman/shared/config/database.yml does not exist on 192.168.1.114
```

Die Datei existiert auf dem Server noch nicht und muss von Hand erzeugt werden.
Nehmt euren lieblings Editor (nano, vim, emacs, ....) und erzeugt sie.

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


## Letzte Konfigurations- Schritte

Nachdem Mailman deployed wurde muss in der `/etc/profile` das Secret und die Admin Email eingetragen werden.

Das Secret kann mit folgenden Kommando im Verzeichnis `/home/deploy/mailman/current/` generiert werden:

```
RAILS_ENV=production bundle exec rake secret
```

```
# /etc/profile

export SECRET_KEY_BASE=01234556789...
export MAILMAN_ADMIN_EMAIL="admin@example.com"
```

Danach kann der Rails- Applikation mitgeteilt werden das Sie sich neustarten soll:

```
touch /home/deploy/mailman/current/tmp/restart.txt
```

Mailman ist nun unter `mailman.example.com` erreichbar.
