"use client"

import { ChangeEventHandler, useEffect, useState } from "react";
import { Input } from "./ui/input";
import { fetchLevitas } from "./apiObjects";

/*interface searchTerm {
  value: string,
  searchHandler: ChangeEventHandler,
  placeholder: string
};


const SearchBar = (props: searchTerm) => {
  return (
    <Input type="search" placeholder={props.placeholder} value={props.value} onChange={props.searchHandler}/>
      // <input
      //     type="search"
      //     placeholder={props.placeholder}
      //     value={props.value}
      //     onChange={props.searchHandler}>
      // </input>
  )
}



interface searchData {
  firstName: string,
  lastName: string
}

export const Search = () => {
  const [contentData, setContentData] = useState<searchData[]>([]);
  const [searchContentData, setSearchContentData] = useState<string>('');
  const [searchDataErr, setSearchDataErr] = useState<boolean>(false);

  useEffect(() => {
      const fetchData = async () => {
          try {
              const response = await fetch(`https://hub.dummyapis.com/employee?noofRecords=10&idStarts=1001`);
              const data = await response.json();
              //if fetch works but there is a data mismatch, throw specialized error
              if (!data) { throw new Error("Unable to find data") }
              else { setContentData(data) }
          } catch (error) {
              //catches auto thrown and data mismatch errors
              console.log(error);
              setSearchDataErr(true)
          }
      }
      fetchLevitas();
  }, [])

  const searchHandler: ChangeEventHandler<HTMLInputElement> = (e) => {
      e.preventDefault();
      setSearchContentData(e.currentTarget.value);
  }

  return (
      <div>
          <SearchBar
              value={searchContentData}
              placeholder={`Search by name`}
              searchHandler={searchHandler}
          />

          <div>
              {searchDataErr && <h1>Error loading data, please check URL or console for more details!</h1>}
              <ul>
                  {
                      contentData.filter(person =>
                          person.firstName.toLowerCase().startsWith(searchContentData.toLowerCase()) ||
                          person.lastName.toLowerCase().startsWith(searchContentData.toLowerCase()) ||
                          (`${person.firstName} ${person.lastName}`).toLowerCase().startsWith(searchContentData.toLowerCase())

                      ).map((person, index) => <li key={index}>{person.firstName} {person.lastName}</li>)
                  }
              </ul>
          </div>
      </div>
  )
}

export default Search;*/



/*export function YSearchBar(array : Array<any>) {
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



  /*export function App() {
    const [inputText, setInputText] = useState("");
    let inputHandler = (e: { target: { value: string; }; }) => {
      //convert input text to lower case
      var lowerCase = e.target.value.toLowerCase();
      setInputText(lowerCase);
    };
  
    return (
      <div className="main">
        <h1>React Search</h1>
        <div className="search">
          <Input
            id="outlined-basic"
            onChange={inputHandler}
          />
        </div>
        <List props={""} data={}></List>
      </div>
    );
  }


  export function List(props: string, data: Array<any>) {
    //create a new array by filtering the original array
    const filteredData = data.filter((el) => {
        //if no input the return the original
        if (props === '') {
            return el;
        }
        //return the item which contains the user input
        else {
            return el.text.toLowerCase().includes(props)
        }
    })
    return (
        <ul>
            {filteredData.map((item) => (
                <li key={item.id}>{item.text}</li>
            ))}
        </ul>
    )
}
*/