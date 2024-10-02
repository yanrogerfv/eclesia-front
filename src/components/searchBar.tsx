"use client"

import { ChangeEventHandler, useEffect, useMemo, useState } from "react";
import { Input } from "./ui/input";
import { fetchLevitas, Levita } from "./apiObjects";

interface props{
  disabled: boolean;
  levitas: Levita[];
}

export const SearchBar = (props: props) => {
  const [searchItem, setSearchItem] = useState("");

  const buscarLevita = useMemo(() => {
    const lowerCase = searchItem.toLowerCase();
    return props.levitas.filter((levita) => levita.nome.toLowerCase().includes(lowerCase));
  }, [searchItem])

  return(
      <Input disabled={props.disabled} className="flex" type="text" 
      value={searchItem} onChange={(e) => setSearchItem(e.target.value)} placeholder="Procure por um Levita" />
  )
}




export function App() {
  const [inputText, setInputText] = useState("");
  let inputHandler = (e: { target: { value: string; }; }) => {
    //convert input text to lower case
    var lowerCase = e.target.value.toLowerCase();
    setInputText(lowerCase);
  };
  <Input className="flex" type="search" onChange={inputHandler}  placeholder="Procure por um Levita" />

  return (
    null
    // <div className="main">
    //   <h1>React Search</h1>
    //   <div className="search">
    //     <Input
    //       id="outlined-basic"
    //       onChange={inputHandler}
    //     />
    //   </div>
    //   <List filter={""} data={[]}></List>
    // </div>
  );
}

interface listProps {
  filter: string,
  data: Array<any>
}
export function List(props: listProps) {
  //create a new array by filtering the original array
  const filteredData = props.data.filter((el) => {
      //if no input the return the original
      if (props.filter === '') {
          return el;
      }
      //return the item which contains the user input
      else {
          return el.text.toLowerCase().includes(props)
      }
  })
  return (
    filteredData
      // <ul>
          // {filteredData.map((item) => (
          //     <li key={item.id}>{item.text}</li>
          // ))}
      // </ul>
  )
}
