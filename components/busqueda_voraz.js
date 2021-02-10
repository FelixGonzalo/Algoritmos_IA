const resultadoRutas = document.getElementById('resultado_ruta')
const resultadoDistancia = document.getElementById('resultado_distancia')
const form = document.getElementById('form')
const selectOrigen = document.getElementById('ciudadOrigen')

const mapaRutas = []

const crearCiudad = (id = -1, nombre = 'nombre', distanciaLineaRecta = -1) => {
    ciudad = {
        id: id,
        nombre: nombre,
        hdlr: distanciaLineaRecta,
        vecinos: [],
        caminos: []
    }
    mapaRutas.push(ciudad)
    return ciudad
}

const crearVecinos = (ciudad = 'nombre', vecinos = [], caminos = []) => {
    let idCiudad = mapaRutas.findIndex((obj) => obj.nombre === ciudad)
    mapaRutas[idCiudad].vecinos = vecinos;
    mapaRutas[idCiudad].caminos = caminos;
}

const crearMapaRutas = () => {
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
    const cRimnicucVilcea = crearCiudad(15,'Rimnicuc_Vilcea',193);
    const cSibiu = crearCiudad(16,'Sibiu',253);
    const cTimisoara = crearCiudad(17,'Timisoara',329);
    const cUrziceni = crearCiudad(18,'Urziceni',80);
    const cVaslui = crearCiudad(19,'Vaslui',199);
    const cZerind = crearCiudad(20,'Zerind',374);
    crearVecinos('Arad', vecinos = [cTimisoara, cSibiu, cZerind], caminos = [118,140,75])
    crearVecinos('Bucarest', vecinos = [cGiurgiu,cPitesti,cFagaras,cUrziceni], caminos = [90,101,211,85])
    crearVecinos('Craiova', vecinos = [cDobreta,cRimnicucVilcea,cPitesti], caminos = [120,146,138])
    crearVecinos('Dobreta', vecinos = [cMehadia,cCraiova], caminos = [75,120])
    crearVecinos('Eforie', vecinos = [cHirsova], caminos = [86])
    crearVecinos('Fagaras', vecinos = [cSibiu,cBucarest], caminos = [99,211])
    crearVecinos('Giurgiu', vecinos = [cBucarest], caminos = [90])
    crearVecinos('Hirsova', vecinos = [cEforie,cUrziceni], caminos = [86,98])
    crearVecinos('lasi', vecinos = [cNeamt,cVaslui], caminos = [87,92])
    crearVecinos('Lugoj', vecinos = [cTimisoara,cMehadia], caminos = [111,70])
    crearVecinos('Mehadia', vecinos = [cLugoj,cDobreta], caminos = [70,75])
    crearVecinos('Neamt', vecinos = [clasi], caminos = [87])
    crearVecinos('Oradea', vecinos = [cZerind,cSibiu], caminos = [71,151])
    crearVecinos('Pitesti', vecinos = [cCraiova,cRimnicucVilcea,cBucarest], caminos = [138,97,101])
    crearVecinos('Rimnicuc_Vilcea', vecinos = [cCraiova,cSibiu,cPitesti], caminos = [146,80,97])
    crearVecinos('Sibiu', vecinos = [cArad,cOradea,cFagaras,cRimnicucVilcea], caminos = [140,151,99,80])
    crearVecinos('Timisoara', vecinos = [cArad,cLugoj], caminos = [118,111])
    crearVecinos('Urziceni', vecinos = [cBucarest,cVaslui,cHirsova], caminos = [85,142,98])
    crearVecinos('Vaslui', vecinos = [clasi,cUrziceni], caminos = [92,142])
    crearVecinos('Zerind', vecinos = [cArad,cOradea], caminos = [75,71])
}

const imprimirListaOpcionesOrigen = () => {
    selectOrigen.innerHTML = ''
    mapaRutas.map(obj => selectOrigen.innerHTML += `<option value="${obj.nombre}">${obj.nombre}</option>`)
}

const imprimirRuta = (arrayRuta, caminos, sumaCaminos) => {
    resultadoRutas.innerHTML =''
    cont = -1
    arrayRuta.map((obj) => {
        cont++
        resultadoRutas.innerHTML += `<li>
            ${obj.nombre}
            <span class="distanciaRuta">${caminos[cont] != null ? caminos[cont] : ''}</span>
        </li>`
    })
    resultadoDistancia.innerHTML = `Distancia: ${sumaCaminos}`
}

const algoritmoBusquedaVoraz = (ciudadOrigen = 'nombre', ciudadDestino = 'nombre') => {
    let arrayRuta = []
    let caminos = []
    let sumaCaminos = 0
    let ciudadActual = mapaRutas.filter((obj) => obj.nombre === ciudadOrigen)[0]
    let caminoActual = 0
    let ciudadElegida = null
    let cont = -1
    arrayRuta.push(ciudadActual)
    while (ciudadActual.nombre !== ciudadDestino) {
        ciudadElegida = crearCiudad(-1,'temporal',999999)
        cont = -1
        ciudadActual.vecinos.forEach(obj => {
            cont++
            if (obj.hdlr < ciudadElegida.hdlr) {
                caminoActual = ciudadActual.caminos[cont]
                ciudadElegida = obj 
            }
        });
        ciudadActual = ciudadElegida
        arrayRuta.push(ciudadActual)
        caminos.push(caminoActual)
        sumaCaminos += caminoActual
    }
    imprimirRuta(arrayRuta,caminos, sumaCaminos)
}

crearMapaRutas()
imprimirListaOpcionesOrigen()
form.addEventListener('input', () => algoritmoBusquedaVoraz(selectOrigen.value, 'Bucarest'))
console.log(mapaRutas)