import { Component, OnInit,ViewChild } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {MascotaService} from '../../../services/mascota.service';
import {GLOBAL} from '../../../services/global';
import {UsuarioService} from '../../../services/usuario.service';
import {Mascota} from '../../../models/mascota';
declare var Swiper: any;
import {UploadService} from '../../../services/upload.service';
import {MatSnackBar} from '@angular/material';
declare var $:any;
import { SwiperComponent } from 'ngx-useful-swiper';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-perfil-mascota',
  templateUrl: './perfil-mascota.component.html',
  styleUrls: ['./perfil-mascota.component.css'],
  providers:[MascotaService,UsuarioService,UploadService,MatSnackBar]
})
export class PerfilMascotaComponent implements OnInit {
  //------
  
  especie = new FormControl('', [Validators.required]);
  nombre = new FormControl('', [Validators.required,Validators.pattern('^[a-z A-Z áéíóúÁÉÍÓÚñÑ]+$'), Validators.maxLength(15),Validators.minLength(2)]);
  sexo = new FormControl('', [Validators.required]);
  raza = new FormControl('', [Validators.required]);
  color = new FormControl('', [Validators.required]);
  tamanio = new FormControl('', [Validators.required]);
  esterilizado = new FormControl('', [Validators.required]);
  edadT = new FormControl('', [Validators.required]);
  anios = new FormControl('', [Validators.required]);
  meses = new FormControl('', [Validators.required]);
  descripcion = new FormControl('', [Validators.required,Validators.maxLength(500),Validators.minLength(25),Validators.pattern('[0-9 a-z A-Z áéíóúÁÉÍÓÚñÑ : ; , . -]+$')]);
  ppy = new FormControl('', []);
  mul = new FormControl('', []);
  bro = new FormControl('', []);
  ant = new FormControl('', []);
  ant2 = new FormControl('', []);

  ppy2 = new FormControl('', []);

  getErrorMessage() {
    return this.especie.hasError('required') ? 'Especie requerida' :  
            '';
  }
  getErrorMessage2() {
    return this.nombre.hasError('required') ? 'El nombre es requerido' :
    this.nombre.hasError('pattern') ? 'No se admite: símbolos, caracteres especiales o números':
            this.nombre.hasError('maxlength') ? 'Máximo 15 caracteres':
            this.nombre.hasError('minlength') ? 'Mínimo 2 caracteres':
            '';
  }
  getErrorMessage3() {
    return this.sexo.hasError('required') ? 'Sexo requerido' :  
            '';
  }
  getErrorMessage4() {
    return this.raza.hasError('required') ? 'Raza requerida' :  
            '';
  }
  getErrorMessage5() {
    return this.color.hasError('required') ? 'Color requerido' :  
         
            '';
  }
  getErrorMessage6() {
    return this.tamanio.hasError('required') ? 'Tamaño requerido' :
    '';
  }
  getErrorMessage7() {
    return this.esterilizado.hasError('required') ? 'Campo requerido' :  
            '';
  }
  getErrorMessage8() {
    return this.edadT.hasError('required') ? 'Edad requerida' :  
            '';
  }
  getErrorMessage9() {
    return this.anios.hasError('required') ? 'Edad en años requerido' : 
            '';
  }
  getErrorMessage10() {
    return this.meses.hasError('required') ? 'Meses requeridos' : 
     '';
  }
  getErrorMessage11() {
    return this.descripcion.hasError('required') ? 'Descripción requerida' :  
            this.descripcion.hasError('pattern') ? 'No se admite: símbolos o caracteres especiales':
            this.descripcion.hasError('maxlength') ? 'Máximo 500 caracteres':
            this.descripcion.hasError('minlength') ? 'Describe mejor a la mascota':
            '';
  }



  //----------
  public identity;
  public token;
  public url;
  public n;
  public statusRegMasc ;
  public advertenciaRegMasc ;
  public statusValid;

  public status;
  public advertencia;
  public mensaje;

  public nObtMasc;


