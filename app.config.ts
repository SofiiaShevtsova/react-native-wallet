import { ExpoConfig } from "expo/config";

const config = ({ config }: { config: ExpoConfig }): ExpoConfig => {
  return {
    ...config,

    android: {
      package: "com.Sofi_Sova.mywallet",
      // Додаємо також 'adaptiveIcon' для сучасного відображення іконок
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#ffffff",
      },
    },

    plugins: ["expo-font"],

    extra: {
      FIREBASE_API_KEY: process.env.API_KEY,
      FIREBASE_aUTH_DOMAIN: process.env.AUTH_DOMAIN,
      FIREBASE_PROJECT_ID: process.env.PROJECT_ID,
      FIREBASE_STORAGE_BUCKET: process.env.STORAGE_BUCKET,
      FIREBASE_MESSAGING_SENDER_ID: process.env.MESSAGING_SENDER_ID,
      FIREBASE_APP_ID: process.env.APP_ID,

      eas: {
        projectId: "26c11758-6062-4050-a80c-305dab7867e2",
      },
    },
  };
};

export default config;
