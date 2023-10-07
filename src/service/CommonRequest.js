import axios from "axios";

export const CommonRequest=async(methods,url,body,header)=>{
    let config={
        method:methods,
        url,
        data:body,
        headers:header?{...header,"varify-token": header["varify-token"],mobile: header.mobile}:  {
            "Content-Type": "application/json",
            // "varify-token": header["varify-token"]
          }

    }
    return axios(config).then((data)=>{
        return data
    }).catch((err)=>{
        return err
    })
}