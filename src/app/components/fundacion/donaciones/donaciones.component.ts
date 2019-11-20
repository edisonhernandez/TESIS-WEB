import { Component, OnInit, DoCheck,ViewChild} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {GLOBAL} from '../../../services/global';
import {UsuarioService} from '../../../services/usuario.service';
import {DonacionService} from '../../../services/donacion.service';
import {FormControl, Validators} from '@angular/forms';
import {UploadService} from '../../../services/upload.service';
import { UsuarioFundacion } from '../../../models/usuarioFundacion';
import { Donacion } from '../../../models/donacion';
import {MatSnackBar} from '@angular/material';
import { MatStepper } from '@angular/material/stepper';

declare var $:any;
@Component({
  selector: 'app-donaciones',
  templateUrl: './donaciones.component.html',
  styleUrls: ['./donaciones.component.css'],
  providers:[UsuarioService, UploadService, DonacionService,MatSnackBar]
})
export class DonacionesComponent implements OnInit,DoCheck{
  @ViewChild('stepper', {static: true}) private myStepper: MatStepper;
  totalStepsCount: number;
  isLinear = true;
  public identity;
  public token;
  public url;
  
  //variables para recoger lo que venga por la URL
  public idFun;
  public titu;


  public advertencia;
  public carga;
  public mensaje;
//variables para advertencias al editar datos de donaciones

public editarInfDonacion;

public fundacion:UsuarioFundacion;
public usuarios=[];
public donacion:Donacion;
public APdonacion:Donacion;
public IDAPdonacion;
public tipoAPdonacion;
public userSelect:any;
public tipP;
public tipE;
public usS;
public imgUN2:any;
  public imL2 = false;
public donaciones:any;

public page;
public next_page;
public prev_page;
public imgCom;
public voluntarios:any;
public type;
public pagesSelec = []
public total;
public pages;
public uss:any;
public itemsPerPage;
public mensajeVSLE;
public status;
public tipoFL = ["Todos","economica","producto"];
public filtroBTN;
public valid;
//variables para busqueda 
public filtroBSQ = [];
public select;

public donacionOB:any;
public voluntariosAS=[];
public formSelect;
public statusValid;
public statusValid2;

rgxPass  = new RegExp("([0-9]{7})")
rgxPass2  = new RegExp("([0-9]{10})")
nombres = new FormControl('', [Validators.required, Validators.pattern('^[a-z A-Z áéíóúÁÉÍÓÚñÑ]*$'), Validators.maxLength(25),Validators.minLength(4)]);
  apellidos = new FormControl('', [Validators.required,Validators.pattern('^[a-z A-Z áéíóúÁÉÍÓÚñÑ]*$'), Validators.maxLength(40),Validators.minLength(4)]);
  cedula = new FormControl('', [Validators.required,Validators.maxLength(10),Validators.minLength(10)]);
  telefono = new FormControl('', [Validators.required,Validators.maxLength(9),Validators.minLength(9),Validators.pattern('[0-9]*$')]);
  celular = new FormControl('', [Validators.required,Validators.maxLength(10),Validators.minLength(10),Validators.pattern('[0-9]*$')]);
  direccion = new FormControl('', [Validators.required,Validators.maxLength(300),Validators.minLength(15)]);
  correo = new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{1,5}')]);

  cantidad = new FormControl('', [Validators.required,Validators.maxLength(10), Validators.pattern('[0-9]*$')]);
  descripcion = new FormControl('', [Validators.required, Validators.maxLength(300), Validators.minLength(5), Validators.pattern('[a-z A-Z 0-9 áéíóúÁÉÍÓÚñÑ . , : ; -]*$')]);
  nombreProducto = new FormControl('', [Validators.required, Validators.maxLength(100), Validators.minLength(3), Validators.pattern('[a-z A-Z 0-9 áéíóúÁÉÍÓÚñÑ]*$')]);

