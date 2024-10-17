import { getServerSession } from "next-auth";
import {authOptions} from "../auth/[...nextauth]/options";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User.model";
import { User } from "next-auth";

export async function POST(request: Request)
{
    await dbConnect()

    const session = await getServerSession(authOptions)
    const user: User = session?.user

    if(!session || !session.user)
    {
        return Response.json(
            {
                success:false,
                message:"Not Authenticated"
            },
            {
                status:401
            }
        )
    }
    const userId = user._id;
    const {acceptMessages} = await request.json()
    
    try {
        const updatedUser = await UserModel.findByIdAndUpdate(
            userId,
            {isAcceptingMessage: acceptMessages},
            {new: true}
        )
        if(!updatedUser)
        {
            return Response.json(
                {
                    success:false,
                    message:"failes to update user status to accept messages"
                },
                {
                    status:401
                }
            )
        }
        else{
            return Response.json(
                {
                    success:false,
                    message:"Message Acceptance status updated successfully",
                    updatedUser
                },
                {
                    status:200
                }
            )
        }
    } catch (error) {
        console.log("failes to update user status to accept messages")
        return Response.json(
            {
                success:false,
                message:"failes to update user status to accept messages"
            },
            {
                status:500
            }
        )
    }


}

export async  function GET(request : Request){
    await dbConnect()

    const session = await getServerSession(authOptions)
    const user: User = session?.user

    if(!session || !session.user)
    {
        return Response.json(
            {
                success:false,
                message:"Not Authenticated"
            },
            {
                status:401
            }
        )
    }
    const userId = user._id;

    try {
        const foundUser = await UserModel.findById(userId)
    
        if(!foundUser)
            {
                return Response.json(
                    {
                        success:false,
                        message:"failes to find the user"
                    },
                    {
                        status:404
                    }
                )
            }
        else
        {
            return Response.json(
                {
                    success:true,
                    isAcceptingMessage: foundUser.isAcceptingMessage
                },
                {
                    status:200
                }
            )
        }
    } catch (error) {
        console.log("failes to update user status to accept messages")
        return Response.json(
            {
                success:false,
                message:"Error is getting message acceptance status"
            },
            {
                status:500
            }
        )
    }
}