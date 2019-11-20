import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {UsuarioAdoptante} from '../../../models/usuarioAdoptante';
import {UsuarioFundacion} from '../../../models/usuarioFundacion';
import {Codigo} from '../../../models/codigo';
import {Notificacion} from '../../../models/notificacion';
import {UsuarioService} from '../../../services/usuario.service';
import {NotificacionService} from '../../../services/notificacion.service';
import {UploadService} from '../../../services/upload.service';
import {GLOBAL} from '../../../services/global';
import {Mail} from '../../../models/mail';

declare var $:any;
var formEmail:{
  nombreFundacion:any,
  correoFundacion:any,
  idFundacion:any,
  asunto:any,
  contraseniaFundacion:any
}
//declare var FB:any;
@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.css'],
  providers:[UsuarioService,UploadService, NotificacionService]
})
export class RegistrarComponent implements OnInit {

  //variables facebook
  public display;
  public name;
  public imagen;
  public email;
  public mail:Mail;
  private loggedIn: boolean;
  //------
  public usuarioAdoptante:UsuarioAdoptante;
  public usuarioFundacion:UsuarioFundacion;
  public usuarioFundacion2:UsuarioFundacion;
  public notificacion:Notificacion;
  public codi:Codigo;
  public url:string;
  public imgUN:any;
  public imL = false;
  public imgUN2:any;
  public imL2 = false;
  public regFacebook;
  public advertencia;
  public n;
  public status;
  public mensaje;
  public nombress;
  public proRegistro;
  constructor(/*private authService:AuthService,*/
    private _route:ActivatedRoute,
  private _router:Router, private _usuarioService:UsuarioService,private _uploadService:UploadService, private _notificacionService:NotificacionService) {
    this.nombress = 'bien';
    this.proRegistro =null;
    $('html, body').animate({scrollTop:0});
    this.mail = new Mail("","","","","","");

    this.usuarioAdoptante = new UsuarioAdoptante(
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
    )
    this.codi = new Codigo(
      "",
      "",
      "",
      "",
      "",
      ""
    )
    this.usuarioFundacion = new UsuarioFundacion(
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      ""
 
    )
    this.usuarioFundacion2 = new UsuarioFundacion("","","","","","",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      ""
 
    )
    this.notificacion = new Notificacion(
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
     
    )
    this.url = GLOBAL.url;
    this.regFacebook = 'no';
  
   }

  ngOnInit() {
    $('html, body').animate({scrollTop:0});



  
  }

