import instance from "./instance";
import { IUser } from "../types/user";

const sighup = (user: IUser) =>{
    return instance.post('/sighup', user)
}


export {  sighup } 