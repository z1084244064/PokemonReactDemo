import logo from './logo.svg';
import './App.css';
import './Components/Lists/lists-style.css'
import Input from './Components/Input/Input-component'
import Lists from './Components/Lists/lists-component';
import React, { useState, useEffect } from 'react';


function App() {
  const [pokemons,setPokemons] = useState([]);
  const [filteredPokemons, setFilteredPokemons] = useState([]);
      
  useEffect(() => {
      fetch("https://pokeapi.co/api/v2/pokemon")
          .then(res => res.json())
          .then(json => {
              json.results.map((result,index) => {
                  result.id = index+1;
              })
              setPokemons(json.results)
              setFilteredPokemons(json.results)
          });
  }, [])

  const onChangeHandler = event =>{
      const comparedPokemons = pokemons.filter(
          pokemon =>{
              return pokemon.name.includes(event.target.value); 
          });
      setFilteredPokemons(comparedPokemons)
  }
  return (
    <div className="App-header">
      <h1>Pokemon</h1>
      <Input onChangeHandler={onChangeHandler}/>
      <Lists pokemonsLists={filteredPokemons} />
    </div>
  );
}

export default App;
