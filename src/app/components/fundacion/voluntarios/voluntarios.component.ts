import { Component, OnInit,DoCheck } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {UsuarioVoluntario} from '../../../models/usuarioVoluntario';
import {PortadaFundacion} from '../../../models/portadaFundacion';
import {GLOBAL} from '../../../services/global';
import {UsuarioService} from '../../../services/usuario.service';
import {UploadService} from '../../../services/upload.service';
import {MatSnackBar, MatSnackBarConfig} from '@angular/material';
import {FormControl, Validators} from '@angular/forms';
declare var $:any;
import { MatStepper } from '@angular/material/stepper';

@Component({
  selector: 'app-voluntarios',
  templateUrl: './voluntarios.component.html',
  styleUrls: ['./voluntarios.component.css'],
  providers:[UsuarioService, UploadService,MatSnackBar]
})
export class VoluntariosComponent implements OnInit,DoCheck {
  rgxPass  = new RegExp("^(?=.*\\d)(?=.*[\\u0021-\\u002b\\u003c-\\u0040])(?=.*[A-Z])(?=.*[a-z])\\S{8,16}$")
  public imgCom;
  
  nombres = new FormControl('', [Validators.required, Validators.pattern('^[a-z A-Z áéíóúÁÉÍÓÚñÑ]*$'), Validators.maxLength(25),Validators.minLength(4)]);
  apellidos = new FormControl('', [Validators.required,Validators.pattern('^[a-z A-Z áéíóúÁÉÍÓÚñÑ]*$'), Validators.maxLength(40),Validators.minLength(7)]);
  cedula = new FormControl('', [Validators.required,Validators.maxLength(10),Validators.minLength(10)]);
  fechaNacimiento = new FormControl('', [Validators.required]);
  correo = new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{1,5}')]);
  password = new FormControl('', [Validators.required, Validators.maxLength(30),Validators.minLength(8), Validators.pattern(this.rgxPass)]);
  tipoVoluntario = new FormControl('', [Validators.required]);
  disponibilidadTiempo = new FormControl('', [Validators.required]);
  telefono = new FormControl('', [Validators.required,Validators.maxLength(9),Validators.minLength(9),Validators.pattern('[0-9]+$')]);
  celular = new FormControl('', [Validators.required,Validators.maxLength(10),Validators.minLength(10),Validators.pattern('[0-9]+$')]);
  direccion = new FormControl('', [Validators.required,Validators.maxLength(300),Validators.minLength(25)]);
  getErrorMessage() {
    return this.nombres.hasError('required') ? 'El nombre es requerido' :
    this.nombres.hasError('pattern') ? 'No se admite: símbolos, caracteres especiales o números':
            this.nombres.hasError('maxlength') ? 'Máximo 25 caracteres':
            this.nombres.hasError('minlength') ? 'Mínimo 4 caracteres':
            '';
  }
  getErrorMessage2() {
    return this.apellidos.hasError('required') ? 'Especie requerida' :  
    this.apellidos.hasError('pattern') ? 'No se admite: símbolos, caracteres especiales o números':
            this.apellidos.hasError('maxlength') ? 'Máximo 40 caracteres':
            this.apellidos.hasError('minlength') ? 'Mínimo 7 caracteres':
            '';
  }
  getErrorMessage3() {
    return this.cedula.hasError('required') ? 'Cédula requerida' :  
    this.cedula.hasError('maxlength') ? 'Máximo 10 caracteres':
    this.cedula.hasError('minlength') ? 'Mínimo 10 caracteres':
            '';
  }
  getErrorMessage4() {
    return this.fechaNacimiento.hasError('required') ? 'Fecha de nacimiento requerida' :  
            '';
  }
  getErrorMessage5() {
    return this.correo.hasError('required') ? 'Correo requerido' :  
            this.correo.hasError('pattern') ? 'Ingresa un correo válido':
            '';
  }
  getErrorMessage6() {
    return this.password.hasError('required') ? 'Contraseña requerida' :
    this.password.hasError('maxlength') ? 'Máximo 30 caracteres':  
    this.password.hasError('minlength') ? 'Mínimo 8 caracteres':  
           this.password.hasError('pattern') ? 'Contraseña no válida':  
            '';
  }
  getErrorMessage7() {
    return this.tipoVoluntario.hasError('required') ? 'Campo requerido' :  
            '';
  }
  getErrorMessage8() {
    return this.disponibilidadTiempo.hasError('required') ? 'Campo requerido' :  
            '';
  }
  getErrorMessage9() {
    return this.telefono.hasError('required') ? 'Teléfono requerido' : 
    this.telefono.hasError('maxlength') ? 'Máximo 9 caracteres':
    this.telefono.hasError('minlength') ? 'Mínimo 9 caracteres': 
    this.telefono.hasError('pattern') ? 'Número no válido':     
            '';
  }
  getErrorMessage10() {
    return this.celular.hasError('required') ? 'Celular requerido' : 
    this.celular.hasError('maxlength') ? 'Máximo 10 caracteres':
    this.celular.hasError('minlength') ? 'Mínimo 10 caracteres': 
    this.celular.hasError('pattern') ? 'Número no válido':   

            '';
  }
  getErrorMessage11() {
    return this.direccion.hasError('required') ? 'Dirección requeridos' :  
            this.direccion.hasError('maxlength') ? 'Máximo 300 caracteres':
            this.direccion.hasError('minlength') ? 'Especifica mejor la dirección':
            '';
  }
  public carga;
  public identity;
  public token;
  public url;

