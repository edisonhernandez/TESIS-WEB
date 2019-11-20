import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Ayuda} from '../models/ayuda';
import {GLOBAL} from './global';
@Injectable({
  providedIn: 'root'
})
export class AyudaService {
  public url:string;
  constructor(public _http:HttpClient) { 
    this.url = GLOBAL.url;
  }

  registerAyuda(ayuda:Ayuda, token):Observable<any>{
    let params = JSON.stringify(ayuda);
    let headers = new HttpHeaders().set('Content-Type','application/json')
                                   .set('Authorization',token);
    return this._http.post(this.url+'nueva-ayuda', params, {headers:headers});
    
  }
  obtAyuda(id, token):Observable<any>{
    
    let headers = new HttpHeaders().set('Content-Type','application/json')
                                   .set('Authorization',token);
    return this._http.get(this.url+'obtener-ayuda/'+id, {headers:headers});
    
  }
}
