# Pinata UI Example App

This small example project demonstrates the usage of the Pinata React Native component library. It showcases how to integrate Pinata's UI components into a React Native application, including authentication flow and basic navigation.

> ⚠️ **Security Warning**: For the ease of this example, company secrets are included in the environment configuration. However, in a production environment, the company client key, ID, or secret should never be used in a front-end application. These credentials should be kept secure and only used in a secure backend service.

## Features

- Integration with Pinata's React Native UI components
- Authentication flow with company and user tokens

## Prerequisites

- Node.js 18 or higher
- npm or yarn
- iOS Simulator (for iOS development)
- Android Studio (for Android development)
- Expo CLI

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd pinata-ui-example-app
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory with the following variables:
```env
BASE_URL=https://sandbox.pinata.ai/partners/api/v1/
CLIENT_KEY=your_client_key
CLIENT_SECRET=your_client_secret
CLIENT_ID=your_client_id
USER_EMAIL=your_email@example.com
```

### Environment Variables

- `BASE_URL`: The API base URL (defaults to sandbox environment)
- `CLIENT_KEY`: Your Pinata client key
- `CLIENT_SECRET`: Your Pinata client secret
- `CLIENT_ID`: Your Pinata client ID
- `USER_EMAIL`: Default user email for login

## Running the App

### iOS
```bash
npm run ios
```

### Android
```bash
npm run android
```

### Web
```bash
npm run web
```

## Development

The app uses Expo's development environment. To start the development server:

```bash
npx expo start
```
