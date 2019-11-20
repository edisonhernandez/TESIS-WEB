import { Component, OnInit,DoCheck } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {Mascota} from '../../../models/mascota';
import {Foto} from '../../../models/foto';
import {Filtro} from '../../../models/filtro';

import {MascotaService} from '../../../services/mascota.service';
import {GLOBAL} from '../../../services/global';
import {UsuarioService} from '../../../services/usuario.service';
declare var $:any;

@Component({
  selector: 'app-mascotas',
  templateUrl: './mascotas.component.html',
  styleUrls: ['./mascotas.component.css'],
  providers:[MascotaService,UsuarioService]

})
export class MascotasComponent implements OnInit, DoCheck{
  public taman = ["Todos","Pequeño","Mediano","Grande"];
  public sexo = ["Todos","Macho","Hembra"];
  public edad = ["Todos","Cachorro","Joven","Adulto"];
  public pagesSelec=[]
  public select;
  public filtroBSQ = [];

  public identity;
  public filtro;
  public token;
  public url;
  public status;
  public page;
  public total;
  public pages;
  public mascotas:Mascota[];
  public fotos:Foto;
  public itemsPerPage;
 public mensaje;
 public n;
 public advertencia;
 public bus;
 public fil;
 public fl;
 public next_pagee;
  public prev_pagee;
  public tamF;
  public sexF;
  public edadF;
  public filtroBTN;
  public carga;
  public itemsMSC;
  public imgCom;
  public type;
  constructor(private _route:ActivatedRoute,
    private _router:Router, private _mascotaService:MascotaService,private _usuarioService:UsuarioService) {
      this.identity = this._usuarioService.obtIdentity();
      this.token = this._usuarioService.obtToken();
      console.log(this.token)
      this.fil = this._mascotaService.obtFiltro();
      this.filtroBSQ = this._mascotaService.obtFiltro();
      this.url = GLOBAL.url;
      this.page = 1;

      this.bus = false;
      this.carga = true;
      this.itemsMSC = 0;
      //this.fil = new Filtro("","","")
     // this.fil = this._mascotaService.obtFiltro();
   
      this.fl = false;
     }

