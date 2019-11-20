import { Component, OnInit,DoCheck } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UsuarioFundacion } from '../../../models/UsuarioFundacion';
import { GLOBAL } from '../../../services/global';
import { UsuarioService } from '../../../services/usuario.service';
import { MatSnackBar } from '@angular/material';
import { element } from 'protractor';
import {FormControl, Validators} from '@angular/forms';
import {Mail} from '../../../models/mail';

declare var $: any;
@Component({
  selector: 'app-aprobar',
  templateUrl: './aprobar.component.html',
  styleUrls: ['./aprobar.component.css'],
  providers: [UsuarioService, MatSnackBar]
})
export class AprobarComponent implements OnInit,DoCheck {
  public identity;
  public token;
  public url;
  public mail:Mail;

  public aprobarC;
  public msjPer;
  public page;
  public total;
  public pages;
  public itemsPerPage;
  public fundacionesNA=[];
  public fundacion: UsuarioFundacion;
  public fundacion2: any;
  public idSolicitud;
  public idFunAD;
  public next_page;
  public prev_page;
  //variables para advertencias al cargar todas las fundaciones
  public advertencia;
  public mensaje;
  public status;
  public mensaje2;
  public carga;
  public verTodas;
  public valid;
  msj = new FormControl('', [Validators.required, Validators.maxLength(300),Validators.minLength(10)]);
  getErrorMessage() {
    return this.msj.hasError('required') ? 'El mensaje es requerido' :
            this.msj.hasError('maxlength') ? 'Máximo 300 caracteres':
            this.msj.hasError('minlength') ? 'Mínimo 10 caracteres':
            '';
  }
  constructor(private _route: ActivatedRoute,
    private _router: Router, private _usuarioService: UsuarioService, private snackBar: MatSnackBar) {
    this.identity = this._usuarioService.obtIdentity();
    this.token = this._usuarioService.obtToken();
    this.url = GLOBAL.url;
    this.page = 1;
    this.advertencia = false;
    this.carga = true;
    this.msjPer = false;
    this.mail = new Mail("","","","","","");
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


  }

  ngOnInit() {
    $(document).ready(()=>{
      $('input[type=checkbox]').on('change', function() {
        if ($(this).is(':checked') ) {
            console.log("Checkbox " + $(this).prop("id") +  " (" + $(this).val() + ") => Seleccionado");
        } else {
            console.log("Checkbox " + $(this).prop("id") +  " (" + $(this).val() + ") => Deseleccionado");
        }
    });
  })

  if(this.identity != null){
    if(this.identity.rol == '1'){
     this.valid == true;
     this.loadPage();
    }else if(this.identity.rol == '4'){
      this._router.navigate(['fundacion',this.identity._id,'nosotros','all']);
    }else{
     this._router.navigate(['mascotas','todos']);

    }

  }else{
   this._router.navigate(['mascotas','todos']);
  }
    

  }
   ngDoCheck(){
    this.identity = this._usuarioService.obtIdentity();
    this.token = this._usuarioService.obtToken();
   }
  loadPage() {
    this._route.params.subscribe(params => {
      let id;
      let page;
      let idSOlicitud = params['tipo'];
     


      if(idSOlicitud != 'all'){
        id = params['page'];

      }else{
        console.log("entro")
        page = +params['page'];
        this.page = page;
        if(!params['page']){
          page = 1;
          this.page = 1;
        }
        if(!page){
          page = 1;
        }else{
          this.next_page = page+1;
          this.prev_page = page-1;
  
          if(this.prev_page <= 0){
            this.prev_page = 1;
          }
        }
      }
     

      if(idSOlicitud != 'all' && idSOlicitud != 'fundaciones' && idSOlicitud != 'voluntarios'
      && idSOlicitud != 'ciudadanos' && idSOlicitud != 'newFundacion'){
        this.verTodas = 'no';
        this.obtFundacion(id);
        this.idSolicitud = idSOlicitud
      }else {
        this.obtFundacionesNA(this.page);
        this.verTodas = 'si';
      }



    })
  }

