
class Arbol {
  constructor(nodo){
    this.raiz = nodo
    this.condiciones = []
    this.cantCond = 0;
  }

  addCondiciones(condiciones = []){
    this.condiciones = condiciones
  }

  recorrer(nodo = null){
    if (nodo !== null) {   
      nodo.hijos.forEach(obj => {
        if (obj.condicion === condiciones[this.cantCond]) {
          this.cantCond++
          console.log(obj.condicion + " - " + obj.contenido)
          this.recorrer(obj)
        }
      });
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

//para probar
// const crearCaso = () => {
//   let caso = {
//     '¿Cliente?':
//     '¿TiempoEsperaEstimado?';
//     '¿Alternativa?':
//     '¿Reserva?':
//     '¿Vier?'
//   }
// }


const c1 = ['Ninguno','>60','']
const c2 = ['Algunos','>60','']
const c3 = ['Lleno','>60']
const c4 = ['Lleno','10-30','No']
const c5 = ['Lleno','10-30','Si','Si','No']

const miArbol = new Arbol(n1)
miArbol.addCondiciones(condiciones=c5)
miArbol.recorrer(miArbol.raiz)