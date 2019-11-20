import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Mascota} from '../models/mascota';
import {Filtro} from '../models/filtro';
import {GLOBAL} from './global';
@Injectable({
  providedIn: 'root'
})
export class MascotaService {
  public url:string;
  public identity;
  public filtro;
  public filtroFnd;
  public token;
  constructor(public _http:HttpClient) { 
    this.url = GLOBAL.url;
  }

  registerMascota(mascota:Mascota, token,id):Observable<any>{
    let params = JSON.stringify(mascota);
    let headers = new HttpHeaders().set('Content-Type','application/json')
                                   .set('Authorization',token);
    return this._http.post(this.url+'nueva-mascota/'+id, params, {headers:headers});
    
  }
  obtMascotas(page=1):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json');

    return this._http.get(this.url+'obtener-mascotas/'+page, {headers:headers});
  }

  obtMascota(id):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json');

    return this._http.get(this.url+'obtener-mascota/'+id, {headers:headers});
  }

  obtMisMascotas(id, page = 1):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json');

    return this._http.get(this.url+'obtener-mis-mascotas/'+id+'/'+page, {headers:headers});
  }

  obtFotosMascotas(id):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json');

    return this._http.get(this.url+'obtener-fotos-mascota/'+id, {headers:headers});
  }

  actualizarMascota(mascota:Mascota, token,id):Observable<any>{
    let params = JSON.stringify(mascota);
    let headers = new HttpHeaders().set('Content-Type','application/json')
                                   .set('Authorization',token);
    
    return this._http.put(this.url+'actualizar-mascota/'+id+'/'+mascota._id,params,{headers:headers});
}

eliminarMascotaEstado(mascota:Mascota, token,id):Observable<any>{
  let params = JSON.stringify(mascota);
  let headers = new HttpHeaders().set('Content-Type','application/json')
                                 .set('Authorization',token);
  
  return this._http.put(this.url+'eliminar-mascota-estado/'+id,params,{headers:headers});
}
eliminarMascota( token,id):Observable<any>{

  let headers = new HttpHeaders().set('Content-Type','application/json')
                                 .set('Authorization',token);
  
  return this._http.delete(this.url+'eliminar-mascota/'+id,{headers:headers});
}

eliminarFotoMascota(mid,id, file_path, token):Observable<any>{
  let headers = new HttpHeaders().set('Content-Type','application/json')
                                 .set('Authorization',token);
  
  return this._http.delete(this.url+'eliminar-foto-mascota/'+mid+'/'+id+'/'+file_path,{headers:headers});
}
establecerFTM(mid, idF):Observable<any>{
  let headers = new HttpHeaders().set('Content-Type','application/json');

  return this._http.get(this.url+'seleccionFP/'+mid+'/'+idF, {headers:headers});
}
filtroMascotas(filtro:any,page = 1):Observable<any>{
  let params = JSON.stringify(filtro);
  let headers = new HttpHeaders().set('Content-Type','application/json');

  return this._http.post(this.url+'filtro-mascotas/'+page, params,{headers:headers});
}
filtroMascotas2(id,filtro:any,page = 1):Observable<any>{
  let params = JSON.stringify(filtro);
  let headers = new HttpHeaders().set('Content-Type','application/json');

  return this._http.post(this.url+'filtro-mascotas2/'+id+'/'+page, params,{headers:headers});
}
obtFiltro(){
  let filtro = JSON.parse(localStorage.getItem('busquedaMascotas2')); 
  
  if(filtro != "undefined"){
      this.filtro = filtro;
  }else{
      this.filtro = null;
  }

  return this.filtro;
}
obtFiltroMascotasFundacion(){
  let filtro = JSON.parse(localStorage.getItem('busquedaMascotasFnd')); 
  
  if(filtro != "undefined"){
      this.filtroFnd = filtro;
  }else{
      this.filtroFnd = null;
  }

  return this.filtroFnd;
}
}
