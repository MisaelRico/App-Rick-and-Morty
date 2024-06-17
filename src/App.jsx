import React, { useState, useEffect } from 'react';
import ListaPersonajes from './components/ListaPersonajes';
import Buscador from './components/Buscador';
import './App.css';
import Logo from './assets/logo.png'

const App = () => {
  const [buscarTermino, setBuscarTermino] = useState('');
  const [todosLosPersonajes, setTodosLosPersonajes] = useState([]); // State for all characters
  const [personajesFiltrados, setPersonajesFiltrados] = useState([]); // State for filtered characters
  const [totalPaginas, setTotalPaginas] = useState(0); // Total pages for all characters

  useEffect(() => {
    buscarTodosLosPersonajes();
  }, []);

  const buscarTodosLosPersonajes = async () => {
    let personajesEncontrados = [];
    let pagina = 1;

    // Personajes de multiples paginas
    while (true) {  
      const response = await fetch(`https://rickandmortyapi.com/api/character?page=${pagina}`);
      const data = await response.json();

      personajesEncontrados = [...personajesEncontrados, ...data.results];

      if (data.info.next === null) {
        break; // No hay pagina siguiente
      }

      pagina++;
    }

    setTodosLosPersonajes(personajesEncontrados);
    setTotalPaginas(Math.ceil(personajesEncontrados.length / 30)); // Se calcula el numero de paginas para que quepan todos los personajes
  };

  const buscarPersonajes = (termino) => {
    setBuscarTermino(termino);
    if (termino) {
      // Filtro de personajes con base a la especie
      const filtro = todosLosPersonajes.filter((personaje) =>
        personaje.species.toLowerCase().includes(termino.toLowerCase())
      );
      setPersonajesFiltrados(filtro);
    } else {
      setPersonajesFiltrados([]); // si el termino esta vacio se limpia el filtro
    }
  };

  return (
    <div className="App">
      
      <div className='containerLogo'>
        <img src={Logo} alt="Rick and Morty logo" width="100%"/>
      </div>

      <Buscador onBuscar={buscarPersonajes} />

      {personajesFiltrados.length > 0 ? (
        <div className="personajes-filtrados">
          <div className='resultadoBusqueda'>
            <h2>Resultados de la búsqueda...</h2>
          </div>
          <ListaPersonajes personajes={personajesFiltrados} />
        </div>
      ) : (
          <ListaPersonajes personajes={todosLosPersonajes}/>
         // Se muestran todos los personajes filtrados
      )}
      {buscarTermino !== '' && personajesFiltrados.length === 0 && ( // Mostrar que no se encontraron coincidencias
        <p>No se encontraron coincidencias para la especie "{buscarTermino}"</p>
      )}
    </div>
  );
};

export default App;


