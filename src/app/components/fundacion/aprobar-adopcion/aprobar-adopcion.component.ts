import { Component, OnInit } from '@angular/core';
import {Adopcion} from '../../../models/adopcion';
import {AdopcionService} from '../../../services/adopcion.service';
import {GLOBAL} from '../../../services/global';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {UsuarioService} from '../../../services/usuario.service';
import {MatSnackBar} from '@angular/material';
import {FormControl, Validators} from '@angular/forms';


declare var $:any;
@Component({
  selector: 'app-aprobar-adopcion',
  templateUrl: './aprobar-adopcion.component.html',
  styleUrls: ['./aprobar-adopcion.component.css'],
  providers:[AdopcionService,UsuarioService,MatSnackBar]
})
export class AprobarAdopcionComponent implements OnInit {
  public adopcion:any;
  public identity;
  public token;
  public url;
  public mensajeAPA;
  public statusAPA;
  public advertenciaAPA;
  public idm;

  public advertencia;
  public status;
  public mensaje;
  public n;
  public valid
  public adoptante:any;
  aprobarNg = new FormControl('', []);
  descripcion = new FormControl('', [Validators.required,Validators.maxLength(500),Validators.minLength(25)]);
  getErrorMessage11() {
    return this.descripcion.hasError('required') ? 'Razones requeridas' :  
            this.descripcion.hasError('maxlength') ? 'Máximo 500 caracteres':
            this.descripcion.hasError('minlength') ? 'Debes especificar mejor las razones y pasos a seguir para el adoptante':
            '';
  }
  constructor(private _route:ActivatedRoute,
    private _router:Router, private _adopcionService:AdopcionService,private _usuarioService:UsuarioService,private snackBar: MatSnackBar) {
      this.identity = this._usuarioService.obtIdentity();
      this.token = this._usuarioService.obtToken();
      this.url = GLOBAL.url;
      this.advertenciaAPA = false;
     }

  ngOnInit() {
    this.loadPage()
    $(document).ready(()=>{
      this.prob()
            
        });
  }

  loadPage(){
    this._route.params.subscribe(params =>{
      let id = params['idm'];
      this.idm = id;
      if(this.identity != null){
        if(this.identity.rol == '4'){
         this.valid == true;
         this.obtAdopcion(id);

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
  obtAdopcion(id){
    this.advertencia = true;
    this.status = 'procesando';
    this._adopcionService.obtAdopcion(id,this.token).subscribe(
      response=>{
        if(response.adopcion && response.n == '1'){
          this.adopcion = response.adopcion;
          var ff = this.adopcion.adoptante.fechaNacimiento; 
          var fs = new Date(ff)
          var fn = fs.toLocaleDateString();
          this.adopcion.adoptante.fechaNacimiento = fn;
          console.log(this.adopcion)
          this.n = response.n;
          this.advertencia = false;
          this.status ='success';
          this.mensaje = null;
          $(document).ready(()=>{
            this.prob()
                  
              });

        }else{
          this.n = 'n';
          this.status ='error';
          this.mensaje = 'Algo salio mal, intentalo mas tarde.';

        }
        
      },
      error=>{
        if((error.error.n == '3') || (error.error.n == '2')){
          this.status = 'error';
          this.mensaje= error.error.message;
        }else{
          this.n = 'n';
          this.status ='error';
          this.mensaje = 'Algo salio mal, intentalo mas tarde.';
        }
        
      }

    )
    
  }

  aproNgAdop(id,mid){
    var adop = {
      descripcion:""
    }
    adop.descripcion = this.descripcion.value;
    if(this.aprobarNg.value == '1'){
      this.aprobarAdopcion(adop,id,mid)
    }
    if(this.aprobarNg.value == '2'){
      this.desaprobarAdopcion(adop,id, mid)
    }
  }
  aprobarAdopcion(adop,id, mid){
    this.advertenciaAPA = true;
    this.statusAPA = 'procesando';
    
    $('#tsp').toast('show');
    this._adopcionService.aprobarAdopcion(adop,id,mid, this.token).subscribe(

      response=>{
        this.advertenciaAPA = false;
        if(response.adopcionA && response.mascota && response.n == '1'){
          var end = end
          this.statusAPA = 'success';
          this.snackBar.open('Adopción aprobada','Cerrar', {
            duration: 2000,
            panelClass: [
              'mat-snack-bar-container2'
            ]
          });
          this.obtAdopcion(this.idm);
          
        }else if(response.n == '8' || response.n == '6'){
          this.statusAPA = 'error';
         
          this.mensajeAPA = response.message;
          this.snackBar.open(this.mensajeAPA,'Cerrar', {
            duration: 2000,
          });
        }else{
          this.statusAPA = 'error';
          
          this.mensajeAPA = 'Algo salio mal, intentalo mas tarde';
          this.snackBar.open(this.mensajeAPA,'Cerrar', {
            duration: 2000,
            
          });
        }
       
      },
      error=>{
        this.advertenciaAPA = false;
        this.statusAPA = 'error';

        if((error.error.n == '9') || (error.error.n == '7') || (error.error.n == '5') || (error.error.n == '4') || (error.error.n == '3') || (error.error.n == '2') ){
          this.statusAPA = 'error';
          this.mensajeAPA = error.error.message;
          this.snackBar.open(this.mensajeAPA,'Cerrar', {
            duration: 2000,
          });
        }else{
          this.statusAPA = 'error';
          this.mensajeAPA = 'Algo salio mal, intentalo mas tarde';
          this.snackBar.open(this.mensajeAPA,'Cerrar', {
            duration: 2000,
          });
        }
        
   
      }
    )
  }


  desaprobarAdopcion(adop,id, mid){
    this.advertenciaAPA = true;
    this.statusAPA = 'procesando';
    
   
    this._adopcionService.desaprobarAdopcion(adop,id,mid, this.token).subscribe(

      response=>{
        this.advertenciaAPA = false;
        if(response.adopcionA && response.mascota && response.n == '1'){
          
          this.statusAPA = 'success';
         
          this.mensajeAPA = 'Adopción negada.';
          this.snackBar.open(this.mensajeAPA,'Cerrar', {
            duration: 2000,
          });
          this.obtAdopcion(this.idm);
          
        }else{
          this.statusAPA = 'error';
          
          this.mensajeAPA = 'Algo salio mal, intentalo mas tarde';
          this.snackBar.open(this.mensajeAPA,'Cerrar', {
            duration: 2000,
          });
        }
       
      },
      error=>{
        this.statusAPA = 'error';
        this.advertenciaAPA = false;
        if((error.error.n == '7') || (error.error.n == '6') || (error.error.n == '5') || (error.error.n == '4') || (error.error.n == '3') || (error.error.n == '2') ){
         
          this.mensajeAPA = error.error.message;
          this.snackBar.open(this.mensajeAPA,'Cerrar', {
            duration: 2000,
          });
        }else{
          this.statusAPA = 'error';
          this.mensajeAPA = 'Algo salio mal, intentalo mas tarde';
          this.snackBar.open(this.mensajeAPA,'Cerrar', {
            duration: 2000,
          });
        }
        
   
      }
    )
  }
  prob(){
    $("#descripcion").keyup(()=>{
         
      this.descripcion.setValue(this.limpiarCampo(this.descripcion.value));
}); 

  }
  limpiarCampo(text){

    var textFin = text.replace(/([\\ \\]+(?=[\\ \\])|^\\s+|\\s+$)/g, '');
  
    text = textFin;
  
    return text;
  
  }
}
