// generar arbol de decision

//helpers

const getEntropia = (cantSi = 0,cantNo = 0,cantTotal = 0)  => {
  if (cantSi === 0 || cantNo === 0) {
    return 0
  } else {
    let a = cantSi/cantTotal
    let b = cantNo/cantTotal
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

var cont = 0;
const addRegistro = (registro = []) => {
  // validacion de array sin datos
  cont++
  let newRegistro = {
    id: cont,
    clima: registro[0],
    temperatura:  registro[1],
    humedad: registro[2],
    vientos: registro[3],
    pasear: registro[4]
  }
  dataSet.registros.push(newRegistro)
}

const addAtributo = (nombre ="desconocido",valores = []) => {
  // validacion de array sin datos
  let atributo = {
    nombre: nombre,
    valores: valores
  }
  dataSet.atributos.push(atributo)
}

const cargarDataSet = () => {
  addAtributo('clima',valores = ['lluvioso','nublado','soleado'])
  addAtributo('temperatura',valores = ['caliente','templado','frio'])
  addAtributo('humedad',valores = ['alta','normal'])
  addAtributo('vientos',valores = ['false','true'])
  addAtributo('pasear',valores = ['si','no'])

  addRegistro(registro = ['lluvioso', 'caliente', 'alta', 'false', 'no'])
  addRegistro(registro = ['lluvioso', 'caliente', 'alta', 'true', 'no'])
  addRegistro(registro = ['nublado', 'caliente', 'alta', 'false', 'si'])
  addRegistro(registro = ['soleado', 'templado', 'alta', 'false', 'si'])
  addRegistro(registro = ['soleado', 'frio', 'normal', 'false', 'si'])
  addRegistro(registro = ['soleado', 'frio', 'normal', 'true', 'no'])
  addRegistro(registro = ['nublado', 'frio', 'normal', 'true', 'si'])
  addRegistro(registro = ['lluvioso', 'templado', 'alta', 'false', 'no'])
  addRegistro(registro = ['lluvioso', 'frio', 'normal', 'false', 'si'])
  addRegistro(registro = ['soleado', 'templado', 'normal', 'false', 'si'])
  addRegistro(registro = ['lluvioso', 'templado', 'normal', 'true', 'si'])
  addRegistro(registro = ['nublado', 'templado', 'alta', 'true', 'si'])
  addRegistro(registro = ['nublado', 'caliente', 'normal', 'false', 'si'])
  addRegistro(registro = ['soleado', 'templado', 'alta', 'true', 'no'])

  dataSet.atributoObjetivo = 'pasear'
}

//Algoritmo


// const Resultado = {
//   operaciones: [
//     {
//       AtributoObjetivo: {
//         nombre: 'pasear',
//         cantSi: 9,
//         cantNo:5,
//         cantTotal: 14,
//         entropia: 0.94028,
//       },
//       atributoElegido: 'clima',
//       otrosAtributos: [
//         {
//           nombre: 'clima',
//           entropia: 0.69353,
//           ganancia: 0.24675,
//           valores: [
//             {
//               nombre: 'lluvioso',
//               cantSi: 2,
//               cantNO: 3,
//               cantTotal: 5,
//               proporcionConjunto: 5/14,
//               entropia: 0.97095 
//             }
//           ]
//         }
//       ]
//     }
//   ] ,
//   arbol: [
    
//   ]
// }

const crearOperacionInicial = (nombre, cantSi, cantNo,cantTotal,entropia) => {
  //validar array vacio
  let operacion = {
    atributoObjetivo: {
      nombre: nombre,
      cantSi: cantSi,
      cantNo:cantNo,
      cantTotal: cantTotal,
      entropia: entropia,
    },
    otrosAtributos: [],
    atributoElegido: ''
  }
  resultado.operaciones.push(operacion)
}

const addOperacionAtributo = () => {
  let otroAtributo = {
    nombre: 'clima',
    entropia: 0.69353,
    ganancia: 0.24675,
    valores: [
      {
        nombre: 'lluvioso',
        cantSi: 2,
        cantNO: 3,
        cantTotal: 5,
        proporcionConjunto: 5/14,
        entropia: 0.97095 
      }
    ]
  }
} 

const dataSet = {
  atributos: [] ,
  atributoObjetivo: 'desconocido',
  registros: []
}

const resultado = {
   operaciones: [],
   arbol: []
}

const resetearVariables = () => {
  cantSi = 0 
  cantNo = 0
  cantTotal =  0
  entropia = 0
}

let cantSi = 0 
let cantNo = 0
let cantTotal =  0
let entropia = 0

cargarDataSet()

let i = 0
while (i < 1) {
  resetearVariables()
  // atributo objetivo
  dataSet.registros.forEach(obj => obj.pasear === 'si' ? cantSi++ : cantNo++ ); // calcular cantidad de SI y NO
  cantTotal = cantSi + cantNo
  entropia = getEntropia(cantSi,cantNo,cantTotal)
  crearOperacionInicial('pasear',cantSi, cantNo, cantTotal, entropia)
  // atributo objetivo

  i++
}

console.log(resultado)

// //calculando primer atributo: Lluvioso
//  cantSi = 0 
//  cantNo = 0
//  cantTotal =  0
//  entropiaSistema = 0

// dataSet.registros.forEach(
//   obj => obj.pasear === 'si' && obj.clima === 'lluvioso' ? 
//   cantSi++ : 
//   obj.pasear === 'no' && obj.clima === 'lluvioso' ? 
//   cantNo++ : ''
// ); // calcular cantidad de SI y NO

// cantTotal = cantSi + cantNo
// entropiaSistema = getEntropia(cantSi,cantNo,cantTotal)
// console.log(dataSet)
// console.log(cantSi)
// console.log(cantNo)
// console.log(entropiaSistema)

// //calculando primer atributo: NUBLADO
//  cantSi = 0 
//  cantNo = 0
//  cantTotal =  0
//  entropiaSistema = 0


// dataSet.registros.forEach(
//   obj => obj.pasear === 'si' && obj.clima === 'nublado' ? 
//   cantSi++ : 
//   obj.pasear === 'no' && obj.clima === 'nublado' ? 
//   cantNo++ : ''
// ); // calcular cantidad de SI y NO

// cantTotal = cantSi + cantNo
// entropiaSistema = getEntropia(cantSi,cantNo,cantTotal)
// console.log(dataSet)
// console.log(cantSi)
// console.log(cantNo)
// console.log(entropiaSistema)

// //calculando primer atributo: Soleado
//  cantSi = 0 
//  cantNo = 0
//  cantTotal =  0
//  entropiaSistema = 0


// dataSet.registros.forEach(
//   obj => obj.pasear === 'si' && obj.clima === 'soleado' ? 
//   cantSi++ : 
//   obj.pasear === 'no' && obj.clima === 'soleado' ? 
//   cantNo++ : ''
// ); // calcular cantidad de SI y NO

// cantTotal = cantSi + cantNo
// entropiaSistema = getEntropia(cantSi,cantNo,cantTotal)
// console.log(dataSet)
// console.log(cantSi)
// console.log(cantNo)
// console.log(entropiaSistema)



//calculando primer atributo 2: Soleado
 cantSi = 0 
 cantNo = 0
 cantTotal =  0
 entropiaSistema = 0


dataSet.registros.forEach(
  obj => obj.pasear === 'si' && obj.clima === 'soleado' ? 
  cantSi++ : 
  obj.pasear === 'no' && obj.clima === 'soleado' ? 
  cantNo++ : ''
); // calcular cantidad de SI y NO

cantTotal = cantSi + cantNo
entropiaSistema = getEntropia(cantSi,cantNo,cantTotal)
console.log(dataSet)
console.log(cantSi)
console.log(cantNo)
console.log(entropiaSistema)