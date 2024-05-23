import Link from 'next/link'
import React from 'react'

function NotFound() {
  return (
    <div>
        <h1 className='text-3xl font-bold'>Page Not Found</h1>
        <p>Sorry, the page you are looking for does not exist.</p>
        <Link href={'/'}>Return Home</Link>
    </div>
  )
}

export default NotFound