import { Base_url } from "./Base_url";
 
import { CommonRequest } from "./CommonRequest";

export const userRegister=async(body,header)=>{
 return await CommonRequest("POST",`${Base_url}/register`,body,header)
}

export const Loginuser=async(body)=>{
    return await CommonRequest("POST",`${Base_url}/login`,body)
}
export const Todaodata=async(body,header)=>{
    // const token = localStorage.getItem('token');

    // const header={
    //     token:token
    // }
   
    return await CommonRequest("POST",`${Base_url}/todos`,body,header)
}
export const Alldata=async(header)=>{
  
    return await CommonRequest("GET",`${Base_url}/alldata`,null,header)
}

export const deltodo=async(body,header)=>{
    return await CommonRequest("PUT",`${Base_url}/deletetodo`,body,header)
}
export const loadingdata=async()=>{
    return await CommonRequest("GET",`${Base_url}/theloader`)
}

