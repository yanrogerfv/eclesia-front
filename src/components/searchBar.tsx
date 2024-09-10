"use client"

import { useState } from "react";

export function App(array : Array<any>) {
    const [searchItem, setSearchItem] = useState('')
    const [filteredUsers, setFilteredUsers] = useState(array)
  
    const handleInputChange = (e: { target: { value: any; }; }) => { 
      const searchTerm = e.target.value;
      setSearchItem(searchTerm)
  
      const filteredItems = array.filter((object) =>
      object.nome.toLowerCase().includes(searchTerm.toLowerCase())
      );
  
      setFilteredUsers(filteredItems);
    }
  
    return (
      <>
        <input
          type="text"
          value={searchItem}
          onChange={handleInputChange}
          placeholder='Type to search'
        />
        <ul>
          {filteredUsers.map(user => <li key={user.id}>{user.nome}</li>)}
        </ul>
      </>
    )
  }