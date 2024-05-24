import MovieCard from "@/components/MovieCard"
import Carousel from "@/components/Carousel"

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiNjc0NDEyZTQzNTEyODhlODJkZDBiODQzOGJhODU4ZCIsInN1YiI6IjY2NGY1NzczMTg4ODQ4ZWNhYzk1NDBiYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.T2gzzHr4qQA4WIz2G-3M5Bu50lAUh9KY6PbRWpeLDrY'
  }
}
async function getTrendingMovies(){
  const res = await fetch('https://api.themoviedb.org/3/trending/movie/day', options)
  return res.json()
}

async function getTrendingShows(){
  const res = await fetch('https://api.themoviedb.org/3/trending/tv/day', options)
  return res.json()
}


export default async function Home() {

  const trendingMovies = await getTrendingMovies()
  const trendingShows = await getTrendingShows()

  const trendingMovieCards = trendingMovies.results.map(movie=>{
    return (
      <MovieCard key={movie.id} movie={movie}/>
    )
  })

  const trendingTVCards = trendingShows.results.map(show=>{
    return (
      <MovieCard key={show.id} movie={show}/>
    )
  })


  return (
    <div>
      <h2 className="my-4 text-xl font-bold">Trending Movies:</h2>
      <Carousel cards={trendingMovieCards}/>
      <h2 className="my-4 text-xl font-bold">Trending Shows:</h2>
      <Carousel cards={trendingTVCards}/>
    </div>
    // <p>Worked!</p>
  );
}