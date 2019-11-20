import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Donacion} from '../models/donacion';
import {GLOBAL} from './global';
@Injectable({
  providedIn: 'root'
})
export class DonacionService {
  public url:string;
  public filtro
  constructor(public _http:HttpClient) { 
    this.url = GLOBAL.url;
  }

  registerDonacion(donacion:Donacion,tipo, token):Observable<any>{
    console.log(tipo)
    let params = JSON.stringify(donacion);
    let headers = new HttpHeaders().set('Content-Type','application/json')
                                   .set('Authorization',token);
    return this._http.post(this.url+'nueva-donacion/'+tipo, params, {headers:headers});
    
  }

  obtDonaciones(id,page=1, token):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json')
                                    .set('Authorization',token);

    return this._http.get(this.url+'obtener-donaciones/'+id+'/'+page, {headers:headers});
  }

  obtDonacion(id):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json');

    return this._http.get(this.url+'obtener-donacion/'+id, {headers:headers});
  }
  aprobarDonacion( donacion:Donacion,idD, idF,tipo,token):Observable<any>{
    let params = JSON.stringify(donacion);
    let headers = new HttpHeaders().set('Content-Type','application/json')
                                   .set('Authorization',token);
    
    return this._http.put(this.url+'aprobar-donacion/'+idD+'/'+idF+'/'+tipo,params,{headers:headers});
  }

  negarDonacion( donacion:Donacion,idD, idF,token):Observable<any>{
    let params = JSON.stringify(donacion);
    let headers = new HttpHeaders().set('Content-Type','application/json')
                                   .set('Authorization',token);
    
    return this._http.put(this.url+'negar-donacion/'+idD+'/'+idF,params,{headers:headers});
  }
  filtroDonaciones(id,filtro:any,page = 1):Observable<any>{
    let params = JSON.stringify(filtro);
    let headers = new HttpHeaders().set('Content-Type','application/json');
  
    return this._http.post(this.url+'filtro-donacion/'+id+'/'+page, params,{headers:headers});
  }
  obtFiltroDonacion(){
    let filtro = JSON.parse(localStorage.getItem('busquedaDonaciones')); 
    
    if(filtro != "undefined"){
        this.filtro = filtro;
    }else{
        this.filtro = null;
    }
  
    return this.filtro;
  }
}
