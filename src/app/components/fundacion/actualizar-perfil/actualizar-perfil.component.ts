import { Component, OnInit ,DoCheck} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {UsuarioFundacion} from '../../../models/usuarioFundacion';
import {UsuarioService} from '../../../services/usuario.service';
import {UploadService} from '../../../services/upload.service';
import {GLOBAL} from '../../../services/global';
import {MatSnackBar} from '@angular/material';
import {FormControl, Validators} from '@angular/forms';
declare var $:any;
@Component({
  selector: 'app-actualizar-perfil',
  templateUrl: './actualizar-perfil.component.html',
  styleUrls: ['./actualizar-perfil.component.css'],
  providers:[UsuarioService,UploadService,MatSnackBar]
})
export class ActualizarPerfilComponent implements OnInit, DoCheck {

  public identity;
  public token;
  public usuarioFundacion:UsuarioFundacion;
  public usuarioFundacion2:any;
  public ValidaNomb:any;
  public imgUN3:any;
  public status;
  public mensaje;
  public imL3 = false;
  public url:string;
  public statusValid;
  public valid;
  rgxPass  = new RegExp("^(?:http(s)?:\\/\\/)?[\\w.-]+(?:\\.[\\w\\.-]+)+[\\w\\-\\._~:/?#[\\]@!\\$&'\\(\\)\\*\\+,;=.]+$")
  rgxPass2  = new RegExp("^(?=.*\\d)(?=.*[\\u0021-\\u002b\\u003c-\\u0040])(?=.*[A-Z])(?=.*[a-z])\\S{8,30}$")
  rg = new RegExp("^([a-zA-ZñáéíóúñÑ]+[\\s]+[a-zA-ZñáéíóúñÑ]+[\\s]*)+$")

  
  perfil = new FormControl('', [Validators.required, Validators.pattern('^[a-z A-Z áéíóúÁÉÍÓÚñÑ 0-9 , . :]*$'), Validators.maxLength(300),Validators.minLength(15)]);
  mision = new FormControl('', [Validators.required,Validators.pattern('^[a-z A-Z áéíóúÁÉÍÓÚñÑ 0-9 , . :]*$'), Validators.maxLength(300),Validators.minLength(15)]);
  vision =  new FormControl('', [Validators.required,Validators.pattern('^[a-z A-Z áéíóúÁÉÍÓÚñÑ 0-9, . :]*$'), Validators.maxLength(300),Validators.minLength(15)]);
  titular = new FormControl('', [Validators.required, Validators.pattern(this.rg), Validators.maxLength(50),Validators.minLength(5)]);
  banco = new FormControl('', [Validators.required, Validators.pattern('^[a-z A-Z áéíóúÁÉÍÓÚñÑ]*$'), Validators.maxLength(50),Validators.minLength(5)]);
  cuenta = new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$'),Validators.maxLength(10),Validators.minLength(10)]);
  telefono = new FormControl('', [Validators.required,Validators.maxLength(9),Validators.minLength(9),Validators.pattern('[0-9]*$')]);
  celular = new FormControl('', [Validators.required,Validators.maxLength(10),Validators.minLength(10),Validators.pattern('[0-9]*$')]);
 
  nombres = new FormControl('', [Validators.required, Validators.pattern('[a-z A-Z áéíóúÁÉÍÓÚñÑ]+$'), Validators.maxLength(25),Validators.minLength(4)]);
  representante = new FormControl('', [Validators.required, Validators.pattern(this.rg), Validators.maxLength(50),Validators.minLength(10)]);
  fechaFunda = new FormControl('', [Validators.required]);
  correo2 = new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{1,5}')]);
  sector = new FormControl('', [Validators.required]);
  barrio = new FormControl('', [Validators.required,Validators.maxLength(50),Validators.minLength(3),Validators.pattern('[0-9 a-z A-Z áéíóúÁÉÍÓÚñÑ , . -]*$')]);
  calleP = new FormControl('', [Validators.required,Validators.maxLength(50),Validators.minLength(3),Validators.pattern('[0-9 a-z A-Z áéíóúÁÉÍÓÚñÑ , . -]*$')]);
  calleS = new FormControl('', [Validators.required,Validators.maxLength(50),Validators.minLength(3),Validators.pattern('[0-9 a-z A-Z áéíóúÁÉÍÓÚñÑ , . -]*$')]);
  link = new FormControl('', [Validators.required, Validators.pattern(this.rgxPass)]);
  password2 = new FormControl('', [Validators.required, Validators.maxLength(30),Validators.minLength(8), Validators.pattern(this.rgxPass2)]);
 
