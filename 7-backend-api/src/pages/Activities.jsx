import { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import Card from '@components/Card.jsx';
import { diasSemana } from '@data/diasSemana.js';
import '@styles/Activities.css';

function Activities() {
  const { isLogin } = useOutletContext();
  const [activities, setActivities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();

    async function loadActivities() {
      try {
        const response = await fetch('http://127.0.0.1:4000/activities', {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error('Error al obtener las actividades');
        }

        const data = await response.json();
        if (!Array.isArray(data)) {
          throw new Error('Formato de actividades incorrecto');
        }
        setActivities(data);
      } catch {
        if (!controller.signal.aborted) {
          setError('No se pudieron cargar las actividades. Intentá nuevamente más tarde.');
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    }

    loadActivities();
    return () => controller.abort();
  }, []);

  function handleInscription(nombreActividad) {
    window.alert(`Inscripto en ${nombreActividad}`);
  }

  return (
    <section className="activities-page">
      <h1>Actividades</h1>
      {isLoading && <p className="activities-message" role="status">Cargando actividades...</p>}
      {error && <p className="activities-message activities-error" role="alert">{error}</p>}
      {!isLoading && !error && activities.length === 0 && (
        <p className="activities-message" role="status">No hay actividades disponibles.</p>
      )}
      <div className="activities-container">
        {activities.map((activity) => (
          <Card
            key={activity.id}
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
