import { Client, Databases, ID, Query, Storage } from "appwrite";
import { AppwriteConfig } from "./constants";

const { dataId, collectionId, endpoint, projectId, bucketId } =
  AppwriteConfig;

export class AuthService {
  client = new Client();
  databases;
  bucket;

  constructor() {
    this.client.setEndpoint(endpoint).setProject(projectId);
    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  async getPost(slug) {
    try {
      return await this.databases.getDocument(dataId, collectionId, slug);
    } catch (error) {
      console.log("Appwrite service :: getPost() :: ", error);
      return false;
    }
  }

  async getPosts(queries = [Query.equal("status", "active")]) {
    try {
      return await this.databases.listDocuments(dataId, collectionId, queries);
    } catch (error) {
      console.log("Appwrite service :: getPosts() :: ", error);
      return false;
    }
  }
  async createPost({ title, slug, content, featuredImage, userId, status }) {

    try {
      return await this.databases.createDocument(dataId, collectionId, slug, {
        title,
        content,
        status,
        featuredImage,
        userId,
      });
    } catch (error) {
      console.log("Appwrite service :: createPost() :: ", error);
      return false;
    }
  }

  async updatePost(slug, { title, content, featuredImage, status }) {
    console.log(slug)
    try {
      return await this.databases.updateDocument(dataId, collectionId, slug, {
        title,
        content,
        featuredImage,
        status,
      });
    } catch (error) {
      console.log("Appwrite service :: updatePost() :: ", error);
      return false;
    }
  }

  async deletePost(slug) {
    try {
      await this.databases.deleteDocument(dataId, collectionId, slug);
      return true;
    } catch (error) {
      console.log("Appwrite service :: deletePost() :: ", error);
      return false;
    }
  }

  // Storage appwriteService
  async uploadFile(file) {

    try {
      return await this.bucket.createFile(bucketId, ID.unique(), file);
    } catch (error) {
      console.log("Appwrite service :: createFile() :: ", error);
      return false;
    }
  }
  async deleteFile(fileID) {
    try {
      await this.storage.deleteFile(bucketId, fileID);
    } catch (error) {
      console.log("Appwrite service :: uploadFile() :: ", error);
      return false;
    }
  }
  getFilePreview(fileID) {
    return this.bucket.getFilePreview(bucketId, fileID).href;
  }
}

const appwriteService = new AuthService();

export default appwriteService;

