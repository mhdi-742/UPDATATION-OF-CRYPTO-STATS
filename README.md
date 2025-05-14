# Project README

## Task 1: API Server and Data Storage

### A. API Server Creation

- A server named "api server" was created using Express.js.
- The server listens on port 8000.

### B. Data Fetching and Storage

- A function was created to fetch cryptocurrency data (current price, market cap, and 24-hour change percentage).
- The fetched data is stored in a MongoDB collection.
- **Schema:**
  - The schema is designed to store statistics for three different coins.
  - For each coin, the schema includes an object, and each object has an array of its features (price, market cap, 24-hour change).
  - To optimize space, only the latest 100 data points for each feature are stored. Older data points are removed. This ensures that the database doesn't grow indefinitely.

## Task 2: Fetch Latest Stats

- An API endpoint is provided to fetch the latest statistics for a given coin.
- The latest data for each coin is stored as the last entry in the array for each feature within the MongoDB document.
- The API retrieves and displays this last entry.

## Task 3: Standard Deviation API

- An API endpoint calculates and returns the standard deviation of the last 100 data points for a specified coin.
- The standard deviation is calculated using the standard deviation formula.

## Task 4: Worker Server

- A worker server was created.
- This worker server publishes messages every 15 minutes.
- Communication between the worker server and other components is handled using NATS.

## Run Instructions

### API Server

1.  Install dependencies: `npm install`
2.  Start the server: `node index.js`
3.  API Endpoints:
    - `localhost:8000/stats`: For fetching the latest coin statistics.
    - `localhost:8000/deviation`: For fetching the standard deviation of coin data.

### Worker Server

1.  Install dependencies: `npm install`
2.  Start the server: `node index.js`

### Start NATS Server (Docker)

```bash
docker run -d --name nats-server -p 4222:4222 nats

## P.S.

> COULD HAVE DONE MORE BUT TOMORROW I HAVE EXAM.
```
