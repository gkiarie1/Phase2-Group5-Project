import React, { useState } from "react";

function SearchBar({onSearch}) {
    const [searchTerm,setSearchTerm]=useState('')

    const handleChange=(e)=>{
        const value=e.target.value
        setSearchTerm(value)
        onSearch(value)
        }

        return (
            <div>
                <input type="text" className="search" value={searchTerm} onChange={handleChange} placeholder="Search tasks"></input>
            </div>
        )

}
export default SearchBar;