  getErrorMessage() {
    return this.nombres.hasError('required') ? 'Ingresa al menos un nombre' :
    this.nombres.hasError('pattern') ? 'No se admite: símbolos, caracteres especiales o números':
            this.nombres.hasError('maxlength') ? 'Máximo 25 caracteres':
            this.nombres.hasError('minlength') ? 'Nombre no válido':
            '';
  }
  getErrorMessage2() {
    return this.apellidos.hasError('required') ? 'Ingresa al menos un apellido' :  
    this.apellidos.hasError('pattern') ? 'No se admite: símbolos, caracteres especiales o números':
            this.apellidos.hasError('maxlength') ? 'Máximo 40 caracteres':
            this.apellidos.hasError('minlength') ? 'Apellidos no válidos':
            '';
  }
  getErrorMessage3() {
    return this.cedula.hasError('required') ? 'Cédula requerida' : 
            this.cedula.hasError('maxlength') ? 'Cédula no válida':
            this.cedula.hasError('minlength') ? 'Cédula no válida':
            '';
  }
  
  
  getErrorMessage9() {
    return this.telefono.hasError('required') ? 'Teléfono requerido' : 
    this.telefono.hasError('maxlength') ? 'Teléfono no válido':
    this.telefono.hasError('minlength') ? 'Teléfono no válido': 
    this.telefono.hasError('pattern') ? 'Teléfono no válido':     
            '';
  }
  getErrorMessage10() {
    return this.celular.hasError('required') ? 'Celular requerido' : 
    this.celular.hasError('maxlength') ? 'Celular no válido':
    this.celular.hasError('minlength') ? 'Celular no válido': 
    this.celular.hasError('pattern') ? 'Celular no válido':   

            '';
  }
  getErrorMessage11() {
    return this.direccion.hasError('required') ? 'Dirección requerida' :  
            this.direccion.hasError('maxlength') ? 'Máximo 300 caracteres':
            this.direccion.hasError('minlength') ? 'Especifica mejor la dirección':
            '';
  }
  getErrorMessage12() {
    return this.correo.hasError('required') ? 'Correo requerido' :  
    this.correo.hasError('pattern') ? 'Ingresa un correo válido':
    '';
  }

  getErrorMessage13() {
    return this.cantidad.hasError('required') ? 'Cantidad de dinero requerido' :
    this.cantidad.hasError('pattern') ? 'Cantidad no valida':
            this.cantidad.hasError('maxlength') ? 'Cantidad no valida':
            '';
  }
  getErrorMessage14() {
    return this.descripcion.hasError('required') ? 'Descripción requerida' :  
    this.descripcion.hasError('pattern') ? 'No se admite: símbolos o caracteres especiales':
            this.descripcion.hasError('maxlength') ? 'Máximo 300 caracteres':
            this.descripcion.hasError('minlength') ? 'Describe mejor la donación':
            '';
  }
  getErrorMessage15() {
    return this.nombreProducto.hasError('required') ? 'Nombre del producto requerido' : 
    this.nombreProducto.hasError('pattern') ? 'No se admite: símbolos o caracteres especiales':

            this.nombreProducto.hasError('maxlength') ? 'Máximo 100 caracteres':
            this.nombreProducto.hasError('minlength') ? 'Especifica mejor el nombre':
            '';
  }
  
  constructor(private _route:ActivatedRoute,
    private _router:Router,private _usuarioService:UsuarioService,private _uploadService:UploadService,private _donacionService:DonacionService, private snackBar: MatSnackBar) { 
    this.filtroBSQ = this._donacionService.obtFiltroDonacion();
    this.identity = this._usuarioService.obtIdentity();
    this.token = this._usuarioService.obtToken();
    this.url = GLOBAL.url;
    this.page = 1;
    this.editarInfDonacion = false;
    this.carga = true;
    this.mensajeVSLE = ""
    this.donacion = new Donacion("","","","","","","","","","","","","","");
    this.tipE = false;
    this.tipP = false;
    this.usS = true;
    this.imgCom ='';
    this.valid = false;
    this.formSelect = false;
    this.userSelect = ''
    //this.prob()
   /* $(function () {
      $('[data-toggle="popover"]').popover()
    })*/
  }
  ngAfterViewInit() {
    this.totalStepsCount = this.myStepper._steps.length;
  }
  ngOnInit() {
    
    $(document).ready(()=>{
      this.prob2()
            
        });
   this.actualPage2();
   $(document).ready(()=>{
    $("#tamDrop").change(()=>{

      this.select = $("#tamDrop").val();
      this.filtroBSQD(this.select)
  });


}); 
  /* $(document).ready(()=>{ this.prob()
   }); */
  }
ngDoCheck(){
  this.identity = this._usuarioService.obtIdentity();
    this.token = this._usuarioService.obtToken();
    this.filtroBSQ = this._donacionService.obtFiltroDonacion();
}

actualPage2(){
  this.type = '';
  this.pagesSelec = []
  this._route.params.subscribe(params =>{
    let tipo = params['tipo'];
    let option = params['option'];
    this.type = option;
    let id = params['id'];
    this.obtFundacion(id)
    this.idFun = id;

if(this.identity != null){
  if(this.identity._id == this.idFun){
    this.valid = true;
  }
    let page = +params['page'];
        this.page = page;
        
        if(!params['page']){
          page = 1;
          this.page = 1;
        }
        
        if(!page){
          page = 1;
        }else{
          this.next_page = page+1;
          this.prev_page = page-1;
  
          if(this.prev_page <= 0){
            this.prev_page = 1;
          }
        }
    if(tipo == 'donaciones'){
      
      if(this.type == 'busqueda'){
        this.filtroBTN = true;
        //devolver listado de usuarios
        console.log(this.filtroBSQ)
        this.buscarDonaciones(page)
        $(document).ready(()=>{
        this.filtroBSQ.forEach(elem => {
          if(elem.tipo == 'tipo'){
            $("#tamDrop").val(elem.option)
          }

        });
      });
      }else{
        $(document).ready(()=>{
        $("#tamDrop").val('Todos')
      });
        this.filtroBTN = false;
        //devolver listado de usuarios
        this.obtDonaciones(page);
      }
  }
}
  });
  
}

