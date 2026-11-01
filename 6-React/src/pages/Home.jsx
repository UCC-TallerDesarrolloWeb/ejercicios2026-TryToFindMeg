import yogaImg from '@assets/home/yoga.png';
import zumbaImg from '@assets/home/zumba.jpg';
import '@styles/Home.css';

function Home() {
  return (
    <section className="home-page">
      <h1>Información del gym</h1>

      <div className="home-grid">
        <article className="home-card">
          <img
            src="/home/funcional.jpg"
            alt="Personas entrenando fuerza con mancuernas en el gimnasio"
            width="600"
            height="400"
          />
          <h2>Funcional</h2>
        </article>

        <article className="home-card">
          <img
            src="/home/taekwondo.jpg"
            alt="Dos personas practicando taekwondo"
            width="600"
            height="400"
          />
          <h2>Taekwondo</h2>
        </article>

        <article className="home-card">
          <img
            src={yogaImg}
            alt="Clase grupal de yoga sobre colchonetas"
            width="600"
            height="400"
          />
          <h2>Yoga</h2>
        </article>

        <article className="home-card">
          <img
            src={zumbaImg}
            alt="Grupo bailando en una clase de zumba"
            width="600"
            height="400"
          />
          <h2>Zumba</h2>
        </article>
      </div>
    </section>
  );
}

export default Home;
