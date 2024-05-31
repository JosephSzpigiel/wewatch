import { useEffect, useState } from "react"
import { getMovieDetails } from "../../lib/TMDBFunctions"

function DetailsClient({id}){
    const [details, setDetails] = useState({
        release_date:'test-test',
        genres:[
            {
                id: 1,
                name: 'test'
            }
        ]
    })
    const [loading, setLoading] = useState(true)
    useEffect(() =>{
        async function getDetails(id){
            const results = await getMovieDetails(id)
            setDetails(results)
        }
        getDetails(id)
        setLoading(false)
    }
    )
    if(loading){
        return <p>Loading...</p>
    }else{
        const {title, release_date, runtime, homepage, genres, imdb_id, overview, poster_path, tagline, credits, videos} = details
        const release = release_date.split('-')
        const genreElements = genres.map((genre)=>{
            return(
                <div key={genre.id} className="border rounded-md px-1 m-1">{genre.name}</div>
            )
        })
    
        return(
            <div className="flex flex-col items-center justify-center">
                <h1 className="text-5xl w-full font-bold p-3 pb-1">{title}</h1>
                <h3 className="w-full px-3">{tagline}</h3>
                <h4 className="font-light text-sm p-2 w-full text-gray-400">Release Date: {parseInt(release[1])}/{parseInt(release[2])}/{release[0]} | Runtime: {runtime} Minutes</h4>
                <div className="flex justify-center">
                    <img className="w-80" src={`https://image.tmdb.org/t/p/w342${poster_path}`}/>
                </div>
                <div className="flex">
                    {genreElements}
                </div>
    
                <h3 className="font-bold text-xl" >Description:</h3>
                <p className="mx-5 text-left">{overview}</p>
            </div>
        )

    }

}

export default DetailsClient