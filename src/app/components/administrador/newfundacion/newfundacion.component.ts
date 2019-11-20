import { Component, OnInit,ViewChild, DoCheck } from '@angular/core';
import {UsuarioFundacion} from '../../../models/usuarioFundacion';
import {Mail} from '../../../models/mail';
import {GLOBAL} from '../../../services/global';
import {UsuarioService} from '../../../services/usuario.service';
import {UploadService} from '../../../services/upload.service';
import {MatSnackBar} from '@angular/material';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {FormControl, Validators,FormBuilder,FormGroup} from '@angular/forms';
declare var $:any;
import { MatStepper } from '@angular/material/stepper';

@Component({
  selector: 'app-newfundacion',
  templateUrl: './newfundacion.component.html',
  styleUrls: ['./newfundacion.component.css'],
  providers:[UsuarioService,UploadService,MatSnackBar]
})
export class NewfundacionComponent implements OnInit, DoCheck {
  public statusValid;
  isLinear = true;
  formGr1: FormGroup;
  formGr2: FormGroup;
  formGr3:FormGroup;
  public imgUN2:any;
  public mail:Mail;
  public imL2 = false;
  public url;
  public newF;
  public identity;
  public valid;
  public token;
  public usuarioFundacion:UsuarioFundacion;
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


