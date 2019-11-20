import { Component, OnInit , ViewChild, DoCheck} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';

import {GLOBAL} from '../../../services/global';
import {UsuarioService} from '../../../services/usuario.service';



declare var $:any;
@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css'],
  providers:[UsuarioService]
})

export class UsuariosComponent implements OnInit,DoCheck{
 

  public tipo:any;
  public identity;
  public token;
  public url;
  public valid;
  constructor(private _route:ActivatedRoute,
    private _router:Router, private _usuarioService:UsuarioService) { 
      this.identity = this._usuarioService.obtIdentity();
      this.token = this._usuarioService.obtToken();
      this.url = GLOBAL.url;

  }

  ngOnInit() {
    this.identity = this._usuarioService.obtIdentity();
      this.token = this._usuarioService.obtToken();
    this.actualPage()
    
  }
ngDoCheck(){
  this.identity = this._usuarioService.obtIdentity();
      this.token = this._usuarioService.obtToken();
}
  actualPage(){
   // this.obtFundaciones()
   if(this.identity != null){
     if(this.identity.rol == '1'){
      this.valid == true;
     }else if(this.identity.rol == '4'){
      this._router.navigate(['fundacion',this.identity._id,'nosotros','all']);
     }else{
      this._router.navigate(['mascotas','todos']);

     }

   }else{
    this._router.navigate(['mascotas','todos']);
   }
    this._route.params.subscribe(params =>{
      let tipo = params['tipo'];
      this.tipo = tipo;
      console.log(tipo)
     
     
    
    });
  }

}
