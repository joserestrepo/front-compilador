import { Component, OnInit } from '@angular/core';

import { ArchivoService } from '../../services/archivo.service'

import { Router } from '@angular/router'

import Swal from 'sweetalert2';

@Component({
  selector: 'app-lista-archivos',
  templateUrl: './lista-archivos.component.html',
  styleUrls: ['./lista-archivos.component.css']
})
export class ListaArchivosComponent implements OnInit {

  public listaArchivos:any = [];

  constructor( private archivo_service:ArchivoService, private router:Router) { }

  ngOnInit() {

    this.archivo_service.listaArchivos().subscribe(data =>{
      this.listaArchivos = data;
    });

  }

  abrirArchivo(archivo){
    console.log(archivo)
    this.archivo_service.archivo = archivo;
    this.router.navigate(['/editor']);
  }

  eliminarArchivo(archivo){
    Swal.fire({
      title: '¿Estas seguro que quieres eliminar este archivo?',
      text: "Si lo eliminas no se puede revertir el proceso!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Si, eliminar!'
    }).then((result) => {
      if (result.value) {

        this.archivo_service.eliminarArchivo(archivo['id']).subscribe(data =>{
          if(data){
            Swal.fire(
              'Eliminado!',
              'El archivo a sido eliminado con exito.',
              'success'
            )
            this.archivo_service.listaArchivos().subscribe(data =>{
              this.listaArchivos = data;
            });
          }
          
        });

        
      }
    })
  }
}