  sector2= [
    {value: 'Norte'},
    {value: 'Centro'},
    {value: 'Sur'}
  ];
  getErrorMessage() {
    return this.perfil.hasError('required') ? 'Especie requerida' :  
    this.perfil.hasError('pattern') ? 'No se admite: símbolos o caracteres especiales':
            this.perfil.hasError('maxlength') ? 'Máximo 230 caracteres':
            this.perfil.hasError('minlength') ? 'Describe mejor el perfil de la fundación':
            '';
            '';
  }
  getErrorMessage2() {
    return this.mision.hasError('required') ? 'Especie requerida' :  
    this.mision.hasError('pattern') ? 'No se admite: símbolos o caracteres especiales':
            this.mision.hasError('maxlength') ? 'Máximo 230 caracteres':
            this.mision.hasError('minlength') ? 'Describe mejor la misión de la fundación':
            '';
  }
  getErrorMessage3() {
    return this.vision.hasError('required') ? 'Especie requerida' :  
    this.vision.hasError('pattern') ? 'No se admite: símbolos o caracteres especiales':
            this.vision.hasError('maxlength') ? 'Máximo 230 caracteres':
            this.vision.hasError('minlength') ? 'Describe mejor la visión de la fundación':
            '';
  }
  getErrorMessage4() {
    return this.titular.hasError('required') ? 'Especie requerida' :  
    this.titular.hasError('pattern') ? 'Ingresa al menos un nombre y un apellido':
            this.titular.hasError('maxlength') ? 'Máximo 50 caracteres':
            this.titular.hasError('minlength') ? 'No válido':
            '';
  }
  getErrorMessage5() {
    return this.banco.hasError('required') ? 'Especie requerida' :  
    this.banco.hasError('pattern') ? 'No se admite: símbolos, caracteres especiales o  números':
            this.banco.hasError('maxlength') ? 'Máximo 50 caracteres':
            this.banco.hasError('minlength') ? 'Especifica mejor el nombre del banco':
            '';
  }
  getErrorMessage6() {
    return this.cuenta.hasError('required') ? 'Especie requerida' :  
    this.cuenta.hasError('pattern') ? 'Solo se admite números':
            this.cuenta.hasError('maxlength') ? 'Número de cuenta no válido':
            this.cuenta.hasError('minlength') ? 'Número de cuenta no válido':
            '';
  }

  getErrorMessage9() {
    return this.telefono.hasError('required') ? 'Teléfono requerido' : 
    this.telefono.hasError('maxlength') ? 'Máximo 9 caracteres':
    this.telefono.hasError('minlength') ? 'Teléfono no válido': 
    this.telefono.hasError('pattern') ? 'Teléfono no válido':     
            '';
  }
  getErrorMessage10() {
    return this.celular.hasError('required') ? 'Celular requerido' : 
    this.celular.hasError('maxlength') ? 'Máximo 10 caracteres':
    this.celular.hasError('minlength') ? 'Celular no válido': 
    this.celular.hasError('pattern') ? 'Celular no válido':   

            '';
  }