  ngOnInit() {
    if(this.identity){
      if(this.identity.rol == '4'){
        this._router.navigate(['fundacion',this.identity._id,'nosotros','all']);
      }
    }

    this.actualPage2();
    setTimeout(function(){
      $(".logo").addClass("visibleLog");
     
    }, 200);
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

    this.fil = this._mascotaService.obtFiltro();
    this.filtroBSQ = this._mascotaService.obtFiltro();
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
  actualPage2(){
    this.type = '';
    this.pagesSelec = []
    this._route.params.subscribe(params =>{
     
      
      let tipo = params['tipo'];
      this.type = tipo
      let page = +params['page'];
     
      console.log(tipo)
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
      
      if(this.type == 'busqueda'){
        
        this.filtroBTN = true;
        //devolver listado de usuarios
        console.log(this.filtroBSQ)
        this.buscarMascotas(page)
        this.filtroBSQ.forEach(elem => {
          $(document).ready(()=>{
          if(elem.tipo == 'tam'){
            $("#tamDrop").val(elem.option)
          }
          if(elem.tipo == 'sexo'){
            $("#sexoDrop").val(elem.option)
          }
          if(elem.tipo == 'edad'){
            $("#edadDrop").val(elem.option)
          }
        })
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
    
    
    });
    
  }
  obtMascotas(page,adding=false){
    this.status = 'procesando';
    this.pagesSelec = [];
    this._mascotaService.obtMascotas(page).subscribe(
      response=>{
        console.log()
        this.carga = false;
        $(".carga").fadeOut("slow");
        this.efectCards()
        if(response.mascotas && response.n == '1'){
          $(".carga").fadeOut("slow");
          
          
          this.fotos = response.fot;
          this.total = response.total;
          this.pages = response.pages;
          this.itemsPerPage = response.itemsPerPage;
          this.mascotas = response.mascotas;
          for (let i = 1; i <= this.pages; i++) {
            this.pagesSelec.push(i)
            
          }
         
          this.itemsMSC = this.mascotas.length;
          this.advertencia = false;
          this.status ='success';
          $('.containerLoad').fadeOut('slow');
      
          //this.obtFotos(response.mascotas._id, page);
          if(page > this.pages){
            this._router.navigate[('/login')]
          }
         

        }else{
          
          console.log(response.n)
          this.status = 'error';
         
        }
      },
      error=>{
        this.total = 0;
        this.status = 'error';  
        this.carga = false;
        this.advertencia = true;
        $(".carga").fadeOut("slow");
        var errorMessage = <any>error;
        console.log(errorMessage)
        this.status = 'error';
        if(errorMessage != null && error.error.n == '2'){
          this.n = error.error.n;
         
          this.mensaje = 'Lo sentimos, '+error.error.message;
        }else if(errorMessage != null && error.error.n == '3'){
          this.n = error.error.n;
         
          this.mensaje = error.error.message;
        }else{
          this.n = 'n';
          this.mensaje = 'Algo salio mal, intentalo de nuevo.'
        }
      }
    )

  }
 
  verFoto(foto){
    $('#modalComprobante').modal('show')
    this.imgCom = foto;

  }

  cancelarBus(){
   
    this.filtroBTN = false;
    localStorage.removeItem('busquedaMascotas2');
    this._router.navigate(['mascotas','todos']);
  }

  busc(){
    this.bus = true;
  }

  buscarMascotas(page,adding=false){
    this.pagesSelec =[]
console.log(this.filtroBSQ)
    this._mascotaService.filtroMascotas(this.filtroBSQ,page).subscribe(
      response=>{
        console.log(response)
        this.carga = false;
        $(".carga").fadeOut("slow");
        this.efectCards()
        if(response.mascotas && response.n == '1'){
         
         
          this.advertencia = false;
          this.fotos = response.fot;
          this.total = response.total;
          this.pages = response.pages;
          this.itemsPerPage = response.itemsPerPage;
          this.mascotas = response.mascotas;
          for (let i = 1; i <= this.pages; i++) {
            this.pagesSelec.push(i)
            
          }
          this.itemsMSC = this.mascotas.length;
          this.status ='success';
         
          console.log(this.mascotas)
          //this.obtFotos(response.mascotas._id, page);
          if(page > this.pages){
            this._router.navigate[('/mascotas/todos/1')]
          }
        }
      },
      error=>{
        this.carga = false;
        this.total = 0;
        this.advertencia =true;
        this.status = 'error';  
        $(".carga").fadeOut("slow");
        var errorMessage = <any>error;
       
        
        if(errorMessage != null && error.error.n == '2'){
          this.mensaje = 'Lo sentimos, '+error.error.message;
          this.mascotas = null;
        }else if(errorMessage != null && error.error.n == '5'){
          this.mensaje = 'No se ha elegigo filtros';
          this.mascotas = null;
        }
        
        else{
  
          this.n = 'n';
          
          this.mensaje = 'Algo salio mal, intentalo mas tarde'
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
    
    this._router.navigate(['mascotas',tam,sex,edad]);
   this.actualPage2()
    
  }

  cancelarBusqueda(){
    
  }

  filtroBSQD(option){

    
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

      localStorage.setItem('busquedaMascotas2', JSON.stringify(this.filtroBSQ));
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

      localStorage.setItem('busquedaMascotas2', JSON.stringify(this.filtroBSQ));
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
      localStorage.setItem('busquedaMascotas2', JSON.stringify(this.filtroBSQ));

    }
    if(this.type == 'busqueda'){
      this.buscarMascotas(this.page)

    }
    this._router.navigate(['mascotas','busqueda']);
    
    

  }


}
