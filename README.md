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

Auf dem *lokalen Rechner* generier ihr euch einen neuen SSH Key (falls ihr bereits einen SSH Key habt könnt ihr diesen Schritt überspringen).

```
ssh-keygen -b 2048
```

Mithilfe von `ssh-copy-id deploy@SERVER_IP_ADRESSE` könnt ihr den Key auf den Server kopieren.

Mit `ssh deploy@SERVER_IP_ADRESSE` könnt ihr euch jetzt ohne Passwort am Server anmelden.

## Ruby am Server installieren

Zuerst werden Abhängigkeiten für Ruby installiert.

```
sudo apt-get update
sudo apt-get install git-core curl zlib1g-dev build-essential libssl-dev libreadline-dev libyaml-dev libsqlite3-dev sqlite3 libxml2-dev libxslt1-dev libcurl4-openssl-dev python-software-properties libffi-dev nodejs
```

Die einfachste Methode Ruby zu installiren ist mit `rbenv`.

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

Ruby sollte nun installiert sein.

Als nächstes wird noch `bundler` installiert.

```
gem install bundler
```

Nun da Ruby installiert ist kann der Webserver eingerichtet werden.

## NGINX mit Phusion Passenger als Webserver einrichten



# Konfiguration

Nachdem Mailman deployed wurde muss in der `/etc/profile` das Secret und die Admin Email eingetragen werden.

Das Secret kann mit folgenden Kommando im Verzeichnis `/home/deploy/mailman/current/` generiert werden:

```
$ RAILS_ENV=production bundle exec rake secret
```

```
# /etc/profile

export SECRET_KEY_BASE=01234556789...
export MAILMAN_ADMIN_EMAIL="admin@example.com"
```
