'use client'

import Image from "next/image"
import { useState } from "react"
import Link from "next/link"

function MovieCard({movie}){
    
    const posterUrl = `https://image.tmdb.org/t/p/w342${movie.poster_path}`

    return (
        <div className={`relative flex m-3 group`}>
            <img className={`group-hover:opacity-30`} src={posterUrl}/>
            <div className="flex-col invisible group-hover:visible absolute w-full h-full content-center text-center">
                <p className="text-white font-bold text-xl text-center text-wrap my-2">{movie.title ? movie.title : movie.name}</p>
                {movie.media_type === 'tv' ? 
                    <Link href={`/tv/${movie.id}`} className="text-white bg-orange-500 rounded p-1 by-2 m-5">
                        Details
                    </Link> 
                    :
                    <Link href={`/movies/${movie.id}`} className="text-white bg-orange-500 rounded p-1 by-2 m-5">
                        Details
                    </Link>
                }
            </div>
        </div>
    )
}

export default MovieCard

// {
//     adult: false,
//     backdrop_path: '/nb3xI8XI3w4pMVZ38VijbsyBqP4.jpg',
//     genre_ids: [Array],
//     id: 872585,
//     original_language: 'en',
//     original_title: 'Oppenheimer',
//     overview: "The story of J. Robert Oppenheimer's role in the development of the atomic bomb during World War II.",
//     popularity: 602.85,
//     poster_path: '/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg',
//     release_date: '2023-07-19',
//     title: 'Oppenheimer',
//     video: false,
//     vote_average: 8.1,
//     vote_count: 8076
//   }