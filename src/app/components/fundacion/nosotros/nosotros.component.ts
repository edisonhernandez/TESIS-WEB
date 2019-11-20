import { Component, OnInit } from '@angular/core';
import {UsuarioFundacion} from '../../../models/usuarioFundacion';
import {FormControl, Validators} from '@angular/forms';
import {Historia} from '../../../models/historia';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {MascotaService} from '../../../services/mascota.service';
import {UploadService} from '../../../services/upload.service';
import {GLOBAL} from '../../../services/global';
import {UsuarioService} from '../../../services/usuario.service';
import {MatSnackBar} from '@angular/material';
import {PortadaFundacion} from '../../../models/portadaFundacion';
declare var $:any;
@Component({
  selector: 'app-nosotros',
  templateUrl: './nosotros.component.html',
  styleUrls: ['./nosotros.component.css'],
  providers:[UsuarioService,UploadService,MatSnackBar]
})
export class NosotrosComponent implements OnInit {
  mensaje1 = new FormControl('', [Validators.maxLength(30),Validators.minLength(3)]);
  mensaje2 = new FormControl('', [Validators.maxLength(30),Validators.minLength(3)]);
  getErrorMessage() {
    return  this.mensaje1.hasError('maxlength') ? 'Máximo 30 caracteres':
            this.mensaje1.hasError('minlength') ? 'Mínimo 6 caracteres':
            '';
  }
  getErrorMessage2() {
    return  this.mensaje2.hasError('maxlength') ? 'Máximo 30 caracteres':
            this.mensaje2.hasError('minlength') ? 'Mínimo 6 caracteres':
            '';
  }
  public usuarioFundacion:UsuarioFundacion;
  public url;
  public identity;
  public token;
 public valid
  public imgUN2:any;
  public imL2 = false;
  public historia:Historia;
  public historiasF=[];
  public idF;
  public lgtHI;

  //variables para guardar las portaas
  public portadasFundacion:UsuarioFundacion[];
  public portada:PortadaFundacion;
  public p;
  public hh = [];

  public advertenciaNewPor 
  public statusNewPor 
  public mensajeNewPor
  public imgUN3:any;
  public imL3 = false;
  constructor(private _route:ActivatedRoute,
    private _router:Router, 
    private _mascotaService:MascotaService,private _usuarioService:UsuarioService ,private _uploadService:UploadService, private snackBar: MatSnackBar) { 
    this.identity = this._usuarioService.obtIdentity();
    this.token = this._usuarioService.obtToken();
    this.url = GLOBAL.url;
    this.historia = new Historia("","","","");
    this.portada = new PortadaFundacion("","","","","")
    this.lgtHI = false;
    $(document).ready(()=>{
      this.prob()
            
        });
    
  } 

  ngOnInit() {

  
    $(document).ready(()=>{
      this.prob()
            
        });
    this.loadPage();
    

   
  }

  jj(){
    $(document).ready(function() {

      var docWidth = $('.historias').width(),
        slidesWidth = $('.card-deckl').width(),
        rangeX = slidesWidth - docWidth,
        $images = $('.card-deckl');

        $('.historias').on('mousemove', function(e) {
          var mouseX = e.pageX,
            offset = mouseX / docWidth * slidesWidth - mouseX / 2;
        
          $images.css({
            '-webkit-transform': 'translate3d(' + -offset + 'px,0,0)',
            'transform': 'translate3d(' + -offset + 'px,0,0)'
          });
        });

    })
  }
  loadPage(){
    this._route.params.subscribe(params =>{
  
      let id = params['id'];
      this.idF = id;

      
      this.obtFundacion2()
      this.obtenerHistorias(this.idF);
      this.obtPortadasFundacion(this.idF)
       this.jj()
       if(this.identity){
        if(id == this.identity._id){
          this.valid = true;
        }
      }
  
    });
  }
  obtFundacion2(){

    this._usuarioService.obtUsuario(this.idF).subscribe(
      response=>{
        console.log(response)
        $(document).ready(()=>{
          this.prob()
                
            });
        this.usuarioFundacion = response.usuario;
      },
      error=>{

      }
    )
  }
  actualizarFundacion(){
    console.log(this.usuarioFundacion)
    this._usuarioService.actualizarUsuario(this.usuarioFundacion,this.identity._id, this.token).subscribe(
      response=>{
        console.log(response)
      },
      error=>{
        console.log(<any>error)
      }
    )
  }


