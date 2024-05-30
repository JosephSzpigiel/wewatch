import Details from "@/components/Details"

function MoviePage({params, searchParams}){

    return(
        <>
            <Details id={params.id} searchParams={searchParams} />
        </>
    )
}

export default MoviePage