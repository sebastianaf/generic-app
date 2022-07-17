# generic-app

Quickstart microservice's app with Docker, Node and React

## Requirements

This code is a quickstart project based on `generic-ui` and `generic-api` built using NodeJS, ExpressJS, React and other packages (please see the `package.json` files for more info).

To run this project make sure to install [Docker](https://docs.docker.com/).

Now let's follow the next steps.

### 1.Create environment variables

Create a `.env` from `.env.example` file in the root folder with all environment variables, this variables will be used by the containers, it need to be reached by `docker-compose.yml` file.

### 2.Change `org` and `project` names

It's recommend to change all the names in files and lines (in `docker-compose.yml` and `Dockerfile`'s files) named with `org` and `project` with your own organization name and project name.

### 3.Setting up a reverse proxy (Optional)

The `docker-compose.yml` file will deploy two services and a docker network to work with a cloud serving environment and a reverse proxy setup. If you don`t have a static public IP we highly recommend to use this API service behind a reverse proxy e.g. [nginx-proxy-manager](https://nginxproxymanager.com/) with [DuckDNS](https://www.duckdns.org) or equivalent and to configure your port Forwarding ISP modem, do not forget try to configure a firewall, (e.g. [OPNSense](https://opnsense.org/))

Make sure to include the reverse proxy container into the project network using the following setup in the reverse proxy `docker-compose.yml` file

```
version: "3.8"
    services:
    .
    .
    .

networks:
  org-proxy:
    name: org-proxy
  org-project:
    external: true
```

### Deploy

At the end just type

```
docker compose -p org-project -up -d --build
```

This commands will wake up the services access it thought port specified in `$UI_PORT`,`$API_PORT` environment variables.
All the services will expose the ports `9010`, `9020`, `9030`, and `9040` for `api-01`, `db-01`, `ui-01` and `pgadmin` respectively.

## Folder contents

```
See the repo content.
```

Use this code if you need it, don´t forget to share, have a nice day.