  public mascota:any;
  public fotosMascota:Mascota[];

  

  public hh = [];
  public adoptar;
  public mscEstado;
  public idFUN;
  public imgUN2;
  public imL2;
  public valid;
  public idm;

  public vmas;
 
/*
  config: SwiperOptions = {
    pagination: { el: '.swiper-pagination', clickable: true },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
    spaceBetween: 30
  };*/
  public images= [
    
    
];
    @ViewChild('swiperThumbs',{static: false}) public swiperThumbs: SwiperComponent;
    @ViewChild('swiperGallery',{static: false}) public swiperGallery: SwiperComponent;
    public config: Object = {
     
  };
    public config_thumbs: any = {
    
     
        thumbs: this.images,
        slidesPerView: 3.5,
        spaceBetween: 10,
        watchSlidesVisibility: true,
        watchSlidesProgress: true,
       
  };
  public config_gallery: any = {
      lazyLoading: true,
      spaceBetween: 0,
      zoom: true,
      loop:true,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
  };
  constructor(private _route:ActivatedRoute,
    private _router:Router,private _mascotaService:MascotaService,private _usuarioService:UsuarioService,private _uploadService:UploadService, private snackBar: MatSnackBar) { 
      this.identity = this._usuarioService.obtIdentity();
      this.token = this._usuarioService.obtToken();
      this.url = GLOBAL.url;
      this.advertencia = false;
      this.valid = false;
      this.adoptar = 'si';
     this.imL2 = false;
     this.vmas = false;
    }

  ngOnInit() {
  
    this.loadPage();
 
  }

  prob(){
    $("#nombre").keyup(()=>{
         
      this.nombre.setValue(this.limpiarCampo(this.nombre.value));
}); 
$("#descripcion").keyup(()=>{
         
  this.descripcion.setValue(this.limpiarCampo(this.descripcion.value));
}); 
     
  }
  //Obtener datos de la mascota segun su id
  obtMascota(id){
   this.images = []
    this.advertencia = true;
    this.status = 'procesando';
   
    this._mascotaService.obtMascota(id).subscribe(
      response =>{

        if(response.mascota && response.n == '1'){
        
         // this.obtFotosMascotas(response.mascota._id);
          this.nObtMasc = response.n;
          this.vmas = true;
          this.mascota= response.mascota;
          console.log(this.mascota)


          var con = 0;
          this.mascota.fotos.forEach(element => {
            con++;
            var imag = {
              image:'',
              _id:'',
              name:''
            }
            imag.image = "http://192.168.1.7:3800/api/"+"obtener-foto-mascota/"+element.name;
            imag._id = element._id;
            imag.name = element.name;
            console.log(con)
            this.images.push(imag)
            
          });
          console.log(this.images)
          this.mscEstado = response.mascota.estado;
         // $('.containerLoad').fadeOut('slow')
          
          this.mensaje = response.message;

          setTimeout(()=>{  
            this.advertencia = false;
            this.status ='success';
          }, 500);
        }
      },
      error=>{
        var errorMessage = <any>error;
          
          console.log(errorMessage)
          this.status = 'error';
          if(errorMessage != null && error.error.n == '2'){
            this.nObtMasc = error.error.n;
            this.status = 'error';  
            this.mensaje = 'La mascota ya no existe en el sistema.';
          }else{
            this.nObtMasc = 'n';
            this.status = 'error';
            this.mensaje = 'Algo salio mal, intentalo mas tarde.'
          }
      }
    );
  }

   
  loadPage(){
    this._route.params.subscribe(params =>{
      let id = params['idm'];
      this.idm = id;
      let idf = params['id'];
      this.idFUN = idf;
     if(this.identity != null){
       if(this.identity._id == this.idFUN){
          this.valid = true;
       }

     }
      this.obtMascota(id);
      
    })
  }


