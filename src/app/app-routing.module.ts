import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './components/login-registro/login/login.component';
import { RegistrarComponent } from './components/login-registro/registrar/registrar.component';
import { MascotasComponent } from './components/pestanas/mascotas/mascotas.component';
import { EmergenciasComponent} from './components/pestanas/emergencia/emergencias/emergencias.component';
import { PerfilEmergenciaComponent} from './components/pestanas/emergencia/perfil-emergencia/perfil-emergencia.component';

import { PerfilMascotaComponent} from './components/fundacion/perfil-mascota/perfil-mascota.component';
import { AprobarComponent} from './components/administrador/aprobar/aprobar.component';
import { AprobarAdopcionComponent} from './components/fundacion/aprobar-adopcion/aprobar-adopcion.component';
import { FundacionesComponent} from './components/pestanas/fundaciones/fundaciones.component';
import { PerfilFundacionComponent} from './components/fundacion/perfil-fundacion/perfil-fundacion.component';
import { NosotrosComponent} from './components/fundacion/nosotros/nosotros.component';
import { MismascotasComponent} from './components/fundacion/mismascotas/mismascotas.component';

import { PrincipalComponent} from './components/pestanas/principal/principal.component';
import { RecoverComponent} from './components/administrador/recover/recover.component';
import { UsuariosComponent} from './components/administrador/usuarios/usuarios.component';

import { ActualizarPerfilComponent} from './components/fundacion/actualizar-perfil/actualizar-perfil.component';
import { NewfundacionComponent } from './components/administrador/newfundacion/newfundacion.component';
import { PerfilEmerComponent} from './components/fundacion/perfil-emer/perfil-emer.component';

const routes: Routes = [
 
  //rutas ADMINISTRADOR
  {path:'admin/panel-usuarios/:tipo',component:UsuariosComponent},
  {path:'admin/cuentas/:tipo/:page',component:AprobarComponent},
  {path:'admin/newFundacion',component:NewfundacionComponent},

  //RUTAS GENERALES
  {path:'',component:PrincipalComponent},
  {path:'inicio',component:PrincipalComponent},
  {path:'login',component:LoginComponent},
  {path:'registrar',component:RegistrarComponent},
  {path:'mascotas/:tipo',component:MascotasComponent},
  {path:'mascotas/:tipo/:page',component:MascotasComponent},
  {path:'emergencias/:tipo',component:EmergenciasComponent},
  {path:'emergencias/:tipo/:page',component:EmergenciasComponent},
  {path:'fundaciones/:tipo',component:FundacionesComponent},
  {path:'fundaciones/:tipo/:page',component:FundacionesComponent},
  {path:'emergencia/:id',component:PerfilEmergenciaComponent},
  {path:'perfilMascota/:idm/:id',component:PerfilMascotaComponent},
  

  //RUTAS FUNDACION
  {path:'fundacion/:id/:tipo/:option',component:PerfilFundacionComponent},
  {path:'fundacion/:id/:tipo/:option/:page',component:PerfilFundacionComponent},
  {path:'aprobar-adopcion',component:AprobarAdopcionComponent},
  {path:'aprobar-adopcion/:id/:idm',component:AprobarAdopcionComponent},
  {path:'perfil-emergencia/:id/:ide',component:PerfilEmerComponent},

  /*{path:'perfilFundacion/:id/mascotas',component:MismascotasComponent},

  {path:'aprobar-adopcion',component:AprobarAdopcionComponent},
  {path:'aprobar-adopcion/:id',component:AprobarAdopcionComponent},
  {path:'perfilFundacion/:id/nosotros',component:NosotrosComponent},
  {path:'perfilFundacion/:id/mascotas',component:MismascotasComponent},
*/
  /*{path:'perfilFundacion/:id/:titu/:page',component:PerfilFundacionComponent},
  {path:'perfilFundacion/:id/:titu/:tamanio/:sex/:edad',component:PerfilFundacionComponent},
  {path:'perfilFundacion/:id/:titu/:tamanio/:sex/:edad/:page',component:PerfilFundacionComponent},*/
  {path:'recover',component:RecoverComponent},
  //{path:'panel-usuarios/:tipo',component:UsuariosComponent},
  //{path:'actualizar-perfil/:id',component:ActualizarPerfilComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

 }
 