import { Component, OnInit , ViewChild} from '@angular/core';
import {UsuarioService} from '../../../services/usuario.service';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {GLOBAL} from '../../../services/global';
import {MatPaginator} from '@angular/material';
import {MatTableDataSource} from '@angular/material';
import {MatSort} from '@angular/material/sort';
import {UsuarioFundacion} from '../../../models/usuarioFundacion';
@Component({
  selector: 'app-avoluntarios',
  templateUrl: './avoluntarios.component.html',
  styleUrls: ['./avoluntarios.component.css'],
  providers:[UsuarioService]
})
export class AvoluntariosComponent implements OnInit {
  public fundaciones:any;
  public url;
  public identity;
  public token;
  public carga;

  public usuarioFundacion:UsuarioFundacion;
  displayedColumns: string[] = ['nombres','cedula','correo','direccion','telefono','celular','tipoVoluntario','disponibilidadCasa','disponibilidadParticipacion','disponibilidadTiempo','estado'];
 

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
 // displayedColumns: string[] = ['nombre'];
  //dataSource = ELEMENT_DATA;
  dataSource:any;
  
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  constructor(private _route:ActivatedRoute,
    private _router:Router, private _usuarioService:UsuarioService) { 
      this.identity = this._usuarioService.obtIdentity();
      this.token = this._usuarioService.obtToken();
      this.url = GLOBAL.url;
      this.carga = true;
    }

  ngOnInit() {
    this._route.params.subscribe(params =>{
      let tipo = params['tipo'];
      if(tipo == 'voluntarios'){
        this.obtVoluntarios()
      
      }
     
     
    
    });
   
  }
  obtVoluntarios(){
    
    this._usuarioService.obtUsuariosRolSP('2',this.token).subscribe(
      response=>{
        if(response.usuarios && response.n == '1'){
          this.carga = false;
            this.fundaciones = response.usuarios;
            this.dataSource = new MatTableDataSource<UsuarioFundacion>(this.fundaciones);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
            console.log(this.fundaciones)
        }
      },
      error=>{
        console.log(<any>error)
      }
    )
  }
}
