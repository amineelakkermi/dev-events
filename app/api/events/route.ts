import connectDB from "@/lib/mongodb";
import { error } from "console";
import { NextRequest, NextResponse } from "next/server";

export default async function POST(req: NextRequest){
    try{
        await connectDB();

    } catch(e){
        console.log(e);
        return NextResponse.json({message: 'Event Creation Failed' , error: e  instanceof Error ? e.message : 'Unknown'})
    }
}