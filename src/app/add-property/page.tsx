'use client'

import { useState } from 'react'

export default function AddPropertyPage() {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [location, setLocation] = useState('')
  const [price, setPrice] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage('')

    if (!name || !price) {
      setMessage('Namn och pris är obligatoriska.')
      return
    }

    const property = {
      name,
      description,
      location,
      price_per_night: Number(price),
      image_url: imageUrl,
      user_id: null, // senare kopplas till inloggad användare
    }

    try {
      const res = await fetch('http://localhost:3000/properties', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(property),
      })

      if (res.ok) {
        setMessage('Boende skapades! ✅')
        setName('')
        setDescription('')
        setLocation('')
        setPrice('')
        setImageUrl('')
      } else {
        const errorData = await res.json()
        setMessage(`Fel: ${errorData.error}`)
      }
    } catch (error) {
      setMessage('Kunde inte skapa boendet.')
      console.error(error)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <h1 className="text-3xl font-bold mb-6 text-center text-black">Lägg till nytt boende</h1>

      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto bg-white p-6 rounded-xl shadow-md space-y-4"
      >
        <input
          type="text"
          placeholder="Ex: Boende i Stockholm"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border border-gray-300 rounded-md p-2 placeholder-gray-600 text-black"
        />

        <input
          type="text"
          placeholder="Ex: Stockholm"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full border border-gray-300 rounded-md p-2 placeholder-gray-600 text-black"
        />

        <input
          type="number"
          placeholder="Ex: 950 (pris per natt)"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full border border-gray-300 rounded-md p-2 placeholder-gray-600 text-black"
        />

        <input
          type="text"
          placeholder="Ex: https://images.unsplash.com/photo-..."
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          className="w-full border border-gray-300 rounded-md p-2 placeholder-gray-600 text-black"
        />

        <textarea
          placeholder="Ex: Mysig lägenhet nära centrum"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border border-gray-300 rounded-md p-2 h-24 placeholder-gray-600 text-black"
        />

        <button
          type="submit"
          className="w-full bg-black text-white font-semibold py-2 rounded-md hover:bg-gray-800"
        >
          Skapa boende
        </button>
      </form>

      {message && <p className="text-center mt-4 text-black">{message}</p>}
    </div>
  )
}
