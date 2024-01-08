// Centralized configuration file for Appwrite constants
export const AppwriteConfig = {
  dataId: import.meta.VITE_APP_APPWRITE_DATABASE_ID,
  collectionId: import.meta.VITE_APP_APPWRITE_COLLECTION_ID,
  endpoint: import.meta.VITE_APP_APPWRITE_URL,
  projectId: import.meta.VITE_APP_APPWRITE_PROJECT_ID,
  bucketId: import.meta.VITE_APP_APPWRITE_BUCKET_ID,
};
