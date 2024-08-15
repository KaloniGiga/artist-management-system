## Artist Management System

This project is an artist management system built using a monorepo with pnpm workspaces. It includes a backend API developed with NestJS and a frontend application built with Next.js

## Table of Content

- Project Overview
- Getting Started
- Development
- Building and Running
- Project Structure

### Project Overview

The Artist Management System allows users to manage artist profiles, artworks, and exhibitions. The backend is built with NestJS, providing a robust API, while the frontend uses Next.js to deliver a modern, responsive user interface.

### Getting Started

#### Prerequisties

- Nodejs (18 or higher)
- pnpm (v9 or higher)
- Docker and Docker compose (Optional)

#### Installation

1. Clone the repository

```bash
git clone https://github.com/KaloniGiga/artist-management-system.git
cd artist-management-system
```

2. Install the dependency

```bash
pnpm install

npm install -g pnpm # if pnpm is not present
```

3. Add the environment variables
   Copy the .env.sample file and create two more file .env
4. Starting the Development Environment

- Edit .env variables inside apps/api and apps/web

Copy the .env.sample file and create two more file .env.development and .env.production in apps/api folder

Similarly, Copy the .env.sample file and create two more file .env.local and .env.production in apps/web folder

- Start the backend

```bash
pnpm dev:api
```

- Start the frontend

```bash
pnpm dev:web
```

- Start both in parallel

```bash
pnpm dev
```

### Using Docker

You can also user docker to start the application the application in dev mode

```bash
docker compose up
```
