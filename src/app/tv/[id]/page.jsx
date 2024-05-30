import TVDetails from "@/components/TVDetails"

function TVPage({params, searchParams}){

    return(
        <>
            <TVDetails id={params.id} searchParams={searchParams} />
        </>
    )
}

export default TVPage