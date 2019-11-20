import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {Emergencia} from '../../../../models/emergencia';
import {UsuarioService} from '../../../../services/usuario.service';
import {UploadService} from '../../../../services/upload.service';
import {EmergenciaService} from '../../../../services/emergencia.service';
import {Ayuda} from '../../../../models/ayuda';
import {AyudaService} from '../../../../services/ayuda.service';
import {NotificacionService} from '../../../../services/notificacion.service';
import {Notificacion} from '../../../../models/notificacion';
import {GLOBAL} from '../../../../services/global';
import {UsuarioVoluntario} from '../../../../models/usuarioVoluntario';
declare var $:any;
@Component({
  selector: 'app-perfil-emergencia',
  templateUrl: './perfil-emergencia.component.html',
  styleUrls: ['./perfil-emergencia.component.css'],
  providers:[UsuarioService,UploadService,AyudaService,NotificacionService]
})
export class PerfilEmergenciaComponent implements OnInit {
  public identity;
  public token;
  public url;
  public emergencia:Emergencia;
  public emergenciaB:Emergencia;
  public ayudaB:Ayuda;
  public ayuda:Ayuda;
  public notificacion:Notificacion;
  public statusAyuda;
  public advertenciaAyuda;
  public mensajeAyuda;
  public nAyuda;

  public statusVolun;
  public advertenciaVolun;
  public mensajeVolun;
  public nVolun;
  
  public totalVolun;
 
  public voluntarios:UsuarioVoluntario[];

 public idEm;
  constructor(private _route:ActivatedRoute,
    private _router:Router,private _emergenciaService:EmergenciaService, private _usuarioService:UsuarioService,
    private _ayudaService:AyudaService, private _notificacionService:NotificacionService) { 
      this.identity = this._usuarioService.obtIdentity();
      this.token = this._usuarioService.obtToken();
      this.url = GLOBAL.url;
      this.notificacion= new Notificacion("","","","","","","","");
     
      this.advertenciaAyuda = false;
    }

  ngOnInit() {
    this.loadPage();
   /* $(window).on("scroll", function() {
      var scrollHeight = $(document).height();
      var scrollPosition = $(window).height() + $(window).scrollTop();
      if ((scrollHeight - scrollPosition) / scrollHeight === 0) {
          alert("Ha llegado al final de la página");
      }
  });*/
  }

  loadPage(){
    this.statusAyuda = null;
    $('#modalAyudarEmergencia').modal('hide');
    this._route.params.subscribe(params =>{
      let id = params['id'];
     this.idEm = id;
      this.obtEmergencia(id);
      if(this.identity){
        this.obtVoluntarios()
      }
      
    })
  }
  obtVoluntarios(){

    let rol = 2;
    this.advertenciaVolun = true;
    this.statusVolun = 'procesando';
    
    this._usuarioService.obtVoluntariosNP( rol, this.token).subscribe(
      response=>{
        
        if(response.usuarios && response.n == '1'){
          this.nVolun = response.n;
          this.advertenciaVolun = false;
          this.totalVolun = response.total;
          this.voluntarios = response.usuarios;
          this.statusVolun ='success';
         // $('html, body').animate({scrollTop:0},500);


        }else{
          console.log(response.n+"k")
          this.statusVolun = 'error';
          this.mensajeVolun = 'Algo salió mal.'
        }
      },
      error=>{
        var errorMessage = <any>error;
        console.log(errorMessage)
        this.statusVolun = 'error';
        if(errorMessage != null && error.error.n == '2'){
          this.nVolun = error.error.n;
          this.statusVolun = 'error';  
          this.mensajeVolun = 'Lo sentimos, no existe fundaciones registradas.';
        }else if(errorMessage != null && error.error.n == '3'){
          this.nVolun = error.error.n;
          this.statusVolun = 'error';  
          this.mensajeVolun = error.error.message;
        }else{
          this.nVolun = 'n';
          this.statusVolun = 'error';
          this.mensajeVolun = 'Algo salio mal.'
        }
      }
    )
  }

  obtEmergencia(id){
    this._emergenciaService.obtEmergencia(id).subscribe(
      response=>{
        if(response.emergencia){
          this.emergencia = response.emergencia;
          console.log(this.emergencia);
        }
      },
      error=>{
        console.log(<any>error)
      }
    )
  }
  registrarAyuda(form,idEmer){
    idEmer = this.idEm;
    this.advertenciaAyuda = true;
    this.statusAyuda = 'procesando';
     var valoresCheck = [];
     var paraNoti = [];
     $("input[type=checkbox]:checked").each(function(){
       valoresCheck.push({
         
         'voluntarioId':this.value,
       'aprobado':'no'});
       paraNoti.push({
         
         'voluntarioId':this.value});
   });
 
   if(valoresCheck.length >= 1){
     this.emergencia.fundacion = this.identity._id;
     this.emergencia.voluntarios = valoresCheck;
   
     this._emergenciaService.nuevaAyuda(this.emergencia, idEmer, this.token).subscribe(
       response=>{
         if(response.emergencia && response.n == '1'){
           this.notificacion.emergencia = idEmer;
           this.notificacion.idde = this.identity._id;
           this.notificacion.para = paraNoti;
           
           this._notificacionService.registerNotificacion(this.notificacion,'a').subscribe(
             responsee=>{
               if(responsee.notificacion && responsee.n == '1'){
                 
                 this.statusAyuda = 'success';
                 this.mensajeAyuda = 'Ayuda guardada, se notificará a los voluntarios seleccionados para que acepten o rechazen el ayudar en la emergencia.'
                 this.advertenciaAyuda = false;
                 
               }else{
                 this.statusAyuda = 'error';
                 this.mensajeAyuda = 'Algo salió mal, intentalo mas tarde.'
               }
             },
             errore=>{
               if( (errore != null && errore.error.n == '3') || (errore != null && errore.error.n == '2') ){
                 this.statusAyuda ='error';
                 this.mensajeAyuda = errore.error.message;
               }else{
                 this.statusAyuda = 'error';
                 this.mensajeAyuda = 'Algo salió mal al notificar a los voluntarios.';
               }
               
             }
           )
   
         }else{
           this.statusAyuda = 'error';
           this.mensajeAyuda = 'Algo salió mal, intentalo mas tarde.'
         }
       },
       error=>{
         console.log(<any>error);
         if( (error != null && error.error.n == '6') ||  (error != null && error.error.n == '3') || (error != null && error.error.n == '2')){
           this.nAyuda = error.error.n;
           this.statusAyuda ='error';
           this.mensajeAyuda = error.error.message;
         }else{
           this.statusAyuda = 'error';
           this.mensajeAyuda = 'Algo salió mal al procesar al guardar la ayuda';
         }
         
       }
     )
   
   }else{
     this.statusAyuda = 'errorVoluntario';
     this.mensajeAyuda = 'Selecciona al menos 1 voluntario.'
   }
   
  
   }

   marcarAtentida(){
     this._emergenciaService.marcarAtentida(this.emergencia,this.identity._id,this.emergencia._id,this.token).subscribe(
       response=>{
        console.log(response);
        this.obtEmergencia(this.emergencia._id)
       },
       error=>{
        console.log(<any>error);
       }
     )
   }
}
