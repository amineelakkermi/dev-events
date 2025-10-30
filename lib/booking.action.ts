'use server';

import { Booking } from "@/database";
import connectDB from "./mongodb";
import { error } from "console";

export const createBooking = async ( { eventId, slug, email } : { eventId: string; slug: string; email: string} ) => {

 try{
    await connectDB();

   await Booking.create({ eventId, slug, email });

    return { success: true };

 } catch(e){
    console.error('create booking failed', e);
    return { success: false};
 }


}