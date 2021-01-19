/*Programar el Algoritmo Voraz para el caso H-DLR, considerando la tabla descrita en teoría
SUG. Almacenar los valores de h(n) y los vecinos de cada ciudad*/

const arrayCiudades = []

const crearCiudad = (id = -1, nombre = 'desconocido', distanciaLineaRecta = -1) => {
    ciudad = {
        id: id,
        nombre: nombre,
        hdlr: distanciaLineaRecta,
        rutas: []
    }
    arrayCiudades.push(ciudad)
    return ciudad
}

const crearVecinos = (nombre = 'desconocido', ciudades = []) => {
    let idCiudad = arrayCiudades.findIndex((obj) => obj.nombre === nombre)
    arrayCiudades[idCiudad].rutas = ciudades;
}

const cArad = crearCiudad(1,'Arad',366)
const cBucarest = crearCiudad(2,'Bucarest',0)
const cCraiova = crearCiudad(3,'Craiova',160)
const cDobreta = crearCiudad(4,'Dobreta',242)
const cEforie = crearCiudad(5,'Eforie',161)
const cFagaras = crearCiudad(6,'Fagaras',176)
const cGiurgiu = crearCiudad(7,'Giurgiu',77)
const cHirsova = crearCiudad(8,'Hirsova',151)
const clasi = crearCiudad(9,'lasi',226)
const cLugoj = crearCiudad(10,'Lugoj',244)
const cMehadia = crearCiudad(11,'Mehadia',241);
const cNeamt = crearCiudad(12,'Neamt',234);
const cOradea = crearCiudad(13,'Oradea',380);
const cPitesti = crearCiudad(14,'Pitesti',100);
const cRimnicucVilcea = crearCiudad(15,'Rimnicuc Vilcea',193);
const cSibiu = crearCiudad(16,'Sibiu',253);
const cTimisoara = crearCiudad(17,'Timisoara',329);
const cUrziceni = crearCiudad(18,'Urziceni',80);
const cVaslui = crearCiudad(19,'Vaslui',199);
const cZerind = crearCiudad(20,'Zerind',374);

crearVecinos('Arad', ciudades = [cTimisoara, cSibiu, cZerind])
crearVecinos('Bucarest', ciudades = [cGiurgiu,cPitesti,cFagaras,cUrziceni])
crearVecinos('Craiova', ciudades = [cDobreta,cRimnicucVilcea,cPitesti])
crearVecinos('Dobreta', ciudades = [cMehadia,cCraiova])
crearVecinos('Eforie', ciudades = [cHirsova])
crearVecinos('Fagaras', ciudades = [cSibiu,cBucarest])
crearVecinos('Giurgiu', ciudades = [cBucarest])
crearVecinos('Hirsova', ciudades = [cEforie,cUrziceni])
crearVecinos('lasi', ciudades = [cNeamt,cVaslui])
crearVecinos('Lugoj', ciudades = [cTimisoara,cMehadia])
crearVecinos('Mehadia', ciudades = [cLugoj,cDobreta])
crearVecinos('Neamt', ciudades = [clasi])
crearVecinos('Oradea', ciudades = [cZerind,cSibiu])
crearVecinos('Pitesti', ciudades = [cCraiova,cRimnicucVilcea,cBucarest])
crearVecinos('Rimnicuc Vilcea', ciudades = [cCraiova,cSibiu,cPitesti])
crearVecinos('Sibiu', ciudades = [cArad,cOradea,cFagaras,cRimnicucVilcea])
crearVecinos('Timisoara', ciudades = [cArad,cLugoj])
crearVecinos('Urziceni', ciudades = [cBucarest,cVaslui,cHirsova])
crearVecinos('Vaslui', ciudades = [clasi,cUrziceni])
crearVecinos('Zerind', ciudades = [cArad,cOradea])


const algoritmoBusquedaVoraz = (ciudadOrigen = 'desconocido', ciudadDestino = 'desconocido') => {
    const arrayRuta = []
    let temp = arrayCiudades.filter((obj) => obj.nombre === ciudadOrigen)
    let objCiudadOrigen = temp[0]

    arrayRuta.push(objCiudadOrigen)

    let ciudadElegida = {
        id: -1,
        nombre: 'temp',
        hdlr: 999999999,
        rutas: []
    }

    while (ciudadElegida.nombre !== ciudadDestino) {
        ciudadElegida = {
            id: -1,
            nombre: 'temp',
            hdlr: 999999999,
            rutas: []
        }

        arrayRuta[arrayRuta.length - 1 ].rutas.forEach(obj => {
            if (obj.hdlr < ciudadElegida.hdlr) {
                ciudadElegida = obj
            }
        });
        arrayRuta.push(ciudadElegida)
    }

    console.log(arrayRuta)
}

algoritmoBusquedaVoraz('Arad', 'Bucarest')