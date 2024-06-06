'use client'
import { useState, useEffect } from "react"
import DetailsClient from "@/components/MovieDetailsClient"
import DetailsTV from "@/components/TVDetailsClient"
import 'dotenv/config'
import { searchAll } from "../../../lib/TMDBFunctions"
import Link from "next/link"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import {TvIcon} from "@heroicons/react/20/solid"


function Search() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const searchVal = searchParams.get('search')
  const page = searchParams.get('page')

  const [search, setSearch] = useState('')
  const [results, setResults] = useState([])
  const [error, setError] = useState(false)
  const [totalPages, setTotalPages] = useState(0)
  const [selected, setSelected] = useState(null)

  useEffect(()=>{
    setResults([])
    async function fetchData(){
      if(searchVal){
        const response = await searchAll(searchVal, page)
        const moviesTV = removePeople(response.results)
        setTotalPages(response.total_pages)
        console.log(moviesTV)
        setResults(moviesTV)
      }
    }
    fetchData()
  },[])

  function removePeople(results){
    return(
      results.filter((media)=>{
        return media.media_type === 'movie' | media.media_type === 'tv'
      })
    )
  }

  async function submitHandler(e) {
    e.preventDefault()
    setError('')
    // setResults([])
    router.push(`/search?search=` + search + '&page=1', { scroll: false })
    const response = await searchAll(search, 1)
    const moviesTV = removePeople(response.results)
    setResults(moviesTV)
    setTotalPages(response.total_pages)
    setSearch('')
  }

  function changeHandler(e) {
      setSearch(e.target.value)
  }

  async function handleMore(e){
    const response = await searchAll(searchVal, page+1)
    const moviesTV = removePeople(response.results)
    setResults(current => [...current, ...moviesTV])
    router.push(`/search?search=`+searchVal + '&page=' + (parseInt(page)+1), { scroll: false })
  }

  const handleSelect = media => async function (){
    setSelected(media)
  }

  const mediaComponents = results.map((media)=>{
    return(
        <button key={media.id} onClick={handleSelect(media)} className='w-md h-sm bg-white text-black text-left p-2 w-full'>
          {media.media_type === "movie" ? 'Movie- ' + media.title : 'TV- ' + media.name}
        </button>
    )
  })

  function SeeMore(){
      return (page < totalPages ? 
        <button className='submit see-more' onClick={handleMore}>
          See More
        </button> : 
        <p>No More Results</p>)
  }

    return (
      <div className='grid grid-cols-3'>
        <aside className="border-2 col-span-1">
          <form onSubmit={submitHandler}>
            <div className="flex flex-col justify-center">
              <input required className="text-input w-full text-black block rounded-lg p-1" placeholder="Search Movie" value={search} onChange={changeHandler}></input>
              {/* <Link href={pathname + '?' + 'search='+ search +'&' + 'page=1'}>Search</Link> */}
              <input type="submit" value='Search' className=" bg-white text-black rounded-lg mt-5"></input>
            </div>
          </form>
          {(searchVal)? (
              <div>
                  <h2 className="text-lg bold">Results: {`${searchVal}`}</h2>
                  <div className="border-2 rounded overflow-y-auto h-96">{mediaComponents}</div>
                  {mediaComponents.length !== 0 ? (<SeeMore/>) : null}
              </div>
          ): null
          }
          {(mediaComponents.length === 0) ? (<div>{error}</div>):  null}
        </aside>
        <div className="col-span-2">
          {selected ? 
            selected.media_type === "movie" ? 
            <DetailsClient id={selected.id}/>: <DetailsTV id={selected.id}/> : 
            <p className=" text-center">Search for a Movie or TV show</p>}
        </div>

      </div>
    )
  }
  
  export default Search