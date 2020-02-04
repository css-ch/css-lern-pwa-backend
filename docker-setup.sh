#!/usr/bin/env bash
docker run --name pwabayy -e POSTGRES_PASSWORD=root -e POSTGRES_DB=pwa_bay_postgres -e POSTGRES_USER=root -d -p 5432:5432 postgres:11.5
