import { Component, OnInit , ViewChild, DoCheck} from '@angular/core';
import {MatPaginator} from '@angular/material';
import {MatTableDataSource} from '@angular/material'; 
import {MatSort} from '@angular/material/sort';
import {GLOBAL} from '../../../services/global';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {UploadService} from '../../../services/upload.service';
import {UsuarioService} from '../../../services/usuario.service';
import {UsuarioFundacion} from '../../../models/usuarioFundacion';
import {MatSnackBar} from '@angular/material';
import {FormControl, Validators} from '@angular/forms';

declare var $:any;
@Component({
  selector: 'app-afundaciones',
  templateUrl: './afundaciones.component.html',
  styleUrls: ['./afundaciones.component.css'],
  providers:[UsuarioService,UploadService,MatSnackBar]
})
export class AFundacionesComponent implements OnInit,DoCheck {
  public fundaciones:any;
  public url;
  public identity;
  public token;
  public usuarioFundacion:UsuarioFundacion;
  public usuarioFundacion2:any;
  public imgUN3:any;
  public nm = 'noe';
  public cor = 'noe';
  public imL3 = false;
  public idEliminar;
  public newF;
  public carga;
  public edFun
  public statusValid;
  displayedColumns: string[] = ['logo','nombreFundacion','representante','fechaFundacion','correo','telefono','celular','direccion','link','estado','accion'];
 

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
 // displayedColumns: string[] = ['nombre'];
  //dataSource = ELEMENT_DATA;
  dataSource:any;
  
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  sector2= [
    {value: 'Norte'},
    {value: 'Centro'},
    {value: 'Sur'}
  ];
  minDate = new Date(1980, 0, 1);
  maxDate = new Date();
  rgxPass  = new RegExp("^(?:http(s)?:\\/\\/)?[\\w.-]+(?:\\.[\\w\\.-]+)+[\\w\\-\\._~:/?#[\\]@!\\$&'\\(\\)\\*\\+,;=.]+$")
  rgxPass2  = new RegExp("^(?=.*\\d)(?=.*[\\u0021-\\u002b\\u003c-\\u0040])(?=.*[A-Z])(?=.*[a-z])\\S{8,30}$")
  rg = new RegExp("^([a-zA-ZñáéíóúñÑ]+[\\s]+[a-zA-ZñáéíóúñÑ]+[\\s]*)+$")
  date = new FormControl(new Date());

  nombres = new FormControl('', [Validators.required, Validators.pattern('[a-z A-Z áéíóúÁÉÍÓÚñÑ]+$'), Validators.maxLength(25),Validators.minLength(4)]);
  fechaFunda = new FormControl('', [Validators.required]);
  correo2 = new FormControl('', [Validators.required, Validators.pattern('[a-zA-ZñÑ0-9_]+([.][a-zA-ZñÑ0-9_]+)*@[a-zA-ZñÑ0-9_]+([.][a-zA-ZñÑ0-9_]+)*[.][a-zA-Z]{1,5}')]);
  password2 = new FormControl('', [Validators.required, Validators.maxLength(30),Validators.minLength(8), Validators.pattern(this.rgxPass2)]);
  logo = new FormControl('', [Validators.required]);
  id = new FormControl('', [Validators.required]);

  telefono = new FormControl('', [Validators.required,Validators.maxLength(9),Validators.minLength(9),Validators.pattern('[0-9]+$')]);
  celular = new FormControl('', [Validators.required,Validators.maxLength(10),Validators.minLength(10),Validators.pattern('[0-9]+$')]);
  sector = new FormControl('', [Validators.required]);
  barrio = new FormControl('', [Validators.required,Validators.maxLength(50),Validators.minLength(3),Validators.pattern('[0-9 a-z A-Z áéíóúÁÉÍÓÚñÑ . , : ; -]+$')]);
  calleP = new FormControl('', [Validators.required,Validators.maxLength(50),Validators.minLength(3),Validators.pattern('[0-9 a-z A-Z áéíóúÁÉÍÓÚñÑ . , : ; -]+$')]);
  calleS = new FormControl('', [Validators.required,Validators.maxLength(50),Validators.minLength(3),Validators.pattern('[0-9 a-z A-Z áéíóúÁÉÍÓÚñÑ . , : ; -]+$')]);
  link = new FormControl('', [Validators.required, Validators.pattern(this.rgxPass)]);