  registrarNotificacion(idde){
    this.notificacion.idde = idde;
    
    this._notificacionService.registerNotificacion(this.notificacion,'f').subscribe(
      response =>{
       
      
        if(response.notificacion && response.notificacion._id){
         
          console.log(response.notificacion);
        }
      },
      error =>{
        console.log(<any>error);
      }
    );
  }
  registrarFundacion2(form){

  }

//Inicio de registro de fundacion
 enviarEmailRF(form){
  this.usuarioFundacion2 = this.usuarioFundacion;
  $('#modalRGLG').modal('hide');
    $('#modalFundacion').modal('show');

    
   if(this.filesToUpload2 != undefined && this.filesToUpload2.length > 0){
    this.advertencia = true;
    this.status = 'procesando';
    this.mail.asunto = "VRFC";
    this.mail.nombreFundacion = this.usuarioFundacion2.nombreFundacion;
    this.mail.contraseniaFundacion = "";
    this.mail.correoFundacion = this.usuarioFundacion2.correoFundacion;

    this._usuarioService.enviarEmail(this.mail).subscribe(
      res=>{
         
         if(res.n == '3'){
          
           console.log(this.usuarioFundacion)
           console.log(this.usuarioFundacion2)
           this.advertencia = false;
         
         }else if(res.n == '1'){
           this.status ='error';
           this.mensaje = res.message;
           
         }else{
           this.status ='error';
           this.mensaje = 'Algo salio mal al enviar el código de verificación.';
         }

       },
       err=>{
         this.status = 'error';
         this.mensaje = err.error.message;
         console.log(<any>err);

       }
     )
   


   }else{
    this.advertencia = true;
     this.status = 'error';
     this.mensaje = 'Por favor, debes subir una imagen';
   }
   
  }

 
  verificarCodigo(){
    this.advertencia = true;
    this.status = 'procesando';
   this._usuarioService.verificarCodigo(this.usuarioFundacion2.correoFundacion, this.codi.codigo,'newUser').subscribe(
     responseC=>{
      if(responseC.n == '1' && responseC.codigo){
        //this.status = 'success';
        console.log(responseC.codigo)


        var fec = new Date(this.usuarioFundacion2.fechaFundacion);
        var fechaFin = fec.toLocaleDateString();
        this.usuarioFundacion2.fechaFundacion = fechaFin;
    this._usuarioService.registerFundacion(this.usuarioFundacion2,'fund').subscribe(
      response =>{
        if(response.usuario && response.usuario._id && response.n == '1'){ 
         
            this._uploadService.makeGileRequest2(this.url+'subir-foto-fundacion/'+response.usuario._id,[],this.filesToUpload2,'logo')
            .then((result:any)=>{
              if(result.n == '5' || result.n == '4' || result.n == '2'  || result.n == '1'){
                this.status='error';
                this.mensaje = result.message;
               
                this._usuarioService.borrarUsuario(response.usuario._id).subscribe(
                  resb=>{ 
                  },
                  errorb=>{
              })
              }else if(result.n == '3'){

                this._usuarioService.eliminarCodigo(responseC.codigo._id).subscribe(
                  response=>{

                  },
                  error=>{

                  }
                )
                this.registrarNotificacion(response.usuario._id);
              
                this.status='success';
                //this.usuarioFundacion = new UsuarioFundacion("","","","","","","","","","","","","","","","","","")
                //this.usuarioFundacion2 = new UsuarioFundacion("","","","","","","","","","","","","","","","","","")
               // this.filesToUpload2 = undefined;
              //  this.imL2 = false;
              //  $("#RGF")[0].reset();
                
              }else{
                this.advertencia = true;
                this.status = 'error';
                this.mensaje = 'Algo salio mal al subir la foto.'
              }



            });
        
        }else if(response.n == '4'|| response.n == '6'){
          
          this.status='error';
          this.mensaje= response.message;
          

        }else {
          this.status='error';
          this.mensaje ='Algo salió mal al procesar el registro, inténtalo mas tarde.';
        }
      },
      error =>{
        console.log(<any>error);
        this.advertencia = true;
        if((error != null && error.error.n == '5') || (error != null && error.error.n == '3') || (error != null && error.error.n == '2')){
          this.status ='error';
          this.mensaje = error.error.message;
        }else{
          this.status = 'error';
          this.mensaje = 'Algo salió mal al procesar el registro.';
        }
        
      }
    );
      
      }else{
        this.status = 'error';
        this.mensaje = 'Falló la verificación del código.'
      }
     },
     error=>{
      
      console.log(<any>error);
      if((error != null && error.error.n == '5')  || (error != null && error.error.n == '3') || (error != null && error.error.n == '2')){
        this.status ='error';
        this.mensaje = error.error.message;
      }else if((error != null && error.error.n == '4')){
        this.advertencia = false;
        this.status ='codIn';
        this.mensaje = error.error.message;
      }else{
        this.advertencia = false;
        this.status ='codIn';
        this.mensaje = 'Algo salió mal al verificar el código, intentalo de nuevo';
      }
     }
   )
  }
  public filesToUpload: Array<File>;
  urls = new Array<string>();
  fileChangeEvent(fileInput:any){
    this.filesToUpload = <Array<File>>fileInput.target.files;
 
     let files = <Array<File>>fileInput.target.files;
    this.urls = [];
     if (files) {
      for (let file of files) {
        let reader = new FileReader();
        reader.onload = (e: any) => {
          this.urls.push(e.target.result);
          this.imgUN = e.target.result;
          this.imL = true;
        }
        reader.readAsDataURL(file);
      }
    }
     if(this.filesToUpload != undefined){
      this.imL = false;
    }
  }

  //para fundaciones
  public filesToUpload2: Array<File>;
  urls2 = new Array<string>();
  fileChangeEvent2(fileInput:any){
    this.filesToUpload2 = <Array<File>>fileInput.target.files;
    
     let files = <Array<File>>fileInput.target.files;
    this.urls2 = [];
     if (files) {
      for (let file of files) {
        let reader = new FileReader();
        reader.onload = (e: any) => {
          this.urls2.push(e.target.result);
          this.imgUN2 = e.target.result;
          this.imL2 = true;
        }
        reader.readAsDataURL(file);
      }
    }
     if(this.filesToUpload2 != undefined){
      this.imL2 = false;
    }
  }

  moveLogin(){
    this._router.navigate(['/login']);
  }
}
