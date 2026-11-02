# Ejercicio 2: Análisis de PokeAPI

Fecha de consulta: 2 de noviembre de 2026.

## Petición y respuesta

Se realizó una petición **GET** a `https://pokeapi.co/api/v2/pokemon/1`.
El último segmento, `1`, identifica al Pokémon solicitado: Bulbasaur.
La consulta no necesita autenticación ni cuerpo. Se envió `Accept: application/json`.

La API respondió **200 OK**, con `Content-Type: application/json; charset=utf-8`.
El cuerpo es un objeto JSON con datos numéricos, textos, listas y objetos anidados.

## Información obtenida

| Campo | Valor | Interpretación |
| --- | --- | --- |
| `id` | `1` | Identificador de Bulbasaur. |
| `name` | `bulbasaur` | Nombre del recurso. |
| `height` | `7` | Altura en decímetros: **0,7 metros**. |
| `weight` | `69` | Peso en hectogramos: **6,9 kilogramos**. |
| `base_experience` | `64` | Experiencia base que se obtiene al derrotarlo. |
| `types` | `grass`, `poison` | Tipos planta y veneno. |
| `abilities` | `overgrow`, `chlorophyll` | Habilidades posibles; `chlorophyll` tiene `is_hidden: true`. |

Un fragmento de los datos recibidos es:

```json
{
  "id": 1,
  "name": "bulbasaur",
  "height": 7,
  "weight": 69,
  "base_experience": 64
}
```

`types` contiene objetos: el nombre del primer tipo se encuentra en `types[0].type.name`.
`abilities` también es una lista de objetos, y cada uno incluye su nombre y si la habilidad es oculta.

Las estadísticas base se encuentran en `stats`: salud 45, ataque 49, defensa 49,
ataque especial 65, defensa especial 65 y velocidad 45. Cada elemento relaciona
`stat.name` con su valor `base_stat`.

`sprites` contiene enlaces a imágenes; por ejemplo, `sprites.front_default`.
`species` enlaza a otro recurso de la API con información de la especie.
Estos enlaces permiten obtener imágenes y ampliar los datos sin incluir todos los detalles en una sola respuesta.

## Consulta con una colección de Postman

El archivo `pokeapi.postman_collection.json` contiene la petición **GET Bulbasaur**
a la misma URL. No requiere variables ni credenciales.

Para repetirla en la aplicación Postman:

1. Elegir **Import** e importar `pokeapi.postman_collection.json`.
2. Abrir la colección y seleccionar **GET Bulbasaur**.
3. Presionar **Send** y revisar el estado HTTP, los headers y el body JSON.
4. Revisar **Test Results**: se comprueba el código 200, el formato JSON y la identificación de Bulbasaur.

Postman de escritorio no estaba instalado. La colección se ejecutó con **Newman**,
el ejecutor por línea de comandos de colecciones de Postman. El resultado de la
petición real y sus comprobaciones queda registrado en `resultado.json`.
La ejecución devolvió **200 OK y tres comprobaciones aprobadas, sin fallos**.

## Análisis de ambas consultas

Ambas peticiones usan GET sobre el mismo recurso. GET permite consultar los datos:
no crea ni modifica un Pokémon. En las dos consultas se obtuvo el identificador 1,
el nombre `bulbasaur` y los mismos datos principales.

El estado 200 confirma que la solicitud fue atendida correctamente. El header
`Content-Type` indica que el body es JSON; sus campos contienen la información
que se puede seleccionar para mostrar en una aplicación. Para interpretar altura
y peso hay que convertir las unidades indicadas por la documentación.

## Fuentes

- [Respuesta de Bulbasaur](https://pokeapi.co/api/v2/pokemon/1).
- [Documentación de Pokémon y unidades de medida](https://pokeapi.co/docs/v2#pokemon).
- [Newman: ejecución de colecciones de Postman](https://learning.postman.com/docs/reference/newman-cli/command-line-integration-with-newman/).