  //variables para recoger lo que venga por la URL
  public idFun;
  public titu;

  public statusValid
  public status;
  public advertencia;
  public mensaje;
  public nVolun;
  public usuarioVoluntario:UsuarioVoluntario;
  public voluntarios:UsuarioVoluntario[];
  public newVolunter;
  public page
  public total;
  public pages;
  public itemsPerPage;
  public next_page;
  public prev_page;
  public filtroBTN;
  public statusNewVolun;
  public advertenciaNewVolun;
  public mensajeNewVolun;
  public nNewVolun;
  public imgUN:any;
  public imL = false;
  public usuario:UsuarioVoluntario;
  public eVL;
  public busqueda;
  public pagesSelec;
  public usuario2:any;
  public nm = 'noe';
  public cor = 'noe';
  public nm2;
  public valid;
  public tim = ["Entre semana", "Fines de semana"]
  minDate = new Date(1980, 0, 1);
  maxDate = new Date(2019, 7, 31);
  constructor(private _route:ActivatedRoute,
    private _router:Router, private _usuarioService:UsuarioService,private _uploadService:UploadService, private snackBar: MatSnackBar) { 
      this.identity = this._usuarioService.obtIdentity();
      this.token = this._usuarioService.obtToken();
      this.url = GLOBAL.url;
      this.page = 1;
      this.eVL = false;
      this.usuarioVoluntario = new UsuarioVoluntario("","","","","","","","","","","","","","","")
   
      this.newVolunter = false;
      this.advertencia = false;
      this.carga = true;
      this.filtroBTN = false;
    }