  cancelarDonacion(){
    this.resets()
    $("#header").fadeIn("slow");
    $("#mainMS").fadeIn("slow");
    $("#formRD").fadeOut("fast");
  
  }
  cancelarBus(){
   
    
    localStorage.removeItem('busquedaDonaciones');
    this._router.navigate(['fundacion/',this.idFun,'donaciones','all']);
  }
  prob(event){
  
   
     this.obtnerUsuarioApellidos();
      console.log("hola")

 
  }
 
  
  seleccionarUsuario(id){
    

    this.usuarios.forEach(user => {

      if(user._id == id){
        this.usS = false;
        this.userSelect = user;
        
        $("#forms").fadeOut("fast");
       
        setTimeout(()=>{
          $("#userSlc").addClass("diU");
          $("#userSlc").fadeIn("slow");
        }, 200)

        
        
      }
      
    });
  }
  eliminarSeleccion(){
    this.usS = true;
    this.userSelect = '';
    $("#userSlc").fadeOut("fast");
   
    $("#forms").fadeIn('fast')
   
   
    
  }
mostrarTab1(){
  $('#nav-tab a[href="#nav-home"]').tab('show');
  this.formSelect = false;
}
mostrarTab2(){
  $('#nav-tab a[href="#nav-profile"]').tab('show');
  this.formSelect = true;
}
  obtFundacion(id){

    this._usuarioService.obtUsuario(id).subscribe(
      response=>{
        console.log("entro")
        
        this.carga == false
        this.fundacion = response.usuario;
        
      },
      error=>{
        console.log(<any>error);
      }
    )
    

  }

