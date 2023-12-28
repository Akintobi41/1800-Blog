import { Client, Databases, Query, Storage } from "appwrite";

const data_id = import.meta.VITE_APP_DATABASE_ID;
const collection_id = import.meta.VITE_APP_COLLECTION_ID;

export class configService {
    client = new Client();
    databases;
    bucket;

    constructor() {
        this.client.setEndpoint(import.meta.VITE_APP_APPWRITE_URL)
            .setProject(import.meta.VITE_APP_APPWRITE_PROJECT_ID)

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
}


