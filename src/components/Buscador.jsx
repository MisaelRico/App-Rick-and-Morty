import React, { useState } from 'react';

const Buscador = ({ onBuscar }) => {
  const [buscarTermino, setBuscarTermino] = useState('');

  const cambiarBusqueda = (event) => {
    setBuscarTermino(event.target.value);
  };

  const enviarBusqueda = (event) => {
    event.preventDefault();
    onBuscar(buscarTermino);
  };

  //filtro de busqueda de personajes
  return (
    <form className='containerBuscador' onSubmit={enviarBusqueda}>
      <input
        type="text"
        placeholder="Buscar especie..."
        value={buscarTermino}
        onChange={cambiarBusqueda}
      />
      <button type="submit">Buscar</button>
    </form>
  );
};

export default Buscador; 

