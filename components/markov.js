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

const verificarSuma = (arreglo = []) => {
  let suma = 0
  let estado = true
  arreglo.forEach(obj => {
    suma = 0
    obj.forEach(dato => {
      suma+=dato
    });
    if (suma !== 1) {
      estado = false
    } 
  });
  return estado
}

const crearCaso = (matriz = [[0.6,0.2,0.2],[0.3,0.5,0.2],[0.3,0.3,0.4]], estadoInicial = [0.4,0.25,0.35], tope = 0.000001) => {
  let caso = {
    tope: tope,
    matriz: matriz,
    matrizTransicion: [],
    estados:[
      estadoInicial
    ],
    estadosRestas: [],
    estadosValidados: []
  }
  return caso
}

const algoritmoMarkov = (caso = null, llaveSeguridad = 500) => {
  if (!verificarSuma(caso.matriz)) {
    alert("Las filas de la matriz no suman 1")
  } else if (!verificarSuma(caso.estados)){
    alert("El estado inicial no suma 1")
  } else {
    caso.matrizTransicion = crearMatrizTransicion(caso.matriz)
    caso.estadosRestas.push(restarEstados(caso.estados[caso.estados.length - 1], caso.estados[caso.estados.length - 2]))
    caso.estadosValidados.push(validarTope2(caso.estadosRestas[caso.estadosRestas.length - 1], caso.tope))
    let cont = 0
    while (detenerAlgoritmo(caso.estadosValidados[caso.estadosValidados.length - 1]) && cont < llaveSeguridad) {
      caso.estados.push(matrizTransicionXestado(caso.matrizTransicion, caso.estados[caso.estados.length - 1]))
      caso.estadosRestas.push(restarEstados(caso.estados[caso.estados.length - 1], caso.estados[caso.estados.length - 2]))
      caso.estadosValidados.push(validarTope2(caso.estadosRestas[caso.estadosRestas.length - 1], caso.tope))
      cont++
    }
  }
}

// helpers para UI

const imprimirMatriz = (matriz = [], etiqueta) => {
  etiqueta.innerHTML = ''
  matriz.forEach(obj => {
    obj.forEach(i => {
      etiqueta.innerHTML += i + ' | '
    });
    etiqueta.innerHTML += '<br/>'
  });
  

}

const imprimirEstados = (estados = [], etiqueta) => {
  etiqueta.innerHTML = ''
  let cont = 0
  estados.forEach(obj => {
    let temp = ''
    obj.forEach(i => {
      temp += i.toFixed(6) + ' | '
    })
    etiqueta.innerHTML += `<li>
      P${cont < 10 ? '0' + cont : cont} :
      ${temp}
    </li>
    `
    cont++
  });
}

const resultado_matrizTransicion = document.getElementById('resultado_matrizTransicion')
const resultado_estados = document.getElementById('resultado_estados')
const form = document.getElementById('form')
form.addEventListener("submit", (e) => {
  e.preventDefault()
  try {
    let matriz = JSON.parse(`[${e.target.matriz.value}]`);
    let estadoInicial = JSON.parse(`[${e.target.estado_inicial.value}]`);
    let tope = isNaN(e.target.tope.value) ? tope = 0.001 :  parseFloat(e.target.tope.value)
    let llaveSeguridad = isNaN(e.target.llaveSeguridad.value) ? llaveSeguridad = 2 :  parseInt(e.target.llaveSeguridad.value)

    let miCaso = crearCaso(matriz,estadoInicial,tope)
    algoritmoMarkov(miCaso,llaveSeguridad)
    imprimirMatriz(miCaso.matrizTransicion, resultado_matrizTransicion)
    imprimirEstados(miCaso.estados, resultado_estados) 
    console.log(miCaso)
  } catch (error) {
    alert("Error en la entrada de datos")
  }
})