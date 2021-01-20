const resultado = document.getElementById('resultado')
const resultadoDistancia = document.getElementById('distancia')
const form = document.getElementById('form')
const entrada = document.getElementById('ciudadOrigen')

const arrayCiudades = []

const crearCiudad = (id = -1, nombre = 'desconocido', distanciaLineaRecta = -1) => {
    ciudad = {
        id: id,
        nombre: nombre,
        hdlr: distanciaLineaRecta,
        vecinos: [],
        caminos: []
    }
    arrayCiudades.push(ciudad)
    return ciudad
}

const crearVecinos = (nombre = 'desconocido', ciudades = [], distancias = []) => {
    let idCiudad = arrayCiudades.findIndex((obj) => obj.nombre === nombre)
    arrayCiudades[idCiudad].vecinos = ciudades;
    arrayCiudades[idCiudad].caminos = distancias;
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

crearVecinos('Arad', ciudades = [cTimisoara, cSibiu, cZerind], distancias = [118,140,75])
crearVecinos('Bucarest', ciudades = [cGiurgiu,cPitesti,cFagaras,cUrziceni], distancias = [90,101,211,85])
crearVecinos('Craiova', ciudades = [cDobreta,cRimnicucVilcea,cPitesti], distancias = [120,146,138])
crearVecinos('Dobreta', ciudades = [cMehadia,cCraiova], distancias = [75,120])
crearVecinos('Eforie', ciudades = [cHirsova], distancias = [86])
crearVecinos('Fagaras', ciudades = [cSibiu,cBucarest], distancias = [99,211])
crearVecinos('Giurgiu', ciudades = [cBucarest], distancias = [90])
crearVecinos('Hirsova', ciudades = [cEforie,cUrziceni], distancias = [86,98])
crearVecinos('lasi', ciudades = [cNeamt,cVaslui], distancias = [87,92])
crearVecinos('Lugoj', ciudades = [cTimisoara,cMehadia], distancias = [111,70])
crearVecinos('Mehadia', ciudades = [cLugoj,cDobreta], distancias = [70,75])
crearVecinos('Neamt', ciudades = [clasi], distancias = [87])
crearVecinos('Oradea', ciudades = [cZerind,cSibiu], distancias = [71,151])
crearVecinos('Pitesti', ciudades = [cCraiova,cRimnicucVilcea,cBucarest], distancias = [138,97,101])
crearVecinos('Rimnicuc Vilcea', ciudades = [cCraiova,cSibiu,cPitesti], distancias = [146,80,97])
crearVecinos('Sibiu', ciudades = [cArad,cOradea,cFagaras,cRimnicucVilcea], distancias = [140,151,99,80])
crearVecinos('Timisoara', ciudades = [cArad,cLugoj], distancias = [118,111])
crearVecinos('Urziceni', ciudades = [cBucarest,cVaslui,cHirsova], distancias = [85,142,98])
crearVecinos('Vaslui', ciudades = [clasi,cUrziceni], distancias = [92,142])
crearVecinos('Zerind', ciudades = [cArad,cOradea], distancias = [75,71])

const listaOpciones = () => {
    entrada.innerHTML = ''
    arrayCiudades.map((obj) => {
        entrada.innerHTML += `
        <option value="${obj.nombre}">${obj.nombre}</option>
        `
    })
}
listaOpciones()

const algoritmoBusquedaVoraz = (ciudadOrigen = 'desconocido', ciudadDestino = 'desconocido') => {
    try {
        const arrayRuta = []
        let distancia = []
        let sumaDistancia = 0
        let temp = arrayCiudades.filter((obj) => obj.nombre === ciudadOrigen)
        let objCiudadOrigen = temp[0]

        arrayRuta.push(objCiudadOrigen)

        let ciudadElegida = objCiudadOrigen
        let caminoElegido = 0

        while (ciudadElegida.nombre !== ciudadDestino) {
            
            caminoElegido = 0
            ciudadElegida = {
                id: -1,
                nombre: 'temp',
                hdlr: 999999999,
                vecinos: [],
                caminos: []
            }

            let cont = -1
            arrayRuta[arrayRuta.length - 1 ].vecinos.forEach(obj => {
                cont++
                if (obj.hdlr < ciudadElegida.hdlr) {
                    ciudadElegida = obj
                    caminoElegido = arrayRuta[arrayRuta.length - 1 ].caminos[cont]
                }
            });

            arrayRuta.push(ciudadElegida)
            distancia.push(caminoElegido)
            sumaDistancia += caminoElegido
        }

        resultado.innerHTML =''
        cont = -1
        arrayRuta.map((obj) => {
            cont++
            resultado.innerHTML += `
            <li>${obj.nombre}<span class="distanciaRuta">${distancia[cont] != null ? distancia[cont] : ''}</span></li>
            `
        })
        resultadoDistancia.innerHTML = `Distancia: ${sumaDistancia}`
    } catch (error) {
        
    }
}

form.addEventListener('input', (e) => {
    e.preventDefault()
    let ciudadOrigen = entrada.value
    algoritmoBusquedaVoraz(ciudadOrigen, 'Bucarest')
})