  ngOnInit() {
    this.actualPage();
    $(document).ready(()=>{
    this.prob()
    this.prob2()
  });
    

  }
  ngDoCheck(){
    this.identity = this._usuarioService.obtIdentity();
    this.token = this._usuarioService.obtToken();
  }
  compareFn(x: any, y: any): boolean {
    return x && y ? x.id === y.id : x === y;
    }
  prob(){

    $("#bsFunNombre").keyup(()=>{
      this.obtnerVoluntariosByApellidos();
      this.busqueda = true;
  
  }); 
  }
  verFoto(foto){
    $('#modalComprobante').modal('show')
    this.imgCom = foto;
    console.log(this.imgCom)

  }
  obtnerVoluntariosByApellidos(){
    const nombre = $("#bsFunNombre").val();
    this.filtroBTN = true;
    if(nombre != "" || nombre != undefined){

    }
    
   
    const resultado = document.querySelector('#busquedaUsers');

    if(nombre != ''){
      this._usuarioService.obtVoluntariosByApellidos(nombre,this.idFun).subscribe(
        response=>{
         
          if(response.usuarios && response.n == '1'){

            
            
            this.voluntarios = response.usuarios;
            
            this.total = this.voluntarios.length;
            console.log(response)
            
            $('.clothes-pics figure').each(function(i){
          
              setTimeout(function(){
                $('.clothes-pics figure').eq(i).addClass('is-showing');
              }, 150 * (i+1));
            });
            

          }
        },
        error=>{
          this.carga = false;
          $(".carga").fadeOut("slow");
          var errorMessage = <any>error;
          console.log(errorMessage);
          this.advertencia = true;
          this.status = 'error';
          if(errorMessage != null && error.error.n == '2'){
            this.status = 'error';  
            this.mensaje = 'Lo sentimos, no se encontro voluntarios';
          }else if(errorMessage != null && error.error.n == '3'){
            this.status = 'error';  
            this.mensaje = error.error.message;
          }else{
            
            this.status = 'error';
            this.mensaje = 'Algo salio mal, intentalo de nuevo.'
          }
        }
      )
    }else{
      
     this.actualPage();
    }

  }
  actualPage(){
    this.pagesSelec=[]
    this._route.params.subscribe(params =>{
      let tipo = params['tipo']
      if(tipo == 'voluntarios'){
      let page = +params['page'];
      console.log(page)
      let id = params['id'];
      this.idFun = id;
      if(this.identity != null){
        if(this.identity.rol == '4' && this.identity._id == this.idFun){
         this.valid == true;
         this.page = page;
      
         if(!params['page']){
           page = 1;
           this.page = 1;
         }
      
         if(!page){
           page = 1;
         }else{
           console.log(this.next_page)
           this.next_page = page+1;
           this.prev_page = page-1;
   
           if(this.prev_page <= 0){
             this.prev_page = 1;
           }
         }
   
         //devolver listado de usuarios
         this.obtVoluntarios(page);
        }else if(this.identity.rol == '1'){

          this._router.navigate(['admin','panel-usuarios','fundaciones']);

        }else{
         this._router.navigate(['mascotas','todos']);
    
        }
    
      }else{
       this._router.navigate(['mascotas','todos']);
      }
     
    }
    });
  }
  obtVoluntarios(page){
    let rol = 2;
    this.pagesSelec = []

    this._usuarioService.obtVoluntarios(page, rol, this.token).subscribe(
      response=>{
       
        if(response.usuarios && response.n == '1'){
        // console.log(response)
          this.total = response.total;
          this.pages = response.pages;
          this.advertencia = false;
          this.itemsPerPage = response.itemsPerPage;
          this.voluntarios = response.usuarios;
          for (let i = 1; i <= this.pages; i++) {
            this.pagesSelec.push(i)
            
          }
          this.carga = false;
          this.status ='success';
         // $('html, body').animate({scrollTop:0},500);
          if(page > this.pages){
            this._router.navigate(['fundacion/',this.idFun,'voluntarios','all','1'])
          }
          

        }else{
          this.advertencia = true;
          console.log(response.n)
          this.status = 'error';
          this.mensaje = 'Algo salió mal.'
        }
      },
      error=>{
        var errorMessage = <any>error;
        console.log(errorMessage)
        this.carga = false;
        this.advertencia = true;
        this.status = 'error';
        if(errorMessage != null && error.error.n == '2'){
          this.status = 'error';  
          this.mensaje = 'Lo sentimos, no se encontro voluntarios';
        }else if(errorMessage != null && error.error.n == '3'){
          this.status = 'error';  
          this.mensaje = error.error.message;
        }else{
          
          this.status = 'error';
          this.mensaje = 'Algo salio mal, intentalo de nuevo.'
        }
       
      }
    )
  }

  obtenerVoluntario(usuario,id){
    this.eVL = true;
    $('#editUsuario').modal('show')

    this.usuario = usuario;
    this.nombres.setValue(usuario.nombres)
        this.apellidos.setValue(usuario.apellidos)
        this.cedula.setValue(usuario.cedula)
        this.fechaNacimiento.setValue(usuario.fechaNacimiento)
        this.correo.setValue(usuario.correo)
        this.tipoVoluntario.setValue(usuario.tipoVoluntario)
        this.disponibilidadTiempo.setValue(usuario.disponibilidadTiempo)
        this.telefono.setValue(usuario.telefono)
        this.celular.setValue(usuario.celular)
        this.direccion.setValue(usuario.direccion)
        $(document).ready(()=>{
   

          this.prob3()
                
            });
    this._usuarioService.obtUsuario(id).subscribe(
      response=>{

        if(response.usuario && response.n == '1')
        //this.usuario = response.usuario;
       this.usuario2 =response.usuario;
       
      },
      error=>{
        console.log(<any>error)
      }
    )
  }
  prob3(){

    $("#cedula2").keyup(()=>{
      this.validarNM('ce')
      $("#nmbr").fadeOut("fast")
      $("#nmbr2").fadeOut("fast")
      this.cedula.setValue(this.limpiarCampo(this.cedula.value));


  }); 
  $("#nombres").keyup(()=>{
    this.nombres.setValue(this.limpiarCampo(this.nombres.value));
  }); 
  $("#apellidos").keyup(()=>{
    this.apellidos.setValue(this.limpiarCampo(this.apellidos.value));
  }); 
  $("#password").keyup(()=>{
    this.password.setValue(this.limpiarCampo(this.password.value));
  });
  $("#direccion").keyup(()=>{
    this.direccion.setValue(this.limpiarCampo(this.direccion.value));
  }); 
  $("#correo2").keyup(()=>{
    this.validarNM('c')
    $("#corr").fadeOut("fast")

}); 

  }
  probar(){
    $('.toast').toast('show')
  }
  eliminarLogo(id,file){
    console.log(file)
    this._usuarioService.eliminarLogo(id,file,'FV').subscribe(
      response=>{
       this.usuario.foto = null;
       this.actualPage();
      }
    ),
    error=>{
      console.log(<any>error)
    }
  }
  
