# My Wallet Clean: Mobile Finance Management App

## 📝 Project Description

My Wallet Clean is a simple, secure, and smart solution for personal finance management. The application is designed to provide crystal-clear visibility into your daily spending and saving habits.

### Key Features:

* Effortless Tracking: Log income and expenses in seconds with a few taps.

* Real-time Insights: Instantly view categorized spending charts and track your monthly budget progress.

* Data Security: Built with Firebase, ensuring your financial data is stored securely and privately.

* Cross-Platform Ready: Experience native performance and a consistent interface on both Android and iOS devices.

## 🛠️ Technology Stack

### The project is developed using modern, cross-platform technologies.

#### Core Stack

* React Native (v0.81.5) - Primary framework for cross-platform mobile application development.
* Expo (SDK 54.0.22) - Environment and toolset (EAS) simplifying React Native development and build processes.
* TypeScript - Programming language adding static typing for better scalability and fewer errors.

#### Backend and Data

* Firebase - Comprehensive backend platform.
* Firebase Firestore - NoSQL database for storing financial transactions.
* Firebase Auth - Manages user authentication and sessions.
* Async Storage - Local asynchronous storage for native data (used by Firebase for persistence).

#### UI and Navigation

* @react-navigation/bottom-tabs (For screen navigation)
* @expo/vector-icons (For icons and visual elements)
* @react-native-picker/picker (For native element selection)

## ⚙️ Installation and Setup

1. Requirements

Ensure you have the following installed:

Node.js (LTS version recommended)
```
Yarn or NPM

Expo CLI: npm install -g expo-cli

EAS CLI: npm install -g eas-cli
```
2. Local Setup

Clone the repository (if needed):
```
git clone https://github.com/SofiiaShevtsova/react-native-wallet
cd my-wallet-clean
```

Install dependencies:
```
npm install
# or yarn install
```

Run in development mode (Expo Go):
```
npx expo start
```

Scan the QR code using the Expo Go app on your phone.

## 🔐 Firebase Configuration (Critical)

For the application to work correctly in a native build (APK/AAB), you must configure your Firebase keys as EAS Secrets. This prevents the app from crashing on launch when deployed.

1. Setting Up Secrets

Execute the following commands, replacing YOUR_FIREBASE_KEY with the actual values from your Firebase Console.

# Make sure you are logged in: eas login
```
eas secret create --name FIREBASE_API_KEY --value "YOUR_API_KEY" --scope project
eas secret create --name FIREBASE_AUTH_DOMAIN --value "YOUR_AUTH_DOMAIN" --scope project
eas secret create --name FIREBASE_PROJECT_ID --value "YOUR_PROJECT_ID" --scope project
eas secret create --name FIREBASE_STORAGE_BUCKET --value "YOUR_STORAGE_BUCKET" --scope project
eas secret create --name FIREBASE_MESSAGING_SENDER_ID --value "YOUR_MESSAGING_SENDER_ID" --scope project
eas secret create --name FIREBASE_APP_ID --value "YOUR_APP_ID" --scope project
```

Note: These secrets are automatically injected into your native build via environment variables, ensuring secure and proper initialization.

## 🚀 Build and Deployment (EAS Build)

1. Test Build (APK for testing)

To get an .apk file for installation on a device or internal testing:
```
eas build --profile preview --platform android
```

You will be able to download the test .apk file from the build status page once the process is complete.

2. Final Build (AAB for Google Play)

To prepare for publishing to the Google Play Store, use the production profile:
```
eas build --profile production --platform android
```

This command will generate the .aab (Android App Bundle) file, which you will upload to the Google Play Console.

3. Keystore Management

During the first production build, EAS automatically generates and securely stores your signing key (Keystore). This key is used for all subsequent updates, ensuring a seamless and secure deployment process.
