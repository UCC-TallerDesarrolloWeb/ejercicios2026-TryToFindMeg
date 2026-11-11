import { useEffect, useState } from 'react';
import PokeCard from '@components/PokeCard.jsx';
import '@styles/Poke.css';

function Poke() {
  const [pokemon, setPokemon] = useState(null);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    async function loadPokemon() {
      try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon/1', {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error('La consulta a PokeAPI falló.');
        }

        const data = await response.json();
        if (!controller.signal.aborted) {
          setPokemon(data);
        }
      } catch {
        if (!controller.signal.aborted) {
          setHasError(true);
        }
      }
    }

    loadPokemon();
    return () => controller.abort();
  }, []);

  return (
    <section className="poke-page">
      <h1>Pokémon</h1>
      {!pokemon && !hasError && <p role="status">Cargando a Bulbasaur...</p>}
      {hasError && <p role="alert">No se pudo cargar a Bulbasaur. Intentá recargar la página.</p>}
      {pokemon && <PokeCard pokemon={pokemon} />}
    </section>
  );
}

export default Poke;