  obtFundacionesNA(page) {

      this._usuarioService.obtFundacionesNa(page, this.token).subscribe(
        response => {
          this.fundacionesNA = []

          if (response.fundacionesNA && response.n === '1') {
            this.carga = false;
            this.advertencia = false;
            this.total = response.total;
            this.pages = response.pages;
            console.log(this.pages + "AQUII")
            this.itemsPerPage = response.itemsPerPage;

            response.fundacionesNA.forEach(e => {
                var ff =   new Date(e.fechaFundacion);
                var fin = ff.toLocaleDateString()
                e.fechaFundacion = fin;
                this.fundacionesNA.push(e)
            
            });
          
             
            if (page > this.pages) {
              console.log("AQUIIentro")

              this._router.navigate(['admin','cuentas','all','1']);
            }
          } else {
            this.carga = false;
           // this.status = 'error';
          }
        },
        error => {
          var errorMessage = <any>error;
          this.carga = false;
          this.advertencia = true;
          this.fundacionesNA = []
          if ((errorMessage != null && error.error.n == '5') || (errorMessage != null && error.error.n == '4') || (errorMessage != null && error.error.n == '3')) {
        
            this.mensaje2 = error.error.message;
          }else if(errorMessage != null && error.error.n == '2'){
              this._router.navigate(['admin','cuentas','all','1']);
              this.mensaje2 = error.error.message;

          } 
          
          
          else {
           
            this.mensaje2 = 'Algo salio mal.'
          }
        }
      )


  }

  // Obtener datos de la mascota segun su id
  obtFundacion(id) {
      this._usuarioService.obtFundacionNa(id, this.token).subscribe(
        response => {

          if (response.fundacion && response.n === '1') {
            
            this.carga = false;
            this.fundacion = response.fundacion;

            if(this.fundacion.estado != 'desactivo'){
              this.advertencia = true;
              this.mensaje2 = "No se pudo encontrar la fundación"
            }else{
              this.advertencia = false;
            }
          } else if (response.n === '2') {
            this.advertencia = true;
            this.mensaje2 = response.message;
            this.carga = false;
          } else {
            this.advertencia = true;
            this.carga = false;
            this.mensaje2 = 'Algo salio mal.'
          }
        },
        error => {
          var error = <any>error;
          this.carga = false;
          this.advertencia = true;
          if ((error != null && error.error.n == '6') || (error != null && error.error.n == '5') || (error != null && error.error.n == '4') || (error != null && error.error.n == '3')) {
          
            this.mensaje2 = error.error.message;
          } else {
            this.mensaje2 = 'Algo salio mal.'
          }
        }
      );
    

  }


  // activar una cuenta de fundacion

