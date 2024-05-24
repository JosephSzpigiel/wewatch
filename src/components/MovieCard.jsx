import Image from "next/image"

function MovieCard({movie}){
    const posterUrl = `https://image.tmdb.org/t/p/w342${movie.poster_path}`

    return (
        <div className="p-3">
            <img src={posterUrl}/>
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