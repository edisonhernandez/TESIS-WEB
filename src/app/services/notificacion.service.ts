
import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Notificacion} from '../models/notificacion';
import {GLOBAL} from './global';
@Injectable({
  providedIn: 'root'
})
export class NotificacionService {
  public url:string;
  public identity;
  public token;
  constructor(public _http:HttpClient) { 

    this.url = GLOBAL.url;
  }

  registerNotificacion(notificacion:Notificacion,tipo):Observable<any>{
    let params = JSON.stringify(notificacion);
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.post(this.url+'nueva-notificacion/'+tipo, params, {headers:headers});
    
  }
  obtNotificaciones(page = 1, token,tipo):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json')
                                   .set('Authorization',token);

    return this._http.get(this.url+'obtener-notificaciones/'+page+'/'+tipo, {headers:headers});
  }
  obtALLNotificaciones(page = 1, token):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json')
                                   .set('Authorization',token);

    return this._http.get(this.url+'obtener-todas-notificaciones/'+page, {headers:headers});
  }
  obtALLNotificacionesAD(page = 1, token):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json')
                                   .set('Authorization',token);

    return this._http.get(this.url+'obtener-todas-notificacionesAD/'+page, {headers:headers});
  }
}