  representante = new FormControl('', [Validators.required, Validators.pattern(this.rg), Validators.maxLength(50),Validators.minLength(10)]);

  getErrorMessage() {
    return this.nombres.hasError('required') ? 'El nombre es requerido' :
    this.nombres.hasError('pattern') ? 'No se admite: símbolos, caracteres especiales o números':
            this.nombres.hasError('maxlength') ? 'Máximo 25 caracteres':
            this.nombres.hasError('minlength') ? 'Mínimo 4 caracteres':
            '';
  }
  getErrorMessage8() {
    return this.representante.hasError('required') ? 'El representante es requerido' :
    this.representante.hasError('pattern') ? 'Ingresa al menos un nombre y un apellido':
            this.representante.hasError('maxlength') ? 'Exceso de caracteres':
            this.representante.hasError('minlength') ? 'No válido':
            '';
  }
  getErrorMessage2() {
    return this.fechaFunda.hasError('required') ? 'Fecha de fundación requerida' :  
            '';
  }
  
  getErrorMessage13() {
    return this.logo.hasError('required') ? 'Correo requerido' :  
            this.logo.hasError('pattern') ? 'Ingresa un correo válido':
            '';
  }
  getErrorMessage3() {
    return this.correo2.hasError('required') ? 'Correo requerido' :  
            this.correo2.hasError('pattern') ? 'Ingresa un correo válido':
            '';
  }
  getErrorMessage4() {
    return this.password2.hasError('required') ? 'Contraseña requerida' :
    this.password2.hasError('maxlength') ? 'Máximo 30 caracteres':  
    this.password2.hasError('minlength') ? 'Mínimo 8 caracteres':  
           this.password2.hasError('pattern') ? 'Contraseña no válida':  
            '';
  }

  getErrorMessage5() {
    return this.telefono.hasError('required') ? 'Teléfono requerido' : 
    this.telefono.hasError('maxlength') ? 'Máximo 9 caracteres':
    this.telefono.hasError('minlength') ? 'Mínimo 9 caracteres': 
    this.link.hasError('pattern') ? 'Número no válido':   

            '';
  }
  getErrorMessage9() {
    return this.celular.hasError('required') ? 'Celular requerido' : 
    this.celular.hasError('maxlength') ? 'Máximo 10 caracteres':
    this.celular.hasError('minlength') ? 'Mínimo 10 caracteres': 
    this.celular.hasError('pattern') ? 'Número no válido':   

            '';
  }
  getErrorMessage6() {
    return this.barrio.hasError('required') ? 'Nombre del barrio requerido' :  
            this.barrio.hasError('maxlength') ? 'Máximo 50 caracteres':
            this.barrio.hasError('minlength') ? 'Mínimo 3 caracteres':
            this.barrio.hasError('pattern') ? 'No se admite símbolos o caracteres especiales':   
            '';
  }
  getErrorMessage10() {
    return this.calleP.hasError('required') ? 'Calle principal requerida' :  
            this.calleP.hasError('maxlength') ? 'Máximo 50 caracteres':
            this.calleP.hasError('minlength') ? 'Mínimo 3 caracteres':
            this.calleP.hasError('pattern') ? 'No se admite símbolos o caracteres especiales':   
            '';
  }
  getErrorMessage11() {
    return this.calleS.hasError('required') ? 'Calle secundaria requerida' :  
            this.calleS.hasError('maxlength') ? 'Máximo 50 caracteres':
            this.calleS.hasError('minlength') ? 'Mínimo 3 caracteres':
            this.calleS.hasError('pattern') ? 'No se admite símbolos o caracteres especiales':   
            '';
  }
  getErrorMessage12() {
    return this.sector.hasError('required') ? 'Sector requerido' :  
            '';
  }
  getErrorMessage7() {
    return this.link.hasError('required') ? 'Celular requerido' : 
            this.link.hasError('pattern') ? 'URL no válida':   
            '';
  }

  constructor(private _route:ActivatedRoute,
    private _router:Router, private _usuarioService:UsuarioService,private _uploadService:UploadService,private snackBar: MatSnackBar) {
      this.identity = this._usuarioService.obtIdentity();
      this.token = this._usuarioService.obtToken();
      this.url = GLOBAL.url;
      this.newF = false;
      this.usuarioFundacion = new UsuarioFundacion("","","","","","","","","","","","","","","","","","","","","","")

      this.carga = true;

     }

