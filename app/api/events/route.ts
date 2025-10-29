import { Event } from "@/database";
import { v2 as cloudinary } from 'cloudinary';
import connectDB from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import { error } from "console";


export async function POST(req: NextRequest){
    try{
        await connectDB();
        const formData = await req.formData();
        let event;
        try{
            event = Object.fromEntries(formData.entries());

        } catch(e){
            return NextResponse.json({message: 'Invalid JSON data format'}, { status: 400 });

        }
        const file = formData.get('image') as File;

        let agenda = JSON.parse(formData.get('agenda') as string);
    
        let tags = JSON.parse(formData.get('tags') as string);
        
        if(!file){ 
           NextResponse.json({ message : 'Image file is required' } , { status : 400 });
         }

        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        const uploadResult = await new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream({ resource_type: 'image' , folder: 'DevEvent'} , (error , results) => {
                if(error) return reject(error);
                resolve(results);
            }).end(buffer);
        });

        event.image = (uploadResult as { secure_url: string }).secure_url;
    
         
        const createdEvent = await Event.create({
            ...event, 
            agenda: agenda,
            tags: tags,
        });
        return NextResponse.json({ message: 'Event created successfully'}, { status: 201 });


    } catch(e){
        console.log(e);
        return NextResponse.json({message: 'Event Creation Failed' , error: e  instanceof Error ? e.message : 'Unknown'} , { status: 500 });
    }
} 



export async function GET(){
    try{
        await connectDB();

        const events = await Event.find().sort({createdAt: -1});
        return NextResponse.json({ message : "Events Fetched successfully" , events} ,  { status: 200 }); 

    } catch(e){
        return NextResponse.json({message: 'Event Fetching Failed' , error: e } , { status: 500 });
    }

}

export async function GetEventBySlug(req: NextRequest){
    try{
        await connectDB();
        const slug = req.nextUrl.searchParams.get('slug');
        const event = await Event.findOne({slug});
        return NextResponse.json({ message: 'Event Fetched successfully', event } , { status: 200 });

    
    } catch(e){
        return NextResponse.json({ message: 'The Event Not Found', error : e }, { status: 400 });
    }

}