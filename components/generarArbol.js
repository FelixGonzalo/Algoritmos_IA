
// HELPERS DEL DATASET

const crearDataSet = () => {
  return {
    atributos: [] ,
    atributosValores: [] ,
    atributoObjetivo: 'desconocido',
    registros: []
  }
}

const addAtributo = (dataSet, nombre ='atributo',valores = ['valor1','valor2']) => {
  dataSet.atributos.push(nombre)
  dataSet.atributosValores.push(valores)
}

const addRegistro = (dataSet, arrayDatos = ['valor1','valor2']) => {
  dataSet.registros.push(arrayDatos)
}

const definirObjetivo = (dataSet, nombre = 'atributo') => {
  dataSet.atributoObjetivo = nombre
}

const cargarEjemploDataSet = (dataSet) => {
  addAtributo(dataSet,'clima',valores = ['lluvioso','nublado','soleado'])
  addAtributo(dataSet,'temperatura',valores = ['caliente','templado','frio'])
  addAtributo(dataSet,'humedad',valores = ['alta','normal'])
  addAtributo(dataSet,'vientos',valores = ['false','true'])
  addAtributo(dataSet,'pasear',valores = ['si','no'])

  addRegistro(dataSet,arrayDatos = ['lluvioso', 'caliente', 'alta', 'false', 'no'])
  addRegistro(dataSet,arrayDatos = ['lluvioso', 'caliente', 'alta', 'true', 'no'])
  addRegistro(dataSet,arrayDatos = ['nublado', 'caliente', 'alta', 'false', 'si'])
  addRegistro(dataSet,arrayDatos = ['soleado', 'templado', 'alta', 'false', 'si'])
  addRegistro(dataSet,arrayDatos = ['soleado', 'frio', 'normal', 'false', 'si'])
  addRegistro(dataSet,arrayDatos = ['soleado', 'frio', 'normal', 'true', 'no'])
  addRegistro(dataSet,arrayDatos = ['nublado', 'frio', 'normal', 'true', 'si'])
  addRegistro(dataSet,arrayDatos = ['lluvioso', 'templado', 'alta', 'false', 'no'])
  addRegistro(dataSet,arrayDatos = ['lluvioso', 'frio', 'normal', 'false', 'si'])
  addRegistro(dataSet,arrayDatos = ['soleado', 'templado', 'normal', 'false', 'si'])
  addRegistro(dataSet,arrayDatos = ['lluvioso', 'templado', 'normal', 'true', 'si'])
  addRegistro(dataSet,arrayDatos = ['nublado', 'templado', 'alta', 'true', 'si'])
  addRegistro(dataSet,arrayDatos = ['nublado', 'caliente', 'normal', 'false', 'si'])
  addRegistro(dataSet,arrayDatos = ['soleado', 'templado', 'alta', 'true', 'no'])

  definirObjetivo(dataSet,'pasear')
}

// HELPERS PARA EL PROCEDIMIENTO

const crearProcedimientoSistema = (nombre, cantSi,CantNo, entropia) => {
  return {
    sistema: {
      nombre: nombre,
      cantSi: cantSi,
      cantNo: CantNo,
      entropia: entropia,
      atributoDeMayorGanancia: 'Desconocido'
    },
    atributos: [] 
  }
}

const crearProcedimientoAtributo = (nombre, entropiaDelAtributo, ganancia, arrayValores) => {
  return {
    nombre: nombre,
    entropiaDelAtributo: entropiaDelAtributo,
    ganancia: ganancia,
    valores: arrayValores
  }
}

const crearProcedimientoValor = (nombre, cantSi, cantNo, entropia) => {
  return {
    nombre: nombre,
    cantSi: cantSi,
    cantNo: cantNo,
    entropia: entropia
  }
}

// HELPERS PARA EL ALGORITMO

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

const dataSet = crearDataSet()
cargarEjemploDataSet(dataSet)
const procedimientos = []

// del sistema
var siDelSistema = 0
var noDelSistema = 0
var totalDelSistema = 0
var entropiaDelSistema = 0
var atributoDeMayorGanancia = 'Desconocidos'
var temporalGananciaMayor = 0

siDelSistema = getCantidadXvalorDelSistema('si')
noDelSistema = getCantidadXvalorDelSistema('no')
totalDelSistema = siDelSistema + noDelSistema
entropiaDelSistema = getEntropia(siDelSistema,noDelSistema)
// console.log('-------- Sistema --------')
// console.log(`${dataSet.atributoObjetivo} si(${siDelSistema}) no(${noDelSistema}) -> ${entropiaDelSistema}`)

var procedimiento = crearProcedimientoSistema(dataSet.atributoObjetivo, siDelSistema,noDelSistema, entropiaDelSistema)

// del Atributo
var siDelValorAtributo = 0
var noDelValorAtributo = 0
var totalDelValorAtributo = 0
var entropiaDelValorAtributo = 0
var proporcionDelValorAtributo = 0

var entropiasAtributo = []
var proporcionesAtributo = []

var entropiaDelAtributo = 0
var ganancia = 0

dataSet.atributos.forEach((nombreAtributo, index) => {
  if (nombreAtributo !== dataSet.atributoObjetivo) {
    entropiasAtributo = []
    proporcionesAtributo = []

    let arrayProcedimientoValor = []
    let procedimientoValor = null

    // console.log('--------' + nombreAtributo + '--------')
    dataSet.atributosValores[index].forEach(nombreValor => {
      siDelValorAtributo = getCantidadXvalorDelAtributo('si',nombreAtributo,nombreValor)
      noDelValorAtributo = getCantidadXvalorDelAtributo('no',nombreAtributo,nombreValor)
      totalDelAtributo = siDelValorAtributo + noDelValorAtributo
      entropiaDelValorAtributo = getEntropia(siDelValorAtributo,noDelValorAtributo)
      proporcionDelValorAtributo = totalDelAtributo/totalDelSistema
      entropiasAtributo.push(entropiaDelValorAtributo)
      proporcionesAtributo.push(proporcionDelValorAtributo)
      // console.log(`${nombreValor} si(${siDelValorAtributo}) no(${noDelValorAtributo}) -> ${entropiaDelValorAtributo}`)
      
      procedimientoValor = crearProcedimientoValor(nombreValor, siDelValorAtributo, noDelValorAtributo, entropiaDelValorAtributo)
      arrayProcedimientoValor.push(procedimientoValor)

    });
    entropiaDelAtributo = getEntropiaDelAtributo(proporcionesAtributo, entropiasAtributo)
    ganancia = getGanancia(entropiaDelSistema, entropiaDelAtributo)
    // console.log('entropia del atributo: ' + entropiaDelAtributo)
    // console.log('ganancia: ' + ganancia)

    let procedimientoAtributo = crearProcedimientoAtributo(nombreAtributo, entropiaDelAtributo, ganancia, arrayProcedimientoValor)
    procedimiento.atributos.push(procedimientoAtributo)

    if (ganancia > temporalGananciaMayor) {
      temporalGananciaMayor = ganancia
      atributoDeMayorGanancia = nombreAtributo
    }

  }
});

procedimiento.atributoDeMayorGanancia = atributoDeMayorGanancia

procedimientos.push(procedimiento)
console.log(procedimientos)