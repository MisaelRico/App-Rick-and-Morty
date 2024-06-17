import React, { useState, useEffect } from 'react';
import Personaje from './Personaje';

//Componente lista de personajes
const ListaPersonajes = ({ personajes }) => {
  const [paginaActual, setPaginaActual] = useState(1);
  const [personajesPorPagina, setPersonajesPagina] = useState([]); 
  const tamañoDePagina = 30; // El numero de personajes se ajusta a 30 por pagina


  useEffect(() => {
    const startIndex = (paginaActual - 1) * tamañoDePagina;
    const endIndex = startIndex + tamañoDePagina;
    setPersonajesPagina(personajes.slice(startIndex, endIndex));
  }, [paginaActual, personajes]);

  const PaginaAnterior = () => {
    if (paginaActual > 1) {
      setPaginaActual((prev) => prev - 1);
    }
  };

  const handleNextPage = () => {
    const totalPaginas = Math.ceil(personajes.length / tamañoDePagina);
    if (paginaActual < totalPaginas) {
      setPaginaActual((prev) => prev + 1);
    }
  };

  return (
    <div className="lista-personajes">
      {personajesPorPagina.map((personaje) => (
        <Personaje key={personaje.id} personaje={personaje} />
      ))}
      <div className="pagination">
          <button disabled={paginaActual === 1} onClick={PaginaAnterior}>
            Anterior
          </button>
          <span>Página {paginaActual} de {Math.ceil(personajes.length / tamañoDePagina)}</span>
          <button disabled={paginaActual === Math.ceil(personajes.length / tamañoDePagina)} onClick={handleNextPage}>
            Siguiente
        </button>
      </div>
    </div>
  );
};

export default ListaPersonajes;






