import { Component, OnInit,DoCheck } from '@angular/core';
import {GLOBAL} from '../../../services/global';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {UsuarioService} from '../../../services/usuario.service';
import {NotificacionService} from '../../../services/notificacion.service';

import { UsuarioFundacion } from '../../../models/usuarioFundacion';

declare var $:any;
@Component({
  selector: 'app-nav-fundacion',
  templateUrl: './nav-fundacion.component.html',
  styleUrls: ['./nav-fundacion.component.css'],
  providers:[UsuarioService,NotificacionService]
})
export class NavFundacionComponent implements OnInit,DoCheck {
  public identity;
  public token;
  public url;
  public idFun;
  public valid;
  public fundacion:UsuarioFundacion;
  public cargaN;
  public notificaciones=[]
  public total;
  public pages;
  public itemsPerPage;
  public status;
  public mensaje;
  public page;
  constructor(private _route:ActivatedRoute,
    private _router:Router,private _usuarioService:UsuarioService,private _notificacionService:NotificacionService) { 

    this.identity = this._usuarioService.obtIdentity();
    this.token = this._usuarioService.obtToken();
    this.url = GLOBAL.url;
    this.page = 1;
    this.valid = false;
    this.cargaN = true;
  }

  ngOnInit() {
    this.identity = this._usuarioService.obtIdentity();
    this.token = this._usuarioService.obtToken();
   this.loadPage();

   

  
   $(document).ready(()=>{
     this.finSc()
   var element = document.getElementById('dropNOTIF'); 
   if (element.scrollHeight - element.scrollTop === element.clientHeight) { 
    console.log("llegaste al final")
   } 
  })
  }

  ngDoCheck(){
    this.identity = this._usuarioService.obtIdentity();
    this.token = this._usuarioService.obtToken();
  }
  loadPage(){
    this._route.params.subscribe(params =>{
      let id = params['id'];
      let ti = params['titu'];
      this.obtFundacion(id);
      this.idFun = id;
     
      console.log(this.idFun)
      
      if(this.identity != null){
        if(this.identity._id){
          this.valid = true;
        }
      }
     

      
    })
  }
  obtFundacion(id){

    this._usuarioService.obtUsuario(id).subscribe(
      response=>{
       
        this.fundacion = response.usuario;
      },
      error=>{
        console.log(<any>error);
      }
    )
    

  }
  obtallnotificaciones(page,adding=false){
    this.cargaN = true;     
    this.identity = this._usuarioService.obtIdentity();
    this._notificacionService.obtALLNotificaciones(page,this.token).subscribe(
      response=>{

        if(response.notificaciones){
          console.log(response)
          this.total = response.totalPubli;
          this.pages = response.pages;
          this.itemsPerPage = response.itemsPerPage;
          if(!adding){

            this.notificaciones = response.notificaciones;
            this.cargaN = false;
          }else{
            var arrayA = this.notificaciones;
            var arrayB = response.notificaciones;
            this.notificaciones = arrayA.concat(arrayB);  
            this.cargaN = false;      
          }
          
          
        }else{
          this.status = 'error';
          this.mensaje = 'No existe notificaciones'
        }
      },
      error=>{
        this.cargaN = false;    
        console.log(<any>error)
      }
    )
  }
  cerrarSesion(){
    localStorage.clear();
    this.identity = null;
    this._router.navigate(['mascotas','todos']);
  }
  public noMore = false;
  verMas(){
    this.page += 1;
    if(this.page == this.pages){
      this.noMore = true;
    }
   // $("html, body").animate({scrollTop:$('body').prop("scrollHeight")},500);
    this.obtallnotificaciones(this.page, true);
  }

  finSc(){
    

  $("#divNotificacion").scroll(()=>{
  let element = document.getElementById("divNotificacion");
  if (element.offsetHeight + element.scrollTop >= element.scrollHeight) {
    this.verMas()
  }
})
  }
}
