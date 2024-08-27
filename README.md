<div align="center">
 
<h1 align="center">Artist Management System</h1>

![](https://img.shields.io/badge/contributors-1-white)
![](https://img.shields.io/badge/commits-93-white)
![](https://img.shields.io/badge/open%20source-true-brightgreen)

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Technologies](#technologies)
- [Quickstart](#quickstart)
- [Documentation](#documentation)

### Introduction

The Artist Management System allows users to manage artists and songs records. The backend is built with NestJS, providing a robust API, while the frontend uses Next.js to deliver a modern, responsive user interface.

### Feature

- login and registration
- Role based access contorl
  - users can have three types of role (super_admin, artist_manager, artist)
  - registered users have a default role of super_admin
  - super_admin has access to all the features.
  - artist_manager has access to Artist CRUD
  - artist has access to his own Songs CRUD
- super_admin can CRUD the user table and create other users with above roles.
- Users created by super admin can login with their email and password.
- user with role(artist_manager) can perform CRUD on Artist table and see Songs table of a artist.
- user with role(artist) can perform CRUD in his own Songs table.
- Artist table has export and import csv feature.
- All three tables have pagination.
- Logout.

### Technologies

- NestJS for robust backend.
- React (Next.js) for frontend.
- Postgres database
- Redux Toolkit and RTK query for state management and data fetching
- JWT token and passport for authentication (Only access token implemented)
- Raw SQL for database querying.
- Knex for managing seeds and migration
- Radix UI and shadcn for UI library.
- docker for containarization
- Tailwind for styling.

### Quikc Start

#### Prerequisties

- Nodejs (18 or higher)
- pnpm (v9 or higher)
- Docker and Docker compose (Optional)

####

1. Clone the repository

```bash
git clone https://github.com/KaloniGiga/artist-management-system.git
cd artist-management-system
```

2. Install the dependency

```bash

npm install -g pnpm # if pnpm is not present

pnpm install

```

3. Starting the Production environment:

   For frontend:
   Create a .env.production inside apps/web
   Copy the .env.sample from apps/web into .env.production
   Tweak the parameters as per requirement.

   ``bash
   #build the project
   pnpm --filter web build

   #start the project
   pnpm --filter web start

   ``

   For backend:

   Create a .env.production inside apps/api
   Copy the .env.sample from apps/api into .env.production
   Tweak the parameters as per requirement.

   ``bash

   #build the project
   pnpm --filter api build

   #start the project
   pnpm --filter api start
   ``

4. Starting the Development Environment

Copy the .env.sample file and create one more file .env.development apps/api folder

Similarly, Copy the .env.sample file ans create one more file .env.local in apps/web folder

- Start the backend

```bash

pnpm -filter api dev
or
pnpm dev:api

```

- Start the frontend

```bash
pnpm --filter web dev
or
pnpm dev:web
```

- Start both in parallel

```bash
pnpm dev
```

# Database

You can use any cloud database instance like neondb. If you are using local postgres database make sure to comment out below code in apps/api/src/database/database.module.ts and apps/api/src/database/knexfile.ts

`bash
          ssl: {
            rejectUnauthorized: false,
          },
`

### Run migration to synchronize with your database

`bash
    pnpm knex migrate:latest --knexfile ./apps/api/src/database/knexfile.ts
`

## Rollback database migration

`bash
    pnpm knex migrate:latest --knexfile ./apps/api/src/database/knexfile.ts
`

### Seed your database with users

`bash
    pnpm knex seed:run --knexfile ./apps/api/src/database/knexfile.ts
`

### Using Docker (WIP)

Check the docker.env file for required env variables

Make changes in frontend and backend env variables (as necessary)

If you are using docker version less than 25, make sure the you have version

You can user docker to start the application the application in dev mode

```bash
docker compose up
```
