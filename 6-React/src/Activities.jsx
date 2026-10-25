import './Activities.css';

const activities = [
  {
    nombre: 'taekwondo',
    descripcion: 'Arte marcial coreana',
    horarios: [
      { dia: 2, 'hora-inicio': '18:30', 'hora-fin': '20:00' },
      { dia: 4, 'hora-inicio': '18:30', 'hora-fin': '20:00' },
    ],
  },
  {
    nombre: 'zumba',
    descripcion: 'ritmos latinos',
    horarios: [
      { dia: 1, 'hora-inicio': '19:30', 'hora-fin': '20:30' },
      { dia: 3, 'hora-inicio': '19:30', 'hora-fin': '20:30' },
    ],
  },
];

const diasSemana = [
  'Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado',
];

function Activities() {
  function handleInscription(nombreActividad) {
    window.alert(`Inscripto en ${nombreActividad}`);
  }

  return (
    <main className="activities-page">
      <h1>Actividades</h1>
      <div className="activities-container">
        {activities.map((activity) => (
          <article className="activity-card" key={activity.nombre}>
            <h2>{activity.nombre}</h2>
            <p>{activity.descripcion}</p>
            <ul>
              {activity.horarios.map((horario) => (
                <li key={`${horario.dia}-${horario['hora-inicio']}`}>
                  {diasSemana[horario.dia]}: {horario['hora-inicio']} a {horario['hora-fin']}
                </li>
              ))}
            </ul>
            <button type="button" onClick={() => handleInscription(activity.nombre)}>
              Inscribir
            </button>
          </article>
        ))}
      </div>
    </main>
  );
}

export default Activities;
