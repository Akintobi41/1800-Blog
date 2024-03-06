// Centralized configuration file for Appwrite constants
export const dataId = import.meta.env.VITE_APP_APPWRITE_DATABASE_ID;
export const collectionId = import.meta.env.VITE_APP_APPWRITE_COLLECTION_ID;
export const endpoint = import.meta.env.VITE_APP_APPWRITE_URL;
export const projectId = import.meta.env.VITE_APP_APPWRITE_PROJECT_ID;
export const bucketId = import.meta.env.VITE_APP_APPWRITE_BUCKET_ID;

export const AppwriteConfig = {
  dataId,
  collectionId,
  endpoint,
  projectId,
  bucketId,
};
