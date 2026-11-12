import Card from '@components/Card.jsx';

const typeLabels = {
  bug: 'Bicho',
  fire: 'Fuego',
  flying: 'Volador',
  grass: 'Planta',
  normal: 'Normal',
  poison: 'Veneno',
  water: 'Agua',
};

function PokeCard({ pokemon }) {
  const types = pokemon.types.map(({ type }) => typeLabels[type.name] ?? type.name);
  const image = pokemon.sprites.other?.['official-artwork']?.front_default
    ?? pokemon.sprites.front_default;
  const height = (pokemon.height / 10).toLocaleString('es-AR');
  const weight = (pokemon.weight / 10).toLocaleString('es-AR');

  return (
    <Card titulo={pokemon.name} subtitulo={types.join(' · ')}>
      <div className="poke-card-details">
        {image && (
          <img
            className="poke-card-image"
            src={image}
            alt={pokemon.name}
            width="160"
            height="160"
            loading="lazy"
          />
        )}
        <dl className="poke-card-facts">
          <dt>Número</dt>
          <dd>{pokemon.id}</dd>
          <dt>Altura</dt>
          <dd>{height} m</dd>
          <dt>Peso</dt>
          <dd>{weight} kg</dd>
        </dl>
      </div>
    </Card>
  );
}

export default PokeCard;
