import EventCard from '@/components/EventCard'
import ExploreBtn from '@/components/ExploreBtn'
import { events } from '@/lib/constants'
import { time } from 'console'
import { title } from 'process'
import React from 'react'



const page = () => {
  return (
    <section>
    <h1 className='text-center'>Welcoome to Nextjs 16...</h1>
    <p className='text-center mt-5'>Hackathons, Meetups, and Conferences, All in One Place</p>
    <ExploreBtn />

    <div className='mt-20 space-y-7'>
    <h3>Featured Events</h3>
    
    <ul className='events'>
    {events.map((event) => (
     <li key={event.title}>
      <EventCard {...event} />
     </li>
    ))}

    </ul>

    </div>
    </section>
  )
}

export default page