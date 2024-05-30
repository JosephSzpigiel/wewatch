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

export async function getTVDetails(id){
    const res = await fetch(`https://api.themoviedb.org/3/tv/${id}?append_to_response=credits%2Cvideos&language=en-US`, options)
    //https://api.themoviedb.org/3/tv/3333?language=en-US
    return res.json()
}

export async function searchMovies(search, page){
    const res = await fetch(`https://api.themoviedb.org/3/search/movie?query=${search}&include_adult=false&language=en-US&page=${page}`, options)
    return res.json()
}

export async function searchTV(search, page){
    const res = await fetch(`https://api.themoviedb.org/3/search/tv?query=${search}&include_adult=false&language=en-US&page=${page}`, options)
    return res.json()
}

export async function searchAll(search, page){
    const res = await fetch(`https://api.themoviedb.org/3/search/multi?query=${search}&include_adult=false&language=en-US&page=${page}`, options)
    return res.json()
}