  validar(ced) {
    var cad = ced.trim();
    var total = 0;
    var longitud = cad.length;
    var longcheck = longitud - 1;

    if (cad !== "" && longitud === 10){
      for(var i = 0; i < longcheck; i++){
        if (i%2 === 0) {
          var aux = cad.charAt(i) * 2;
          if (aux > 9) aux -= 9;
          total += aux;
        } else {
          total += parseInt(cad.charAt(i)); // parseInt o concatenará en lugar de sumar
        }
      }

      total = total % 10 ? 10 - total % 10 : 0;

      if (cad.charAt(longitud-1) == total) {
        return true;
      }else{
        return false;
      }
    }
  }

  registrarVoluntario(stepper: MatStepper){
   
  
    this.usuarioVoluntario.nombres = this.nombres.value.trim();
    this.usuarioVoluntario.apellidos = this.apellidos.value.trim();
    this.usuarioVoluntario.cedula = this.cedula.value.trim();
    this.usuarioVoluntario.fechaNacimiento =this.fechaNacimiento.value;
    this.usuarioVoluntario.correo = this.correo.value.trim();
    this.usuarioVoluntario.password = this.password.value.trim();
    this.usuarioVoluntario.tipoVoluntario = this.tipoVoluntario.value;
    this.usuarioVoluntario.disponibilidadTiempo = this.disponibilidadTiempo.value;
    this.usuarioVoluntario.telefono = this.telefono.value;
    this.usuarioVoluntario.celular = this.celular.value;
    this.usuarioVoluntario.direccion = this.direccion.value.trim();

    if(this.usuarioVoluntario.nombres != "",
      this.usuarioVoluntario.apellidos != "",
      this.usuarioVoluntario.cedula != "",
      
      this.usuarioVoluntario.fechaNacimiento != "",
      this.usuarioVoluntario.correo != "",
      this.usuarioVoluntario.password != "",
      this.usuarioVoluntario.tipoVoluntario != "",
      this.usuarioVoluntario.disponibilidadTiempo != "",
      this.usuarioVoluntario.telefono != "",
      this.usuarioVoluntario.celular != "",
      this.usuarioVoluntario.direccion != ""){

        var valid = this.validar(this.usuarioVoluntario.cedula);
        if(valid == true){

          this._usuarioService.validarUsuarioV(this.usuarioVoluntario).subscribe(
            response=>{
        
              console.log(response)
              if(response.n == '6'){
                this._usuarioService.registerVoluntario(this.usuarioVoluntario, this.token).subscribe(
                  response =>{
                    
                    if(response.usuario && response.usuario._id){
                     
                      if(this.filesToUpload != undefined){
                        this._uploadService.makeGileRequest2(this.url+'subir-foto-usuario/'+response.usuario._id,[],this.filesToUpload,'foto')
                        .then((result:any)=>{
                         
                         
                         
            
                        if(result.n == '5' || result.n == '4' || result.n == '2'  || result.n == '1'){
                          console.log("entro3")
                          this.snackBar.open('No se pudo subir la foto','Cerrar', {
                            duration: 2000,
                          });
                          this._usuarioService.borrarUsuario(response.usuario._id).subscribe(
                            response=>{
                              
                            },
                            error=>{
            
                        })
                        }else if(result.n == '3'){
                          
                         
                          this.resets()
               
                          this.openm()
                          this.obtVoluntarios(this.page)
                         this.actualPage()
                         this.imL = false;
                         this.imgUN = undefined;
                        
                        }else{
                          
                          this.snackBar.open('No se pudo subir la foto','Cerrar', {
                            duration: 2000,
                          });
                        }
            
            
                        });
                      }else{
                       
                        this.resets()
               
                        this.openm()
                        this.actualPage()
                        this.imL = false;
                        this.imgUN = undefined;
                      }
                    }else{
                      this.snackBar.open(response.message,'Cerrar', {
                        duration: 2000,
                      });
                    }
                  },
                  error =>{
                   
                    console.log(<any>error)
                    this.snackBar.open('No se pudo registrar, intentalo de nuevo','Cerrar', {
                      duration: 2000,
                    });
                  }
                );
                
              }else if(response.n == '5'){
                stepper.selectedIndex = 0;
                this.statusValid = 'errorCedula';
                $("#nmbr").fadeIn("fast")

              }else if(response.n == '2'){
                stepper.selectedIndex = 0;
                this.statusValid = 'errorCC';
                $("#nmbr").fadeIn("fast")
                $("#corr").fadeIn("fast")

        
              }else if(response.n == '3'){
                stepper.selectedIndex = 1;
                $("#corr").fadeIn("fast")
                this.statusValid = 'errorCorreo'
              }
            },
            error=>{
              this.statusValid = 'errorValidar'
        
            }
          )
        
          
        }else{
          stepper.selectedIndex = 0;
          this.statusValid = 'errorCedula2';
          $("#nmbr4").fadeIn("fast")

        }
        


    }else{
      this.snackBar.open('Llena todos los campos','Cerrar', {
        duration: 2000,
      });
    }
 
  }
  prob2(){

    $("#cedula2").keyup(()=>{
      $("#nmbr").fadeOut("fast")
      $("#nmbr4").fadeOut("fast")
      this.cedula.setValue(this.limpiarCampo(this.cedula.value));


  }); 
  $("#nombres").keyup(()=>{
    this.nombres.setValue(this.limpiarCampo(this.nombres.value));
  }); 
  $("#apellidos").keyup(()=>{
    this.apellidos.setValue(this.limpiarCampo(this.apellidos.value));
  }); 
  $("#password").keyup(()=>{
    this.password.setValue(this.limpiarCampo(this.password.value));
  });
  $("#direccion").keyup(()=>{
    this.direccion.setValue(this.limpiarCampo(this.direccion.value));
  }); 
  $("#correo2").keyup(()=>{
    $("#corr").fadeOut("fast")

}); 

  }
  nuewVoluntario(){
    
    $("#mainVL").fadeOut('fast')
    $("#header").fadeOut('fast')
    $("#RGVL").fadeIn('slow')
    $(document).ready(()=>{
     
      this.prob2()
    });
  }
  cancelarBus(){
    this.filtroBTN = false;
    this.actualPage()
    this._router.navigate(['fundacion/',this.idFun,'voluntarios','all','1'])

  }
  cancelarVolun(){
    $("#mainVL").fadeIn('slow')
    $("#header").fadeIn('slow')
    $("#RGVL").fadeOut('fast')
  }

