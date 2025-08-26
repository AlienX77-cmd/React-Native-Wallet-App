# Installation & Setup Guide

This guide will walk you through setting up the React-Native-Wallet application for development.

## Prerequisites

- Node.js (v16.x or later)
- npm or yarn
- Git
- Expo CLI (`npm install -g expo-cli`)
- A Clerk account (for authentication)
- A Neon PostgreSQL database
- An Upstash Redis instance

## Environment Setup

### Backend Setup

1. Navigate to the backend directory:

   ```bash
   cd backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the backend directory with the following variables:

   ```
   PORT=5001
   NODE_ENV=development
   DATABASE_URL=your_neon_database_url
   UPSTASH_REDIS_REST_URL=your_upstash_redis_url
   UPSTASH_REDIS_REST_TOKEN=your_upstash_redis_token
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

### Mobile Setup

1. Navigate to the mobile directory:

   ```bash
   cd mobile
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the mobile directory with the following variables:

   ```
   EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   EXPO_PUBLIC_API_URL=http://localhost:5001/api
   ```

   Note: For Android emulator, you may need to use `http://10.0.2.2:5001/api` instead of localhost.

4. Start the Expo development server:
   ```bash
   npm start
   ```

## Configuration

### Clerk Authentication Setup

1. Create an account at [clerk.dev](https://clerk.dev)
2. Create a new application
3. Set up Email/Password authentication in the Clerk dashboard
4. Copy your Publishable Key from the Clerk dashboard
5. Add the key to your mobile app's `.env` file

### Database Setup

1. Create an account at [neon.tech](https://neon.tech)
2. Create a new PostgreSQL database
3. Copy the database connection URL
4. Add the URL to your backend's `.env` file

### Rate Limiting Setup

1. Create an account at [upstash.com](https://upstash.com)
2. Create a new Redis database
3. Copy the REST URL and REST Token
4. Add them to your backend's `.env` file

## Running in Production

### Backend Deployment

1. Deploy the backend to your preferred hosting service (e.g., Render, Heroku)
2. Set all required environment variables in your hosting provider
3. Ensure `NODE_ENV=production` is set to enable scheduled tasks

### Mobile App Building

1. Update the `EXPO_PUBLIC_API_URL` in the `.env` file to point to your deployed backend
2. Build the app using Expo:
   ```bash
   expo build:android
   expo build:ios
   ```

## Troubleshooting

### Common Issues

1. **Connection refused error when calling API**:

   - Ensure the backend server is running
   - Check if the API URL is correct (use 10.0.2.2 instead of localhost for Android emulators)

2. **Authentication issues**:

   - Verify that your Clerk keys are correct
   - Check if the authentication flow is properly configured in the app

3. **Database connection errors**:
   - Ensure your Neon database is active
   - Verify the DATABASE_URL is correct in your `.env` file

### Debugging

- Use `console.log()` statements for debugging both backend and frontend code
- For React Native, use the Expo developer tools (shake the device or press Cmd+D in simulator)
- Check the backend logs for any server-side errors