  obtDonaciones(page){
    this.pagesSelec = []
    this._donacionService.obtDonaciones(this.identity._id,page,this.token).subscribe(
      response =>{
        this.carga = false;
        this.advertencia = false;
        this.donaciones = response.donaciones;
        console.log(this.donaciones)
        this.total = response.total;
          this.pages = response.pages;
          this.itemsPerPage = response.itemsPerPage;
          for (let i = 1; i <= this.pages; i++) {
            this.pagesSelec.push(i)
            
          }
          if(page > this.pages){
            this._router.navigate[('/login')]
          }
        
      },
      error=>{
        this.carga = false;
        this.advertencia = true;
        var errorMessage = <any>error;
          this.status = "error"
          console.log(errorMessage)
         
          if(errorMessage != null && error.error.n == '2'){
          
            this.mensaje = 'Lo sentimos, no existe donaciones registradas';
          }else if(errorMessage != null && error.error.n == '3'){
           
            this.mensaje = error.error.message;
          }else{
         
            this.mensaje = 'Algo salio mal, intentalo mas tarde'
          }
      }
    )
  }
  buscarDonaciones(page,adding=false){
   this.pagesSelec = []
    this._donacionService.filtroDonaciones(this.idFun,this.filtroBSQ,page).subscribe(
      response=>{
        this.carga = false;
        if(response.donaciones && response.n == '1'){
          

          
          $(".carga").fadeOut("slow");
         
          this.advertencia = false;
         // this.fotos = response.fot;
          this.total = response.donaciones.length;
          this.pages = response.pages;
          this.itemsPerPage = response.itemsPerPage;
          this.donaciones = response.donaciones;
         
          this.status ='success';
          for (let i = 1; i <= this.pages; i++) {
            this.pagesSelec.push(i)
            
          }
          //this.obtFotos(response.mascotas._id, page);
          if(page > this.pages){
            this._router.navigate[('/login')]
          }
        }
      },
      error=>{
        this.carga = false;
        this.advertencia =true;
        this.status = 'error';
        $(".carga").fadeOut("slow");
        var errorMessage = <any>error;
       
        
        if(errorMessage != null && error.error.n == '2'){
          this.mensaje = 'Lo sentimos, '+error.error.message;
         
          this.snackBar.open('No se encontro resultados','Cerrar', {
            duration: 2000,
          });
         
        }else if(errorMessage != null && error.error.n == '5'){
          this.mensaje = 'No se ha elegigo filtros';
          this.snackBar.open(this.mensaje,'Cerrar', {
            duration: 2000,
          });
         
        }
        
        else{
  
         
          this.mensaje = 'Algo salio mal, intentalo mas tarde'
          this.snackBar.open(this.mensaje,'Cerrar', {
            duration: 2000,
          });
          
        }
      }
    )
  }
  prob2(){

    $("#cedula").keyup(()=>{
      $("#nmbr4").fadeOut("fast")
      this.cedula.setValue(this.limpiarCampo(this.cedula.value));

  }); 
  $("#nombres").keyup(()=>{
    this.nombres.setValue(this.limpiarCampo(this.nombres.value));


}); 
$("#apellidos").keyup(()=>{
   
  this.apellidos.setValue(this.limpiarCampo(this.apellidos.value));
 }); 
$("#correo").keyup(()=>{
   
this.correo.setValue(this.limpiarCampo(this.correo.value));
}); 
$("#direccion").keyup(()=>{
   
this.direccion.setValue(this.limpiarCampo(this.direccion.value));
}); 
$("#direccion").keyup(()=>{
   
  this.direccion.setValue(this.limpiarCampo(this.direccion.value));
  }); 
  $("#descripcion1").keyup(()=>{
   
    this.descripcion.setValue(this.limpiarCampo(this.descripcion.value));
    }); 
    $("#descripcion2").keyup(()=>{
   
      this.descripcion.setValue(this.limpiarCampo(this.descripcion.value));
      }); 
   

  }
  obtnerUsuarioApellidos(){
  
    const apels = $("#bsUsuersApel").val();
 

    if(apels != ''){
      $("#busquedaUsers").fadeIn("slow");
      this._usuarioService.obtUsuariosByApellidos(apels, this.token).subscribe(
        response=>{


       this.usuarios = response.usuarios

        },
        error=>{
          console.log(<any>error)
        }
      )
    }else{
      
     // $("#busquedaUsers").fadeOut("fast");
    }

  }

  selectTipo(tipo){
    this.statusValid2 = '';
    this.statusValid = '';
    $("#header").fadeOut("slow");
    $("#mainMS").fadeOut("slow");
    $("#forms").fadeIn("fast");
    $("#formRD").fadeIn("fast");
   
  
    if(tipo == 'econ'){
      this.tipE = true;
      this.tipP = false;
      $(document).ready(()=>{
        this.prob2()
              
          });
     /* setTimeout(()=>{
        $(".TipoEco").fadeIn("slow");
      }, 200);
      
     */
     /* $(".TipoProd").fadeOut("fast");*/
    }
    if(tipo == 'prod'){
      $(document).ready(()=>{
        this.prob2()
              
          });
      this.tipE = false;;
      this.tipP = true;
      $(".TipoEco").fadeOut("fast");

      setTimeout(()=>{
        $(".TipoProd").fadeIn("slow");
      }, 200);
      
    }
    
    
  }


  editarDonacion(){
    this.editarInfDonacion = true;
  }
  cancelarInfDona(){
    this.editarInfDonacion = false;
  }
 


