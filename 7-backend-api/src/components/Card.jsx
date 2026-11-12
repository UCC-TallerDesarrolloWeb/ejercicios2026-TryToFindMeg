import '@styles/Card.css';

function Card({ titulo, subtitulo, children }) {
  return (
    <article className="card">
      <h2>{titulo}</h2>
      <p>{subtitulo}</p>
      {children}
    </article>
  );
}

export default Card;
