
// Helpers del dataSet

const dataSet = {
  atributos: [] ,
  atributosValores: [] ,
  atributoObjetivo: 'desconocido',
  registros: []
}

const addAtributo = (nombre ='atributo',valores = ['valor1','valor2']) => {
  dataSet.atributos.push(nombre)
  dataSet.atributosValores.push(valores)
}

const addRegistro = ( arrayDatos = ['valor1','valor2']) => {
  dataSet.registros.push(arrayDatos)
}

const definirObjetivo = ( nombre = 'atributo') => {
  dataSet.atributoObjetivo = nombre
}

const cargarEjemploDataSet = () => {
  addAtributo('clima',valores = ['lluvioso','nublado','soleado'])
  addAtributo('temperatura',valores = ['caliente','templado','frio'])
  addAtributo('humedad',valores = ['alta','normal'])
  addAtributo('vientos',valores = ['false','true'])
  addAtributo('pasear',valores = ['si','no'])

  addRegistro(arrayDatos = ['lluvioso', 'caliente', 'alta', 'false', 'no'])
  addRegistro(arrayDatos = ['lluvioso', 'caliente', 'alta', 'true', 'no'])
  addRegistro(arrayDatos = ['nublado', 'caliente', 'alta', 'false', 'si'])
  addRegistro(arrayDatos = ['soleado', 'templado', 'alta', 'false', 'si'])
  addRegistro(arrayDatos = ['soleado', 'frio', 'normal', 'false', 'si'])
  addRegistro(arrayDatos = ['soleado', 'frio', 'normal', 'true', 'no'])
  addRegistro(arrayDatos = ['nublado', 'frio', 'normal', 'true', 'si'])
  addRegistro(arrayDatos = ['lluvioso', 'templado', 'alta', 'false', 'no'])
  addRegistro(arrayDatos = ['lluvioso', 'frio', 'normal', 'false', 'si'])
  addRegistro(arrayDatos = ['soleado', 'templado', 'normal', 'false', 'si'])
  addRegistro(arrayDatos = ['lluvioso', 'templado', 'normal', 'true', 'si'])
  addRegistro(arrayDatos = ['nublado', 'templado', 'alta', 'true', 'si'])
  addRegistro(arrayDatos = ['nublado', 'caliente', 'normal', 'false', 'si'])
  addRegistro(arrayDatos = ['soleado', 'templado', 'alta', 'true', 'no'])

  definirObjetivo('pasear')
}

// Helpers del algoritmo

const getCantidadXvalorDelSistema = (Xvalor = 'si') => {
  let i = dataSet.atributos.indexOf(dataSet.atributoObjetivo)
  let cont = 0
  dataSet.registros.forEach(obj => {
    if (obj[i] === Xvalor) {
      cont++
    }
  });
  return cont
}

const getCantidadXvalorDelAtributo = (Xvalor = 'si', Atributofiltro = 'ninguno', valorfiltro = 'ninguno') => {
  let i = dataSet.atributos.indexOf(dataSet.atributoObjetivo) 
  let j = dataSet.atributos.indexOf(Atributofiltro) 
  let cont = 0
  dataSet.registros.forEach(obj => {
    if (obj[i] === Xvalor && obj[j] === valorfiltro) {
      cont++
    }
  });
  return cont
}

const getEntropia = (cantSi = 0,cantNo = 0)  => {
  if (cantSi === 0 || cantNo === 0) {
    return 0
  } else {
    let a = cantSi/(cantSi+cantNo)
    let b = cantNo/(cantSi+cantNo)
    return -a*Math.log2(a)-b*Math.log2(b)
  }
} //getEntropia

const getEntropiaDelAtributo = (proporcionesAtributo = [], entropiasAtributo = []) => {
  let resultado = 0
  let cont = 0
  proporcionesAtributo.forEach(obj => {
    resultado += obj * entropiasAtributo[cont]
    cont++
  });
  return resultado
}

const getGanancia = (entropiaSistema, entropiaAtributo) => {
  return entropiaSistema - entropiaAtributo
}

// Algoritmo
cargarEjemploDataSet()

// sistema
var siDelSistema = 0
var noDelSistema = 0
var totalDelSistema = 0
var entropiaDelSistema = 0

siDelSistema = getCantidadXvalorDelSistema('si')
noDelSistema = getCantidadXvalorDelSistema('no')
totalDelSistema = siDelSistema + noDelSistema
entropiaDelSistema = getEntropia(siDelSistema,noDelSistema)
console.log('-------- Sistema --------')
console.log(`${dataSet.atributoObjetivo} si(${siDelSistema}) no(${noDelSistema}) -> ${entropiaDelSistema}`)

// Atributo
var siDelValorAtributo = 0
var noDelValorAtributo = 0
var totalDelValorAtributo = 0
var entropiaDelValorAtributo = 0
var proporcionDelValorAtributo = 0

var entropiasAtributo = []
var proporcionesAtributo = []

var entropiaDelAtributo = 0
var ganancia = 0

dataSet.atributos.forEach((nodoAtributo, index) => {
  if (nodoAtributo !== dataSet.atributoObjetivo) {
    entropiasAtributo = []
    proporcionesAtributo = []
    console.log('--------' + nodoAtributo + '--------')
    dataSet.atributosValores[index].forEach(nodoValor => {
      siDelValorAtributo = getCantidadXvalorDelAtributo('si',nodoAtributo,nodoValor)
      noDelValorAtributo = getCantidadXvalorDelAtributo('no',nodoAtributo,nodoValor)
      totalDelAtributo = siDelValorAtributo + noDelValorAtributo
      entropiaDelValorAtributo = getEntropia(siDelValorAtributo,noDelValorAtributo)
      proporcionDelValorAtributo = totalDelAtributo/totalDelSistema
      entropiasAtributo.push(entropiaDelValorAtributo)
      proporcionesAtributo.push(proporcionDelValorAtributo)
      console.log(`${nodoValor} si(${siDelValorAtributo}) no(${noDelValorAtributo}) -> ${entropiaDelValorAtributo}`)
    });
    entropiaDelAtributo = getEntropiaDelAtributo(proporcionesAtributo, entropiasAtributo)
    ganancia = getGanancia(entropiaDelSistema, entropiaDelAtributo)
    console.log('entropia del atributo: ' + entropiaDelAtributo)
    console.log('ganancia: ' + ganancia)
  }
});