  getErrorMessage11() {
    return this.nombres.hasError('required') ? 'El nombre es requerido' :
    this.nombres.hasError('pattern') ? 'No se admite: símbolos, caracteres especiales o números':
            this.nombres.hasError('maxlength') ? 'Máximo 25 caracteres':
            this.nombres.hasError('minlength') ? 'Mínimo 4 caracteres':
            '';
  }
  getErrorMessage12() {
    return this.representante.hasError('required') ? 'El representante es requerido' :
    this.representante.hasError('pattern') ? 'Ingresa al menos un nombre y un apellido':
            this.representante.hasError('maxlength') ? 'Máximo 50 caracteres':
            this.representante.hasError('minlength') ? 'No válido':
            '';
  }
  getErrorMessage13() {
    return this.fechaFunda.hasError('required') ? 'Fecha de fundación requerida' :  
            '';
  }
  getErrorMessage14() {
    return this.barrio.hasError('required') ? 'Nombre del barrio requerido' :  
            this.barrio.hasError('maxlength') ? 'Máximo 50 caracteres':
            this.barrio.hasError('minlength') ? 'Barrio no válido':
            this.barrio.hasError('pattern') ? 'No se admite símbolos o caracteres especiales':   
            '';
  }
  getErrorMessage15() {
    return this.calleP.hasError('required') ? 'Calle principal requerida' :  
            this.calleP.hasError('maxlength') ? 'Máximo 50 caracteres':
            this.calleP.hasError('minlength') ? 'Calle no válida':
            this.calleP.hasError('pattern') ? 'No se admite símbolos o caracteres especiales':   
            '';
  }
  getErrorMessage16() {
    return this.calleS.hasError('required') ? 'Calle secundaria requerida' :  
            this.calleS.hasError('maxlength') ? 'Máximo 50 caracteres':
            this.calleS.hasError('minlength') ? 'Calle no válida':
            this.calleS.hasError('pattern') ? 'No se admite símbolos o caracteres especiales':   
            '';
  }
  getErrorMessage17() {
    return this.sector.hasError('required') ? 'Sector requerido' :  
            '';
  }
  getErrorMessage18() {
    return this.correo2.hasError('required') ? 'Correo requerido' :  
            this.correo2.hasError('pattern') ? 'Ingresa un correo válido':
            '';
  }
  getErrorMessage19() {
    return this.link.hasError('required') ? 'Celular requerido' : 
            this.link.hasError('pattern') ? 'URL no válida':   
            '';
  }
  getErrorMessage20() {
    return this.password2.hasError('required') ? 'Contraseña requerida' :
    this.password2.hasError('maxlength') ? 'Máximo 30 caracteres':  
    this.password2.hasError('minlength') ? 'Mínimo 8 caracteres':  
           this.password2.hasError('pattern') ? 'Contraseña no válida':  
            '';
  }
  constructor( private _route:ActivatedRoute,
    private _router:Router, private _usuarioService:UsuarioService,private _uploadService:UploadService,private snackBar: MatSnackBar) { 
      this.identity = this._usuarioService.obtIdentity();
      this.token = this._usuarioService.obtToken();
      //this.usuarioFundacion = new UsuarioFundacion("","","","","","","","","","","","","","","","","","");
     this.url = GLOBAL.url;
    }

  ngOnInit() {
    $(document).ready(()=>{
      this.prob()
            
        });
        this._route.params.subscribe(params =>{
         
          let id = params['id'];
          if(this.identity != null){
            if(this.identity.rol == '4' && this.identity._id == id){
             this.valid == true;
             this.obtenerFundacion(this.identity._id);
  
             
            }else if(this.identity.rol == '1'){
              this._router.navigate(['admin','panel-usuarios','fundaciones']);

            }else{
             this._router.navigate(['mascotas','todos']);
        
            }
        
          }else{
           this._router.navigate(['mascotas','todos']);
          }
        })
        
  }
  ngDoCheck(){

    this.identity = this._usuarioService.obtIdentity();
    this.token = this._usuarioService.obtToken();
   
      
  }
  obtenerFundacion(id){
    this._usuarioService.obtUsuario(id).subscribe(
      response=>{
        this.usuarioFundacion = response.usuario;
        this.ValidaNomb = this.usuarioFundacion.nombreFundacion
        this.usuarioFundacion2 = response.usuario;
        console.log(this.usuarioFundacion)
        this.usuarioFundacion.correoFundacion = response.usuario.correo;
        //this.usuarioFundacion.direccionFundacion = response.usuario.direccion;
        this.usuarioFundacion.telefonoFundacion = response.usuario.telefono;
      
        this.mision.setValue(this.usuarioFundacion.mision);
        this.vision.setValue(this.usuarioFundacion.vision);
        this.perfil.setValue(this.usuarioFundacion.perfil);
        this.titular.setValue(this.usuarioFundacion.titular);
        this.banco.setValue(this.usuarioFundacion.banco);
        this.cuenta.setValue(this.usuarioFundacion.numCuenta);
        this.telefono.setValue(this.usuarioFundacion.telefonoFundacion);
        this.celular.setValue(this.usuarioFundacion.celular);
        this.nombres.setValue(this.usuarioFundacion.nombreFundacion)
        this.representante.setValue(this.usuarioFundacion.representante)
        this.fechaFunda.setValue(this.usuarioFundacion.fechaFundacion)
        this.correo2.setValue(this.usuarioFundacion.correoFundacion)
        this.link.setValue(this.usuarioFundacion.link)
        this.sector.setValue(this.usuarioFundacion.sector)
        this.barrio.setValue(this.usuarioFundacion.barrio)
        this.calleP.setValue(this.usuarioFundacion.calleP)
        this.calleS.setValue(this.usuarioFundacion.calleS)
        $(document).ready(()=>{
          this.prob()
                
            });

      },
      error=>{
        console.log(<any>error)
      }
    )
  }

