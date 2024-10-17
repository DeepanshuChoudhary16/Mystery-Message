import {z} from 'zod'

export const MessageSchema = z.object({
    content: z.string()
    .min(10,{message: 'content min 10 word'})
    .max(300,{message: 'content max 300 word'})


})