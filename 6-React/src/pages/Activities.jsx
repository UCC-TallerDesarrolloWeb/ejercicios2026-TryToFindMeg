import { useOutletContext } from 'react-router-dom';
import Card from '@components/Card.jsx';
import { activities, diasSemana } from '@data/activities.js';
import '@styles/Activities.css';

function Activities() {
  const { isLogin } = useOutletContext();

  function handleInscription(nombreActividad) {
    window.alert(`Inscripto en ${nombreActividad}`);
  }

  return (
    <section className="activities-page">
      <h1>Actividades</h1>
      <div className="activities-container">
        {activities.map((activity) => (
          <Card
            key={activity.nombre}
            titulo={activity.nombre}
            subtitulo={activity.descripcion}
          >
            <ul>
              {activity.horarios.map((horario) => (
                <li key={`${horario.dia}-${horario['hora-inicio']}`}>
                  {diasSemana[horario.dia]}: {horario['hora-inicio']} a {horario['hora-fin']}
                </li>
              ))}
            </ul>
            {isLogin && (
              <button type="button" onClick={() => handleInscription(activity.nombre)}>
                Inscribir
              </button>
            )}
          </Card>
        ))}
      </div>
    </section>
  );
}

export default Activities;
