#!/usr/bin/env bash
docker run --name pwabay -e MYSQL_ROOT_PASSWORD=root -e MYSQL_PASSWORD=root -e MYSQL_DATABASE=pwa_bay_mysql -e MYSQL_USER=root -d -p 3307:3306 mysql:5
