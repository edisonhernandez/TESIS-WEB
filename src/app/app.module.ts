import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './components/login-registro/login/login.component';
import { RegistroComponent } from './components/login-registro/registro/registro.component';
import { RegistrarComponent } from './components/login-registro/registrar/registrar.component';
import { AciudadanosComponent } from './components/administrador/aciudadanos/aciudadanos.component';
import { AFundacionesComponent } from './components/administrador/afundaciones/afundaciones.component';
import { AprobarComponent } from './components/administrador/aprobar/aprobar.component';
import { AvoluntariosComponent } from './components/administrador/avoluntarios/avoluntarios.component';
import { NewfundacionComponent } from './components/administrador/newfundacion/newfundacion.component';
import { RecoverComponent } from './components/administrador/recover/recover.component';
import { UsuariosComponent } from './components/administrador/usuarios/usuarios.component';
import { ActualizarPerfilComponent } from './components/fundacion/actualizar-perfil/actualizar-perfil.component';
import { AdopcionesComponent } from './components/fundacion/adopciones/adopciones.component';
import { AprobarAdopcionComponent } from './components/fundacion/aprobar-adopcion/aprobar-adopcion.component';
import { DonacionesComponent } from './components/fundacion/donaciones/donaciones.component';
import { FcontactanosComponent } from './components/fundacion/fcontactanos/fcontactanos.component';
import { MismascotasComponent } from './components/fundacion/mismascotas/mismascotas.component';
import { NosotrosComponent } from './components/fundacion/nosotros/nosotros.component';
import { PerfilFundacionComponent } from './components/fundacion/perfil-fundacion/perfil-fundacion.component';
import { PerfilMascotaComponent } from './components/fundacion/perfil-mascota/perfil-mascota.component';
import { SearchComponent } from './components/fundacion/search/search.component';
import { VoluntariosComponent } from './components/fundacion/voluntarios/voluntarios.component';
import { FooterComponent } from './components/personalizacion/footer/footer.component';
import { NavComponent } from './components/personalizacion/nav/nav.component';
import { EmergenciasComponent } from './components/pestanas/emergencia/emergencias/emergencias.component';
import { PerfilEmergenciaComponent } from './components/pestanas/emergencia/perfil-emergencia/perfil-emergencia.component';
import { FundacionesComponent } from './components/pestanas/fundaciones/fundaciones.component';
import { MascotasComponent } from './components/pestanas/mascotas/mascotas.component';
import { PrincipalComponent } from './components/pestanas/principal/principal.component';

import {MatCheckboxModule, MatSnackBarModule, MatPaginatorModule} from '@angular/material';
import {MatStepperModule} from '@angular/material/stepper';
import {
  MatToolbarModule,  
  MatTabsModule,
  MatButtonModule,
  MatIconModule,
  MatCardModule,
  MatOptionModule,
  MatFormFieldModule,
  MatInputModule,
  MatRippleModule,
  MatSelectModule,
  MatTooltipModule,
  ErrorStateMatcher,

  ShowOnDirtyErrorStateMatcher,
  MatSnackBar,
  MatTableModule,
  MatSortModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatExpansionModule,
  MatRadioModule
  
  
} from '@angular/material';
import { NgxSortableModule } from 'ngx-sortable'
import {DragDropModule} from '@angular/cdk/drag-drop';
import {MomentModule} from 'angular2-moment';
import { NgxUsefulSwiperModule } from 'ngx-useful-swiper';
import { NavFundacionComponent } from './components/personalizacion/nav-fundacion/nav-fundacion.component';
import { NavAdminComponent } from './components/personalizacion/nav-admin/nav-admin.component';
import { HomeAdminComponent } from './components/administrador/home-admin/home-admin.component';
import { MisemergenciasComponent } from './components/fundacion/misemergencias/misemergencias.component';
import { FooterFundacionComponent } from './components/personalizacion/footer-fundacion/footer-fundacion.component';
import { FooterAdminComponent } from './components/personalizacion/footer-admin/footer-admin.component';
import { PerfilEmerComponent } from './components/fundacion/perfil-emer/perfil-emer.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistroComponent,
    RegistrarComponent,
    AciudadanosComponent,
    AFundacionesComponent,
    AprobarComponent,
    AvoluntariosComponent,
    NewfundacionComponent,
    RecoverComponent,
    UsuariosComponent,
    ActualizarPerfilComponent,
    AdopcionesComponent,
    AprobarAdopcionComponent,
    DonacionesComponent,
    FcontactanosComponent,
    MismascotasComponent,
    NosotrosComponent,
    PerfilFundacionComponent,
    PerfilMascotaComponent,
    SearchComponent,
    VoluntariosComponent,
    FooterComponent,
    NavComponent,
    EmergenciasComponent,
    PerfilEmergenciaComponent,
    FundacionesComponent,
    MascotasComponent,
    PrincipalComponent,
    NavFundacionComponent,
    NavAdminComponent,
    HomeAdminComponent,
    MisemergenciasComponent,
    FooterFundacionComponent,
    FooterAdminComponent,
    PerfilEmerComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
     FormsModule,
     HttpClientModule,
     ReactiveFormsModule,
     MomentModule,
    BrowserAnimationsModule,
    MatButtonModule, 
    NgxUsefulSwiperModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatTabsModule,
    MatButtonModule,
    MatIconModule,
    MatRadioModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatRippleModule,
    MatOptionModule,
    MatSelectModule,
    MatExpansionModule,
    MatSnackBarModule,
    MatStepperModule,
    MatTooltipModule,
  
    NgxSortableModule,
    DragDropModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