  nuevaHI(){
    $(document).ready(()=>{
      this.prob()
            
        });
    console.log(this.filesToUpload2);
    if((this.historia.titulo.length >= 20 && this.historia.titulo.length <= 40) && (this.historia.descripcion.length >= 300 && this.historia.titulo.length <= 1000) && (this.filesToUpload2 != undefined && this.filesToUpload2 != null)){
      this._usuarioService.registerHistoria(this.historia,this.identity._id,this.token).subscribe(
        response=>{
          if(response.historia && response.n == '1'){
              
  
            this._uploadService.makeGileRequest(this.url+'subir-foto-historia/'+response.historia._id,[],this.filesToUpload2,this.token,'foto')
            .then((result:any)=>{
  
  
              if(result.n == '8' || result.n == '7' || result.n == '6' || result.n == '5' || result.n == '4' || result.n == '2' ){
                
              }else if(result.n == '3'){
                //form.reset();
                $('#modalHI').modal('hide')
                this.snackBar.open('Registro exitoso','Cerrar', {
                  duration: 2000,
                });
                this.loadPage();
                this.filesToUpload2 = undefined;
                this.imL2 = false;
              
              }else{
                console.log(response)
              }
             
            });
           
          
        }
        },
        error=>{
           this.snackBar.open('Algo salio mal, intentalo de nuevo','Cerrar', {
                  duration: 2000,
                });
        }
      )
    }else{
      this.snackBar.open('No cumple con el número de caracteres','Cerrar', {
        duration: 2000,
      });
    }


  }
  //para registro de mascota
  public filesToUpload2: Array<File>;
  urls2 = new Array<string>();
  fileChangeEvent2(fileInput:any){
    this.filesToUpload2 = <Array<File>>fileInput.target.files;
    
     let files = <Array<File>>fileInput.target.files;
    this.urls2 = [];
     if (files) {
      for (let file of files) {
        let reader = new FileReader();
        reader.onload = (e: any) => {
          this.urls2.push(e.target.result);
          this.imgUN2 = e.target.result;
          this.imL2 = true;
        }
        reader.readAsDataURL(file);
      }
    }
     if(this.filesToUpload2 != undefined){
      this.imL2 = false;
    }
  }


  obtenerHistorias(id){
    this.historiasF = []
    this._usuarioService.obtHistoriasFundacion(id).subscribe(
      response=>{
        if(response.historias && response.n == '1'){
            this.historiasF = response.historias;
            $(document).ready(()=>{
              this.prob()
                    
                });
            if(response.historias.length == 7 ){
              this.lgtHI = true;
            }else{
              this.lgtHI = false;
            }
        }
      },
      error=>{
        console.log(<any>error)
      }
    )
  }
  eliminarPortada(id,file){
    console.log(file)
    this._usuarioService.eliminarLogo(id,file,'FP').subscribe(
      response=>{
       
       this.loadPage();
      }
    ),
    error=>{
      console.log(<any>error)
    }
  }
 

  eliminarHistoria(id,image){
    this._usuarioService.eliminarHistoria(id,image).subscribe(
      response=>{
        console.log(response)
        if(response.n == '1')
        this.snackBar.open('Historia eliminada','Cerrar', {
          duration: 2000,

        });
        this.loadPage();
      },
      error=>{
        this.snackBar.open('Algo salio mal, intentalo de nuevo','Cerrar', {
          duration: 2000,
        });
      }
    )
  }
  obtPortadasFundacion(id){
    this._usuarioService.obtPortadasFundacion(id).subscribe(
      response =>{
        if(response.portadasFundacion){
         
          this.portadasFundacion= response.portadasFundacion;
          console.log(this.portadasFundacion)
         // this.hh = []
        if(this.p == 1){
          for(var i=0; i < this.portadasFundacion.length; i++){

            this.hh.push({
              "numero":i
            })
            this.p++;


          }
        }
         
      
          
        }else{
          //this.status = 'error';
         console.log("mal")

        }
      },
      error=>{
        
        console.log(<any>error);
        //this._router.navigate(['/mascotas']);
      }
    );
  }

