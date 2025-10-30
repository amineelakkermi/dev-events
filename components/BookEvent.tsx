'use client';
import { createBooking } from '@/lib/booking.action';
import React, { useState } from 'react'

const BookEvent = ({ eventId, slug } : { eventId: string; slug: string; }) => {
  const [ email , setEmail ] = useState('');
  const [ submitted , setSubmitted ] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    
    const { success } = await createBooking({ eventId, slug, email });
    
    if(success){
      setSubmitted(true);
      
    } else{
      console.error('Booking creation failed');
    }
    

   
  }

  return (
    <div id='book-event'>
     { submitted ? (
        <p className='text-sm'>Thank you for signing up!</p>
     ) : (
        <form onSubmit={handleSubmit}>
        <div>
            <label htmlFor="email">Email Adress</label>
            <input 
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)} id="email"
            placeholder='Enter your email adress'
            />
        </div>
            <button type='submit' className='button-submit'>Submit</button>

        </form>
     )
    
     }
    </div>
  )
}

export default BookEvent