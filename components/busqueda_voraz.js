/*Programar el Algoritmo Voraz para el caso H-DLR, considerando la tabla descrita en teoría
SUG. Almacenar los valores de h(n) y los vecinos de cada ciudad*/

/* 1) Creamos la clase CIUDAD e instanciamos los objetos necesarios */

class Ciudad {
    constructor(id, ciudad, hdlr){
        this.id = id;
        this.ciudad = ciudad;
        this.hdlr = hdlr
        this.rutas = []
    }
}

var c1 = new Ciudad(1,'Arad',366);
var c2 = new Ciudad(2,'Lugoj',244);
var c3 = new Ciudad(3,'Rimnicuc Vilcea',193);
var c4 = new Ciudad(4,'Craiova',160);
var c5 = new Ciudad(5,'Mehadia',241);
var c6 = new Ciudad(6,'Sibiu',253);
var c7 = new Ciudad(7,'Dobreta',242);
var c8 = new Ciudad(8,'Oradea',380);
var c9 = new Ciudad(9,'Timisoara',329);
var c10 = new Ciudad(10,'Fagaras',176);
var c11 = new Ciudad(11,'Pitesti',100);
var c12 = new Ciudad(12,'Zerind',374);
var c13 = new Ciudad(13,'Bucarest',0);

/* 1.1) Agregamos las rutas de cada ciudad */
c1.rutas.push(c6,c9,c12);
c2.rutas.push(c5,c9);
c3.rutas.push(c4,c6,c11);
c4.rutas.push(c3,c7,c11);
c5.rutas.push(c2,c7);
c6.rutas.push(c1,c3,c8,c10);
c7.rutas.push(c4,c5);
c8.rutas.push(c6,c12);
c9.rutas.push(c1,c2);
c10.rutas.push(c6,c13);
c11.rutas.push(c3,c4,c13);
c12.rutas.push(c1,c8);
c13.rutas.push(c10,c11);

/* 2) Algoritmo de busqueda VORAZ */

var ciudadOrigen = c1; // buscar por ID
var ciudadDestino = c13;
var conjS = []; // conjunto S caminoElegido
var conjC = []; // conjunto C ciudades Candidatas

conjC.push(c1,c2,c3,c4,c5,c6,c7,c8,c9,c10,c11,c12,c13);

var condicion = true;
var ciudadElegida = new Ciudad(0,'Temporal',9999); // ciudad con menor valor hdlr

var CONT = 0;
conjS.push(ciudadOrigen);
var i = conjC.indexOf(ciudadOrigen);
conjC.splice(i,1);

while (ciudadDestino.id != ciudadOrigen.id && CONT < 15) {
    CONT +=1
    console.log("////////////////////////////////////////////////////////////////////////iteración " + CONT)

    ciudadOrigen.rutas.forEach(objCiudad => {
        if (objCiudad.hdlr < ciudadElegida.hdlr) {
            ciudadElegida = objCiudad;
        }
    });

    conjS.push(ciudadElegida);
    var i = conjC.indexOf(ciudadElegida);
    conjC.splice(i,1);
    ciudadOrigen = ciudadElegida;
    
    // console.log("ciudad elegida::::")
    // console.log(ciudadElegida)
    // console-console.log("- -----------------------------CONJUNTO C ------");
    // mostrarLista(conjC);
    console-console.log("- -----------------------------CONJUNTO S ------");
    mostrarLista(conjS);
}

function getCiudad(list, id){
    var ciudad = -1;
    list.forEach( obj => {
        if (id === obj.id) {
            ciudad = obj
        }
    });
    return ciudad;
}

function mostrarLista(list){
    list.forEach( obj => {
        console.log(obj);
    });
}