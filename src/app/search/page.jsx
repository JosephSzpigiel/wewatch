'use client'
import { useState } from "react"
import 'dotenv/config'
import { searchMovies } from "../../../lib/TMDBFunctions"

function Search({searchParams}) {

  const [search, setSearch] = useState('')
  const [results, setResults] = useState([])
  const [page, setPage] = useState(1)
  const [searchVal, setSearchVal] = useState('')
  const [error, setError] = useState(false)
  const [totalPages, setTotalPages] = useState(0)

  async function submitHandler(e) {
    e.preventDefault()
    setError('')
    setResults([])
    setPage(1)
    const response = await searchMovies(search, page)
    console.log(response)
    setResults(response.results)
    setTotalPages(response.total_pages)
    setSearchVal(search)
    setSearch('')
  }

  function changeHandler(e) {
      setSearch(e.target.value)
  }

  async function handleMore(e){
    const response = await searchMovies(searchVal, page+1)
    console.log(response)
    setResults(current => [...current, ...response.results])
    setPage(current => current + 1)
  }

  const movieComponents = results.map((movie)=>{
    return <p key={movie.id}>{movie.title}</p>
  })

  function SeeMore(){
      return page < totalPages ? <button className='submit see-more' onClick={handleMore}>See More</button> : <p>No More Results</p>
  }

    return (
      <div>
        <form onSubmit = {submitHandler}>
            <input required className="text-input search text-black" placeholder="Search Movie" value={search} onChange={changeHandler}></input>
            <input className= "submit" type="submit" value="Search"></input>
        </form>
        {(searchVal !== '')? (
            <div>
                <h2>Results: {`${searchVal}`}</h2>
                <div className="container">{movieComponents}</div>
                {movieComponents.length !== 0 ? (<SeeMore/>) : null}
            </div>
        ): null
        }
        {(movieComponents.length === 0) ? (<div>{error}</div>):  null}
      </div>
    )
  }
  
  export default Search