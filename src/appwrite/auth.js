import conf from "../conf/conf.js";
import { Client, Account, ID } from "appwrite";

export class AuthServices {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId)
        this.account = new Account(this.client);
    }

    async createAccount({email, password, name}) {
        try{
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if(userAccount){
                // call another method
                return this.login({email, password});
            }else{
                return userAccount;
            }
        } catch (e){
            throw e;
        }
    }

    async login({email, password}) {
        try{
            return await this.account.createEmailPasswordSession(email, password);
        } catch (e){
            throw e;
        }
    }

    async getCurrentUser() {
        try{
            return await this.account.get();
        } catch (e){
            console.log("Appwrite serive :: getCurrentUser :: error", e);
            return null;
        }
    }

    async logout(){
        try {
            return await this.account.deleteSessions();
        } catch (e){
            console.log("Appwrite serive :: logout :: error:", e);
        }
    }
}

const authServices = new AuthServices();

export default authServices;