## About this repo

This is a repository storing a next.js / react frontend application to present data from the Waterproofing Data project in an interactive dashboard.
Visit [the app yourself here](https://waterproofing-data.ubdc.ac.uk/)

### Repository workflow good practices ###

The repository workflow for the project have two main branches:

* main (where the stable/production versions are stored)
* development (where the working versions are stored)

## Getting the project

Clone the repository locally:

```sh
git clone -b development https://github.com/urbanbigdatacentre/wpd-dashboard.git
```

## Development setup

To run the development server:

```bash
next
# or
npm run dev
```

To stop the development server:

```bash
CTRL + C
```

## Production setup

### New Deployment

- Login
  `ssh <azure_user> -i <key_file.cer>`

- Navigate to wpd-dashboard root folder
```
cd  wpd-dashboard
```

- Redeploy the app

```
git pull
npm install
npm run build
pm2 restart wpd-dashboard
```

### Starting the server as a service

Using [pm2 for running next.js app](https://dev.to/reactstockholm/setup-a-next-js-project-with-pm2-nginx-and-yarn-on-ubuntu-18-04-22c9) So that app server restarts when shutdown unexpectedly

**Required only first time**:

```
cd  wpd-dashboard
pm2 start npm --name "wpd-dashboard" -- start
pm2 save
```

Use this command to know the status, pid, etc

```
pm2 status
```

To stop app in pm2

```
pm2 stop <name>
```

To see logs

```
pm2 log
```

To see monitoring tool with other server details

```
pm2 monit
```


## Further help
For any bugs, queries or feature improvements contact <andrew.c.clarke@gla.ac.uk>.
