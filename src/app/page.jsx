import MovieCard from "@/components/MovieCard"
import Carousel from "@/components/Carousel"
import { getTrendingMovies, getTrendingShows } from "../../lib/TMDBFunctions"
import { PrismaClient } from "@prisma/client"
import { prisma } from "@/lib/db"

// import 'dotenv/config'

// const options = {
//   next: {revalidate: 86400},
//   method: 'GET',
//   headers: {
//     accept: 'application/json',
//     Authorization: `Bearer ${process.env.TMDB_KEY}`
//   }
// }
// async function getTrendingMovies(){
//   const res = await fetch('https://api.themoviedb.org/3/trending/movie/day', options)
//   return res.json()
// }

// async function getTrendingShows(){
//   const res = await fetch('https://api.themoviedb.org/3/trending/tv/day', options)
//   return res.json()
// }


export default async function Home() {

  const users = await prisma.user.findUnique({
    where:{
      id : 1
    },
    include: {
      movies: true,
      primary: {
        include: {
          movies: true
        }
      },
      secondary: {
        include: {
          movies: true
        }
      }
    }
  }
    
  )
  console.log(users)

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