  constructor(private _formBuilder: FormBuilder, private _route:ActivatedRoute,
    private _router:Router,private _usuarioService:UsuarioService,private _uploadService:UploadService,private snackBar: MatSnackBar) {
      this.identity = this._usuarioService.obtIdentity();
      this.token = this._usuarioService.obtToken();
      this.url = GLOBAL.url;
    this.mail = new Mail("","","","","","");
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
      "", "",
      "", "",
      ""
 
    )
   }
   get f() { return this.formGr1.controls; }
   get f2() { return this.formGr2.controls; }
   get f3() { return this.formGr3.controls; }
 
   ngAfterViewInit() {
    this.totalStepsCount = this.myStepper._steps.length;
  }
  ngOnInit() {
    this.identity = this._usuarioService.obtIdentity();
    this.token = this._usuarioService.obtToken();
    $(document).ready(()=>{
      this.prob()
            
        });
        if(this.identity != null){
          if(this.identity.rol == '1'){
           this.valid == true;
           
          }else if(this.identity.rol == '4'){
            this._router.navigate(['fundacion',this.identity._id,'nosotros','all']);
          }else{
           this._router.navigate(['mascotas','todos']);
      
          }
      
        }else{
         this._router.navigate(['mascotas','todos']);
        }
        this.formGr1 = this._formBuilder.group({
          nombres : ['', [Validators.required, Validators.pattern('[a-z A-Z áéíóúÁÉÍÓÚñÑ]+$'), Validators.maxLength(20),Validators.minLength(3)]],
        fechaFunda :['', [Validators.required]],
        representante:['', [Validators.required, Validators.pattern(this.rg), Validators.maxLength(50),Validators.minLength(10)]],
      
        });
        this.formGr2 = this._formBuilder.group({
          correo2 : ['', [Validators.required, Validators.pattern('[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{1,5}')]],
          password2:['', [Validators.required, Validators.maxLength(30),Validators.minLength(8), Validators.pattern(this.rgxPass2)]],
          telefono :['', [Validators.required,Validators.maxLength(9),Validators.minLength(9),Validators.pattern('[0-9]+$')]],
          celular :['', [Validators.required,Validators.maxLength(10),Validators.minLength(10),Validators.pattern('[0-9]+$')]]
      
      
        });
        this.formGr3 = this._formBuilder.group({
        
          sector : ['', [Validators.required]],
          barrio : ['', [Validators.required,Validators.maxLength(50),Validators.minLength(4),Validators.pattern('[0-9 a-z A-Z áéíóúÁÉÍÓÚñÑ , . -]+$')]],
          calleP : ['', [Validators.required,Validators.maxLength(50),Validators.minLength(4),Validators.pattern('[0-9 a-z A-Z áéíóúÁÉÍÓÚñÑ , . -]+$')]],
          calleS : ['', [Validators.required,Validators.maxLength(50),Validators.minLength(4),Validators.pattern('[0-9 a-z A-Z áéíóúÁÉÍÓÚñÑ , . - ]+$')]]
      
        });
  }
  ngDoCheck(){
    this.identity = this._usuarioService.obtIdentity();
    this.token = this._usuarioService.obtToken();
   }
  prob(){

    $("#nombre").keyup(()=>{
      $("#nmbr").fadeOut("fast")
      this.formGr1.controls['nombres'].setValue(this.limpiarCampo(this.formGr1.value.nombres));

  
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

  registrarFundacion(stepper: MatStepper){
    
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


 

  this._usuarioService.validarUsuarioF(this.usuarioFundacion).subscribe(
    response=>{

      if(response.n == '6'){
        this._usuarioService.registerFundacion(this.usuarioFundacion,'admin').subscribe(
          response =>{
          // this.usuarioFundacion2 = response.usuario;
            if(response.usuario && response.usuario._id && response.n == '1'){ 
              var as = "RGFADMIN";
              this.mail.idFundacion = response.usuario._id;
              this.mail.asunto = as;
              this.mail.idFundacion = response.usuario._id;
              this.mail.nombreFundacion = response.usuario.nombreFundacion;
              this.mail.contraseniaFundacion = this.usuarioFundacion.passwordFundacion;
              this.mail.correoFundacion = this.usuarioFundacion.correoFundacion;
              console.log(this.mail)
              if(this.filesToUpload2 != undefined){
    
                this._uploadService.makeGileRequest2(this.url+'subir-foto-fundacion/'+response.usuario._id,[],this.filesToUpload2,'logo')
                .then((result:any)=>{
                  //alert('si')
                  
                  
                  if(result.n == '5' || result.n == '4' || result.n == '2'  || result.n == '1'){
                    this.snackBar.open('Error al registrar','Cerrar', {
                      duration: 2000,
                    });
                    this._usuarioService.borrarUsuario(response.usuario._id).subscribe(
                      response=>{
                        
                      },
                      error=>{
    
                  })
                  }else if(result.n == '3'){
                  
                    this.usuarioFundacion.logo = result.logo;
                    
                    
                    this._usuarioService.enviarEmail(this.mail).subscribe(
                      res=>{
                        
                        if(res.n == '3'){
                          
                         this.filesToUpload2 = undefined;
                         stepper.selectedIndex = 0;
                         this.resets()
                         this.snackBar.open('Registro exitoso','Cerrar', {
                          duration: 2000,
                        });
                        this.imL2 = false;
                        this.imgUN2 = undefined;
                        }else{
                           this.snackBar.open('No se pudo enviar el correo','Cerrar', {
                           duration: 2000,
                           });
                        }
    
                      },
                      err=>{
                        this.snackBar.open('No se pudo enviar el correo','Cerrar', {
                          duration: 2000,
                          });
                      }
                    )
    
                   
                   
                  }else{
                    this.snackBar.open('Error al registrar','Cerrar', {
                      duration: 2000,
                    });
                  }
    
    
    
                });
              }else{
                this._usuarioService.enviarEmail(this.mail).subscribe(
                  res=>{
                    
                    if(res.n == '3'){
                      
                     this.filesToUpload2 = undefined;
                     stepper.selectedIndex = 0;
                     this.resets()
                     this.snackBar.open('Registro exitoso','Cerrar', {
                      duration: 2000,
                    });
                    this.imL2 = false;
                    this.imgUN2 = undefined;
                    }else{
                       this.snackBar.open('No se pudo enviar el correo','Cerrar', {
                       duration: 2000,
                       });
                    }

                  },
                  err=>{
                    this.snackBar.open('No se pudo enviar el correo','Cerrar', {
                      duration: 2000,
                      });
                  }
                )
               
               
             
              }
                
               
              
            
            }else if(response.n == '4'|| response.n == '6'){
              this.snackBar.open(response.message,'Cerrar', {
                duration: 2000,
              });
            
            }else {
              this.snackBar.open('Error al registrar','Cerrar', {
                duration: 2000,
              });
             
    
            }
          },
          error =>{
            this.snackBar.open('Error al registrar','Cerrar', {
              duration: 2000,
            });
            
          }
        );
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
  validarNextStep(op,stepper: MatStepper){


   
   
    if(op == '1'){
     
      if( /^\s*$/.test(this.formGr1.value.nombres) || /^\s*$/.test(this.formGr1.value.representante)){
       
       this.statusValid = 'errorCampos'
        
  
      }else{
        
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
          this.registrarFundacion(stepper)
        }
       
       }
    }
   

  

  }
  resets(){
    this.formGr1.reset();
                this.formGr2.reset();
                this.formGr3.reset();
            
  }
}
