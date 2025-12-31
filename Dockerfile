FROM php:8.2-apache

# Définition de l'argument (disponible uniquement pendant le build)
ARG APP_VERSION=v0.0.0

# Transformation en variable d'environnement (disponible pour PHP pendant l'exécution)
ENV APP_VERSION=${APP_VERSION}

COPY . /var/www/html/
COPY apache-config.conf /etc/apache2/sites-available/000-default.conf
RUN a2enmod rewrite
EXPOSE 80