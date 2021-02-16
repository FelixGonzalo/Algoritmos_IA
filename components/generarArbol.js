
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

const getEntropiaDelAtributo = (array = []) => {
  let resultado = 0
  array.forEach(obj => {
    resultado += obj.proporcionConjunto*obj.entropia
  });
  return resultado
}

const ganancia = (entropiaSistema, entropiaAtributo) => {
  return entropiaSistema - entropiaAtributo
}

// cargarEjemploDataSet()
// console.log(dataSet)
// getCantidadXvalorDelSistema('no')

// Algoritmo
cargarEjemploDataSet()

var entropiaDelSistema = getEntropia(
  getCantidadXvalorDelSistema('si'), 
  getCantidadXvalorDelSistema('no')
)

var entropiaDelAtributo = getEntropia(
  getCantidadXvalorDelAtributo('si','clima','lluvioso'), 
  getCantidadXvalorDelAtributo('no','clima','lluvioso')
)

console.log(entropiaDelSistema)
console.log('atributo clima:' + entropiaDelAtributo )

var entropiaDelAtributo2 = 0
dataSet.atributos.forEach((nodoAtributo, index) => {
  console.log('--------' + nodoAtributo + '--------')
  dataSet.atributosValores[index].forEach(nodoValor => {
    dataSet.registros.forEach(nodoRegistro => {
      entropiaDelAtributo2 = getEntropia(
        getCantidadXvalorDelAtributo('si',nodoAtributo,nodoValor), 
        getCantidadXvalorDelAtributo('no',nodoAtributo,nodoValor)
      )
    });
    console.log(nodoValor + ' -> ' + entropiaDelAtributo2)
  });
});


