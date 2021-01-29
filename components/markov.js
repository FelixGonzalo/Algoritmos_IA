
// helpers

const matrizTransicionXestado = (matrizTransicion = [], estado = []) => {
  let newEstado = []
  let temp = 0
  for (let i = 0; i < matrizTransicion.length; i++) {
    temp = 0
    for (let j = 0; j < matrizTransicion.length; j++) {
      temp += matrizTransicion[i][j] * estado[j]
    }
     newEstado.push(temp)
  }
  return newEstado
}

const restarEstados = (estadoFinal = [], estadoAnterior = []) => {
  let newEstadoResta = []
   for (let i = 0; i < estadoFinal.length; i++) {
    newEstadoResta.push(estadoFinal[i]-estadoAnterior[i])
  }
  return newEstadoResta
}

const validarTope2 = (estadoResta = [], tope = 0.0001) => {
  let newEstadoValidado = []
  for (let i = 0; i < estadoResta.length; i++) {
    if (estadoResta[i] < tope) {
      newEstadoValidado.push(false)
    } else {
      newEstadoValidado.push(true)
    }
  }
  return newEstadoValidado
}

const validarTope = (estadoFinal = [], estadoAnterior = [], tope = 0.0001) => {
  let newEstadoValidado = []
  let estadoTemp = []
  for (let i = 0; i < estadoFinal.length; i++) {
    estadoTemp.push(estadoFinal[i]-estadoAnterior[i])
  }
  for (let i = 0; i < estadoTemp.length; i++) {
    if (estadoTemp[i] < tope) {
      newEstadoValidado.push(false)
    } else {
      newEstadoValidado.push(true)
    }
  }
  return newEstadoValidado
}

const detenerAlgoritmo = (UltimoeEstadoValidado = []) => {
  if (UltimoeEstadoValidado.length === 0 ) {
    return true
  } else {
    for (let i = 0; i < UltimoeEstadoValidado.length; i++) {
      if (UltimoeEstadoValidado[i] === true) {
          return true;
      }
    }
    return false
  }
}

const objeto = {
  etiquetas: ['Movistar','Entel','Claro'],
  tope: 0.000001,
  matrizTransicion: [
    [0.6,0.3,0.3],
    [0.2,0.5,0.3],
    [0.2,0.2,0.4]
  ],
  estados:[
    [0.4,0.25,0.35]
  ],
  estadosRestas: [],
  estadosValidados: []
}

// const objeto = {
//   etiquetas: ['Movistar','Entel','Claro'],
//   tope: 0.000001,
//   matrizTransicion: [
//     [0.0,0.75,1],
//     [0.5,0.0,0],
//     [0.5,0.25,0]
//   ],
//   estados:[
//     [0.4,0.5,0.1]
//   ],
//   estadosRestas: [],
//   estadosValidados: []
// }

// algoritmo
// let cont = 0
// objeto.estadosValidados.push(validarTope(objeto.estados[objeto.estados.length - 1], objeto.estados[objeto.estados.length - 2], objeto.tope)) 
// while (detenerAlgoritmo(objeto.estadosValidados[objeto.estadosValidados.length - 1]) && cont < 100) {
//   objeto.estados.push(matrizTransicionXestado(objeto.matrizTransicion, objeto.estados[objeto.estados.length - 1]))
//   objeto.estadosValidados.push(validarTope(objeto.estados[objeto.estados.length - 1],objeto.estados[objeto.estados.length - 2], objeto.tope)) 
//   cont = cont + 1
// }

// console.log(objeto)


let cont = 0

objeto.estadosRestas.push(restarEstados(objeto.estados[objeto.estados.length - 1], objeto.estados[objeto.estados.length - 2]))
objeto.estadosValidados.push(validarTope2(objeto.estadosRestas[objeto.estadosRestas.length - 1], objeto.tope))

while (detenerAlgoritmo(objeto.estadosValidados[objeto.estadosValidados.length - 1]) && cont < 100) {
  objeto.estados.push(matrizTransicionXestado(objeto.matrizTransicion, objeto.estados[objeto.estados.length - 1]))
  objeto.estadosRestas.push(restarEstados(objeto.estados[objeto.estados.length - 1], objeto.estados[objeto.estados.length - 2]))
  objeto.estadosValidados.push(validarTope2(objeto.estadosRestas[objeto.estadosRestas.length - 1], objeto.tope))
  cont = cont + 1
}

console.log(objeto)