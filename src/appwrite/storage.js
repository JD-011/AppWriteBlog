import conf from "../conf/conf.js"
import { Client, ID, Storage } from "appwrite"

export class StorageServices{
    client = new Client();
    bucket;

    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId)
        this.bucket = new Storage(this.client);
    }

    async uploadFile(file) {
        try{
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            )
        } catch (e){
            console.log("Appwrite serive :: uploadFile :: error:", e);
            return null;
        }
    }

    async deleteFile(fileId) {
        try{
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            )
            return true;
        } catch (e){
            console.log("Appwrite serive :: deleteFile :: error:", e);
            return false;
        }
    }

    getFilePreview(fileId) {
        return this.bucket.getFileView(
            conf.appwriteBucketId,
            fileId
        )
    }
}

const storageServices = new StorageServices()

export default storageServices