  verComprobante(comprobante){
    $('#modalComprobante').modal('show')
    this.imgCom =comprobante;

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

  registrarDonacion(stepper: MatStepper){

  if((this.userSelect != '') || (this.nombres.value != '' && this.apellidos.value != '' && this.cedula.value != '' && this.telefono.value != ''
  &&  this.celular.value != '' && this.direccion.value != '' && this.correo.value != '')){
    $(document).ready(()=>{
      this.prob2()
            
        });
    
      if(this.tipE == true){
        this.donacion.cantidad = this.cantidad.value;
        this.donacion.descripcion = this.descripcion.value;
        if(this.filesToUpload2 != undefined && this.filesToUpload2.length > 0){
        if(this.usS == false){
          this.donacion.donante = this.userSelect._id;
        }else{
          this.donacion.nombres = this.nombres.value;
          this.donacion.apellidos = this.apellidos.value;
          this.donacion.cedula = this.cedula.value;
          this.donacion.direccion = this.direccion.value;
          this.donacion.telefono = this.telefono.value;
          this.donacion.celular = this.celular.value;
          
          var valid = this.validar(this.donacion.cedula);
          
        }

        if(this.usS != false){
          if(valid == true){
            this.donacion.tipo = 'economica';
    
            this._donacionService.registerDonacion(this.donacion,this.donacion.tipo, this.token).subscribe(
              response=>{
      
                if(response.donacion && response.n == '1'){
                  this._uploadService.makeGileRequest(this.url+'subir-comprobante/'+response.donacion._id,[],this.filesToUpload2,this.token,'comprobante')
                  .then((result:any)=>{
                    //alert('si')
                     if(result.n == '1'){
                      //form.reset();
                      
                      this.snackBar.open('Registro exitoso','Cerrar', {
                        duration: 2000,
                      });
                      this.usS = true;
                      this.userSelect = "";
                      this.actualPage2()
                    this.cancelarDonacion()
                      this.filesToUpload2 = undefined;
                      this.imL2 = false;
                      $("#RGDO")[0].reset();
                    
                    }
                   
                  });
                }
      
               
                 
              },
              error=>{
                this.snackBar.open('Algo salio mal, intentalo mas tarde','Cerrar', {
                  duration: 2000,
                });
              }
            )
          }else{
            this.snackBar.open('Cédula no válida','Cerrar', {
              duration: 2000,
            });

            this.statusValid = 'errorCedula2'
            stepper.selectedIndex = 0;
          }
        }else{
          this.donacion.tipo = 'economica';
    
            this._donacionService.registerDonacion(this.donacion,this.donacion.tipo, this.token).subscribe(
              response=>{
      
                if(response.donacion && response.n == '1'){
                  this._uploadService.makeGileRequest(this.url+'subir-comprobante/'+response.donacion._id,[],this.filesToUpload2,this.token,'comprobante')
                  .then((result:any)=>{
                    //alert('si')
                     if(result.n == '1'){
                      //form.reset();
                      
                      this.snackBar.open('Registro exitoso','Cerrar', {
                        duration: 2000,
                      });
                      this.usS = true;
                      this.userSelect = "";
                      this.cancelarDonacion()
                      this.actualPage2()
                      
                      this.filesToUpload2 = undefined;
                      this.imL2 = false;
                    
                    
                    }
                   
                  });
                }
      
               
                 
              },
              error=>{
                this.snackBar.open('Algo salio mal, intentalo mas tarde','Cerrar', {
                  duration: 2000,
                });
              }
            )
        }
        
      }else{
        this.snackBar.open('Selecciona una imagen','Cerrar', {
          duration: 2000,
        });
        stepper.selectedIndex = 1;
        this.statusValid2 = 'errorFoto'
      }
      }
  
      if(this.tipP == true){
        this.donacion.nombreProducto = this.nombreProducto.value;
        this.donacion.descripcion = this.descripcion.value;
        if(this.filesToUpload2 != undefined && this.filesToUpload2.length > 0){
        if(this.usS == false){
          this.donacion.donante = this.userSelect._id;
        }else{
          this.donacion.nombres = this.nombres.value;
          this.donacion.apellidos = this.apellidos.value;
          this.donacion.cedula = this.cedula.value;
          this.donacion.direccion = this.direccion.value;
          this.donacion.telefono = this.telefono.value;
          this.donacion.celular = this.celular.value;
          
          var valid = this.validar(this.donacion.cedula);
        }


        if(this.usS != false){
          if(valid == true){

            this.donacion.tipo = 'producto';
            this._donacionService.registerDonacion(this.donacion,this.donacion.tipo, this.token).subscribe(
              response=>{
      
                if(response.donacion && response.n == '1'){
                  this._uploadService.makeGileRequest(this.url+'subir-comprobante/'+response.donacion._id,[],this.filesToUpload2,this.token,'comprobante')
                  .then((result:any)=>{
                    //alert('si')
                     if(result.n == '1'){
                      //form.reset();
                      
                      this.snackBar.open('Registro exitoso','Cerrar', {
                        duration: 2000,
                      });
                      this.usS = true;
                      this.userSelect = "";
                      this.cancelarDonacion()
                      this.actualPage2()
                    
                      this.filesToUpload2 = undefined;
                      this.imL2 = false;
                    
                    }
                   
                  });
                }
              
               
                 
              },
              error=>{
                this.snackBar.open('Algo salio mal, intentalo mas tarde','Cerrar', {
                  duration: 2000,
                });
              }
            )
          }else{
            this.snackBar.open('Cédula no válida','Cerrar', {
              duration: 2000,
            });
            stepper.selectedIndex = 0;
            this.statusValid = 'errorCedula2'
          }
        }else{
          this.donacion.tipo = 'producto';
            this._donacionService.registerDonacion(this.donacion,this.donacion.tipo, this.token).subscribe(
              response=>{
                this._uploadService.makeGileRequest(this.url+'subir-comprobante/'+response.donacion._id,[],this.filesToUpload2,this.token,'comprobante')
                .then((result:any)=>{
                  //alert('si')
                   if(result.n == '1'){
                    //form.reset();
                    
                    this.snackBar.open('Registro exitoso','Cerrar', {
                      duration: 2000,
                    });
                    this.usS = true;
                    this.userSelect = "";
                    this.cancelarDonacion()
                    this.actualPage2()
                    
                    this.filesToUpload2 = undefined;
                    this.imL2 = false;
                  
                  
                  }
                 
                });
              },
              error=>{
                this.snackBar.open('Algo salio mal, intentalo mas tarde','Cerrar', {
                  duration: 2000,
                });
              }
            )
        }
      }else{
        this.statusValid2 = 'errorFoto'
        stepper.selectedIndex = 1;
        this.snackBar.open('Selecciona una imagen','Cerrar', {
          duration: 2000,
        });
      }
       
      }
  }else{
    this.statusValid = 'errorUser'
    stepper.selectedIndex = 0;
    
  }
   
    
 
   
  
  }
  resets(){
    $("#RGDO")[0].reset();

    $("#RGF2")[0].reset();

   
   
               
  }
 obtVoluntarios(id,tipo){
  $("#modalDonacion").modal('hide')
   this.IDAPdonacion = id;
   this.tipoAPdonacion = tipo;
  $('#modalSelecVoluntarios').modal('show')

  let rol = 2;
  
  this._usuarioService.obtVoluntariosNP( rol, this.token).subscribe(
    response=>{
      
      if(response.usuarios && response.n == '1'){
        
        this.voluntarios = response.usuarios;
        

      }else{
        console.log("mal")
      }
    },
    error=>{
      var errorMessage = <any>error;
      console.log(errorMessage)

    }
  )
}

 aprobarDonacion(){
  
  
  this.APdonacion = new Donacion("","","","","","","","","","","","","","");
  var valoresCheck = [];
  $("input[type=checkbox]:checked").each(function(){
    valoresCheck.push({
      '_id':this.value,
      'voluntario':this.value,
      'estado':'pendiente'});

});

if(valoresCheck.length > 0){
  this.APdonacion.voluntarios = valoresCheck;
  this._donacionService.aprobarDonacion(this.APdonacion,this.IDAPdonacion,this.identity._id,this.tipoAPdonacion, this.token).subscribe(
      response=>{
       if(response.donacion && response.n == '1'){
         this.snackBar.open('Donación aprobada','Cerrar', {
           duration: 2000,
         });
         this.mensajeVSLE = ""
         this.actualPage2()
         $('#modalSelecVoluntarios').modal('hide')
       }else if(response.n == '4'){
         this.snackBar.open('No tienes permisos','Cerrar', {
           duration: 2000,
         });
       }
      },
      error=>{
       
       this.snackBar.open('Algo salió mal. Inténtalo mas tarde','Cerrar', {
         duration: 2000,
       });
      }
    )
}else{
  this.mensajeVSLE = "Selecciona al menos un voluntario";
}

 }

 aprobarDonacionEco(idD,tipo){
 
  this.APdonacion = new Donacion("","","","","","","","","","","","","","");
  
 this._donacionService.aprobarDonacion(this.APdonacion,idD,this.identity._id,tipo, this.token).subscribe(
     response=>{
      if(response.donacion && response.n == '1'){
        this.snackBar.open('Donación aprobada','Cerrar', {
          duration: 2000,
        });
        this.actualPage2()
        $("#modalDonacion").modal('hide')
      }else if(response.n == '4'){
        this.snackBar.open('No tienes permisos','Cerrar', {
          duration: 2000,
        });
      }
     },
     error=>{
      this.snackBar.open('Algo salió mal. Inténtalo mas tarde','Cerrar', {
        duration: 2000,
      });
     }
   )
 }

 guardarInfDonacion(form){
 
  this._usuarioService.actualizarUsuario(this.fundacion,this.idFun,this.token ).subscribe(
    response =>{
      if(response.usuario && response.n == '1'){
        
        this.snackBar.open('Información actualizada','Cerrar', {
          duration: 2000,
        });
        this.editarInfDonacion = false;
      
      }else{
        this.snackBar.open('Error, intentalo de nuevo','Cerrar', {
          duration: 2000,
        });
       
      }
    },
    error=>{
      var error2 = <any>error;
      console.log(error)
      
      if((error2 != null  && error2.error.n == '4') || (error2 != null  && error2.error.n == '3') || (error2 != null  && error2.error.n == '2')  ){
       
       
       
        this.snackBar.open(error2.error.message,'Cerrar', {
          duration: 2000,
        });
       
        
      }else{
       
        this.snackBar.open('Algo salió mal, intentalo mas tarde.','Cerrar', {
          duration: 2000,
        });
       
       
      }
    }
  )
}

 negarDonacion(idD){
  
  this.APdonacion = new Donacion("","","","","","","","","","","","","","");
  
 this._donacionService.negarDonacion(this.APdonacion,idD,this.identity._id,this.token).subscribe(
     response=>{
      if(response.donacion && response.n == '1'){
        this.snackBar.open('Donación negada','Cerrar', {
          duration: 2000,
        });
        $("#modalDonacion").modal('hide')
        this.actualPage2()
      }else if(response.n == '4'){
        this.snackBar.open('No tienes permisos','Cerrar', {
          duration: 2000,
        });
      }
     },
     error=>{
      this.snackBar.open('Algo salió mal. Inténtalo mas tarde','Cerrar', {
        duration: 2000,
      });
     }
   )
 }
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

  filtroBSQD(option){

    
    var optionFinal = option;
    if(optionFinal == 'economica' || optionFinal == 'producto'){
      
      if(this.filtroBSQ == null){
       
        this.filtroBSQ = [];
        this.filtroBSQ.push({tipo:'tipo',option:optionFinal})
        
      }else{
       var ok = false;
        this.filtroBSQ.forEach(fl => {
          if(fl.tipo == 'tipo'){
            ok = true;
            fl.option = optionFinal;
          }
  
        });

        if(ok == false){
          this.filtroBSQ.push({tipo:'tipo',option:optionFinal})
        }
      }

      localStorage.setItem('busquedaDonaciones', JSON.stringify(this.filtroBSQ));
    }

    if(this.type == 'busqueda'){
      this.buscarDonaciones(this.page)
    }

    this._router.navigate(['fundacion',this.idFun,'donaciones','busqueda']);
    
    

  }
  visualizarDonacion(id){
    $('#modalDonacion').modal('show');
    this._donacionService.obtDonacion(id).subscribe(
      response=>{
        console.log(response)
        this.donacionOB = response.donacion;
       
          response.donacion.voluntarios.forEach(vol => {
            var voluntario = {
              voluntarioC:'',
              estadoD:''
            }
            this._usuarioService.obtUsuario(vol.voluntario).subscribe(
              response=>{
                voluntario.voluntarioC = response.usuario;
                voluntario.estadoD = vol.estado
                this.voluntariosAS.push(voluntario)
                console.log(this.voluntariosAS)
              },
              error=>{
                console.log(<any>error)

              }
            )
        });
        
      
      },
      error=>{
        console.log(<any>error)

      }
    )
  }

  limpiarCampo(text){

    var textFin = text.replace(/([\\ \\]+(?=[\\ \\])|^\\s+|\\s+$)/g, '');
  
    text = textFin;
  
    return text;
  
  }
 
}

