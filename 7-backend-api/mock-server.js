import jsonServer from 'json-server';
import activitiesData from './src/data/activities.json' with { type: 'json' };
import productData from './src/data/product.json' with { type: 'json' };

const server = jsonServer.create();

server.use(jsonServer.defaults());
server.use(jsonServer.router({ ...activitiesData, ...productData }));

server.listen(4000, '127.0.0.1', () => {
  console.log('API de actividades y productos en http://127.0.0.1:4000');
});