  resets(){
    $("#RGF")[0].reset();

    $("#RGF2")[0].reset();

    $("#RGF3")[0].reset();
    this.cancelarVolun()
               
  }
  openm(){
    /*this.snackBar.open('Registro exitoso','Cerrar', {
      duration: 150000,
      verticalPosition: 'top',
      panelClass:'ee'
    });*/

    let config = new MatSnackBarConfig();
    config.panelClass = ['custom-class'];
    config.duration = 2000;
    config.verticalPosition = 'top'
  this.snackBar.open('Registro exitoso','Cerrar', config);
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

  actualizarVoluntario(){
    
    this.usuario.nombres = this.nombres.value.trim();
    this.usuario.apellidos = this.apellidos.value.trim();
    this.usuario.cedula = this.cedula.value.trim();
    this.usuario.fechaNacimiento = this.fechaNacimiento.value;
    this.usuario.correo = this.correo.value.trim();
    this.usuario.tipoVoluntario = this.tipoVoluntario.value;
    this.usuario.disponibilidadTiempo = this.disponibilidadTiempo.value;
    this.usuario.direccion = this.direccion.value.trim();
    this.usuario.telefono = this.telefono.value;
    this.usuario.celular = this.celular.value;
    console.log(this.usuario2)
    console.log(this.usuario)

   var validar = this.validar(this.usuario.cedula)
    if(validar == true){

      console.log(this.usuario2)
      console.log(this.usuario)
      if(this.nm == 'noe' &&  this.cor == 'noe'){
        console.log("entroCVLI")
        this._usuarioService.actualizarUsuario2(this.usuario,this.usuario._id, this.token).subscribe(
          response=>{
            if(response.usuario && response.n=='1'){
              if(this.filesToUpload != undefined){
                this._uploadService.makeGileRequest2(this.url+'subir-foto-usuario/'+response.usuario._id,[],this.filesToUpload,'foto')
                .then((result:any)=>{
                 
                  
                 
    
                if(result.n == '5' || result.n == '4' || result.n == '2'  || result.n == '1'){
                  this.snackBar.open('Algo salió mal, intentalo mas tarde.','Cerrar', {
                    duration: 2000,
                  });
                  
                }else if(result.n == '3'){
                 
                  this.actualPage()
                  this.snackBar.open('Actualizado exitosamente','Cerrar', {
                    duration: 2000,
                  });
                  
                  $('#editUsuario').modal('hide')
                 
                
                }else{
                  this.snackBar.open('Algo salio mal al subir la foto.','Cerrar', {
                    duration: 2000,
                  });
              
                }
    
    
                });
              }else{
               
                  this.actualPage()
                this.snackBar.open('Actualizado exitosamente','Cerrar', {
                  duration: 2000,
                });
                
                $('#editUsuario').modal('hide')
                  
              }
    
    
    
              
            }else{
              this.snackBar.open('Algo salió mal, intentalo mas tarde.','Cerrar', {
                duration: 2000,
              });
            }
          },
          error=>{
            console.log(<any>error)
            this.snackBar.open('Algo salió mal, intentalo mas tarde.','Cerrar', {
              duration: 2000,
            });
          }
        )
      }else{
       this.statusValid = 'error'
      }

    }else{
      this.nm2 = 'nov'
      }
  }
  
 
  //desactivar o activar el estado de la mascota
  eliminarVoluntarioEstado(usuario,id){
    console.log(id)
    this._usuarioService.eliminarVoluntarioEstado(usuario,id, this.token).subscribe(
      response=>{

        if(response.usuario && response.n == '1'){
          
         
          this.actualPage();
          this.obtVoluntarios(this.page)
          $('#editUsuario').modal('hide')
          this.snackBar.open('Voluntario eliminado','Cerrar', {
            duration: 2000,
          });

        }else if(response.n == '4'){
          this.snackBar.open('No tienes permisos','Cerrar', {
            duration: 2000,
          });
        }
      }, 
      error=>{
        console.log(<any>error);
      }
    );
  }

  validarNM(op){
  
    if(op == 'ce'){
      const cedula = $("#cedula2").val();
      this.usuario.cedula = cedula
      this._usuarioService.validarCedulaE(this.usuario).subscribe(
        response=>{
  
          if(response.n == '1' && this.usuario2.cedula != this.usuario.cedula ){
            this.statusValid = 'error'
            this.nm = 'sie'
          }else if(response.n == '1' && this.usuario2.cedula == this.usuario.cedula){
            this.nm = 'noe'
            this.statusValid = ''
          }else if(response.n == '2'){
            this.nm = 'noe'
            this.statusValid = ''
          }
          console.log(this.nm)
        },
        error=>{
          console.log(<any>error)
        }
      )
    }
    if(op == 'c'){
      const coreo = $("#correo2").val();
      this.usuario.correo = coreo
      this._usuarioService.validarCorreoF(this.usuario).subscribe(
        response=>{
          if(response.n == '1' && this.usuario2.correo != this.usuario.correo ){
            this.statusValid = 'error'
            this.cor = 'sie'
          }else if(response.n == '1' && this.usuario2.nombreFundacion == this.usuario.correo){
            this.cor = 'noe'
            this.statusValid = ''
          }else if(response.n == '2'){
            this.cor = 'noe'
            this.statusValid = ''
          }
        },
        error=>{
          console.log(<any>error)
        }
      )
    }
      
    }
    limpiarCampo(text){

      var textFin = text.replace(/([\\ \\]+(?=[\\ \\])|^\\s+|\\s+$)/g, '');
    
      text = textFin;
    
      return text;
    
    }
}
