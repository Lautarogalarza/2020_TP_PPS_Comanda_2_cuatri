import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { HttpClient } from '@angular/common/http';
import emailjs, { EmailJSResponseStatus } from 'emailjs-com';
import { init } from "emailjs-com";
init("user_m3Srsk6lvJNf9LbI1jvG9");

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(public firestore: AngularFirestore, private http: HttpClient) { }

  getDocs(collection: string) {
    return this.firestore.collection(collection).snapshotChanges();
  }

  getDocsPromise(collection: string) {
    return this.firestore.collection(collection).get();
  }

  getDoc(collection: string, documentId: string) {
    return this.firestore.collection(collection).doc(documentId).snapshotChanges();
  }

  getDocPromise(collection: string, documentId: string) {
    return this.firestore.collection(collection).doc(documentId).get();
  }

  getDocQuery(collection: string, key: string, equal: boolean, value: any) {
    return this.firestore.collection(collection, ref => ref.where(key, (equal ? '==' : '<='), value)).snapshotChanges();
  }

  addDoc2(collection: string, documentId: string, doc: any) {
    return this.firestore.collection(collection).doc(documentId).set(doc);
  }

  addDoc(collection: string, doc: any) {
    return this.firestore.collection(collection).add(doc);
  }

  updateDoc(collection: string, documentId: string, obj: any) {
    return this.firestore.collection(collection).doc(documentId).update(obj);
  }

  deleteDoc(collection: string, documentId: string) {
    return this.firestore.collection(collection).doc(documentId).delete();
  }

  sendEmail(usuario: any, mensaje: string) {
  
    let templateParams = {
      nombre_cliente: usuario.nombre,
      Mensaje: mensaje,
      email_cliente: usuario.correo  
    };

    emailjs.send("service_s2g1ax6","template_vwcjsmb", templateParams)
    .then(res => console.log("Correo enviado.", res.status, res.text))
    .catch(error => console.log("Error al enviar.", error));
  }



}
