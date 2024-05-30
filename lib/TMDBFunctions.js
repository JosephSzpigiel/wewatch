import 'dotenv/config'

const options = {
    next: {revalidate: 86400},
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_KEY}`
    }
}
export async function getTrendingMovies(){
    const res = await fetch('https://api.themoviedb.org/3/trending/movie/day', options)
    return res.json()
}

export async function getTrendingShows(){
    const res = await fetch('https://api.themoviedb.org/3/trending/tv/day', options)
    return res.json()
}

export async function getMovieDetails(id){
    const res = await fetch(`https://api.themoviedb.org/3/movie/${id}?append_to_response=credits%2Cvideos&language=en-US`, options)
    return res.json()
}

export async function searchMovies(search, page){
    const res = await fetch(`https://api.themoviedb.org/3/search/movie?query=${search}&include_adult=false&language=en-US&page=${page}`, options)
    return res.json()
}