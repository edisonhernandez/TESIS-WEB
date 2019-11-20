import { Component, OnInit, Input,DoCheck, } from '@angular/core';
import {MascotaService} from '../../../services/mascota.service'
import {UsuarioService} from '../../../services/usuario.service';
import {GLOBAL} from '../../../services/global';
import {Router, ActivatedRoute, Params} from '@angular/router';
declare var Swiper:any;
declare var $:any;
declare var Swiper:any
@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css'],
  providers:[MascotaService,UsuarioService]
})
export class PrincipalComponent implements OnInit, DoCheck {

  public identity;
  public token;
  public mascotas:any;
  public url;


  constructor(private _usuarioService:UsuarioService,private _mascotaService:MascotaService,private _route:ActivatedRoute,
    private _router:Router) { 
      
    this.url = GLOBAL.url;
    this.identity = this._usuarioService.obtIdentity();
    this.token = this._usuarioService.obtToken();
   
  }

  ngOnInit() {
    if(this.identity){
      if(this.identity.rol == '4'){
        this._router.navigate(['fundacion',this.identity._id,'nosotros','all']);
      }
    }
    var swiper = new Swiper('.swiper-container', {
      loop: true,
      autoplay: {
        delay: 2500,
        disableOnInteraction: false,
      },
      scrollbar: {
        el: '.swiper-scrollbar',
        hide: true,
      },
    });
    this.obtMascotas();
  

  }
  ngDoCheck(){
  
    this.identity = this._usuarioService.obtIdentity();
    this.token = this._usuarioService.obtToken();
    
  }

  obtMascotas(){
    this._mascotaService.obtMascotas().subscribe(
      response=>{
        console.log(response)
        this.mascotas =response.mascotas 
      },
      error=>{
        console.log(<any>error)
      }
    )
  }

}
