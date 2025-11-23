import { ExpoConfig } from "expo/config";

const config = ({ config }: { config: ExpoConfig }): ExpoConfig => {
  return {
    ...config,

    name: "Wallet_Sofi",
    slug: "wallet_sofi",

    android: {
      package: "com.Sofi_Sova.mywallet",
      adaptiveIcon: {
        foregroundImage: "./assets/wallet.svg",
        backgroundColor: "#ffffff",
      },
    },

    plugins: ["expo-font"],

    extra: {
      FIREBASE_API_KEY: 'AIzaSyAsGkXcrLv94ticCQrm3y-Pesxl_3J1KLc',
      FIREBASE_AUTH_DOMAIN: 'my-wallet-799cf.firebaseapp.com',
      FIREBASE_PROJECT_ID: 'my-wallet-799cf',
      FIREBASE_STORAGE_BUCKET: 'my-wallet-799cf.firebasestorage.app',
      FIREBASE_MESSAGING_SENDER_ID: '547158761042',
      FIREBASE_APP_ID: '1:547158761042:android:df9c38febad1450762098b',

      eas: {
        projectId: "26c11758-6062-4050-a80c-305dab7867e2",
      },
    },
  };
};

export default config;
