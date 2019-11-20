import { Component, OnInit, DoCheck,ViewChild } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {FormControl, Validators} from '@angular/forms';
import {MascotaService} from '../../../services/mascota.service';
import {GLOBAL} from '../../../services/global';
import {UsuarioService} from '../../../services/usuario.service';
import {UploadService} from '../../../services/upload.service';
import { UsuarioFundacion } from '../../../models/usuarioFundacion';
import {Mascota} from '../../../models/mascota';
import {MatSnackBar} from '@angular/material';
import { MatStepper } from '@angular/material/stepper';

declare var $:any;
@Component({
  selector: 'app-mismascotas',
  templateUrl: './mismascotas.component.html',
  styleUrls: ['./mismascotas.component.css'],
  providers:[MascotaService,UsuarioService, UploadService,MatSnackBar]
})
export class MismascotasComponent implements OnInit, DoCheck{
  @ViewChild('stepper', {static: true}) private myStepper: MatStepper;
  totalStepsCount: number;
  nombre = new FormControl('', [Validators.required, Validators.pattern('^[a-zA-ZáéíóúÁÉÍÓÚñÑ]*$'), Validators.maxLength(20),Validators.minLength(5)]);
  especie = new FormControl('', [Validators.required]);
  sexo = new FormControl('', [Validators.required]);
  raza = new FormControl('', [Validators.required]);
  color = new FormControl('', [Validators.required]);
  tamanio = new FormControl('', [Validators.required]);
  esterilizado = new FormControl('', [Validators.required]);
  edad = new FormControl('', [Validators.required]);
  anios = new FormControl('', [Validators.required]);
  meses = new FormControl('', [Validators.required]);
  descripcion = new FormControl('', [Validators.required,Validators.pattern('^[a-z A-Z áéíóúÁÉÍÓÚñÑ 0-9 ; : . , -]*$'),Validators.maxLength(500),Validators.minLength(15)]);
  ppy = new FormControl('', []);
  mul = new FormControl('', []);
  bro = new FormControl('', []);
  ant = new FormControl('', []);

  public imgCom;
  getErrorMessage() {
    return this.nombre.hasError('required') ? 'El nombre es requerido' :
            this.nombre.hasError('pattern') ? 'No se acepta: símbolos, caracteres especiales, números':
            this.nombre.hasError('maxlength') ? 'Máximo 20 caracteres':
            this.nombre.hasError('minlength') ? 'Mínimo 5 caracteres':
            '';
  }
  getErrorMessage2() {
    return this.especie.hasError('required') ? 'Especie requerida' :  
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
    return this.edad.hasError('required') ? 'Edad requerida' :  
            '';
  }
  getErrorMessage9() {
    return this.anios.hasError('required') ? 'Años requeridos' :  
            '';
  }
  getErrorMessage10() {
    return this.meses.hasError('required') ? 'Meses requeridos' :  
            '';
  }
  getErrorMessage11() {
    return this.descripcion.hasError('required') ? 'Descripción de la mascota requerida' :  
            this.descripcion.hasError('maxlength') ? 'Máximo 500 caracteres':
            this.descripcion.hasError('minlength') ? 'Mínimo 15 caracteres':
            '';
  }

  public taman = ["Todos","Pequeño","Mediano","Grande"];
  public sexoo = ["Todos","Macho","Hembra"];
  public edadd = ["Todos","Cachorro","Joven","Adulto"];
  public url;
  public identity;
  public token;
  public statusValid;
  public statusValidF;
  public pagesSelec = []
  public typeM;
  public type;
  //variables para busqueda 
  public filtroBSQ = [];
  public select;
  
  //variables para advertencias al obtener las mascotas de la fundacion
  public status;
  public advertencia;
  public mensaje;
  public n;
  //variables para guardar las mascotas obtenidas de la fundacion
  public page;
  public total;
  public pages;
  public mascotas:Mascota[];
  
  public itemsPerPage;

  //variables para registrar nuevas mascotas
  public nuevoReg;
  public mascota:Mascota;
  public newMas;
  public imgUN2:any;
  public imL2 = false;


  //variables para recoger lo que venga por la URL
  public idFun;
  public titu;
  public next_pagee;
  public prev_pagee;

  public statusRegMas;