  registrarPortada(form){

    if(this.filesToUpload3 != undefined){
      this.advertenciaNewPor = true;
      this.statusNewPor = 'procesando';

      this.portada.mensaje1 = this.mensaje1.value;
      this.portada.mensaje2 = this.mensaje2.value;
      this._usuarioService.registerPortada(this.portada, this.idF, this.token).subscribe(
        response =>{
          if(response.portada && response.portada._id && response.n == '1'){
              this._uploadService.makeGileRequest(this.url+'subir-portada-fundacion/'+this.idF+'/'+response.portada._id,[],this.filesToUpload3,this.token,'foto')
              .then((result:any)=>{
                //alert('si')

                if(result.n == '6' || result.n == '5' || result.n == '4' || result.n == '2'  || result.n == '1'){
                  this.statusNewPor='error';
                  this.mensajeNewPor = result.message;
                  this.imL3 = false;
                  this.filesToUpload3 = undefined;
                  form.reset();
                  
                  setTimeout(()=>{ this.advertenciaNewPor = false;}, 5000);
                  this._usuarioService.borrarPortada(response.portada._id).subscribe(
                    response=>{
                      
                    },
                    error=>{

                })
                }else if(result.n == '3'){
                  this.statusNewPor='success';
                  //this.mensajeNewPor = response.message;
                  this.loadPage()
                  $("#exampleModal").modal('hide')
                  $("#mdalPOR")[0].reset();
                 
                 
                  this.filesToUpload3 = undefined;
                  this.imL3 = false;
                 
                  this.portada.foto = result.foto;
                 
                }
                console.log(result)
                //this.status = 'success';
               // $('#modalFundacion').modal('show');
              
              });

             /* this.statusNewPor='success';
              this.mensajeNewPor = response.message;
              
              form.reset();
              this.filesToUpload3 = undefined;
              this.imL3 = false;
              setTimeout(()=>{ this.advertenciaNewPor = false;}, 3000);*/
          }else if(response.n == '5'){
            this.statusNewPor='error';
              this.mensajeNewPor = response.message;
              this.filesToUpload3 = undefined;
              form.reset();
              setTimeout(()=>{ this.advertenciaNewPor = false;}, 5000);
          }else{
            this.statusNewPor='error';
              this.mensajeNewPor = 'Algo salió mal.';
              this.filesToUpload3 = undefined;
              form.reset();
              setTimeout(()=>{ this.advertenciaNewPor = false;}, 5000);
          }
        },
        error =>{
          console.log(<any>error);
          if(error.error.n == '4' || error.error.n == '3' || error.error.n == '2'){
            this.statusNewPor='error';
            this.mensajeNewPor = error.error.message;
            this.filesToUpload3 = undefined;
            form.reset();
            setTimeout(()=>{ this.advertenciaNewPor = false;}, 5000);
        }else{
          this.statusNewPor='error';
          this.mensajeNewPor ='ERROR';
          this.filesToUpload3 = undefined;
          form.reset();
          setTimeout(()=>{ this.advertenciaNewPor = false;}, 5000);
        }
        }
      );
    }else{
      this.statusNewPor= 'error';
      this.mensajeNewPor = 'Por favor, debes subir una foto para tu portada';
     
      setTimeout(()=>{ this.advertenciaNewPor = false;}, 5000);
    }
    
   }

      //para registro de portada
      public filesToUpload3: Array<File>;
      urls3 = new Array<string>();
      fileChangeEvent3(fileInput:any){
        this.filesToUpload3 = <Array<File>>fileInput.target.files;
        
         let files = <Array<File>>fileInput.target.files;
        this.urls3 = [];
         if (files) {
          for (let file of files) {
            let reader = new FileReader();
            reader.onload = (e: any) => {
              this.urls3.push(e.target.result);
              this.imgUN3 = e.target.result;
              this.imL3 = true;
            }
            reader.readAsDataURL(file);
          }
        }
         if(this.filesToUpload3 != undefined){
          this.imL3 = false;
        }
      }

      prob(){

        $("#mensaje1").keyup(()=>{
         
          this.mensaje1.setValue(this.limpiarCampo(this.mensaje1.value));
    }); 
      $("#mensaje2").keyup(()=>{
         
        this.mensaje2.setValue(this.limpiarCampo(this.mensaje2.value));
    }); 
      $("#titulo").keyup(()=>{
         
        this.historia.titulo = this.limpiarCampo(this.historia.titulo);
      }); 
      $("#descripcion").keyup(()=>{
         
        this.historia.descripcion = this.limpiarCampo(this.historia.descripcion);
      });
    
    
      }
      limpiarCampo(text){

        var textFin = text.replace(/([\\ \\]+(?=[\\ \\])|^\\s+|\\s+$)/g, '');
      
        text = textFin;
      
        return text;
      
      }
}
