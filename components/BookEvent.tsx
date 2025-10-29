'use client';
import React, { useState } from 'react'

const BookEvent = () => {
  const [ email , setEmail ] = useState('');
  const [ submitted , setSubmitted ] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setTimeout(() => {
     setSubmitted(true);
    } , 1000);
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