  public carga;
  public itemsMSC;
  public filtroBTN;
  public fl;
  public bus;
  public tamF;
  public sexF;
  public edadF;
  public fil;
  constructor(private _route:ActivatedRoute,
    private _router:Router, private _mascotaService:MascotaService,private _usuarioService:UsuarioService,private _uploadService:UploadService, private snackBar: MatSnackBar) { 
      this.identity = this._usuarioService.obtIdentity();
      this.token = this._usuarioService.obtToken();
      this.page = 1;
      this.fil = this._mascotaService.obtFiltro();
      this.mascota = new Mascota("","","","","","","","","","","","","","","","","","","");
      this.nuevoReg = false;
      this.newMas = true;
      this.url = GLOBAL.url;
      this.statusRegMas = null;
      this.carga = true;
      this.itemsMSC = 0;
      this.bus = false;
      this.fl = false;

      this.filtroBSQ = this._mascotaService.obtFiltroMascotasFundacion();
    }
    ngAfterViewInit() {
      this.totalStepsCount = this.myStepper._steps.length;
    }
  ngOnInit() {
   
    this.actualPage2();
    $(document).ready(()=>{
      $("#tamDrop").change(()=>{

        this.select = $("#tamDrop").val();
        this.filtroBSQD(this.select)
    });
    $("#sexoDrop").change(()=>{

      this.select = $("#sexoDrop").val();
      this.filtroBSQD(this.select)
  });
  $("#edadDrop").change(()=>{

    this.select = $("#edadDrop").val();
    this.filtroBSQD(this.select)
});

  });  
  }
  ngDoCheck(){
    this.identity = this._usuarioService.obtIdentity();
    this.token = this._usuarioService.obtToken();
    this.filtroBSQ = this._mascotaService.obtFiltroMascotasFundacion();
    
  }
  
  actualPage2(){
    this.type = '';
    this.pagesSelec = [];
    this._route.params.subscribe(params =>{
      let tipo = params['tipo'];
      
      let option = params['option'];
      this.type = option
      let id = params['id'];
      this.idFun = id;
      let page = +params['page'];
          this.page = page;
          
          if(!params['page']){
            page = 1;
            this.page = 1;
          }
          
          if(!page){
            page = 1;
          }else{
            this.next_pagee = page+1;
            this.prev_pagee = page-1;
    
            if(this.prev_pagee <= 0){
              this.prev_pagee = 1;
            }
          }
      if(tipo == 'mascotas'){
        
        if(this.type == 'busqueda'){
          this.filtroBTN = true;
          //devolver listado de usuarios
          console.log("entroB")
          this.buscarMascotas(page)
          $(document).ready(()=>{
          this.filtroBSQ.forEach(elem => {
            if(elem.tipo == 'tam'){
              $("#tamDrop").val(elem.option)
            }
            if(elem.tipo == 'sexo'){
              $("#sexoDrop").val(elem.option)
            }
            if(elem.tipo == 'edad'){
              $("#edadDrop").val(elem.option)
            }
          });
        });
        }else{
          $(document).ready(()=>{
          $("#tamDrop").val('Todos')
          $("#sexoDrop").val('Todos')
          $("#edadDrop").val('Todos')
          })
          console.log("entroN")
          this.filtroBTN = false;
          //devolver listado de usuarios
          this.obtMascotas(page);
        }
    }
    });
    
  }
  efectCards(){

    $(document).ready(()=>{
      var wScroll = $(window).scrollTop();
    
      $('.logo').css({
        'transform' : 'translate(0px, '+ wScroll /4 +'%)'
      });
    
      $('.back-bird').css({
        'transform' : 'translate(0px, '+ wScroll /4 +'%)'
      });
    
      $('.fore-bird').css({
        'transform' : 'translate(0px, -'+ wScroll /20 +'%)'
      });
      if(wScroll >= $('.clothes-pics').offset().top - ($(window).height() / 1.2)) {
        
        $('.clothes-pics figure').each(function(i){
          
          setTimeout(function(){
            $('.clothes-pics figure').eq(i).addClass('is-showing');
          }, 150 * (i+1));
        });
    
      }else{
        $('.clothes-pics figure').removeClass('is-showing');
      }
    })

    $(window).scroll(function(){

      var wScroll = $(this).scrollTop();
    
      $('.logo').css({
        'transform' : 'translate(0px, '+ wScroll /4 +'%)'
      });
    
      $('.back-bird').css({
        'transform' : 'translate(0px, '+ wScroll /4 +'%)'
      });
    
      $('.fore-bird').css({
        'transform' : 'translate(0px, -'+ wScroll /20 +'%)'
      });
      if(wScroll >= $('.clothes-pics').offset().top - ($(window).height() / 1.2)) {
        
        $('.clothes-pics figure').each(function(i){
          
          setTimeout(function(){
            $('.clothes-pics figure').eq(i).addClass('is-showing');
          }, 150 * (i+1));
        });
    
      }else{
        $('.clothes-pics figure').removeClass('is-showing');
      }
    
    });
  }
  obtMascotas(page,adding=false){
    this.pagesSelec = []
    this._mascotaService.obtMisMascotas(this.idFun,page).subscribe(
        response=>{
          this.carga = false;
          if(response.mascotas && response.n == '1'){
            this.efectCards()
           
            this.advertencia = false;
            this.status ='success';
            $('.conL').fadeOut('fast');
           
            this.total= response.total;
            this.pages = response.pages;
            this.itemsPerPage = response.itemsPerPage;
            this.mascotas = response.mascotas;
            for (let i = 1; i <= this.pages; i++) {
              this.pagesSelec.push(i)
              
            }
            this.itemsMSC = this.mascotas.length;
            this.mensaje = response.message;
            //this.obtFotos(response.mascotas._id, page);
            if(page > this.page){
              this._router.navigate[('/login')]
            }
  
          }else{
          this.status = 'error';
          }
        },
        error=>{
          this.efectCards()

          this.status = 'error';  
        this.carga = false;
        this.advertencia = true;
        $(".carga").fadeOut("slow");
          var errorMessage = <any>error;
          
          this.status = 'error';
          if(errorMessage != null && error.error.n == '2'){
            this.n = error.error.n;
            this.status = 'error';  
            this.mensaje = 'Lo sentimos, '+error.error.message;
          }else if(errorMessage != null && error.error.n == '3'){
            this.n = error.error.n;
            this.status = 'error';  
            this.mensaje = error.error.message;
          }else{
            this.n = 'n';
            this.status = 'error';
            this.mensaje = 'Algo salio mal.'
          }
        }
      )
     
   


  }


