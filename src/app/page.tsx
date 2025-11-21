'use client'
import React from 'react'

export default function Page() {
  const properties = [
    {
      id: '1',
      name: 'Boende i Stockholm',
      location: 'Stockholm',
      price_per_night: 950,
      image_url:
        'https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=800&q=60',
    },
    {
      id: '2',
      name: 'Boende i Malmö',
      location: 'Malmö',
      price_per_night: 800,
      image_url:
        'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=800&q=60',
    },
    {
      id: '3',
      name: 'Boende i Göteborg',
      location: 'Göteborg',
      price_per_night: 1100,
      image_url:
        'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=60',
    },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-8">
      {properties.map((property) => (
        <div
          key={property.id}
          onClick={() => alert('✅ Bokning skapad!')}
          className="rounded-xl shadow-md overflow-hidden cursor-pointer transition-transform hover:scale-[1.02]"
        >
          <img
            src={property.image_url}
            alt={property.name}
            className="w-full h-56 object-cover"
          />
          <div className="p-4 bg-white">
            <h2 className="text-lg font-semibold">{property.name}</h2>
            <p className="text-gray-500">{property.location}</p>
            <p className="text-gray-800">{property.price_per_night} kr/natt</p>
          </div>
        </div>
      ))}
    </div>
  )
}
