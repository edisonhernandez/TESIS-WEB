import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {UsuarioAdoptante} from '../models/usuarioAdoptante';
import {UsuarioVoluntario} from '../models/usuarioVoluntario';
import {UsuarioFundacion} from '../models/usuarioFundacion';
import {PortadaFundacion} from '../models/portadaFundacion';
import {Historia} from '../models/historia';
import {UsuarioLogin} from '../models/UsuarioLogin';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {GLOBAL} from './global';
@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  public url:string;
  public identity;
  public token;
  public filtro;
  constructor(public _http:HttpClient,private _route:ActivatedRoute,
    private _router:Router) { 
      this.url = GLOBAL.url;
    }

    register(usuario:UsuarioAdoptante):Observable<any>{
      let params = JSON.stringify(usuario);
      let headers = new HttpHeaders().set('Content-Type','application/json');
      return this._http.post(this.url+'registrarAdoptante', params, {headers:headers});
      
    }
 
    registerVoluntario(usuario:UsuarioVoluntario,token):Observable<any>{
     let params = JSON.stringify(usuario);
     let headers = new HttpHeaders().set('Content-Type','application/json')
                                    .set('Authorization',token);
     return this._http.post(this.url+'registrarVoluntario', params, {headers:headers});
   }
   validarUsuarioF(usuario:UsuarioFundacion):Observable<any>{
    let params = JSON.stringify(usuario);
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.post(this.url+'validar-usuarioF', params, {headers:headers});
    
  }
  validarUsuarioV(usuario:any):Observable<any>{
    let params = JSON.stringify(usuario);
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.post(this.url+'validar-usuarioV', params, {headers:headers});
    
  }
  validarCorreoF(usuario:any):Observable<any>{
    let params = JSON.stringify(usuario);
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.post(this.url+'validar-correoF', params, {headers:headers});
    
  }
  validarCedulaE(usuario:any):Observable<any>{
    let params = JSON.stringify(usuario);
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.post(this.url+'validar-cedula', params, {headers:headers});
    
  }

  actualizarFundacion(usuario:UsuarioFundacion):Observable<any>{
    let params = JSON.stringify(usuario);
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.post(this.url+'actualizar-fundacion', params, {headers:headers});
    
  }
  validarNombreF(usuario:UsuarioFundacion):Observable<any>{
    let params = JSON.stringify(usuario);
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.post(this.url+'validar-nombreF', params, {headers:headers});
    
  }
    registerFundacion(usuario:UsuarioFundacion,type):Observable<any>{
     let params = JSON.stringify(usuario);
     let headers = new HttpHeaders().set('Content-Type','application/json');
     return this._http.post(this.url+'registrarFundacion/'+type, params, {headers:headers});
     
   }
   actualizarUsuario(usuario,id,token):Observable<any>{
     let params = JSON.stringify(usuario);
     let headers = new HttpHeaders().set('Content-Type','application/json')
                                    .set('Authorization',token);
     
     return this._http.put(this.url+'actualizar-usuario/'+id,params,{headers:headers});
 }
 dsacUsuario(usuario,id,est,token):Observable<any>{
   let params = JSON.stringify(usuario);
   let headers = new HttpHeaders().set('Content-Type','application/json')
                                  .set('Authorization',token);
   
   return this._http.put(this.url+'desact-usuario/'+id+'/'+est,params,{headers:headers});
 }
 actualizarUsuario2(usuario:UsuarioVoluntario,id,token):Observable<any>{
   let params = JSON.stringify(usuario);
   let headers = new HttpHeaders().set('Content-Type','application/json')
                                  .set('Authorization',token);
   
   return this._http.put(this.url+'actualizar-usuario/'+id,params,{headers:headers});
 }
 
 eliminarVoluntarioEstado(usuario:UsuarioVoluntario,id,token):Observable<any>{
   let params = JSON.stringify(usuario);
   let headers = new HttpHeaders().set('Content-Type','application/json')
                                  .set('Authorization',token);
   
   return this._http.put(this.url+'eliminar-voluntario-estado/'+id,params,{headers:headers});
 }
 
   singUp(usuario:UsuarioLogin, gettoken = null):Observable<any>{
     if(gettoken != null){
       usuario.gettoken = gettoken;
 
     }
     let params = JSON.stringify(usuario);
     let headers = new HttpHeaders().set('Content-Type','application/json');
     return this._http.post(this.url+'login', params, {headers:headers});
 
   }
 
   obtIdentity(){
     let identity = JSON.parse(localStorage.getItem('identity')); 
     
     if(identity != "undefined"){
         this.identity = identity;
     }else{
         this.identity = null;
     }
 
     return this.identity;
 }
 
 obtToken(){
   let token = localStorage.getItem('token'); 
   
   if(token != "undefined"){
       this.token = token;
   }else{
       this.token = null;
   }
   return this.token;
 }
 
 obtUsuario(id):Observable<any>{
   let headers = new HttpHeaders().set('Content-Type','application/json');
 
   return this._http.get(this.url+'usuario/'+id,{headers:headers});
 }
 
 obtUsuariosRol(page=null,rol):Observable<any>{
   let headers = new HttpHeaders().set('Content-Type','application/json');
 
   return this._http.get(this.url+'obtener-usuarios-rol/'+rol+'/'+page,{headers:headers});
 }
 obtUsuariosRolSP(rol,token):Observable<any>{

  var tt =      this.obtToken();
  console.log(tt)
   let headers = new HttpHeaders().set('Content-Type','application/json')
                                   .set('Authorization',tt);
 
   return this._http.get(this.url+'usuariosSP/'+rol,{headers:headers});
 }
 obtUsuariosByApellidos(apellidos, token):Observable<any>{
   let headers = new HttpHeaders().set('Content-Type','application/json')
                                 .set('Authorization',token);
 
   return this._http.get(this.url+'usuarios-byapellidos/'+apellidos,{headers:headers});
 }
 
 obtFundacionesByNombre(nombre):Observable<any>{
   let headers = new HttpHeaders().set('Content-Type','application/json');
 
   return this._http.get(this.url+'fundaciones-bynombre/'+nombre,{headers:headers});
 }
 obtVoluntariosByApellidos(apellidos,id):Observable<any>{
  let headers = new HttpHeaders().set('Content-Type','application/json');

  return this._http.get(this.url+'voluntarios-byapellidos/'+apellidos+'/'+id,{headers:headers});
}
 obtVoluntarios(page=null,rol, token):Observable<any>{
   let headers = new HttpHeaders().set('Content-Type','application/json')
                                 .set('Authorization',token);
 
   return this._http.get(this.url+'obtener-voluntarios/'+rol+'/'+page,{headers:headers});
 }
 obtVoluntariosNP(rol, token):Observable<any>{
   let headers = new HttpHeaders().set('Content-Type','application/json')
                                 .set('Authorization',token);
 
   return this._http.get(this.url+'obtener-voluntariosNP/'+rol,{headers:headers});
 }
 obtFundaciones():Observable<any>{
   let headers = new HttpHeaders().set('Content-Type','application/json');
 
   return this._http.get(this.url+'obtener-fundaciones', {headers:headers});
 }
 //fundaciones no aprobadas
 obtFundacionesNa(page=1,token):Observable<any>{
   let headers = new HttpHeaders().set('Content-Type','application/json')
                                  .set('Authorization',token);
 
   return this._http.get(this.url+'obtener-fundaciones-na/'+page, {headers:headers});
 }
 
 //fundacion no aprobada segun id
 obtFundacionNa(id,token):Observable<any>{
   let headers = new HttpHeaders().set('Content-Type','application/json')
                                  .set('Authorization',token);
 
   return this._http.get(this.url+'obtener-fundacion-na/'+id, {headers:headers});
 }
 aprobarFundacion( usuario:UsuarioFundacion,id,token):Observable<any>{
   let params = JSON.stringify(usuario);
   let headers = new HttpHeaders().set('Content-Type','application/json')
                                  .set('Authorization',token);
   
   return this._http.put(this.url+'aprobar-fundacion/'+id,params,{headers:headers});
 }
 
 
 obtPortadasFundacion(id):Observable<any>{
   let headers = new HttpHeaders().set('Content-Type','application/json');
 
   return this._http.get(this.url+'obtener-portadas-fundacion/'+id, {headers:headers});
 }
 
 registerPortada(portada:PortadaFundacion,id,token):Observable<any>{
   let params = JSON.stringify(portada);
   let headers = new HttpHeaders().set('Content-Type','application/json')
                                   .set('Authorization',token);
   return this._http.post(this.url+'registrar-portada/'+id, params, {headers:headers});
   
 }
 borrarPortada(id):Observable<any>{
   let headers = new HttpHeaders().set('Content-Type','application/json');
   return this._http.delete(this.url+'borrar-portada/'+id, {headers:headers});
   
 }
 
 registerHistoria(historia:Historia,id,token):Observable<any>{
   let params = JSON.stringify(historia);
   let headers = new HttpHeaders().set('Content-Type','application/json')
                                   .set('Authorization',token);
   return this._http.post(this.url+'nueva-historia/'+id, params, {headers:headers});
   
 }
 
 obtHistoriasFundacion(id):Observable<any>{
   let headers = new HttpHeaders().set('Content-Type','application/json');
 
   return this._http.get(this.url+'obtener-historias/'+id, {headers:headers});
 }
 eliminarHistoria(id,image):Observable<any>{
   let headers = new HttpHeaders().set('Content-Type','application/json');
   return this._http.delete(this.url+'eliminar-historia/'+id+'/'+image, {headers:headers});
   
 }
 borrarUsuario(id):Observable<any>{
   let headers = new HttpHeaders().set('Content-Type','application/json');
   return this._http.delete(this.url+'borrar-usuario/'+id, {headers:headers});
   
 }
 
 
 desaprobarFundacion(idS,id, token):Observable<any>{
   let headers = new HttpHeaders().set('Content-Type','application/json')
                                  .set('Authorization',token);
   return this._http.delete(this.url+'desaprobar-fundacion/'+idS+'/'+id, {headers:headers});
   
 }
 enviarEmail(form):Observable<any>{
   let params = JSON.stringify(form);
   let headers = new HttpHeaders().set('Content-Type','application/json');
   return this._http.post(this.url+'enviar', params, {headers:headers});
   
 }
 
 verificarCodigo(correo,cd,tipo):Observable<any>{
   let headers = new HttpHeaders().set('Content-Type','application/json');
   return this._http.get(this.url+'verificar-codigo/'+correo+'/'+cd+'/'+tipo, {headers:headers});
 }
 
 obtUsuarioCorreo(usuario):Observable<any>{
   let params = JSON.stringify(usuario);
   let headers = new HttpHeaders().set('Content-Type','application/json');
   return this._http.post(this.url+'obtener-usuario-em', params, {headers:headers});
   
   
 }
 
 enviarCodigoRecover(usuario:UsuarioFundacion,id):Observable<any>{
   let params = JSON.stringify(usuario);
   let headers = new HttpHeaders().set('Content-Type','application/json');
   return this._http.post(this.url+'enviar-codigo-recover/'+id, params, {headers:headers});
   
 }
 
 eliminarCodigo(id):Observable<any>{
   let headers = new HttpHeaders().set('Content-Type','application/json');
   return this._http.delete(this.url+'eliminar-codigo/'+id, {headers:headers});
   
 }
 eliminarLogo(id,file,tipo):Observable<any>{
   let headers = new HttpHeaders().set('Content-Type','application/json');
   return this._http.delete(this.url+'eliminar-logo/'+id+'/'+file+'/'+tipo, {headers:headers});
   
 }
 
 eliminarFundacion(id,token):Observable<any>{
   let headers = new HttpHeaders().set('Content-Type','application/json')
                                   .set('Authorization',token);
   return this._http.delete(this.url+'eliminar-fundacion/'+id, {headers:headers});
   
 }
 cambiarPss(usuario,id):Observable<any>{
   let params = JSON.stringify(usuario);
   let headers = new HttpHeaders().set('Content-Type','application/json');
   return this._http.post(this.url+'cambiar-pass/'+id, params, {headers:headers});
   
 }
 filtroFundaciones(filtro:any,page = 1):Observable<any>{
  let params = JSON.stringify(filtro);
  let headers = new HttpHeaders().set('Content-Type','application/json');

  return this._http.post(this.url+'filtro-fundaciones/'+page, params,{headers:headers});
}
 obtFiltro(){
  let filtro = JSON.parse(localStorage.getItem('busquedaFundacionesSC')); 
  
  if(filtro != "undefined"){
      this.filtro = filtro;
  }else{
      this.filtro = null;
  }

  return this.filtro;
}
}
