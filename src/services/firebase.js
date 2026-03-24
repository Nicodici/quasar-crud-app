// Este archivo concentra la comunicación con Firestore para la colección de productos.
// La idea es encapsular aquí la lógica de acceso a datos para no repetirla en los componentes.
// Así, los componentes solo consumen métodos como obtener, crear, editar o borrar productos.

// Importamos las utilidades de Firestore que necesitamos para trabajar con documentos.
// collection: referencia una colección.
// addDoc: crea un documento nuevo.
// getDocs: obtiene todos los documentos de una colección.
// updateDoc: actualiza un documento existente.
// deleteDoc: elimina un documento.
// doc: construye la referencia a un documento puntual dentro de una colección.
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from 'firebase/firestore'

// Importamos la instancia de base de datos ya inicializada en la configuración de Firebase.
// Esta instancia es la conexión que luego reutilizamos en todos los métodos del servicio.
import { db } from '../boot/firebase'

// La clase agrupa toda la lógica CRUD relacionada con productos.
// Al centralizar esta lógica, luego es más fácil reutilizarla desde Pinia o desde componentes.
class FirebaseService {
  constructor() {
    // Al crear la instancia del servicio, guardamos una referencia fija a la colección 'productos'.
    // Esto evita volver a reconstruir la referencia en cada método.
    this.collectionRef = collection(db, 'productosCRUD')
  }

  async getAllProducts() {
    // Consultamos todos los documentos existentes en la colección.
    const querySnapshot = await getDocs(this.collectionRef)

    // Firestore devuelve un QuerySnapshot, no un array plano.
    // Por eso transformamos cada documento a un objeto JavaScript común.
    // También agregamos manualmente el id, porque doc.data() no lo incluye.
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
  }

  async addProduct(product) {
    // Creamos un documento nuevo en Firestore con la información recibida.
    // Firestore genera automáticamente el id del documento.
    const docRef = await addDoc(this.collectionRef, product)

    // Devolvemos un objeto normalizado para que quien consuma este método
    // ya tenga el id junto con el resto de los datos del producto creado.
    return { id: docRef.id, ...product }
  }

  async updateProduct(id, product) {
    // Primero construimos una referencia específica al documento que queremos actualizar.
    // Usamos el id recibido para apuntar al producto correcto dentro de la colección.
    const docRef = doc(this.collectionRef, id)

    // updateDoc modifica solo los campos enviados en el objeto product.
    // No reemplaza necesariamente todo el documento si faltan propiedades.
    await updateDoc(docRef, product)

    // Retornamos el objeto actualizado con su id para facilitar el uso desde la UI o el store.
    return { id, ...product }
  }

  async deleteProduct(id) {
    // Igual que en update, armamos la referencia al documento específico que vamos a eliminar.
    const docRef = doc(this.collectionRef, id)

    // Eliminamos el documento de Firestore.
    // Este método no retorna datos porque el producto deja de existir en la base.
    await deleteDoc(docRef)
  }
}

// Exportamos una única instancia del servicio.
// Esto permite reutilizar la misma referencia desde cualquier parte de la aplicación.
export const firebaseService = new FirebaseService()
