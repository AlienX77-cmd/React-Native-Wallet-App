# Development Guide

This guide provides information for developers who want to contribute to or modify the React-Native-Wallet application.

## Project Structure

### Backend Structure

```
backend/
├── package.json          # Node.js dependencies and scripts
├── src/
│   ├── server.js         # Main Express server entry point
│   ├── config/
│   │   ├── cron.js       # Scheduled tasks configuration
│   │   ├── db.js         # Database connection setup
│   │   └── upstash.js    # Redis rate limiting configuration
│   ├── controllers/
│   │   └── transactionsController.js  # Transaction business logic
│   ├── middleware/
│   │   └── rateLimiter.js             # API rate limiting middleware
│   └── routes/
│       └── transactionsRoute.js       # API route definitions
```

### Mobile Structure

```
mobile/
├── app.json              # Expo application configuration
├── package.json          # React Native dependencies
├── app/
│   ├── _layout.jsx       # Root layout component
│   ├── (auth)/           # Authentication screens
│   │   ├── _layout.jsx   # Auth layout component
│   │   ├── sign-in.jsx   # Sign in screen
│   │   └── sign-up.jsx   # Sign up screen
│   └── (root)/           # Main application screens
│       ├── _layout.jsx   # Main app layout component
│       ├── create.jsx    # Create transaction screen
│       └── index.jsx     # Dashboard/home screen
├── assets/
│   ├── fonts/            # Application fonts
│   ├── images/           # Image assets
│   └── styles/           # Style definitions
├── components/           # Reusable UI components
├── constants/            # Application constants
├── hooks/                # Custom React hooks
└── lib/                  # Utility functions
```

## Development Workflow

### Backend Development

1. **Creating a new API endpoint**:

   - Add a new route in `routes/` folder
   - Implement controller logic in `controllers/` folder
   - Register the route in `server.js`

2. **Database changes**:

   - Update schema in `config/db.js`
   - Handle migrations carefully to preserve existing data

3. **Testing API endpoints**:
   - Use tools like Postman or curl to test endpoints
   - Validate request/response data formats

### Mobile Development

1. **Creating a new screen**:

   - Add a new file in the appropriate folder under `app/`
   - Use the Expo Router file-based routing system

2. **Adding components**:

   - Create reusable components in the `components/` folder
   - Follow the existing component pattern
   - Keep styles separate in the `assets/styles/` folder

3. **Styling guidelines**:
   - Use consistent styling patterns
   - Follow the existing color schemes defined in `constants/colors.js`

## Code Style Guidelines

### JavaScript/React Guidelines

1. **Naming conventions**:

   - Use camelCase for variables and functions
   - Use PascalCase for components and classes
   - Use UPPERCASE_SNAKE_CASE for constants

2. **Component structure**:

   - Keep components focused on a single responsibility
   - Extract reusable logic into custom hooks
   - Use functional components with hooks

3. **Comments**:
   - Add comments for complex logic
   - Document component props
   - Explain non-obvious code decisions

### API Guidelines

1. **Endpoint naming**:

   - Use RESTful conventions
   - Keep URLs descriptive and consistent

2. **Error handling**:

   - Return appropriate HTTP status codes
   - Include descriptive error messages
   - Handle both client and server errors gracefully

3. **Authentication**:
   - Validate user credentials for all protected routes
   - Implement proper authorization checks

## Testing

### Backend Testing

- Use Mocha or Jest for unit tests
- Test API endpoints with supertest
- Implement test coverage for critical functions

### Mobile Testing

- Use Jest for unit tests
- Use React Native Testing Library for component tests
- Implement E2E testing with Detox (optional)

## Performance Optimization

### Backend Optimization

- Implement database indexes for frequently queried fields
- Use connection pooling for database connections
- Implement proper caching strategies

### Mobile Optimization

- Optimize component re-rendering with memoization
- Lazy load components when possible
- Optimize images for mobile devices

## Deployment

### Backend Deployment

- Use a CI/CD pipeline for automated testing and deployment
- Set up proper environment variables for production
- Implement proper logging for production debugging

### Mobile Deployment

- Use Expo EAS Build for creating production builds
- Test thoroughly on different devices before release
- Implement proper versioning strategy

## Version Control Guidelines

1. **Branching strategy**:

   - `main` branch for production code
   - `develop` branch for integration
   - Feature branches for new development
   - Hotfix branches for urgent fixes

2. **Commit messages**:

   - Use descriptive commit messages
   - Start with a verb in imperative form
   - Reference issue numbers when applicable

3. **Pull requests**:
   - Create descriptive PR titles
   - Include detailed descriptions of changes
   - Request reviews from appropriate team members
