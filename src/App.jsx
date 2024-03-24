import React from "react";
import SearchBar from "./SearchBar";

const handleSearch =(searchTerm) => {
    const filtered =tasks.filter(task=>
    task.taskDetails.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setFilteredTasks(filtered)
}






export default App;