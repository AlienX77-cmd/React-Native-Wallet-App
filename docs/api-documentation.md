# API Documentation

## Base URL

```
https://[your-domain]/api
```

Local Development: `http://localhost:5001/api`

## Authentication

All API endpoints except the health check endpoint require authentication. The user ID is passed as part of the URL path for user-specific endpoints.

## Endpoints

### Health Check

```
GET /health
```

Returns the API status.

**Response**

```json
{
  "status": "OK"
}
```

### Transactions

#### Get All User Transactions

```
GET /transactions/:user_id
```

Retrieves all transactions for a specific user.

**Parameters**

- `user_id` (path): The ID of the user

**Response**

```json
[
  {
    "id": 1,
    "user_id": "user_123",
    "title": "Salary",
    "amount": 5000.0,
    "category": "income",
    "created_at": "2025-08-20"
  },
  {
    "id": 2,
    "user_id": "user_123",
    "title": "Groceries",
    "amount": -150.5,
    "category": "expense",
    "created_at": "2025-08-21"
  }
]
```

#### Get User Transaction Summary

```
GET /transactions/summary/:user_id
```

Retrieves a summary of the user's financial situation.

**Parameters**

- `user_id` (path): The ID of the user

**Response**

```json
{
  "balance": 4849.5,
  "income": 5000.0,
  "expense": 150.5
}
```

#### Create Transaction

```
POST /transactions
```

Creates a new transaction.

**Request Body**

```json
{
  "user_id": "user_123",
  "title": "Dinner",
  "amount": -45.9,
  "category": "expense"
}
```

**Response**

```json
{
  "id": 3,
  "user_id": "user_123",
  "title": "Dinner",
  "amount": -45.9,
  "category": "expense",
  "created_at": "2025-08-27"
}
```

#### Delete Transaction

```
DELETE /transactions/:id
```

Deletes a transaction.

**Parameters**

- `id` (path): The ID of the transaction

**Response**

```json
{
  "message": "Transaction deleted successfully"
}
```

## Error Responses

**400 Bad Request**

```json
{
  "error": "Invalid request parameters"
}
```

**404 Not Found**

```json
{
  "error": "Transaction not found"
}
```

**429 Too Many Requests**

```json
{
  "error": "Rate limit exceeded. Try again in X seconds"
}
```

**500 Internal Server Error**

```json
{
  "error": "Internal server error"
}
```

## Rate Limiting

The API implements rate limiting using Upstash Redis. Clients are limited to 100 requests per 60-second window. When the rate limit is exceeded, the API will respond with a 429 status code.
