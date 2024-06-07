import { useState } from "react"

function Pagination({page, totalPages, setPage, newPage}){
    const [pageMax,setPageMax] = useState(5)

    function LeftButton(){
        return (
            <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow" onClick={() => setPageMax(curr => curr - 5)} disabled={pageMax <= 5} >Back</button>
        )
    }

    function RightButton(){
        return (
            <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow" onClick={() => setPageMax(curr => curr + 5)} disabled={pageMax >= totalPages} >Next</button>
        )
    }

    function PageButtons(){
        return (
            <>
                <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow" onClick={() => newPage(pageMax - 4)}>{pageMax - 4}</button>
                <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow" onClick={() => newPage(pageMax - 3)}>{pageMax - 3}</button>
                <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow" onClick={() => newPage(pageMax-2)}>{pageMax - 2}</button>
                <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow" onClick={() => newPage(pageMax - 1)}>{pageMax - 1}</button>
                <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow" onClick={() => newPage(pageMax)}>{pageMax}</button>
            </>
        )
    }
    return (
        <div className="flex justify-center">
            <LeftButton />
            <PageButtons />
            <RightButton />
        </div>
    )
}

export default Pagination