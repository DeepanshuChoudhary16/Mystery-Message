import {z} from "zod";

export const usernameValidation = z
    .string()
    .min(2,"Username must have 2 chara")
    .max(20,"no more chara")
    .regex(/^[a-zA-Z0-9]/,"username must not contaion special character")



export const signUpSchema = z.object({
    username:usernameValidation,
    email: z.string().email({message:'Invalide email'}),
    password: z.string().min(6,{message:"password contaion 6 chara atlest"})
})