  ngOnInit() {
     
    $(document).ready(()=>{
      $("#nombre").keyup(function () {
        console.log("asdad")
      }).keyup();
      this.prob()
            
        });
    this.obtFundaciones();

    this._route.params.subscribe(params =>{
      let tipo = params['tipo2'];
      if(tipo == 'fundaciones'){
        this.obtFundaciones();
      
      }
     
     
    
    });
 
  }
  prob(){

    $("#nombre").keyup(()=>{
      this.validarNM('n')
      $("#nmbr").fadeOut("fast")
      this.nombres.setValue(this.limpiarCampo(this.nombres.value));

  
  }); 
  $("#representante").keyup(()=>{
     
    this.representante.setValue(this.limpiarCampo(this.representante.value));
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
  $("#correo2").keyup(()=>{
    this.validarNM('c')
    $("#corr").fadeOut("fast")

}); 

  }
  limpiarCampo(text){

    var textFin = text.replace(/([\\ \\]+(?=[\\ \\])|^\\s+|\\s+$)/g, '');
  
    text = textFin;
  
    return text;
  
  }
  ngDoCheck(){
    this.identity = this._usuarioService.obtIdentity();
      this.token = this._usuarioService.obtToken();

  }
  obtFundaciones(){
    this._usuarioService.obtUsuariosRolSP('4',this.token).subscribe(
      response=>{
        if(response.usuarios && response.n == '1'){

            this.fundaciones = response.usuarios;
            $(".carga").fadeOut("slow");

            this.dataSource = new MatTableDataSource<UsuarioFundacion>(this.fundaciones);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
            this.carga = false;

        }else{
        }
      },
      error=>{
        console.log(<any>error)
      }
    )
  }
  obtenerFundacion(id){
    this._usuarioService.obtUsuario(id).subscribe(
      response=>{
        this.usuarioFundacion2 = response.usuario;
        console.log(this.usuarioFundacion2)
      },
      error=>{
        console.log(<any>error)
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

  editarFun(user){
    
    this.edFun = true
   this.logo.setValue(user.logo)
  // console.log(user)
   if(this.logo.value == null){
    this.logo.setValue('')
   }
   this.usuarioFundacion = user;
   this.id.setValue(user._id)
   this.obtenerFundacion(user._id);
   console.log(this.usuarioFundacion2)

   this.nombres.setValue(user.nombreFundacion);
   this.fechaFunda.setValue(user.fechaFundacion)
   this.representante.setValue(user.representante);
   this.correo2.setValue(user.correo)
   this.telefono.setValue(user.telefono)
   this.celular.setValue(user.celular)
   this.sector.setValue(user.sector);
   this.calleP.setValue(user.calleP)
   this.calleS.setValue(user.calleS)
   this.barrio.setValue(user.barrio)
   $('#modalEditFun').modal('show');
   $(document).ready(()=>{
   
    this.prob()
          
      });

  }  

  eliminarLogo(id,file){
    this._usuarioService.eliminarLogo(id,file,'FF').subscribe(
      response=>{
       //this.usuarioFundacion2.logo = null;
       this.obtFundaciones()
       this.logo.setValue('')
      }
    ),
    error=>{

    }
  }
  verificarLogoActuali(){
    //console.log(this.logo.value)
   if(this.logo.value != ''){
     //this.actualizarFundacion();
        this.actualizarFundacion()
   }else{
     if(this.filesToUpload3 == undefined || this.filesToUpload3.length == 0){
       $('#modalEditFun').modal('hide');
       $('#modalValidFOTOEDI').modal('show');
 
     }else{
       //this.actualizarFundacion();
       this.actualizarFundacion()
     }
   }


 }

 

 verificarEliminarFundacion(id){

   $('#modalValidEliminarFUN').modal('show');
   this.idEliminar = id;
 }

 eliminarFundacion(){
   this._usuarioService.eliminarFundacion(this.idEliminar,this.token).subscribe(
     response=>{ 
       if(response.n == '1'){
         this.snackBar.open('Fundación eliminada','Cerrar', {
           duration: 2000,
         });
         this.obtFundaciones()
         $('#modalValidEliminarFUN').modal('hide')
       }
     },
     error=>{
       this.snackBar.open('No se pudo eliminar la fundación','Cerrar', {
         duration: 2000,
       });
     }
   )
 }
 cancelarActualizacionLgo(){
   $('#modalEditFun').modal('show');
   $('#modalValidFOTOEDI').modal('hide');
 }
 




validarNM(op){
  
  if(op == 'n'){
    const nombre = $("#nombre").val();
    this.usuarioFundacion.nombreFundacion = nombre
    this._usuarioService.validarNombreF(this.usuarioFundacion).subscribe(
      response=>{

        if(response.n == '1' && this.usuarioFundacion2.nombreFundacion != this.usuarioFundacion.nombreFundacion ){
          this.statusValid = 'error'
          this.nm = 'sie'
        }else if(response.n == '1' && this.usuarioFundacion2.nombreFundacion == this.usuarioFundacion.nombreFundacion){
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
    this.usuarioFundacion.correoFundacion = coreo
    this._usuarioService.validarCorreoF(this.usuarioFundacion).subscribe(
      response=>{
        if(response.n == '1' && this.usuarioFundacion2.correo != this.usuarioFundacion.correoFundacion ){
          this.statusValid = 'error'
          this.cor = 'sie'
        }else if(response.n == '1' && this.usuarioFundacion2.nombreFundacion == this.usuarioFundacion.correoFundacion){
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

  async actualizarFundacion(){
    // $('#modalEditFun').modal('hide');
    // console.log(this.fechaFunda.value)
     this.usuarioFundacion.nombreFundacion = this.nombres.value.trim();
  
     this.usuarioFundacion.fechaFundacion = this.fechaFunda.value;
     this.usuarioFundacion.correoFundacion = this.correo2.value.trim();
     this.usuarioFundacion.passwordFundacion = this.password2.value.trim();
     this.usuarioFundacion.telefonoFundacion = this.telefono.value;
     this.usuarioFundacion.celular = this.celular.value;
     this.usuarioFundacion.sector = this.sector.value.trim();
     this.usuarioFundacion.barrio = this.barrio.value.trim();
     this.usuarioFundacion.calleP = this.calleP.value.trim();
     this.usuarioFundacion.calleS = this.calleS.value.trim();
     this.usuarioFundacion.representante = this.representante.value.trim();
     this.usuarioFundacion._id = this.id.value;
      
   if(this.nm == 'noe' &&  this.cor == 'noe'){
  
    this._usuarioService.actualizarUsuario(this.usuarioFundacion,this.usuarioFundacion._id,this.token).subscribe(
      response =>{
      // this.usuarioFundacion2 = response.usuario;
        if(response.usuario && response.usuario._id && response.n == '1'){ 
         
          if(this.filesToUpload3 != undefined){
  
            this._uploadService.makeGileRequest2(this.url+'subir-foto-fundacion/'+response.usuario._id,[],this.filesToUpload3,'logo')
            .then((result:any)=>{
              //alert('si')
              
              
              if(result.n == '5' || result.n == '4' || result.n == '2'  || result.n == '1'){
                this.snackBar.open('Error al subir el logo','Cerrar', {
                  duration: 2000,
                });
                
              }else if(result.n == '3'){
              
                this.logo.setValue(result.usuario.logo);
                this.obtFundaciones()
              
                this.filesToUpload3 = undefined;
                this.snackBar.open('Usuario actualizado','Cerrar', {
                  duration: 2000,
                });
  
  
               
               
              }else{
                this.snackBar.open('Error al actualizar','Cerrar', {
                  duration: 2000,
                });
              }
  
  
  
            });
          }else{
           this.obtFundaciones()
            this.snackBar.open('Usuario actualizado','Cerrar', {
              duration: 2000,
            });
          
            this.filesToUpload3 = undefined;
            
         
          }
            
           
          
        
        }else {
          this.snackBar.open('Error al actualizar','Cerrar', {
            duration: 2000,
          });
         
  
        }
      },
      error =>{
        this.snackBar.open('Error al actualizar','Cerrar', {
          duration: 2000,
        });
        
      }
    );
   }else{
     this.statusValid = 'error'
   }
   
    
    }
  
}
