import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Adopcion} from '../models/adopcion';
import {GLOBAL} from './global';
@Injectable({
  providedIn: 'root'
})
export class AdopcionService {
  public url:string;
  public filtro;
  constructor(public _http:HttpClient) {
    this.url = GLOBAL.url;
   }

   obtAdopcion(id, token):Observable<any>{
    
    let headers = new HttpHeaders().set('Content-Type','application/json')
                                   .set('Authorization',token);
    return this._http.get(this.url+'obtener-adopcion/'+id, {headers:headers});
    
  }
  obtAdopciones(page=1, id, token):Observable<any>{
    
    let headers = new HttpHeaders().set('Content-Type','application/json')
                                   .set('Authorization',token);
    return this._http.get(this.url+'obtener-adopciones/'+id+'/'+page, {headers:headers});
    
  }
  aprobarAdopcion( adopcion:any,id, mid,token):Observable<any>{
    let params = JSON.stringify(adopcion);
    let headers = new HttpHeaders().set('Content-Type','application/json')
                                   .set('Authorization',token);
    
    return this._http.put(this.url+'aprobar-adopcion/'+id+'/'+mid,params,{headers:headers});
  }

  desaprobarAdopcion( adopcion:any,id, mid,token):Observable<any>{
    let params = JSON.stringify(adopcion);
    let headers = new HttpHeaders().set('Content-Type','application/json')
                                   .set('Authorization',token);
    
    return this._http.put(this.url+'desaprobar-adopcion/'+id+'/'+mid,params,{headers:headers});
  }
  filtroAdopciones(id,filtro:any,page = 1):Observable<any>{
    let params = JSON.stringify(filtro);
    let headers = new HttpHeaders().set('Content-Type','application/json');
  
    return this._http.post(this.url+'filtro-adopcion/'+id+'/'+page, params,{headers:headers});
  }
  obtFiltro(){
    let filtro = JSON.parse(localStorage.getItem('busquedaAdopciones')); 
    
    if(filtro != "undefined"){
        this.filtro = filtro;
    }else{
        this.filtro = null;
    }
  
    return this.filtro;
  }
}
