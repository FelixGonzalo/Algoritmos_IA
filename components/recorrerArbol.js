class Arbol {
  constructor(nodo){
    this.raiz = nodo
    this.conjDecisiones = []
    this.contDecisiones = 0
    this.cantSi = 0
    this.cantNo = 0
  }

  addConjDecisiones(conjDecisiones){
    this.conjDecisiones = conjDecisiones
  }

  recorrerConjDecisiones(nodo){
    if (nodo !== null) {
      // en Java Scanner   
      nodo.hijos.forEach(obj => {
        if (obj.condicion === conjDecisiones[this.contDecisiones]) {
          this.contDecisiones++
          console.log(obj.condicion + " - " + obj.contenido)
          this.recorrerConjDecisiones(obj)
        }
      });
    }
  }

  recorrerYcalcularCantSiNo(nodo){
    if (nodo !== null) {
      for (let i = 0; i < nodo.hijos.length; i++) {
        // console.log(nodo.hijos[i].condicion + " - " + nodo.hijos[i].contenido)
        switch (nodo.hijos[i].contenido) {
          case 'No':
              this.cantNo++
            break;
          case 'Si':
              this.cantSi++
            break;
        }
        this.recorrerYcalcularCantSiNo(nodo.hijos[i])
      }
    }
  }

  getEntropia(cantSi = 0,cantNo = 0){
    if (cantSi === 0 || cantNo === 0) {
      return 0
    } else {
      let a = cantSi/(cantSi+cantNo)
      let b = cantNo/(cantSi+cantNo)
      return -a*Math.log2(a)-b*Math.log2(b)
    }
  }
}

class Nodo {
  constructor(condicion,contenido){
    this.condicion = condicion
    this.contenido = contenido
    this.hijos = []
  }

  addHijos(nodos = []) {
    nodos.forEach(obj => {
      this.hijos.push(obj)
    });
  }
}

const n1 = new Nodo('raiz','¿Clientes?')
const n2 = new Nodo('Ninguno','No')
const n3 = new Nodo('Algunos','Si')
const n4 = new Nodo('Lleno','¿TiempoEsperaEstimado?')
const n5 = new Nodo('>60','No')
const n6 = new Nodo('30-60','¿Alternativa?')
const n7 = new Nodo('10-30','¿Hambriento?')
const n8 = new Nodo('0-10','Si')
const n9 = new Nodo('No','¿Reserva?')
const n10 = new Nodo('Si','¿Vier/Sab?')
const n11 = new Nodo('Si','¿Alternativa?')
const n12 = new Nodo('No','¿Bar?')
const n13 = new Nodo('Si','¿Lloviendo?')
const n14 = new Nodo('No','No')
const n15 = new Nodo('Si','Si')
const n16 = new Nodo('No','Si')

n1.addHijos(nodos = [n2,n3,n4])
n4.addHijos(nodos = [n5,n6,n7,n8])
n6.addHijos(nodos = [n9,n10])
n9.addHijos(nodos = [n12,n15])
n12.addHijos(nodos = [n14,n15])
n10.addHijos(nodos = [n14,n15])
n7.addHijos(nodos = [n16,n11])
n11.addHijos(nodos = [n16,n13])
n13.addHijos(nodos = [n14,n15])

const select_opcionesRecorrido = document.getElementById('opciones_recorrido')
const resultado_recorrido = document.getElementById('resultado_recorrido')

const imprimirListaOpcionesRecorrido = (nodo) => {
    select_opcionesRecorrido.innerHTML = ''
    nodo.hijos.map(obj => select_opcionesRecorrido.innerHTML += `<option value="${obj.condicion}">${obj.condicion}</option>`)
}

const imprimirRecorridoPasoApaso = () => {

}



select_opcionesRecorrido.addEventListener('input', () => console.log(select_opcionesRecorrido.value))


const miArbol = new Arbol(n1)


imprimirListaOpcionesRecorrido(miArbol.raiz)

console.log('----Recorrido del árbol de decisiones------')
const conjDecisiones = ['Lleno','10-30','Si','Si','No']
miArbol.addConjDecisiones(conjDecisiones)
miArbol.recorrerConjDecisiones(miArbol.raiz)
console.log('---- Obtener entropía ------')
miArbol.recorrerYcalcularCantSiNo(miArbol.raiz)
console.log('entropia: ' + miArbol.getEntropia(miArbol.cantSi,miArbol.cantNo))