  registrarMascota(stepper: MatStepper){

    this.mascota.nombre = this.nombre.value;
    if(this.typeM == 'f'){
      this.mascota.especie = 'Felino';
      this.mascota.vpp = this.ppy.value;
      this.mascota.va = this.ant.value;

    }else{
      this.mascota.especie = 'Canino';
      this.mascota.vpp = this.ppy.value;
      this.mascota.vm = this.mul.value;
      this.mascota.vb = this.bro.value;
      this.mascota.va = this.ant.value;
    }
    this.mascota.sexo = this.sexo.value;
    this.mascota.raza = this.raza.value;
    this.mascota.color = this.color.value;
    this.mascota.tamanio = this.tamanio.value;
    this.mascota.esterilizado = this.esterilizado.value;
    this.mascota.edadT = this.edad.value;
    this.mascota.anios = this.anios.value;
    this.mascota.meses = this.meses.value;
    this.mascota.descripcion = this.descripcion.value;
  

    if(


      this.mascota.nombre == "" ||
    
    this.mascota.sexo == "" ||
    this.mascota.raza == "" ||
    this.mascota.color == "" ||
    this.mascota.tamanio == "" ||
    this.mascota.esterilizado== "" ||
    this.mascota.edadT == "" ||
    this.mascota.anios== "" ||
    this.mascota.meses== "" ||
    this.mascota.descripcion== ""
    ){
      
      this.statusRegMas = null;
      this.snackBar.open('Por favor, llena todos los campos','Cerrar', {
        duration: 2000,
      });
    }else{

 
      if(this.anios.value == 0 && this.meses.value == 0){
        stepper.selectedIndex = 1;
        this.statusValid = 'errorED';
      }else{
        
        
    if(this.filesToUpload2 != undefined){
     
      this.statusRegMas = 'procesando';
          
       this._mascotaService.registerMascota(this.mascota, this.token, this.idFun).subscribe(
         response =>{
          
         
           if(response.mascota && response.mascota._id && response.n == '1'){
             
         
               this._uploadService.makeGileRequest2(this.url+'subir-foto-mascota-nueva/'+response.mascota._id,[],this.filesToUpload2,'foto')
               .then((result:any)=>{
                 //alert('si')
                 if(result.n == '8' || result.n == '7' || result.n == '6' || result.n == '5' || result.n == '4' || result.n == '2' ){
                  this.snackBar.open('Error al subir la imagen, intentalo de nuevo','Cerrar', {
                    duration: 2000,
                  });
                   this._mascotaService.eliminarMascota(this.token,response.mascota._id).subscribe(
                     response=>{
                       
                     },
                     error=>{
 
                 })
                 }else if(result.n == '1'){
                  // form.reset();
                   this.statusRegMas = null;
                   this.snackBar.open('Registro exitoso','Cerrar', {
                     duration: 2000,
                   });
                 
                   this.filesToUpload2 = undefined;
                   this.imL2 = false;
                  this.obtMascotas(this.idFun);
                  this.cancelarReg(stepper)
                 }
                
               });
              
             
           }else if(response.n == '5'){
               this.snackBar.open(response.message,'Cerrar', {
                 duration: 2000,
               });
               this.statusRegMas = null;
           }else{
 
             this.snackBar.open('Algo salio mal','Cerrar', {
               duration: 2000,
             });
             this.statusRegMas = null;
           }
         },
         error =>{
          
           if(error.error.n == '3' || error.error.n == '2'){
             
             this.statusRegMas = null;
               this.snackBar.open(error.error.message,'Cerrar', {
                 duration: 2000,
               });
           }else{
             this.statusRegMas = null;
             this.snackBar.open('ERROR','Cerrar', {
               duration: 2000,
             });
            
           }
         }
       );
 
     }else{
       this.statusValidF = 'errorIma'
       stepper.selectedIndex = 0;
      
     }
      }
      
   
  }
  }
   