  actualizarFundacion(op){

    this.usuarioFundacion.estado = 'activo';
    this.usuarioFundacion.mision = this.mision.value.trim();
    this.usuarioFundacion.vision = this.vision.value.trim();
    this.usuarioFundacion.perfil = this.perfil.value.trim();
    this.usuarioFundacion.titular = this.titular.value.trim();
    this.usuarioFundacion.banco = this.banco.value.trim();
    this.usuarioFundacion.numCuenta = this.cuenta.value.trim();
    this.usuarioFundacion.telefonoFundacion = this.telefono.value;
    this.usuarioFundacion.celular = this.celular.value;


    if(op == 'mv'){
      var update = {
        estado:'activo',
        mision:this.usuarioFundacion.mision,
        vision:this.usuarioFundacion.vision,
        perfil:this.usuarioFundacion.perfil,
      }
      this._usuarioService.actualizarUsuario(update,this.usuarioFundacion._id,this.token).subscribe(
        response=>{
          this.identity.estado = "activo";
          localStorage.setItem('identity', JSON.stringify(this.identity));
          this.snackBar.open('Perfil actualizado','Cerrar', {
            duration: 2000,
          }); 
         
        },
        error=>{
          this.snackBar.open('Error al actualizar','Cerrar', {
            duration: 2000,
          });
        }
      )
    }
    if(op == 'tb'){
      var update2 = {
        estado:'activo',
        titular:this.usuarioFundacion.titular,
        banco:this.usuarioFundacion.banco,
        numCuenta:this.usuarioFundacion.numCuenta,
       
  
      }
      this._usuarioService.actualizarUsuario(update2,this.usuarioFundacion._id,this.token).subscribe(
        response=>{
          this.identity.estado = "activo";
          localStorage.setItem('identity', JSON.stringify(this.identity));
          this.snackBar.open('Perfil actualizado','Cerrar', {
            duration: 2000,
          }); 
         
        },
        error=>{
          this.snackBar.open('Error al actualizar','Cerrar', {
            duration: 2000,
          });
        }
      )
    }

    if(op == 'tc'){
      var update3 = {

        estado:'activo',
        celular:this.usuarioFundacion.celular,
        telefono:this.usuarioFundacion.telefonoFundacion
  
      }
      this._usuarioService.actualizarUsuario(update3,this.usuarioFundacion._id,this.token).subscribe(
        response=>{
          this.identity.estado = "activo";
          localStorage.setItem('identity', JSON.stringify(this.identity));
          this.snackBar.open('Perfil actualizado','Cerrar', {
            duration: 2000,
          }); 
         
        },
        error=>{
          this.snackBar.open('Error al actualizar','Cerrar', {
            duration: 2000,
          });
        }
      )
    }
    
    

  }
  prob(){

    $("#nombre").keyup(()=>{
      this.nombres.setValue(this.limpiarCampo(this.nombres.value));

      $("#nmbr").fadeOut("fast")
  
  }); 
  $("#representante").keyup(()=>{
     
    this.representante.setValue(this.limpiarCampo(this.representante.value));
   
    $("#nmbr").fadeOut("fast")

}); 
$("#barrio").keyup(()=>{
     
  this.barrio.setValue(this.limpiarCampo(this.barrio.value));
}); 
$("#calleP").keyup(()=>{
     
  this.calleP.setValue(this.limpiarCampo(this.calleP.value));
}); 
$("#calleS").keyup(()=>{
     
  this.calleS.setValue(this.limpiarCampo(this.calleS.value));
}); 

$("#perfil").keyup(()=>{
     
  this.perfil.setValue(this.limpiarCampo(this.perfil.value));
}); 
$("#mision").keyup(()=>{
     
  this.mision.setValue(this.limpiarCampo(this.mision.value));
}); 
$("#vision").keyup(()=>{
     
  this.vision.setValue(this.limpiarCampo(this.vision.value));
}); 
$("#titular").keyup(()=>{
     
  this.titular.setValue(this.limpiarCampo(this.titular.value));
}); 
$("#banco").keyup(()=>{
     
  this.banco.setValue(this.limpiarCampo(this.banco.value));
}); 
  
  $("#correo2").keyup(()=>{
    $("#corr").fadeOut("fast")

}); 

  }
  limpiarCampo(text){

    var textFin = text.replace(/([\\ \\]+(?=[\\ \\])|^\\s+|\\s+$)/g, '');
  
    text = textFin;
  
    return text;
  
  }
  //datos personales
  actualizarFundacion2(op){
    $(document).ready(()=>{
      this.prob()
            
        });
    if(op == 'fn'){
      this.usuarioFundacion.nombreFundacion = this.nombres.value.trim();
     this.usuarioFundacion.representante = this.representante.value.trim();

      if(this.usuarioFundacion.logo == null){
        if(this.filesToUpload3 != undefined && this.filesToUpload3.length > 0){

          var update = {
      
            nombreFundacion:this.usuarioFundacion.nombreFundacion,
            representante:this.usuarioFundacion.representante,
  
          }
          if(this.usuarioFundacion2.nombreFundacion != this.nombres.value){
            this._usuarioService.validarNombreF(this.usuarioFundacion).subscribe(
              response=>{

                if(response.n == '2'){
                  this._usuarioService.actualizarUsuario(update,this.usuarioFundacion._id,this.token).subscribe(
                    response=>{
              
                      this._uploadService.makeGileRequest2(this.url+'subir-foto-fundacion/'+this.usuarioFundacion._id,[],this.filesToUpload3,'logo')
                          .then((result:any)=>{
                            if(result.n == '3' ){
                              console.log(result)
                              this.status='success';
                              this.mensaje = result.message;
                              this.usuarioFundacion.logo = result.usuario.logo;
                              localStorage.setItem('identity', JSON.stringify(result.usuario));

                              this.snackBar.open('Datos actualizados','Cerrar', {
                                duration: 2000,
                              });
                            }else{
                             
                              this.snackBar.open('Error al actualizar','Cerrar', {
                                duration: 2000,
                              });
                            }
              
              
              
                          });
              
                    },
                    error=>{
                      this.snackBar.open('Error al actualizar','Cerrar', {
                        duration: 2000,
                      });
                    }
                  )
                }else if(response.n == '1'){
                  this.statusValid == 'errorNombre'
                }
              },  
              error=>{

              }
            )
          }else{
            this._usuarioService.actualizarUsuario(update,this.usuarioFundacion._id,this.token).subscribe(
              response=>{
        
                this._uploadService.makeGileRequest2(this.url+'subir-foto-fundacion/'+this.usuarioFundacion._id,[],this.filesToUpload3,'logo')
                    .then((result:any)=>{
                      if(result.n == '3' ){
                        localStorage.setItem('identity', JSON.stringify(result.usuario));

                        this.status='success';
                        this.mensaje = result.message;
                        this.usuarioFundacion.logo = result.usuario.logo;
                        this.snackBar.open('Datos actualizados','Cerrar', {
                          duration: 2000,
                        });
                      }else{
                       
                        this.snackBar.open('Error al actualizar','Cerrar', {
                          duration: 2000,
                        });
                      }
        
        
        
                    });
        
              },
              error=>{
                this.snackBar.open('Error al actualizar','Cerrar', {
                  duration: 2000,
                });
              }
            )
          }
         
        }else{
          this.status = 'error';
          this.snackBar.open('Selecciona una foto','Cerrar', {
            duration: 2000,
          });
        }
      }else{

        var update = {
      
          nombreFundacion:this.usuarioFundacion.nombreFundacion,
          representante:this.usuarioFundacion.representante,

        }
        if(this.ValidaNomb != this.nombres.value){
          this._usuarioService.validarNombreF(this.usuarioFundacion).subscribe(
            response=>{
              if(response.n == '2'){
                this._usuarioService.actualizarUsuario(update,this.usuarioFundacion._id,this.token).subscribe(
                  response=>{
            
                    this.status='success';
                    localStorage.setItem('identity', JSON.stringify(response.usuario));

                    this.snackBar.open('Datos actualizados','Cerrar', {
                      duration: 2000,
                    });
            
                  },
                  error=>{
                    this.snackBar.open('Error al actualizar','Cerrar', {
                      duration: 2000,
                    });
                  }
                )
              }else if(response.n == '1'){
                this.statusValid = 'errorNombre'
              }
            },  
            error=>{

            }
          )
        }else{
          console.log("ëntro2")

          this._usuarioService.actualizarUsuario(update,this.usuarioFundacion._id,this.token).subscribe(
            response=>{
      console.log(response)
              this.status='success';
           
              this.snackBar.open('Datos actualizados','Cerrar', {
                duration: 2000,
              });
              localStorage.setItem('identity', JSON.stringify(response.usuario));

      
            },
            error=>{
              this.snackBar.open('Error al actualizar','Cerrar', {
                duration: 2000,
              });
            }
          )
        }

        
      }


    
    }
    if(op == 'fc'){

      this.usuarioFundacion.fechaFundacion = this.fechaFunda.value;
      this.usuarioFundacion.correoFundacion = this.correo2.value.trim();
      this.usuarioFundacion.link = this.link.value.trim();
      var update2 = {
      
        correo:this.usuarioFundacion.correoFundacion,
        fechaFundacion:this.usuarioFundacion.fechaFundacion,
        link:this.usuarioFundacion.link

      }

      if(this.usuarioFundacion2.correo != this.correo2.value){
        this._usuarioService.validarCorreoF(this.usuarioFundacion).subscribe(
          response=>{
            if(response.n == '2'){
              this._usuarioService.actualizarUsuario(update2,this.usuarioFundacion._id,this.token).subscribe(
                response=>{
          
                  this.status='success';
               
                  this.snackBar.open('Datos actualizados','Cerrar', {
                    duration: 2000,
                  });
          
                },
                error=>{
                  this.snackBar.open('Error al actualizar','Cerrar', {
                    duration: 2000,
                  });
                }
              )
            }else if(response.n == '1'){
              this.statusValid = 'errorCorreo'
            }
          },
          error=>{
            console.log(<any>error)
          }
        )
      }else{
        this._usuarioService.actualizarUsuario(update2,this.usuarioFundacion._id,this.token).subscribe(
          response=>{
    
            this.status='success';
         
            this.snackBar.open('Datos actualizados','Cerrar', {
              duration: 2000,
            });
    
          },
          error=>{
            this.snackBar.open('Error al actualizar','Cerrar', {
              duration: 2000,
            });
          }
        )
      }
     
      

    }

    if(op == 'sb'){
      this.usuarioFundacion.sector= this.sector.value;
      this.usuarioFundacion.barrio = this.barrio.value.trim();
      this.usuarioFundacion.calleP = this.calleP.value.trim();
      this.usuarioFundacion.calleS = this.calleS.value.trim();

      var update3 = {
      
        sector:this.usuarioFundacion.sector,
        barrio:this.usuarioFundacion.barrio,
        calleP:this.usuarioFundacion.calleP,
        calleS:this.usuarioFundacion.calleS

      }
      this._usuarioService.actualizarUsuario(update3,this.usuarioFundacion._id,this.token).subscribe(
        response=>{
  
          this.status='success';
       
          this.snackBar.open('Datos actualizados','Cerrar', {
            duration: 2000,
          });
  
        },
        error=>{
          this.snackBar.open('Error al actualizar','Cerrar', {
            duration: 2000,
          });
        }
      )

    }

    
  }
  actualizarFundacion3(){
    this.usuarioFundacion.nombreFundacion = this.nombres.value.trim();
    this.usuarioFundacion.passwordFundacion = this.password2.value;


    var update = {
      correoFundacion:this.usuarioFundacion.correoFundacion,
      passwordFundacion:this.usuarioFundacion2.passwordFundacion,
     

    }
    this._usuarioService.cambiarPss(update,this.usuarioFundacion._id).subscribe(
      response=>{
        this.snackBar.open('Contraseña actualizada','Cerrar', {
          duration: 2000,
        });
      },
      error=>{
        this.snackBar.open('Error al actualizar','Cerrar', {
          duration: 2000,
        });
      }
    )
  }
 //para editar fundaciones
 public filesToUpload3: Array<File>;
 urls3 = new Array<string>();
 fileChangeEvent3(fileInput:any){
   this.filesToUpload3 = <Array<File>>fileInput.target.files;
   
    let files = <Array<File>>fileInput.target.files;
   this.urls3 = [];
    if (files) {
     for (let file of files) {
       let reader = new FileReader();
       reader.onload = (e: any) => {
         this.urls3.push(e.target.result);
         this.imgUN3 = e.target.result;
         this.imL3 = true;
       }
       reader.readAsDataURL(file);
     }
   }
    if(this.filesToUpload3 != undefined){
     this.imL3 = false;
   }
 }
 
 eliminarLogo(id,file){
  this._usuarioService.eliminarLogo(id,file,'FF').subscribe(
    response=>{
     this.usuarioFundacion.logo = null;
    }
  ),
  error=>{

  }
}
}
