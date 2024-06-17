import React from 'react';

const Personaje = ({ personaje }) => {
  return (
    <div className="personaje">
      <div className='containerNombreImagen'>
        <h2>{personaje.name}</h2>
        <img src={personaje.image} alt={personaje.name} />
      </div>
      <p>Estado: {personaje.status}</p>
      <p>Especie: {personaje.species}</p>
      <p>Origen: {personaje.origin.name}</p>
      <p>Ubicación: {personaje.location.name}</p>
    </div>
  );
};

export default Personaje;


