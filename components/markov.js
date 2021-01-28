
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

const detenerAlgoritmo = (estadoValidados = []) => {
  if (estadoValidados.length === 0 ) {
    return true
  } else {
    for (let i = 0; i < estadoValidados.length; i++) {
      if (estadoValidados[i] === true) {
          return true;
      }
    }
    return false
  }
}

// const objeto = {
//   etiquetas: ['Movistar','Entel','Claro'],
//   tope: 0.000001,
//   matrizTransicion: [
//     [0.6,0.3,0.3],
//     [0.2,0.5,0.3],
//     [0.2,0.2,0.4]
//   ],
//   estados:[
//     [0.4,0.25,0.35]
//   ],
//   estadosValidados: []
// }

const objeto = {
  etiquetas: ['Movistar','Entel','Claro'],
  tope: 0.000001,
  matrizTransicion: [
    [0.0,0.75,1],
    [0.5,0.0,0],
    [0.5,0.25,0]
  ],
  estados:[
    [0.4,0.5,0.1]
  ],
  estadosValidados: []
}

// algoritmo
let cont = 0
objeto.estadosValidados.push(validarTope(objeto.estados[objeto.estados.length - 1], objeto.estados[objeto.estados.length - 2], objeto.tope)) 
while (detenerAlgoritmo(objeto.estadosValidados[objeto.estadosValidados.length - 1]) && cont < 100) {
  objeto.estados.push(matrizTransicionXestado(objeto.matrizTransicion, objeto.estados[objeto.estados.length - 1]))
  objeto.estadosValidados.push(validarTope(objeto.estados[objeto.estados.length - 1],objeto.estados[objeto.estados.length - 2], objeto.tope)) 
  cont = cont + 1
}



console.log(objeto)