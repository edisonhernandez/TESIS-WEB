import { Component, OnInit,ViewChild } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {UsuarioLogin} from '../../../models/UsuarioLogin';
import {UsuarioService} from '../../../services/usuario.service';
import {Notificacion} from '../../../models/notificacion';
import {NotificacionService} from '../../../services/notificacion.service';
import {UsuarioFundacion} from '../../../models/usuarioFundacion';
import {Codigo} from '../../../models/codigo';
import {Mail} from '../../../models/mail';
import {UploadService} from '../../../services/upload.service';
import {GLOBAL} from '../../../services/global';
import {FormControl, Validators,FormBuilder,FormGroup} from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';

declare var $:any;
var formEmail:{
  nombreFundacion:any,
  correoFundacion:any,
  idFundacion:any,
  asunto:any,
  contraseniaFundacion:any
}
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers:[UsuarioService,NotificacionService,UploadService]

})
export class LoginComponent implements OnInit {

  //variables proceso de registro
  public statusValid;
  isLinear = true;
  formGr1: FormGroup;
  formGr2: FormGroup;
  formGr3:FormGroup;
  public usuarioLogin:UsuarioLogin;
  public status:string;
  public identity;
  public token;
  public mensaje;
  public proLogin;
  public codi:Codigo;
  public usuarioFundacion:UsuarioFundacion;
  public usuarioFundacion2:UsuarioFundacion;
  public imgUN:any;
  public imL = false;
  public imgUN2:any;
  public imL2 = false;
  public notificacion:Notificacion;
  public mail:Mail;
  public advertencia;
  public url:string;

  public statusIMG;
  @ViewChild('stepper', {static: true}) private myStepper: MatStepper;
  totalStepsCount: number;

  sector2= [
    {value: 'Norte'},
    {value: 'Centro'},
    {value: 'Sur'}
  ];
  minDate = new Date(1980, 0, 1);
  maxDate = new Date();
  rgxPass  = new RegExp("^(?:http(s)?:\\/\\/)?[\\w.-]+(?:\\.[\\w\\.-]+)+[\\w\\-\\._~:/?#[\\]@!\\$&'\\(\\)\\*\\+,;=.]+$")
  rgxPass2  = new RegExp("^(?=.*\\d)(?=.*[\\u0021-\\u002b\\u003c-\\u0040])(?=.*[A-Z])(?=.*[a-z])\\S{8,30}$")
  rgx3 = new RegExp("[\\w ]+")
  rg = new RegExp("^([a-zA-ZñáéíóúñÑ]+[\\s]+[a-zA-ZñáéíóúñÑ]+[\\s]*)+$")
  //nombres = new FormControl('', [Validators.required,  Validators.maxLength(25),Validators.minLength(4)]);
  //fechaFunda = new FormControl('', [Validators.required]);
  

