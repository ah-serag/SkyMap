import { NextResponse } from "next/server";
import { cookies } from "next/headers";



// بيانات المستخدم المزيفة (يمكن لاحقًا ربطها بقاعدة بيانات)
const fakeUser = {
  email: 'test@test.com',
  password: '123456',
};

export async function POST(request : Request){

    const body = await request.json()
    const {email , password} = body ;

    if(email === fakeUser.email && password === fakeUser.password){
      (await cookies()).set('token' ,'user-authenticated',{httpOnly:true})
       return NextResponse.json({ success: true });
     
    }else {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }

    
}





