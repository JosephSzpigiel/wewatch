import Details from "@/components/MovieDetails"

function MoviePage({params}){

    return(
        <>
            <Details id={params.id}  />
        </>
    )
}

export default MoviePage