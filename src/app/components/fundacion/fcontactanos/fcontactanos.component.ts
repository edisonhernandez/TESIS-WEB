import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {GLOBAL} from '../../../services/global';
import {UsuarioService} from '../../../services/usuario.service';
import {UploadService} from '../../../services/upload.service';
import { UsuarioFundacion } from '../../../models/usuarioFundacion';
declare var $:any;
@Component({
  selector: 'app-fcontactanos',
  templateUrl: './fcontactanos.component.html',
  styleUrls: ['./fcontactanos.component.css'],
  providers:[UsuarioService, UploadService]
})
export class FcontactanosComponent implements OnInit {
  public identity;
  public token;
  public url;
  //variables para recoger lo que venga por la URL
  public idFun;
  public titu;
  //variables para advertencias al editar datos de donaciones
public statusDon;
public advertenciaDon;
public mensajeDon;
public nDon;
public fundacion:UsuarioFundacion;
public editarInfContacto;
public carga;
  constructor(private _route:ActivatedRoute,
    private _router:Router,private _usuarioService:UsuarioService,private _uploadService:UploadService) {
      this.identity = this._usuarioService.obtIdentity();
      this.token = this._usuarioService.obtToken();
      this.url = GLOBAL.url;
      this.carga = true;
      this.editarInfContacto = false;
      this.advertenciaDon = false;
     }

  ngOnInit() {
    this.loadPage();
  }
  loadPage(){
    this._route.params.subscribe(params =>{
      let id = params['id'];
      let ti = params['titu'];
      this.obtFundacion(id);
      this.idFun = id;
      this.titu = ti;
      
      /*if(this.identity){
        if(id == this.identity._id){
          this.valid = true;
        }
      }*/
     
      
    })
  }
  obtFundacion(id){

    this._usuarioService.obtUsuario(id).subscribe(
      response=>{
       
        this.fundacion = response.usuario;
        console.log(this.fundacion)
        this.carga = false;
      },
      error=>{
        console.log(<any>error);
      }
    )
    

  }
  guardarInfContacto(){
    this.advertenciaDon = true;
    this.statusDon = 'procesando';
    this._usuarioService.actualizarUsuario(this.fundacion,this.idFun,this.token ).subscribe(
      response =>{
        if(response.usuario && response.n == '1'){
          
          this.nDon = response.n;
          this.statusDon ='success';
          this.mensajeDon = 'Datos actualizados correctamente.';
        this.progress();
        setTimeout(()=>{
          this.editarInfContacto  = false;
           this.advertenciaDon= false;
          this.statusDon = null;
                      
        }, 3000);
        }else{
          this.progress();
          this.statusDon = 'error';
          this.mensajeDon = 'Algo salió mal, intentalo mas tarde.'
          setTimeout(()=>{ 
            this.editarInfContacto  = false;
            this.advertenciaDon= false; this.statusDon = null;}, 3000);
        }
      },
      error=>{
        var error2 = <any>error;
        console.log(error)
        this.statusDon = 'error';
        if((error2 != null  && error2.error.n == '4') || (error2 != null  && error2.error.n == '3') || (error2 != null  && error2.error.n == '2')  ){
          this.progress();
          this.nDon = error2.error.n;
         
          this.statusDon = 'error';  
          this.mensajeDon = error2.error.message;
          setTimeout(()=>{ this.editarInfContacto  = false; this.statusDon = null;}, 3000);
        }else{
          this.progress();
          this.nDon = 'n';
          console.log(this.nDon )

          this.statusDon = 'error';
          this.mensajeDon = 'Algo salió mal, intentalo mas tarde.'
          setTimeout(()=>{ this.editarInfContacto  = false; this.statusDon = null;}, 3000);
        }
      }
    )
  }

  editarContacto(){
    this.editarInfContacto = true;
  }
  cancelarInfContacto(){
    this.editarInfContacto = false;
  }
 //llenar barra de progreso
 progress(){
  var progreso = 0;
  var idIterval = setInterval(function(){
    // Aumento en 10 el progeso
    progreso +=1;
    $('.progress-bar').css('width', progreso + '%');
      
    //Si llegó a 100 elimino el interval
    if(progreso == 100){
      clearInterval(idIterval);
    }
  },23);

}
}
