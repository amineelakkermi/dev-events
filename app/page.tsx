import EventCard from '@/components/EventCard'
import ExploreBtn from '@/components/ExploreBtn'
import { cacheLife } from 'next/cache'
import React from 'react'

// 🔧 Utilitaire pour garantir une URL valide
function getBaseUrl() {
  let url = process.env.NEXT_PUBLIC_BASE_URL

  // Si non définie ou incomplète, fallback selon l'environnement
  if (!url) {
    if (process.env.VERCEL_URL) {
      url = `https://${process.env.VERCEL_URL}`
    } else {
      url = 'http://localhost:3000'
    }
  }

  // Ajoute https:// si manquant
  if (!url.startsWith('http')) {
    url = `https://${url}`
  }

  return url
}

const Page = async () => {
  'use cache'
  cacheLife('hours')

  // 🔒 Utilise une URL valide dans tous les contextes
  const BASE_URL = getBaseUrl()
  const response = await fetch(`${BASE_URL}/api/events`, { next: { revalidate: 3600 } })

  // Vérifie que la réponse est correcte
  if (!response.ok) {
    throw new Error(`Erreur lors du chargement des événements : ${response.status}`)
  }

  const { events } = await response.json()

  return (
    <section>
      <h1 className='text-center'>Welcome to Next.js 16...</h1>
      <p className='text-center mt-5'>
        Hackathons, Meetups, and Conferences — All in One Place
      </p>
      <ExploreBtn />

      <div className='mt-20 space-y-7'>
        <h3>Featured Events</h3>
        <ul className='events'>
          {events && events.length > 0 ? (
            events.map(event => (
              <li key={event._id || event.title} className='list-none'>
                <EventCard {...event} />
              </li>
            ))
          ) : (
            <p className='text-gray-500'>Aucun événement trouvé.</p>
          )}
        </ul>
      </div>
    </section>
  )
}

export default Page
