import React from 'react'
import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <>
      <div className="flex flex-col my-10 items-center justify-center text-sm max-md:px-4">
            <h1 className="text-8xl md:text-9xl font-bold text-secondaryColor">404</h1>
            <div className="h-1 w-16 rounded bg-secondaryColor my-5 md:my-7"></div>
            <p className="text-2xl md:text-3xl font-bold text-gray-800">Page Not Found</p>
            <p className="text-sm md:text-base mt-4 text-gray-500 max-w-md text-center">The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.</p>
            <div className="flex items-center gap-4 mt-6">
                <Link to={'/'} className="bg-secondaryColor px-7 py-2.5 text-white rounded-md active:scale-95 transition-all">
                    Return Home
                </Link>
            </div>
        </div>
    </>
  )
}
