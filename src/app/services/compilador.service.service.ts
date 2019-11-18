import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http'

import { Api } from '../clases/api.class';

import { map }  from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CompiladorService {
  private api = new Api();


  constructor(private httpClient:HttpClient) { }

  public verificarCompilacion(texto){
    let header = new HttpHeaders();
    header.append('Access-Control-Allow-Origin', 'http://localhost:4200');
    header.append('GET', 'POST');
    header.append('Content-Type', 'application/json');
    header.append('No-Auth', 'True');

    return this.httpClient.post(this.api.urlApi+'compilar',{text:texto},{headers:header}).pipe(map(data => {
        return data['compilacion'];
    }));
  }
}
