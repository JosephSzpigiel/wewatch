import Details from "@/components/MovieDetails"

function MoviePage({params, searchParams}){

    return(
        <>
            <Details id={params.id} searchParams={searchParams} />
        </>
    )
}

export default MoviePage