# Earthquake API Backend Using DynamoDB

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Required Tools](#required-tools)

## Prerequisites

Before you can set up and run this Earthquake API backend, make sure you have the following prerequisites in place:

- [pnpm](https://pnpm.io/) version 8.2.0 or higher.
- Node.js version 18 or higher.
- Docker (for running DynamoDB and Redis).

## Installation

To install the required dependencies for this project, use the following steps:

1. Clone this repository to your local machine.

```bash
git clone <repository_url>
cd <repository_directory>
```

2. Install project dependencies using `pnpm`.

```bash
pnpm install
```

## Configuration

Before running the Earthquake API, you need to configure your environment settings. Create a `.env` file in the root directory of the project and provide the necessary configuration parameters. Here's an example of a `.env` file:

```dotenv
ENDPOINT=http://localhost:8000
REGION=us-west-2
ACCESS_KEY=local
SECRET_KEY=local
REDIS_HOST=localhost
REDIS_PORT=6379
```

## Usage

To run the Earthquake API backend, follow these steps:

1. Start the DynamoDB and Redis docker container.

```bash
docker compose up
```

2. Start the Earthquake API.

```bash
pnpm watch
```

The API will be accessible at `http://localhost:3000`.

To interact with the Earthquake API, you can use the following endpoints and query parameters:

- **Fetch Earthquake Data**:

  - Endpoint: `GET http://localhost:3000/earthquake/fetch`
  - Fetches and saves earthquake data in Dynamo DB docker container

  ```bash
  curl -X GET "http://localhost:3000/earthquake/fetch"
  ```

- **Find Earthquake Data**:

  - Endpoint: `GET http://localhost:3000/earthquake/find`
  - Valid Query Parameters:
    - `timeOperator`: Used to specify a time comparison operator (e.g., `>`, `<`, `=`).
    - `timeValue`: Represents the value for the time comparison (e.g., a numeric timestamp).
    - `magnitudeOperator`: Specifies a magnitude comparison operator (e.g., `>`, `<`, `=`).
    - `magnitudeValue`: Represents the value for the magnitude comparison (e.g., a numeric value).
    - `pageSize`: Defines the number of items per page for pagination.
    - `cursorId`: Provides an identifier for cursor-based pagination.
    - `cursorTime`: Represents a timestamp for cursor-based pagination.

  Example Request:

  ```bash
  curl -X GET "http://localhost:3000/earthquake/find?timeOperator=%3C&timeValue=1695678405960"
  ```

- **Get Average Magnitude per Month for a Given Year**:

  - Endpoint: `GET http://localhost:3000/earthquake/average-magnitude`

  Example Request:

  ```bash
  curl -X GET "http://localhost:3000/earthquake/average-magnitude/2023"
  ```

## Test

1. `pnpm test`

## Notes

1. Backend uses redis as a cache. Queries are saved in Redis store and are deleted every 7 days. Scan is an expensive operation so using a cache will reduce cost.
2. Possible cache improvement would be storing monthly averages instead of raw data in redis when fetching monthly average data.
3. `earthquake/fetch` endpoint can be converted to a cronjob to fetch new earthquake data regularly.
4. Tests are done using test containers (https://testcontainers.com/). This would allow us to easily spin up dynamodb and redis containers for testing and discard afterwards.

## Refactoring to support > 500 RPS

1. Implement load balancing to distribute requests to muiltiple servers
2. Scale horizontally possibly wby using K8s
3. Introduce rate limiting and throttling to prevent abuse
