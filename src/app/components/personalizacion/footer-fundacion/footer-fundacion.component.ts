import { Component, OnInit, DoCheck } from '@angular/core';
import {UsuarioService} from '../../../services/usuario.service';
import {Router, ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-footer-fundacion',
  templateUrl: './footer-fundacion.component.html',
  styleUrls: ['./footer-fundacion.component.css'],
  providers:[UsuarioService]

})
export class FooterFundacionComponent implements OnInit,DoCheck {
  public identity;
  public token;
  public valid;
  public idFun;
  constructor(private _route:ActivatedRoute,
    private _router:Router,private _usuarioService:UsuarioService) { 
    this.identity = this._usuarioService.obtIdentity();
    this.token = this._usuarioService.obtToken();
    this.valid = false;
  }

  ngOnInit() {
    this.loadPage()
  }

  loadPage(){
    this._route.params.subscribe(params =>{
      let id = params['id'];
      this.idFun = id;
      if(this.identity != null){

        if(this.identity._id == this.idFun){
          this.valid = true;
        }


      }
    })
  }
  ngDoCheck(){
    this.identity = this._usuarioService.obtIdentity();
    this.token = this._usuarioService.obtToken();
    
  }

}
