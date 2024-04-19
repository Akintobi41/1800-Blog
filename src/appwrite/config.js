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
      ("Appwrite service :: getPost() :: ", error);
      return false;
    }
  }

  async getPosts(queries = [Query.equal("status", "active")]) {
    try {
      return await this.databases.listDocuments(dataId, collectionId, queries);
    } catch (error) {
      ("Appwrite service :: getPosts() :: ", error);
      return false;
    }
  }
  async createPost({ title, content, featuredImage, status }) {// removed userId here

    try {
      return await this.databases.createDocument(dataId, collectionId, ID.unique(), { // removed slug from here
        title,
        content,
        status,
        featuredImage,
      });
    } catch (error) {
      ("Appwrite service :: createPost() :: ", error);
      return false;
    }
  }

  async updatePost(slug, { title, content, featuredImage, status }) {

    try {
      return await this.databases.updateDocument(dataId, collectionId, slug, {
        title,
        content,
        featuredImage,
        status,
      });
    } catch (error) {
      ("Appwrite service :: updatePost() :: ", error);
      return false;
    }
  }

  async deletePost(slug) {
    try {
      await this.databases.deleteDocument(dataId, collectionId, slug);
      return true;
    } catch (error) {
      ("Appwrite service :: deletePost() :: ", error);
      return false;
    }
  }

  // Storage appwriteService
  async uploadFile(file) {

    try {
      return await this.bucket.createFile(bucketId, ID.unique(), file);
    } catch (error) {
      ("Appwrite service :: createFile() :: ", error);
      return false;
    }
  }
  async deleteFile(fileID) {
    try {
      await this.storage.deleteFile(bucketId, fileID);
    } catch (error) {
      ("Appwrite service :: uploadFile() :: ", error);
      return false;
    }
  }
  getFilePreview(fileID) {
    return this.bucket.getFilePreview(bucketId, fileID).href;
  }
}

const appwriteService = new AuthService();

export default appwriteService;

