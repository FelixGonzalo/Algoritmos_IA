
// helpers

const crearMatrizTransicion = (matriz = []) => {
  let matrizTransicion = JSON.parse( JSON.stringify(matriz) )
  for (let i = 0; i < matriz.length; i++) {
    for (let j = 0; j < matriz[i].length; j++) {
      matrizTransicion[j][i] = matriz[i][j]
    }
  }
  return matrizTransicion
}

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
    etiquetas: ['','',''],
    tope: 0.000000001,
    matriz: [
      [0,0.5,0.5],
      [0.75,0,0.25],
      [1,0,0]
    ],
    matrizTransicion: [],
    estados:[
      [0.4,0.5,0.1],
    ],
    estadosRestas: [],
    estadosValidados: []
  }

// Algoritmo
objeto.matrizTransicion = crearMatrizTransicion(objeto.matriz)
const ejecutarAlgoritmo = () => {
  let cont = 0
  objeto.estadosRestas.push(restarEstados(objeto.estados[objeto.estados.length - 1], objeto.estados[objeto.estados.length - 2]))
  objeto.estadosValidados.push(validarTope2(objeto.estadosRestas[objeto.estadosRestas.length - 1], objeto.tope))

  while (detenerAlgoritmo(objeto.estadosValidados[objeto.estadosValidados.length - 1]) && cont < 500) {
    objeto.estados.push(matrizTransicionXestado(objeto.matrizTransicion, objeto.estados[objeto.estados.length - 1]))
    objeto.estadosRestas.push(restarEstados(objeto.estados[objeto.estados.length - 1], objeto.estados[objeto.estados.length - 2]))
    objeto.estadosValidados.push(validarTope2(objeto.estadosRestas[objeto.estadosRestas.length - 1], objeto.tope))
    cont = cont + 1
  }
  console.log(objeto)
}
ejecutarAlgoritmo()
// helpers para UI

const imprimirMatriz = (array = [], etiquetasColumnas = [], etiquetasFilas = []) => {

}

const imprimirTope = () => {

}

const imprimirEstado = () => {
  
}

/*
  const objeto = {
    etiquetas: ['Movistar','Entel','Claro'],
    tope: 0.000001,
    matriz: [
      [0.6,0.2,0.2],
      [0.3,0.5,0.2],
      [0.3,0.3,0.4]
    ],
    matrizTransicion: [],
    estados:[
      [0.4,0.25,0.35],
    ],
    estadosRestas: [],
    estadosValidados: []
  }
*/

/*
const objeto = {
  etiquetas: ['','',''],
  tope: 0.00001,
  matriz: [
    [0,0.5,0.5],
    [0.75,0,0.25],
    [1,0,0]
  ],
  matrizTransicion: [],
  estados:[
    [0.4,0.25,0.35],
  ],
  estadosRestas: [],
  estadosValidados: []
}



*/


/*

const objeto = {
  etiquetas: ['',''],
  tope: 0.00001,
  matriz: [
    [0.15,0.85],
    [0.45,0.55],
  ],
  matrizTransicion: [],
  estados:[
    [0.25,0.75],
  ],
  estadosRestas: [],
  estadosValidados: []
}


*/