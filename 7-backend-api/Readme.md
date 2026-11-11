## Unidad 7: Backend y APIs

### Ejercicio: Mock del Backend
1. En la carpeta donde se encuentre el package.json ejecutar:
```
npm i -D json-server
```
2. Crear el archivo src/data/activities.json con la información necesaria para mockear el servicio.
3. Emplear una terminal para levantar el servidor:
```
npx json-server --watch src/data/activities.json --port 4000
```
4. Modificar el código para que en lugar de leer los datos del js se realice un fetch

### Ejercicio: Análisis de Pokeapi
1. Ingresar a https://pokeapi.co/api/v2/pokemon/1
2. Analizar brevemente la información obtenida
3. Empleando POSTMAN realizar un GET a la misma URL
4. Analizar los datos obtenidos

### Ejercicio: APIs en React
1. Crear un archivo Poke en src/page
2. Crear un archivo PokeCard en src/components
3. En Poke emplear el fetch para obtener los datos de bulbasaur. Usar el useEffect para poder visualizar esos datos.

### Ejercicio: APIs en React
1.  Modificar Poke para llamar a la API de 1 a 20

### Ejercicio: Carrito
1. Si aún no tenemos instalado **json-server** en el **package.json** ejecutar:
```bash
npm i -D json-server
```
2. Crear **product.json** con los datos en **src/data** para separar datos de lógica, y mockear
el servicio **get**.
3. Crear un **Store.jsx** en */pages* que contenga .map para iterar y generar las cards
4. Emplear una terminal para levantar el servidor:
```bash
npm run mock
```
Y otra terminal para levantar el proyecto:
```bash
npm run dev
```
5. Agregar un componente para la ventana con detalle del producto.
6. Crear función **formatPrice** en **src/utils**
7. Modificar la tienda para que el boton de agregar al carrito solo esté disponible cuando el usuario inicio sesión.
8. Modificar el código para que en lugar de leer los datos del **js** se realice un **fetch**
