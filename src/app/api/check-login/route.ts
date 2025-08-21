import { cookies } from "next/headers";


export async function GET(){
  
    const token = (await cookies()).get('token')

    if(token){
        return Response.json({isLogin : true,token:token.value})
    }else{
  return Response.json({isLogin : false})

    }

     
}