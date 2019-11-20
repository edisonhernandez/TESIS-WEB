import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {Notificacion} from '../../../models/notificacion';
import {UsuarioService} from '../../../services/usuario.service';
import {NotificacionService} from '../../../services/notificacion.service';
import {GLOBAL} from '../../../services/global';
import * as $ from 'jquery';
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
  providers:[UsuarioService,NotificacionService]

})
export class NavComponent implements OnInit {
  public identity;
  public token;
  public url;
 
  constructor(private _route:ActivatedRoute,
    private _router:Router,private _usuarioService:UsuarioService,private _notificacionService:NotificacionService) { 
     
      this.identity = this._usuarioService.obtIdentity();
      this.token = this._usuarioService.obtToken();
      this.url = GLOBAL.url;
    }

  ngOnInit() {
    
   /* $(window).scroll(function() {
      if($("#nvSti").offset().top > 62){
       $("#nvSti").addClass("visible");
       
      }else{
        $("#nvSti").removeClass("visible");
      }
  
});*/
  }
  ngDoCheck(){
    this.identity = this._usuarioService.obtIdentity();
    this.token = this._usuarioService.obtToken();
    

     /* if(file_name == 'inicio'){
        this.navM = true;
        
      }else{
        this.navM = false;
      }*/
  }
 /* moveLogin(){
    this._router.navigate(['/login']);
  }*/

 
}
