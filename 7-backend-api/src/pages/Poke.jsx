import { useEffect, useState } from 'react';
import PokeCard from '@components/PokeCard.jsx';
import '@styles/Poke.css';

const pokemonIds = Array.from({ length: 20 }, (_, index) => index + 1);

function Poke() {
  const [pokemonList, setPokemonList] = useState(null);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    async function loadPokemonList() {
      try {
        const requests = pokemonIds.map(async (id) => {
          const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`, {
            signal: controller.signal,
          });

          if (!response.ok) {
            throw new Error('La consulta a PokeAPI falló.');
          }

          return response.json();
        });

        const data = await Promise.all(requests);
        if (!controller.signal.aborted) {
          setPokemonList(data);
        }
      } catch {
        if (!controller.signal.aborted) {
          setHasError(true);
        }
      }
    }

    loadPokemonList();
    return () => controller.abort();
  }, []);

  return (
    <section className="poke-page">
      <h1>Pokémon</h1>
      {!pokemonList && !hasError && <p role="status">Cargando Pokémon...</p>}
      {hasError && <p role="alert">No se pudieron cargar los Pokémon. Intentá recargar la página.</p>}
      {pokemonList && (
        <div className="poke-grid">
          {pokemonList.map((pokemon) => (
            <PokeCard key={pokemon.id} pokemon={pokemon} />
          ))}
        </div>
      )}
    </section>
  );
}

export default Poke;
