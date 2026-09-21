/**
 * Descripción: Conversión de unidades de medida (metros, pies, pulgadasy yardas)
 * @method convertirUnidades
 * @param {string} id - id del elemento input en el HTML 
 * @param {numero} valor - valor ingresado por el usuario 
 * @return Valor que retorna
 */

function convertirUnidades(id, valor) {
    if(isNaN(valor)) {
        alert("Se ingreso un valor incorrecto: " +id);
    }else if(id=="metro"){
        document.getElementById("pulgada").value = valor * 39.3701;
        document.getElementById("pie").value = valor * 3.28084;
        document.getElementById("yarda").value = valor * 1.09361;   
    }else if(id=="pulgada"){
        document.getElementById("metro").value = valor * 0.0254;
        document.getElementById("pie").value = valor * 0.0833333;
        document.getElementById("yarda").value = valor * 0.0277778;
    }else if(id=="pie"){
        document.getElementById("metro").value = valor * 0.3048;
        document.getElementById("pulgada").value = valor * 12;
        document.getElementById("yarda").value = valor * 0.333333;
    }else if(id=="yarda"){
        document.getElementById("metro").value = valor * 0.9144;
        document.getElementById("pulgada").value = valor * 36;
        document.getElementById("pie").value = valor * 3;
    }
}