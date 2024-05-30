'use client'
import { useState, useEffect } from "react"
import 'dotenv/config'
import { searchAll } from "../../../lib/TMDBFunctions"
import Link from "next/link"
import { usePathname, useParams } from "next/navigation"

function Search({searchParams}) {
  const pathname = usePathname()
  const searchVal = searchParams.search
  const page = searchParams.page
  console.log(searchVal)
  console.log(page)

  const [search, setSearch] = useState('')
  const [results, setResults] = useState([])
  // const [page, setPage] = useState(1)
  // const [searchVal, setSearchVal] = useState('')
  const [error, setError] = useState(false)
  const [totalPages, setTotalPages] = useState(0)

useEffect(()=>{
  async function fetchData(){
    if(searchVal){
      console.log('happend')
      const response = await searchAll(searchVal, page)
      console.log(response)
      const moviesTV = response.results.filter((media)=>{
        return media.media_type === 'movie' | media.media_type === 'tv'
      })
      console.log(moviesTV)
      setResults(moviesTV)
    }
  }
  fetchData()
},[searchVal])

  // async function submitHandler(e) {
  //   e.preventDefault()
  //   setError('')
  //   // setResults([])
  //   // setPage(1)
  //   const response = await searchAll(search, page)
  //   const moviesTV = response.results.filter((media)=>{
  //     return media.media_type === 'movie' | media.media_type === 'tv'
  //   })
  //   setResults(moviesTV)
  //   setTotalPages(response.total_pages)
  //   setSearchVal(search)
  //   setSearch('')
  // }

  function changeHandler(e) {
      setSearch(e.target.value)
  }

  // async function handleMore(e){
  //   const response = await searchAll(searchVal, page+1)
  //   console.log(response)
  //   setResults(current => [...current, ...response.results])
  //   setPage(current => current + 1)
  // }

  const mediaComponents = results.map((media)=>{
    return(
      media.media_type === "movie" ? 
        <div key={media.id}>
          <Link href={`/movies/${media.id}`}>{media.title}</Link>
        </div> :
        <div key={media.id}>
        <Link href={`/tv/${media.id}`}>{media.name}</Link>
      </div>
    )
  })

  function SeeMore(){
      return page < totalPages ? <button className='submit see-more' onClick={handleMore}>See More</button> : <p>No More Results</p>
  }

    return (
      <div>
        <form>
        {/* <form onSubmit = {submitHandler}> */}
            <input required className="text-input search text-black" placeholder="Search Movie" value={search} onChange={changeHandler}></input>
            {/* <input className= "submit" type="submit" value="Search"></input> */}
            <Link href={pathname + '?' + 'search='+ search +'&' + 'page=1'}>Search</Link>
        </form>
        {(searchVal)? (
            <div>
                <h2>Results: {`${searchVal}`}</h2>
                <div className="container">{mediaComponents}</div>
                {mediaComponents.length !== 0 ? (<SeeMore/>) : null}
            </div>
        ): null
        }
        {(mediaComponents.length === 0) ? (<div>{error}</div>):  null}
      </div>
    )
  }
  
  export default Search