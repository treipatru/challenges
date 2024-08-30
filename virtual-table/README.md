# Virtual Table Challenge

## Requirements

### Main Requirements
1. Create a generic, reusable React component for a data grid
2. Handle large datasets (millions of rows)
3. Implement column sorting functionality
4. Provide a simple backend API for data

### Optional Features
- Resizable/draggable columns
- Cell content editing
- Row deletion capability

## Solution

⚠️ This application requires Node and NPM locally installed.

Installation

```bash
# Dependencies
npm install ci
# Generate Prisma client
npx prisma generate
```

### DB
A (sqlite) database with realistic mock data is provided. Unfortunately, the 1M lines create a file larger than what GitHub allows.

It is advisable to just unzip the database file to the `./prisma` folder:

```bash
unzip prisma/db.zip -d prisma
```

Alternatively, initialize a new database and seed the data. This will take very long.
```bash
# Create a fresh DB and apply migrations
npx prisma migrate deploy
# Create seed data
npx tsx prisma/seed.ts
```

### In production mode

Build first, then start the server:
```bash
npm run build
npm run start-prod
```

### In development mode

Launch dev server directly:
```bash
npm run start-dev
```
