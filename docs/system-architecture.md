# React-Native-Wallet System Architecture

## Overview

React-Native-Wallet is a full-stack mobile wallet application built using React Native and Expo for the frontend, with a Node.js/Express backend. The system provides users with the ability to track their financial transactions, view account balances, and manage personal finances.

## System Components

The application follows a client-server architecture with the following major components:

### 1. Frontend Mobile Application

- **Framework**: React Native with Expo
- **Authentication**: Clerk Authentication
- **Navigation**: Expo Router
- **State Management**: React Hooks

### 2. Backend Server

- **Framework**: Express.js
- **Database**: PostgreSQL (via Neon Serverless)
- **Rate Limiting**: Upstash Redis
- **Scheduled Tasks**: Node-cron

### 3. External Services

- **Authentication**: Clerk
- **Database**: Neon Serverless PostgreSQL
- **Rate Limiting**: Upstash Redis

## Architecture Diagram

```
┌─────────────────┐           ┌────────────────────┐          ┌─────────────────┐
│                 │           │                    │          │                 │
│  Mobile Client  │◄─────────►│  Express Backend   │◄────────►│ PostgreSQL DB   │
│  (React Native) │           │  (Node.js)         │          │ (Neon Serverless)│
│                 │           │                    │          │                 │
└─────────────────┘           └────────────────────┘          └─────────────────┘
        │                              │
        │                              │
        ▼                              ▼
┌─────────────────┐           ┌────────────────────┐
│                 │           │                    │
│  Clerk Auth     │           │  Upstash Redis     │
│                 │           │  (Rate Limiting)   │
│                 │           │                    │
└─────────────────┘           └────────────────────┘
```

## Data Flow

1. **User Authentication Flow**:

   - User enters credentials in the mobile app
   - Clerk handles authentication and returns a user token
   - Token is stored securely in the mobile app
   - Subsequent API requests include this token for authorization

2. **Transaction Management Flow**:

   - Authenticated users can create, view, and delete transactions
   - Mobile app sends requests to the backend API
   - Backend validates requests and performs database operations
   - Results are returned to the mobile app for display

3. **Summary Data Flow**:
   - App requests transaction summaries from the backend
   - Backend aggregates transaction data and calculates balances
   - Summary data is returned to the app for display in the dashboard

## Backend Components

### API Endpoints

- **Health Check**: `/api/health` - Confirms server status
- **Transactions**: `/api/transactions` - CRUD operations for transaction management

### Middleware

- **Rate Limiter**: Protects against excessive API requests
- **Authentication**: Verifies user identity for protected routes

### Database Schema

```
TABLE transactions (
    id SERIAL PRIMARY KEY,
    user_id VARCHAR(255) NOT NULL,
    title VARCHAR(255) NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    category VARCHAR(255) NOT NULL,
    created_at DATE NOT NULL DEFAULT CURRENT_DATE
)
```

### Scheduled Tasks

- Uses Node-cron for periodic tasks in production environment

## Frontend Components

### Screen Structure

- **Authentication Screens**:

  - Sign In
  - Sign Up

- **Main Application Screens**:
  - Dashboard (Transaction List)
  - Create Transaction

### Key Components

- **BalanceCard**: Displays financial summary
- **TransactionItem**: Individual transaction display
- **PageLoader**: Loading state component
- **SignOutButton**: Authentication management

### Hooks

- **useTransactions**: Custom hook for transaction data management

## Security Measures

1. **Authentication**: Secure user authentication via Clerk
2. **Rate Limiting**: Protection against brute force and DoS attacks
3. **Secure Storage**: Sensitive data stored securely

## Deployment Architecture

- **Backend**: Node.js server deployed on a cloud platform
- **Database**: Neon Serverless PostgreSQL
- **Mobile App**: Distributed via app stores after building with Expo

## Performance Considerations

- **Rate Limiting**: Prevents server overload
- **Memoized Functions**: React's useCallback for performance optimization
- **Pagination**: Implemented for efficient data loading (where applicable)