  actualizarMascota(){
    console.log(this.mascota);
    this.advertenciaRegMasc = true;

    this.mascota.especie = this.especie.value;
    this.mascota.nombre = this.nombre.value;
    this.mascota.sexo = this.sexo.value;
    this.mascota.color = this.color.value;
    this.mascota.raza = this.raza.value;
    this.mascota.esterilizado = this.esterilizado.value;
    this.mascota.edadT = this.edadT.value;
    this.mascota.anios = this.anios.value;
    this.mascota.meses = this.meses.value;
    this.mascota.descripcion = this.descripcion.value;

    if(this.mascota.especie == 'Felino'){
     console.log("entroAC")
      this.mascota.vpp = this.ppy.value;
      this.mascota.va = this.ant.value;

    }else{
     
      this.mascota.vpp = this.ppy2.value;
      this.mascota.vm = this.mul.value;
      this.mascota.vb = this.bro.value;
      this.mascota.va = this.ant2.value;
    }

    if(this.anios.value == 0 && this.meses.value == 0){
      this.statusValid = 'errorED';
      this.advertenciaRegMasc = false;
      this.snackBar.open('Edad errónea (años/meses)','Cerrar', {
        duration: 2000,
      });
    }else{
      this._mascotaService.actualizarMascota(this.mascota,this.token,this.identity._id,).subscribe(
        response=>{
  
          if(response.mascota && response.n == '1'){
            this.n = response.n;
            this.statusRegMasc = 'success';
            setTimeout(()=>{ this.advertenciaRegMasc = false;}, 500);
            
            this.snackBar.open('Mascota actualizada','Cerrar', {
              duration: 2000,
            });
            this.loadPage()
            $('#mdalEditar').modal('hide');
           
          }else{
            this.n = response.n;
            this.statusRegMasc = 'error';
            setTimeout(()=>{ this.advertenciaRegMasc = false;}, 500);
            this.snackBar.open('No se pudo actualizar los datos','Cerrar', {
              duration: 2000,
            });
  
  
          }
        }, 
        error=>{
         
            this.n = error.error.n;
            this.statusRegMasc = 'error';
          
            setTimeout(()=>{ this.advertenciaRegMasc = false;}, 500);
        }
      );
    }
   
    
  
  }
  public followUserOver;
  mouseEnter(mascota_id){
    this.followUserOver = mascota_id;
  }
  
  mouseLeave(mascota_id){
    this.followUserOver = 0;
  }


  eliminarMascota(id){
    console.log(id)
    this._mascotaService.eliminarMascotaEstado(this.mascota,this.token,id).subscribe(
      response=>{
        if(response.n == '1'){
          this.snackBar.open('Mascota eliminada','Cerrar', {
            duration: 2000,
          });
        }else if(response.n == '0'){
          this.snackBar.open('La mascota ya no existe en el sistema','Cerrar', {
            duration: 2000,
          });
        }
      },
      error=>{
        console.log(<any>error)
      }
    )
  }
  //eliminar mascota, cambiat estado a eliminado
  eliminarEstadoMascota(id){
    this._mascotaService.eliminarMascotaEstado(this.mascota,this.token,id).subscribe(
      response=>{

        if(response.mascota && response.n == '1'){
          this.snackBar.open('Mascota eliminada','Cerrar', {
            duration: 2000,
          });
          this._router.navigate(['fundacion/',this.identity._id,'mascotas','all','1']);
         
        }else if(response.n == '4'){
          this.snackBar.open('No tienes permisos para eliminar','Cerrar', {
            duration: 2000,
          });

        }
      }, 
      error=>{
        if((error != null && error.error.n == '2')){
          this.snackBar.open('La mascota no existe','Cerrar', {
            duration: 2000,
          });
        }else{
          this.snackBar.open('Algo salio mal, intentalo mas tarde','Cerrar', {
            duration: 2000,
          });
        }


        
      }
    );
  }


//establecer como foto principal de la mascota
 fotoPrincipalMascota(id,idfoto){
      
      this._mascotaService.establecerFTM(id,idfoto).subscribe(
        response=>{
  
          if(!response.mascota){
            
            console.log("mal")
          }else{
            
            this.obtMascota(this.idm)
  
          }
        }, 
        error=>{
          console.log(<any>error);
        }
      );
    }
  restablecerDatos(){
    this._route.params.subscribe(params =>{
      let id = params['idm'];
     
      this.especie.setValue(this.mascota.especie)
          this.nombre.setValue(this.mascota.nombre)
          this.sexo.setValue(this.mascota.sexo)
          this.raza.setValue(this.mascota.raza)
          this.color.setValue(this.mascota.color)
          this.esterilizado.setValue(this.mascota.esterilizado)
          this.tamanio.setValue(this.mascota.tamanio)
          this.edadT.setValue(this.mascota.edadT)
          this.anios.setValue(this.mascota.anios)
          this.meses.setValue(this.mascota.meses)
          this.descripcion.setValue(this.mascota.descripcion)
     
    })
  }
  nuevaAdopcion(){
    this.adoptar = 'si';
  }

