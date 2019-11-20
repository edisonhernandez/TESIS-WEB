import { Component,OnInit,DoCheck } from '@angular/core';
import {UsuarioService} from './services/usuario.service';
import {Router, ActivatedRoute, Params} from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:[UsuarioService]

})
export class AppComponent implements OnInit, DoCheck {
  title = 'fundaciones-web';
  public url;
  public identity;
  public token;

  constructor(private _route:ActivatedRoute,
    private _router:Router,private _usuarioService:UsuarioService){
      this.identity = this._usuarioService.obtIdentity();
      this.token = this._usuarioService.obtToken();
  }

  ngOnInit() {
    this.identity = this._usuarioService.obtIdentity();
    this.token = this._usuarioService.obtToken();
/*
    if(this.identity != null){
      if(this.identity.rol == 1){
        this._router.navigate(['panel-usuarios','fundaciones']);
      }else if(this.identity.rol == 4){
        this._router.navigate(['perfilFundacion','nosotros']);
      }
    }*/
   
  }
  ngDoCheck(){
    this.identity = this._usuarioService.obtIdentity();
    this.token = this._usuarioService.obtToken();
    
  }
}
