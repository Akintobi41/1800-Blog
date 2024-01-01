import { Client, Databases, ID, Query, Storage } from "appwrite";

const data_id = import.meta.VITE_APP_APPWRITE_DATABASE_ID;
const collection_id = import.meta.VITE_APP_APPWRITE_COLLECTION_ID;
const endpoint = import.meta.VITE_APP_APPWRITE_URL;
const project_id = import.meta.VITE_APP_APPWRITE_PROJECT_ID
const bucket_id = import.meta.VITE_APP_APPWRITE_BUCKET_ID

export class Service {
    client = new Client();
    databases;
    bucket;

    constructor() {
        this.client.setEndpoint(endpoint)
            .setProject(project_id)
        this.databases = new Databases(this.client)
        this.bucket = new Storage(this.client)
    }

    async getPost(slug) {
        try {
            return await this.databases.get(data_id, collection_id, slug)

        } catch (error) {
            console.log('Appwrite service :: getPost() :: ', error)
            return false
        }

    }

    async getPosts(queries = [Query.equal('status', ['active'])]) {
        try {
            await this.databases.listDocuments(data_id, collection_id, queries)
        } catch (error) {
            console.log('Appwrite service :: getPosts() :: ', error)
            return false
        }
    }
    async createPost(title, slug, content, featuredImage, userId, status) {
        try {
            return await this.databases.createDocument(data_id, collection_id, slug, { title, content, status, featuredImage, userId })
        } catch (error) {
            console.log('Appwrite service :: createPost() :: ', error)
            return false
        }
    }

    async updatePost(slug, { title, content, featuredImage, status }) {
        try {
            return await this.databases.updateDocument(data_id, collection_id, slug, { title, content, featuredImage, status })
        } catch (error) {
            console.log('Appwrite service :: updatePost() :: ', error)
            return false
        }
    }

    async deletePost(slug) {
        try {
            await this.databases.deleteDocument(data_id, collection_id, slug)
            return true;
        } catch (error) {
            console.log('Appwrite service :: deletePost() :: ', error)
            return false
        }
    }


    // Storage Service
    async uploadFile(file) {
        try {
            await this.storage.uploadFile(bucket_id, ID.unique(), file)
        } catch (error) {
            console.log('Appwrite service :: uploadFile() :: ', error)
            return false
        }
    }
    async deleteFile(fileID) {
        try {
            await this.storage.deleteFile(bucket_id, fileID)
        } catch (error) {
            console.log('Appwrite service :: uploadFile() :: ', error)
            return false
        }
    }
    getFilePreview(fileID) {
        return this.bucket.getFilePreview(bucket_id, fileID).href
    }
}

const service = new Service()

export service