  subirFoto(mid){
    console.log(mid)
    this._uploadService.makeGileRequest2(this.url+'subir-foto-mascota/'+mid,[],this.filesToUpload2,'foto')
    .then((result:any)=>{
      //alert('si')
      if(result.n == '8' || result.n == '7' || result.n == '6' || result.n == '5' || result.n == '4' || result.n == '2' ){
        console.log("error")
        
       
      }else if(result.n == '1'){
       
        
        
        this.filesToUpload2 = undefined;
        this.imL2 = false;
        $('#modalAddFoto').modal('hide');
        this.obtMascota(this.idm);
       
      }
      
      
    });
  }
  eliminarSelecImg(){
    this.filesToUpload2 = undefined;
    this.imL2 = false;
  }
  eliminarFotoMascota(mid,id,path){
    console.log("entro")
    alert("hols")
    console.log(mid,id,path)
    this._mascotaService.eliminarFotoMascota(mid,id,path,this.token).subscribe(
      response=>{
        console.log(response)
        if(response.n == '1'){
          this.snackBar.open('Foto eliminada','Cerrar', {
            duration: 2000,
          });
          this.obtMascota(this.idm);

        }else if(response.n == '5'){
          this.snackBar.open('La imagen es de perfil no se puede eliminar','Cerrar', {
            duration: 3000,
          });
        }
      },
      error=>{
        console.log(<any>error)

        this.snackBar.open('Algo salio mal, intentalo nuevamente.','Cerrar', {
          duration: 2000,
        });
      }
    )

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

editarModal(){
  $('#mdalEditar').modal('show');
  this.especie.setValue(this.mascota.especie)
          this.nombre.setValue(this.mascota.nombre)
          this.sexo.setValue(this.mascota.sexo)
          this.raza.setValue(this.mascota.raza)
          this.color.setValue(this.mascota.color)
          this.esterilizado.setValue(this.mascota.esterilizado)
          this.tamanio.setValue(this.mascota.tamanio)
          this.edadT.setValue(this.mascota.edadT)
          this.anios.setValue(this.mascota.anios)
          this.meses.setValue(this.mascota.meses)
          this.descripcion.setValue(this.mascota.descripcion)
          $(document).ready(()=>{
            this.prob()
                  
              });
          if(this.especie.value == 'Canino'){

            if(this.mascota.vacunas.Puppy == true){
              this.ppy2.setValue(true)
            }
            if(this.mascota.vacunas.Multiple == true){
              this.mul.setValue(true)
            }
            if(this.mascota.vacunas.Antirrabica == true){
              this.ant2.setValue(true)
            }
            if(this.mascota.vacunas.Bronchicine == true){
              this.bro.setValue(true)
            }
              
          }else{
            
            if(this.mascota.vacunas.TrFelina == true){
              this.ppy.setValue(true)
            }
            if(this.mascota.vacunas.Antirrabica == true){
              this.ant.setValue(true)
            }
          }
          
}

limpiarCampo(text){

  var textFin = text.replace(/([\\ \\]+(?=[\\ \\])|^\\s+|\\s+$)/g, '');

  text = textFin;

  return text;

}
}
