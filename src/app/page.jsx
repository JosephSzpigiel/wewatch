import MovieCard from "@/components/MovieCard"

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiNjc0NDEyZTQzNTEyODhlODJkZDBiODQzOGJhODU4ZCIsInN1YiI6IjY2NGY1NzczMTg4ODQ4ZWNhYzk1NDBiYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.T2gzzHr4qQA4WIz2G-3M5Bu50lAUh9KY6PbRWpeLDrY'
  }
}
async function getTrendingMovies(){
  const res = await fetch('https://api.themoviedb.org/3/movie/popular', options)
  return res.json()
}


export default async function Home() {

  const trending = await getTrendingMovies()
  console.log(trending)

  const trendingMovies = trending.results.map(movie=>{
    return (
      <MovieCard key={movie.id} movie={movie}/>
    )
  })


  return (
    <div>
      {trendingMovies}
    </div>
    // <p>Worked!</p>
  );
}