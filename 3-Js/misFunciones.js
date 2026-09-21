/**
 * Descripción: Conversión de unidades de medida (metros, pies, pulgadasy yardas)
 * @method convertirUnidades
 * @param {string} id - id del elemento input en el HTML 
 * @param {numero} valor - valor ingresado por el usuario 
 * @return Valor que retorna
 */

convertirUnidades = (id, valor) => {
    let metros, pulgadas, pies, yardas;

    if(isNaN(valor)) {
        alert("Se ingreso un valor incorrecto: " +id);
        metros = " ";
        pulgadas = " ";
        pies = " ";
        yardas = " ";
    }else if(id=="metro"){
        metros = valor;
        pulgadas = valor * 39.3701;
        pies = valor * 3.28084;
        yardas = valor * 1.09361;   
    }else if(id=="pulgada"){
        pulgadas = valor;
        metros = valor * 0.0254;
        pies = valor * 0.0833333;
        yardas = valor * 0.0277778;
    }else if(id=="pie"){
        pies = valor;
        metros = valor * 0.3048;
        pulgadas = valor * 12;
        yardas = valor * 0.333333;
    }else if(id=="yarda"){
        yardas = valor;
        metros = valor * 0.9144;
        pulgadas = valor * 36;
        pies = valor * 3;
    }

    document.getElementById("metro").value = metros;
    document.getElementById("pulgada").value = pulgadas;
    document.getElementById("pie").value = pies;
    document.getElementById("yarda").value = yardas;
}

/**
 * Descripción: Conversión de grados a radianas y viceversa.
 * @method convertirGR
 * @param {string} id - id del elemento input en el HTML 
 */
function convertirGR(id) {
    let grad, rad;
    if(id=="grados"){
        grad = document.getElementById("grados").value;
        rad = grad * (Math.PI / 180);
    }else if(id=="radianes"){
        rad = document.getElementById("radianes").value;
        grad = rad * (180 / Math.PI);
    }
    document.getElementById("grados").value = grad;
    document.getElementById("radianes").value = rad;
}