  aprobarCuenta(id) {
    this.status = 'procesando';
    this.idFunAD = id;
    this._usuarioService.aprobarFundacion(this.fundacion2, id, this.token).subscribe(
      response => {
        if (response.fundacion && response.n == '1') {

          
          var as = "APROBADMIN";
          this.mail.asunto = as;

          if(this.msjPer == false){
            this.mail.mensaje = "La cuenta de "+this.fundacion2.nombreFundacion+" ha sido aprobada exitosamente. ya puedes iniciar sesión, actualizar tus datos de perfil y comenzar a publicar en nuestra plataforma."
          }
          if(this.msjPer == true){
            this.mail.mensaje = this.msj.value;
          }
          this.mail.nombreFundacion = this.fundacion2.nombreFundacion;
          this.mail.correoFundacion = this.fundacion2.correo;
          
    this._usuarioService.enviarEmail(this.mail).subscribe(
      res=>{
        
        if(res.n == '3'){
          $('#modalPro').modal('hide')
          if(this.msjPer == true){
            $("#formMsjPer")[0].reset();
          }
          
          this.snackBar.open('Cuenta aprobada', 'Cerrar', {
            duration: 2000,
          });

 
            if (this.verTodas === 'no') {
              this.status = '';
              this._router.navigate(['/admin','cuentas','all','1']);
            } else {

              this.status = '';
              this.obtFundacionesNA(this.page);

            }


      
        }else{
           this.snackBar.open('No se pudo enviar el correo2','Cerrar', {
           duration: 2000,
           });
        }

      },
      err=>{
        console.log(<any>err)
        this.snackBar.open('No se pudo enviar el correo','Cerrar', {
          duration: 2000,
          });
      }
    )
        } else {
          this.snackBar.open('Algo salió mal, intentalo mas tarde', 'Cerrar', {
            duration: 2000,
          });
        }
      },
      error => {
        var error2 = <any>error;
        console.log(error)
        this.status = 'error';
        if ((error2 != null && error2.error.n == '5') || (error2 != null && error2.error.n == '4') || (error2 != null && error2.error.n == '3') || (error2 != null && error2.error.n == '2')) {
          this.mensaje2 = error2.error.message;
          this.snackBar.open(this.mensaje2, 'Cerrar', {
            duration: 2000,
          });


        } else {
          this.mensaje2 = 'Algo salió mal, intentalo mas tarde.'
          this.snackBar.open(this.mensaje2, 'Cerrar', {
            duration: 2000,
          });
        }
      }
    )

  }
  desaprobarCuenta(id,fund) {
    this.status = 'procesando';
    this.idFunAD = id;
    this._usuarioService.desaprobarFundacion(this.idSolicitud, id, this.token).subscribe(
      response => {
        if (response.n == '1') {



          var as = "APROBADMIN";
          this.mail.asunto = as;

          if(this.msjPer == false){
            this.mail.mensaje = "La cuenta de "+fund.nombreFundacion+" ha sido aprobada exitosamente. ya puedes iniciar sesión, actualizar tus datos de perfil y comenzar a publicar en nuestra plataforma."
          }
          if(this.msjPer == true){
            this.mail.idFundacion = this.msj.value;
          }
          this.mail.nombreFundacion = fund.nombreFundacion;
          this.mail.correoFundacion = fund.correo;
    this._usuarioService.enviarEmail(this.mail).subscribe(
      res=>{
        
        if(res.n == '3'){

          
            $("formMSJ")[0].reset();
          
          
          this.snackBar.open('Cuenta desaprobada', 'Cerrar', {
            duration: 2000,
          });
          setTimeout(() => {
            if (this.verTodas == 'no') {
              this.status = '';
              this._router.navigate(['/admin','cuentas','all','1']);
            } else {
              this.status = '';
              this.obtFundacionesNA(1);

            }


          }, 1000);

      
        }else{
           this.snackBar.open('No se pudo enviar el correo','Cerrar', {
           duration: 2000,
           });
        }

      },
      err=>{
        this.snackBar.open('No se pudo enviar el correo','Cerrar', {
          duration: 2000,
          });
      }
    )
        
        } else {

          this.status = 'error';
          this.mensaje = 'Algo salió mal, intentalo mas tarde.'
          this.snackBar.open(this.mensaje, 'Cerrar', {
            duration: 2000,
          });
        }

      },
      error => {
        var error2 = <any>error;
        console.log(error)
    
        if ((error2 != null && error2.error.n == '7') || (error2 != null && error2.error.n == '6') || (error2 != null && error2.error.n == '5') || (error2 != null && error2.error.n == '4') || (error2 != null && error2.error.n == '3') || (error2 != null && error2.error.n == '2')) {
          this.mensaje = error2.error.message;
          this.snackBar.open(this.mensaje, 'Cerrar', {
            duration: 2000,
          });
        } else {

          this.mensaje = 'Algo salió mal, intentalo mas tarde.'
          this.snackBar.open(this.mensaje, 'Cerrar', {
            duration: 1000,
          });
        }
      }
    )

  }


  // fundaciones a cargar al iniciar la plantilla

  //ver todas las fundaciones por aprobar cuenta
  verTodasFundaciones() {
    this._router.navigate(['/admin','cuentas','all','1']);
  }
  validarMsj(){
    if ($('#exampleRadios1').prop('checked') ) {
      this.msjPer = false;
      $("#formMsjPer").fadeOut("fast")

  }
  if ($('#personalizado').prop('checked') ) {
    this.msjPer = true;
    
    $("#formMsjPer").fadeIn("fast")
}

  }
  procesoCuenta(op,user){
    if(op == 'yes'){
      this.fundacion2 = user;
      this.aprobarC = true;
      $('#modalPro').modal('show')
    }else{
      this.aprobarC = false;
      $('#modalPro').modal('show')
    }
    
  }
  enviarMail(){
    
  }
}
