import { Component, OnInit,DoCheck } from '@angular/core';
import {GLOBAL} from '../../../services/global';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {UsuarioService} from '../../../services/usuario.service';
import {NotificacionService} from '../../../services/notificacion.service';
declare var $:any;
@Component({
  selector: 'app-nav-admin',
  templateUrl: './nav-admin.component.html',
  styleUrls: ['./nav-admin.component.css'],
  providers:[UsuarioService,NotificacionService]
})
export class NavAdminComponent implements OnInit,DoCheck {
  public identity;
  public token;
  public url;
  public idFun;
  
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
     }

  ngOnInit() {
    this.identity = this._usuarioService.obtIdentity();
    this.token = this._usuarioService.obtToken();
   this.loadPage();
   $(document).ready(()=>{
    this.finSc()
  
 })

  }

  ngDoCheck(){
    this.identity = this._usuarioService.obtIdentity();
    this.token = this._usuarioService.obtToken();

  }

  loadPage(){
    this._route.params.subscribe(params =>{
      
      let ti = params['titu'];
      
      
    })
  }

  obtallnotificaciones(page,adding=false){
    this._notificacionService.obtALLNotificacionesAD(page,this.token).subscribe(
      response=>{

        if(response.notificaciones){
          console.log(response)
          this.total = response.totalPubli;
          this.pages = response.pages;
          this.itemsPerPage = response.itemsPerPage;
          if(!adding){
            this.notificaciones = response.notificaciones;
          }else{
            var arrayA = this.notificaciones;
            var arrayB = response.notificaciones;
            this.notificaciones = arrayA.concat(arrayB);        
          }
          
          
        }else{
          this.status = 'error';
          this.mensaje = 'No existe notificaciones'
        }
      },
      error=>{
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