  constructor(private _formBuilder: FormBuilder,private _route:ActivatedRoute,
    private _router:Router, private _usuarioService:UsuarioService,private _notificacionService:NotificacionService,private _uploadService:UploadService) { 
      this.proLogin = null;
      this.usuarioLogin = new UsuarioLogin("","","","" );
      this.identity = this._usuarioService.obtIdentity();
      this.url = GLOBAL.url;
      this.mail = new Mail("","","","","","");
      this.codi = new Codigo(
        "",
        "",
        "",
        "",
        "",
        ""
      )
      this.usuarioFundacion = new UsuarioFundacion("","","","","","","","","","","","","","","","","","","","","","")
      this.usuarioFundacion2 = new UsuarioFundacion("","","","","","","","","","","","","","","","","","","","","","")

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
     
    }
    ngAfterViewInit() {
      this.totalStepsCount = this.myStepper._steps.length;
    }
  ngOnInit() {
    $('html, body').animate({scrollTop:0});
    if(this.identity != null){
      this._router.navigate(['mascotas','todos']);
    }
    
    $(document).ready(()=>{
this.prob()
      
  });
  this.formGr1 = this._formBuilder.group({
    nombres : ['', [Validators.required, Validators.pattern('[a-z A-Z áéíóúÁÉÍÓÚñÑ]+$'), Validators.maxLength(20),Validators.minLength(3)]],
  fechaFunda :['', [Validators.required]],
  representante:['', [Validators.required, Validators.pattern(this.rg), Validators.maxLength(50),Validators.minLength(10)]],

  foto :['', [Validators.required]],


  });
  this.formGr2 = this._formBuilder.group({
    correo2 : ['', [Validators.required, Validators.pattern('[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{1,5}')]],
    password2:['', [Validators.required, Validators.maxLength(30),Validators.minLength(8), Validators.pattern(this.rgxPass2)]],
    telefono :['', [Validators.required,Validators.maxLength(9),Validators.minLength(9),Validators.pattern('[0-9]+$')]],
    celular :['', [Validators.required,Validators.maxLength(10),Validators.minLength(10),Validators.pattern('[0-9]+$')]]


  });
  this.formGr3 = this._formBuilder.group({
  
    sector : ['', [Validators.required]],
    barrio : ['', [Validators.required,Validators.maxLength(50),Validators.minLength(4),Validators.pattern('[0-9 a-z A-Z áéíóúÁÉÍÓÚñÑ . , : ; -]+$')]],
    calleP : ['', [Validators.required,Validators.maxLength(50),Validators.minLength(4),Validators.pattern('[0-9 a-z A-Z áéíóúÁÉÍÓÚñÑ . , : ; -]+$')]],
    calleS : ['', [Validators.required,Validators.maxLength(50),Validators.minLength(4),Validators.pattern('[0-9 a-z A-Z áéíóúÁÉÍÓÚñÑ . , : ; -]+$')]]

  });
  }
  get f() { return this.formGr1.controls; }
  get f2() { return this.formGr2.controls; }
  get f3() { return this.formGr3.controls; }

 
  validarNextStep(op,stepper: MatStepper){


   
   
    if(op == '1'){
      if(this.formGr1.value.foto == ''){
        this.statusIMG = 'error';
      }
      if( /^\s*$/.test(this.formGr1.value.nombres) || /^\s*$/.test(this.formGr1.value.representante)){
       
       this.statusValid = 'errorCampos'
        
  
      }else{
        
        this.statusIMG = '';
        this.statusValid = '';

        var n = this.formGr1.value.nombres.trim();
        var r = this.formGr1.value.representante.trim();
        this.formGr1.controls['nombres'].setValue(n);
        this.formGr1.controls['representante'].setValue(r);
        if(n.length < 3 && r.length < 10){
          this.statusValid = 'errorCampos2T'
        }else if(n.length < 3 && r.length >= 10){
          this.statusValid = 'errorCampos2N'
        }else if(n.length >= 3 && r.length < 10){
          this.statusValid = 'errorCampos2R'
        }else{
          this.statusValid == '';
          stepper.selectedIndex = 1;
        }
     
  
      }
    }
    if(op == '2'){
      if( /^\s*$/.test(this.formGr3.value.calleP) || /^\s*$/.test(this.formGr3.value.calleS ) || /^\s*$/.test(this.formGr3.value.barrio )){
       
        this.statusValid = 'errorCamposFR2'
         
   
       }else{

        this.statusValid = '';
        var b = this.formGr3.value.barrio.trim();
        var cp = this.formGr3.value.calleP.trim();
        var cs = this.formGr3.value.calleS.trim();

        this.formGr3.controls['barrio'].setValue(b);
        this.formGr3.controls['calleP'].setValue(cp);
        this.formGr3.controls['calleS'].setValue(cs);

       
        if(b.length < 4 || cp.length < 4 || cs.length <4){
          this.statusValid = 'errorCamposFR2E'
        }else{
          this.statusValid == '';
          this.enviarEmailRF(stepper)
        }
       
       }
    }
   

  

  }
  prob(){

    $("#nombre").keyup(()=>{
     
      this.formGr1.controls['nombres'].setValue(this.limpiarCampo(this.formGr1.value.nombres));
     
      $("#nmbr").fadeOut("fast")
  
  }); 
  $("#representante").keyup(()=>{
     
    this.formGr1.controls['representante'].setValue(this.limpiarCampo(this.formGr1.value.representante));
  }); 
$("#barrio").keyup(()=>{
     
  this.formGr3.controls['barrio'].setValue(this.limpiarCampo(this.formGr3.value.barrio));
}); 
$("#calleP").keyup(()=>{
     
  this.formGr3.controls['calleP'].setValue(this.limpiarCampo(this.formGr3.value.calleP));
}); 
$("#calleS").keyup(()=>{
     
  this.formGr3.controls['calleS'].setValue(this.limpiarCampo(this.formGr3.value.calleS));
}); 
  $("#correo2").keyup(()=>{
    $("#corr").fadeOut("fast")

}); 

  }
  onSubmit(){
    this.status = null;
    this.proLogin = false;
    this._usuarioService.singUp(this.usuarioLogin).subscribe(
      
      response=>{

        if(response.usuario && response.n == '3'){
         
          this.status = 'success';
          this.mensaje = response.message;
          this.identity = response.usuario;
           //PERSISTIR DATOS DEL USUARIO
           localStorage.setItem('identity', JSON.stringify(this.identity));
           //CONSEGUIR EL TOKEN
           this.getToken();
           //console.log(l)
           this.proLogin = true;
           setTimeout(()=>{
            
           if(response.usuario.rol == '1'){
            this._router.navigate(['admin','panel-usuarios','fundaciones']);
           }else if(response.usuario.rol == '4'){
            this._router.navigate(['fundacion',response.usuario._id,'nosotros','all']);
           }else{
            this.status = 'error';
          this.mensaje = 'No se pudo identicar el usuario'
          this.proLogin = null;
           }
          }, 1000);
        }else if(response.n == '2'){
          this.status = 'error';
          this.mensaje = 'No se pudo identicar el usuario'
          this.proLogin = null;
        }else{
          this.status = 'error';
          this.mensaje = 'Lo sentimos algo salió mal, intentalo mas tarde.'
          this.proLogin = null;
        }
      }, 
      error =>{
        var errorMessage = <any>error;
      
        if(error.error.n == '0' || error.error.n == '1' ){
          this.status = 'error'; 
          this.mensaje = 'No se pudo identificar el usuario.'
          this.proLogin = null;
        }else if(error.error.n == '5'){
          this.status = 'error'; 
          this.mensaje = 'Lo sentimos algo salió mal, intentalo mas tarde...'
          this.proLogin = null;
        }
      }
    )
  }
async getToken(){
  var hh;
  await this._usuarioService.singUp(this.usuarioLogin, 'true').subscribe(
      
    response=>{
      this.token = response.token;
      if(this.token.length <= 0 ){
        this.status = 'error';
        console.log("entroROK")
        hh = false;
      }else{
        console.log("entroROK2")
        this.status = 'success';
        //PERSISTIR token del usuario
        localStorage.setItem('token', JSON.stringify(this.token));

      
        //CONSEGUIR EL TOKEN
      }
    }, error =>{
      var errorMessage = <any>error;
     
      console.log(errorMessage);
      if(errorMessage != null){
        this.status = 'error';  
      }
    })

}


/*---REGISTRO--*/
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
enviarEmailRF(stepper: MatStepper){

  this.statusValid = 'process';
  this.usuarioFundacion.nombreFundacion = this.formGr1.value.nombres;
  var fec = new Date( this.formGr1.value.fechaFunda);
  var fechaFin = fec.toLocaleDateString();
  this.usuarioFundacion.fechaFundacion = fechaFin;
  this.usuarioFundacion.representante = this.formGr1.value.representante;

  this.usuarioFundacion.correoFundacion = this.formGr2.value.correo2;
  this.usuarioFundacion.passwordFundacion = this.formGr2.value.password2;
  this.usuarioFundacion.telefonoFundacion = this.formGr2.value.telefono;
  this.usuarioFundacion.celular = this.formGr2.value.celular;
  this.usuarioFundacion.sector = this.formGr3.value.sector;
  this.usuarioFundacion.barrio = this.formGr3.value.barrio;
  this.usuarioFundacion.calleP = this.formGr3.value.calleP;
  this.usuarioFundacion.calleS = this.formGr3.value.calleS;

  //this.usuarioFundacion.representante = this.representante.value;
  console.log(this.usuarioFundacion)

this.usuarioFundacion2 = this.usuarioFundacion;


  
 if(this.filesToUpload2 != undefined && this.filesToUpload2.length > 0){

  this._usuarioService.validarUsuarioF(this.usuarioFundacion2).subscribe(
    response=>{

      if(response.n == '6'){
        $('#modalRGLG').modal('hide');
        $('#modalFundacion').modal('show');
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
      }else if(response.n == '5'){
        stepper.selectedIndex = 0;
        this.statusValid = 'errorNombre';
      }else if(response.n == '2'){
        stepper.selectedIndex = 0;
        this.statusValid = 'errorNC';

      }else if(response.n == '3'){
        stepper.selectedIndex = 1;
        this.statusValid = 'errorCorreo'
      }
    },
    error=>{
      this.statusValid = 'errorValidar'

    }
  )

 }else{
  
  stepper.selectedIndex = 0;
   this.status = 'errorImage';
   this.mensaje = 'Debes seleccionar una imagen';
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
             
              
            }else{
              this.advertencia = true;
              this.status = 'error';
              this.mensaje = 'Algo salio mal al subir la foto.'
            }



          });
       
      }else if(response.n == '4'|| response.n == '6'){
        this.advertencia = true;
        this.status='error';
        this.mensaje= response.message;
        

      }else {
        this.advertencia = true;
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
      this.advertencia = false;
      this.status = 'codIn';
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


limpiarCampo(text){

  var textFin = text.replace(/([\\ \\]+(?=[\\ \\])|^\\s+|\\s+$)/g, '');

  text = textFin;

  return text;

}
}
