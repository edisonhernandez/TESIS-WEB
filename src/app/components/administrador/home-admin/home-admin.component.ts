import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {UsuarioService} from '../../../services/usuario.service';

@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.component.html',
  styleUrls: ['./home-admin.component.css'],
  providers:[UsuarioService]

})
export class HomeAdminComponent implements OnInit {
  public tipo;
  public token;
  constructor(private _route:ActivatedRoute,
    private _router:Router,private _usuarioService:UsuarioService) {
      this.token = this._usuarioService.obtToken();
      console.log(this.token)

     }

  ngOnInit() {
    this.loadPage()
  }

  loadPage(){
    this._route.params.subscribe(params =>{
      let tipo = params['tipo'];
      this.tipo = tipo;
      console.log(tipo)
    });
  }
}
