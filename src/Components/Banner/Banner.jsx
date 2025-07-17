import React from 'react'

export default function Banner() {
  return (
    <>
    <div className="w-full sticky top-0 py-1 font-medium text-sm text-white bg-gradient-to-r from-[#44AE7C] to-[#B9D4AA] overflow-hidden">
      {/* ✅ container for small screens only */}
      <div className="block sm:hidden whitespace-nowrap animate-marquee">
        <span className="mx-6">🚚 Free Shipping on Orders Above $50</span>
        <span className="mx-6">🎁 20% OFF on First Purchase</span>
        <span className="mx-6">🔐 Use Code: <strong>WELCOME10</strong></span>
      </div>

      {/* ✅ static layout for medium and up */}
      <div className="hidden sm:flex max-w-screen-xl mx-auto justify-center items-center gap-4 text-center">
        <p>🚚 Free Shipping on Orders Above $50</p>
        <span>|</span>
        <p>🎁 20% OFF on First Purchase</p>
        <span>|</span>
        <p>🔐 Use Code: <strong>WELCOME10</strong></p>
      </div>
    </div>
    </>
  )
}