  verFoto(foto){
    $('#modalComprobante').modal('show')
    this.imgCom = foto;

  }
  nuevoRegiistro(op){
    this.nuevoReg = true;
    this.newMas = false;
    this.typeM = op;
    
    $("#formRGM").fadeIn('slow');
    $("#mainMS").fadeOut('fast');
    $("#header").fadeOut('fast');
    $(document).ready(()=>{
      this.prob()
            
        });
 
  }

  cancelarReg(form){
    
    $("#formRGM").fadeOut('fast');
    $("#mainMS").fadeIn('slow');
    $("#header").fadeIn('slow');
    
    //form.reset();
    this.resets();
    this.filesToUpload2 = undefined;
  }
  prob(){
    $("#nombre").keyup(()=>{
         
      this.nombre.setValue(this.limpiarCampo(this.nombre.value));
}); 
$("#descripcion").keyup(()=>{
         
  this.descripcion.setValue(this.limpiarCampo(this.descripcion.value));
}); 
      $("#nmbr").fadeOut("fast")
      $("#nmbr2").fadeOut("fast")


  }
  resets(){
    $("#RGF")[0].reset();

    $("#RGF2")[0].reset();

    $("#RGF3")[0].reset();
   
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
   cancelarBus(){
   
    this.bus = false;
    localStorage.removeItem('busquedaMascotasFnd');
    this._router.navigate(['fundacion/',this.idFun,'mascotas','all']);
  }

  busc(){
    this.bus = true;
  }

  buscarMascotas(page,adding=false){
    console.log("ENTROBUSQUDA")
    this.pagesSelec = []
    this._mascotaService.filtroMascotas2(this.idFun,this.filtroBSQ,page).subscribe(
      response=>{
        this.carga = false;
        if(response.mascotas && response.n == '1'){
          

          this.efectCards()
          $(".carga").fadeOut("slow");
         
          this.advertencia = false;
         // this.fotos = response.fot;
          this.total = response.total;
          this.pages = response.pages;
          this.itemsPerPage = response.itemsPerPage;
          this.mascotas = response.mascotas;
          for (let i = 1; i <= this.pages; i++) {
            this.pagesSelec.push(i)
            
          }
          this.itemsMSC = this.mascotas.length;
          this.status ='success';
         
          //this.obtFotos(response.mascotas._id, page);
          if(page > this.pages){
            this._router.navigate[('/login')]
          }
        }
      },
      error=>{
        this.carga = false;
        this.advertencia =true;
        this.status = 'error';
        $(".carga").fadeOut("slow");
        var errorMessage = <any>error;
       
        
        if(errorMessage != null && error.error.n == '2'){
          this.mensaje = 'Lo sentimos, '+error.error.message;
          this.mascotas = null;
          this.snackBar.open('No se encontro resultados','Cerrar', {
            duration: 2000,
          });
         
        }else if(errorMessage != null && error.error.n == '5'){
          this.mensaje = 'No se ha elegigo filtros';
          this.snackBar.open(this.mensaje,'Cerrar', {
            duration: 2000,
          });
          this.mascotas = null;
        }
        
        else{
  
          this.n = 'n';
          
          this.mensaje = 'Algo salio mal, intentalo mas tarde'
          this.snackBar.open(this.mensaje,'Cerrar', {
            duration: 2000,
          });
          
        }
      }
    )
  }

  busqueda(){
    this.fl = true;
    var valoresTamanio = [];
    var valoresSexo = [];
    var valoresEdad = [];
    var busqueda = []
    var tam;
    var sex;
    var edad;
    $("#pills-tamanio input[type=checkbox]:checked").each(function(){
      valoresTamanio.push({
        'tam':this.value});
    });
    if(valoresTamanio.length > 0){
      tam = 'tamanio'
    }else{
      tam = 'tamanioNull';
    }
    $("#pills-sexo input[type=checkbox]:checked").each(function(){
      valoresSexo.push({
        'sex':this.value});
    });
    if(valoresSexo.length > 0){
      sex = 'sexo'
    }else{
      sex = 'sexoNull';
    }
    $("#pills-edad input[type=checkbox]:checked").each(function(){
      valoresEdad.push({
        'edad':this.value});
    });
    if(valoresEdad.length > 0){
      edad = 'edad'
    }else{
      edad = 'edadNull';
    }

    busqueda.push(valoresTamanio, valoresSexo, valoresEdad);
    
    localStorage.setItem('busquedaMascotas2', JSON.stringify(busqueda));
    
    this._router.navigate(['perfilFundacion/',this.idFun,'mascotas',tam,sex,edad]);
   //this.actualPage2()
    
  }


  filtroBSQD(option){
    this.pagesSelec = []
    
    var optionFinal = option;
    if(optionFinal == 'Pequeño' || optionFinal == 'Mediano' || optionFinal == 'Grande'){
      
      if(this.filtroBSQ == null){
       
        this.filtroBSQ = [];
        this.filtroBSQ.push({tipo:'tam',option:optionFinal})
        
      }else{
       var ok = false;
        this.filtroBSQ.forEach(fl => {
          if(fl.tipo == 'tam'){
            ok = true;
            fl.option = optionFinal;
          }
  
        });

        if(ok == false){
          this.filtroBSQ.push({tipo:'tam',option:optionFinal})
        }
      }

      localStorage.setItem('busquedaMascotasFnd', JSON.stringify(this.filtroBSQ));
    }

    if(optionFinal == 'Macho' || optionFinal == 'Hembra'){
      if(this.filtroBSQ == null){
       
        this.filtroBSQ = [];
        this.filtroBSQ.push({tipo:'sexo',option:optionFinal})
      }else{
        var ok2= false;
        this.filtroBSQ.forEach(fl => {
          if(fl.tipo == 'sexo'){
            ok2 = true;
            fl.option = optionFinal;
          }

  
        });

       
        if(ok2 == false){
          this.filtroBSQ.push({tipo:'sexo',option:optionFinal})
        }
      }

      localStorage.setItem('busquedaMascotasFnd', JSON.stringify(this.filtroBSQ));
    }
    if(optionFinal == 'Cachorro' || optionFinal == 'Joven' || optionFinal == 'Adulto'){
      
      if(this.filtroBSQ == null){
       
        this.filtroBSQ = [];
        this.filtroBSQ.push({tipo:'edad',option:optionFinal})
      }else{
       var ok = false;
        this.filtroBSQ.forEach(fl => {
          if(fl.tipo == 'edad'){
            ok = true;
            fl.option = optionFinal;
          }
  
        });

        if(ok == false){
          this.filtroBSQ.push({tipo:'edad',option:optionFinal})
        }
      }
      localStorage.setItem('busquedaMascotasFnd', JSON.stringify(this.filtroBSQ));

    }
      if(this.type == 'busqueda'){
        this.buscarMascotas(this.page)
      }
      
    
   
    this._router.navigate(['fundacion',this.idFun,'mascotas','busqueda']);
    
    

  }

  limpiarCampo(text){

    var textFin = text.replace(/([\\ \\]+(?=[\\ \\])|^\\s+|\\s+$)/g, '');
  
    text = textFin;
  
    return text;
  
  }
}
