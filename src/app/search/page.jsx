'use client'
import { useState, useEffect } from "react"
import DetailsClient from "@/components/MovieDetailsClient"
import 'dotenv/config'
import { searchAll } from "../../../lib/TMDBFunctions"
import Link from "next/link"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

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
      media.media_type === "movie" ? 
        <div key={media.id} className='w-md h-sm bg-white'>
          <button onClick={handleSelect(media)} className='text-black text-center w-full'>{media.title}</button>
        </div> :
        <div key={media.id} className='w-md bg-white'>
          <button onClick={handleSelect(media)} className='text-black text-center w-full'>{media.name}</button>
        </div>
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
      <div className='flex h-full '>
        <aside className="w-1/3 border-2 h-full">
          <form onSubmit={submitHandler}>
            <input required className="text-input text-black" placeholder="Search Movie" value={search} onChange={changeHandler}></input>
            {/* <Link href={pathname + '?' + 'search='+ search +'&' + 'page=1'}>Search</Link> */}
            <input type="submit" value='search'></input>
          </form>
          {(searchVal)? (
              <div>
                  <h2 className="text-lg bold">Results: {`${searchVal}`}</h2>
                  <div className="border-2 rounded overflow-y-auto">{mediaComponents}</div>
                  {mediaComponents.length !== 0 ? (<SeeMore/>) : null}
              </div>
          ): null
          }
          {(mediaComponents.length === 0) ? (<div>{error}</div>):  null}
        </aside>
        <div>
          {selected ? <DetailsClient id={selected.id}/>: <p>Search for a Movie or TV show</p>}
        </div>

      </div>
    )
  }
  
  export default Search