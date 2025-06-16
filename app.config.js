export default {
  expo: {
    name: "ui-demo-app",
    slug: "ui-demo-app",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "light",
    splash: {
      image: "./assets/splash-icon.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff"
    },
    assetBundlePatterns: [
      "**/*"
    ],
    ios: {
    "bundleIdentifier": "com.aidar08.uidemoapp",
    supportsTablet: true
    },
    android: {
    "package": "com.aidar08.uidemoapp",
    adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#ffffff"
    }
    },
    web: {
    favicon: "./assets/favicon.png"
    },
    owner: "aidar08",
    extra: {
    BASE_URL: process.env.BASE_URL || "https://sandbox.pinata.ai/partners/api/v1/",
    CLIENT_KEY: process.env.CLIENT_KEY || "",
    CLIENT_SECRET: process.env.CLIENT_SECRET || "",
    CLIENT_ID: process.env.CLIENT_ID || "",
    USER_EMAIL: process.env.USER_EMAIL || "",
    eas: {
        projectId: "8db627f2-fd7e-477a-8e85-e58352b2fb2d"
    }

    }
},
};