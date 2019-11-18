import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http'

import { Api } from '../clases/api.class';

import { map }  from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ArchivoService {

  api = new Api();


  public archivo = {
    'id':0,
    'id_user':0,
    'nombreArchivo':"",
    'texto':"",
  }

  header = new HttpHeaders();

  constructor( private httpClient:HttpClient ) { 

    this.header.append('Access-Control-Allow-Origin', 'http://localhost:4200');
    this.header.append('GET', 'POST');
    this.header.append('Content-Type', 'application/json');
    this.header.append('No-Auth', 'True');

  }

  public crearArchivo(texto,nombreArchivo){
    let data = {
      'id_user':1,
      'nombreArchivo':nombreArchivo,
      'texto':texto
    }

    return this.httpClient.post(this.api.urlApi+'crearArchivo',data,{headers:this.header}).pipe(map(data=>{
        console.log(data)
        this.archivo = {
          'id': data['id'],
          'id_user':data['id_user'],
          'nombreArchivo':data['nombreArchivo'],
          'texto':data['texto'],
        } 
    }))

  }

  public actualizarArchivo(texto){
    let data = {
      'id':this.archivo['id'],
      'id_user':this.archivo['id_user'],
      'nombreArchivo':this.archivo['nombreArchivo'],
      'texto' : texto
    }

    return this.httpClient.put(this.api.urlApi+'actualizarArchivo',data,{headers:this.header}).pipe(map(data =>{
      console.log(data)
    }))
    
  }

  public listaArchivos(){
    return this.httpClient.get(this.api.urlApi+'archivos',{headers:this.header}).pipe(map(data =>{
      return data;
    }));
  }


  public eliminarArchivo(id){
    return this.httpClient.delete(this.api.urlApi+'eliminarArchivo/'+id,{headers:this.header}).pipe( map( data =>{
        return data['eliminado'];
    }));
  }

}
