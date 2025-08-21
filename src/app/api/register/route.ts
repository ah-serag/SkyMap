import { error } from "console";
import { NextResponse } from "next/server";

let users:any[] = [] ;

export async function POST(req:Request){
 
 const body = await req.json()   
 
 console.log(users)
 console.log(body)
 
 if (users.find((user)=> user.email === body.email)){
    return NextResponse.json({ error: "Email already exists" }, { status: 400 })
 }
  
 users.push(body)

 return NextResponse.json({ message: "User registered successfully", user: body }, { status: 201 })


}


