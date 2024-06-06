import Link from 'next/link'
import React from 'react'

function NavBar() {
    const links = [
        {
            title:"Home",
            path: '/'
        },
        {
            title:"Search",
            path: '/search'
        },
        {
            title:"Login",
            path: '/login'
        }
    ]

    function LinkButtons(){
        return links.map(link=>{
            return <Link className=' px-5 hover:underline'href={link.path}>{link.title}</Link>
        })
    }



    return (
        <nav className=' px-10 py-7 border-spacing-1 flex justify-between h-10 items-center fixed bg-black '>
            <Link className=' text-4xl font-bold' href='/'>WeWatch</Link>
            <div className=' flex justify-between'>
                <LinkButtons/>
            </div>
        </nav>
    )
}

export default NavBar