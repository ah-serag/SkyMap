import { z } from "zod";

export const loginSchema = z.object({

 email : z.string().email({message:"invaild email"}) ,
 password : z.string().min(6 ,{message:'At least 6 character'})
});


export type Loginschema = z.infer<typeof loginSchema>




















