/* Conversor de Undidades */
/**
 * Descripción: Conversión de unidades de medida (metros, pies, pulgadasy yardas)
 * @method convertirUnidades
 * @param {string} id - id del elemento input en el HTML 
 * @param {numero} valor - valor ingresado por el usuario 
 * @return Valor que retorna
 */
convertirUnidades = (id, valor) => {
    let metros, pulgadas, pies, yardas;

    valor = valor.replace(",",".");

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

    document.getElementById("metro").value = Math.round(metros * 100) / 100;
    document.getElementById("pulgada").value = Math.round(pulgadas * 100) / 100;
    document.getElementById("pie").value = pies.toFixed(2);
    document.getElementById("yarda").value = yardas.toFixed(2);
}

/* Conversor de Grados y Radianes */
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

/* Mostrar y ocultar un div en el HTML */
/**
 * Descripción: Mostrar u ocultar un div en el HTML.
 * @method mostrarOcultarDiv
 * @param {string} valor - valor del radio button seleccionado por el usuario
 */
mostrarOcultarDiv = (valor) => {
    const displayDiv = valor == "val_mostrar" ? "block" : "none";
    document.getElementById("unDiv").style.display = displayDiv;
    
    /*
    if(valor=="val_mostrar"){
        document.getElementById("unDiv").style.display = "block";
    }else{
        document.getElementById("unDiv").style.display = "none";
    }
    */
}

/* Funciones de operaciones matemáticas */
/**
 * Descripción: Suma de dos números ingresados por el usuario.
 * @method sumar
 */
sumar = () => {
    let sum1, sum2;

    sum1 = Number(document.getElementById("nums1").value);
    sum2 = Number(document.getElementById("nums2").value);

    document.getElementById("totalS").value = sum1 + sum2;
}


/**
 * Descripción: Resta de dos números ingresados por el usuario.
 * @method restar
 */
restar = () => {
    let res1, res2;

    res1 = Number(document.getElementById("numr1").value);
    res2 = Number(document.getElementById("numr2").value);

    document.getElementById("totalR").value = res1 - res2;
}


/**
 * Descripción: Multiplicación de dos números ingresados por el usuario.
 * @method multiplicar
 */
multiplicar = () => {
    let mul1, mul2;

    mul1 = Number(document.getElementById("numm1").value);
    mul2 = Number(document.getElementById("numm2").value);

    document.getElementById("totalM").value = mul1 * mul2;
}


/**
 * Descripción: División de dos números ingresados por el usuario.
 * @method dividir
 */
dividir = () => {
    let div1, div2;

    div1 = Number(document.getElementById("numd1").value);
    div2 = Number(document.getElementById("numd2").value);

    document.getElementById("totalD").value = div1 / div2;
}

