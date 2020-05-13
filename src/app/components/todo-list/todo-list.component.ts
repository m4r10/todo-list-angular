import { Component, OnInit } from '@angular/core';
import { TareaService } from 'src/app/services/tarea.service';
import { Tarea, Alert } from 'src/model/model';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  editarTarea:boolean = false;
  alert:Alert = null;
  tareaSeleccionada: Tarea;
  tareas:Tarea[] = [];

  constructor(private tareaService: TareaService,
    private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.tareaSeleccionada = new Tarea();
    this.spinner.show();
    this.cargarTareas();
    this.spinner.hide();
  }

  cargarTarea(tarea:Tarea) {
    this.editarTarea = true;
    this.tareaSeleccionada = {...tarea};
    this.alert = null;
  }

  limpiarTarea(){
    this.editarTarea = false;
    this.tareaSeleccionada = new Tarea();
    this.alert = null;
  }

  agregar() {
    this.spinner.show();
    this.tareaService.create(this.tareaSeleccionada).subscribe(resp => {
      this.showAlert('La tarea se agregó correctamente');
      this.alert.type = 'success';
      this.cargarTareas();
      this.spinner.hide();
    })
  }

  editar() {
    this.spinner.show();
    this.tareaService.update(this.tareaSeleccionada).subscribe(resp => {
      this.showAlert('La tarea se modificó correctamente');
      this.alert.type = 'success';
      this.cargarTareas();
      this.spinner.hide();
    })
  }

  eliminar(tarea:Tarea) {
    this.spinner.show();
    this.tareaService.delete(tarea.id).subscribe(resp => {
      this.showAlert('La tarea se eliminó correctamente');
      this.cargarTareas();
      this.spinner.hide();
    })
  }

  cargarTareas() {
    this.tareaService.list().subscribe(resp => {
      this.tareas = resp;
    });
  }

  closeAlert() {
    this.alert = null;
  }

  showAlert(mensaje:string) {
    this.alert = new Alert();
    this.alert.message = mensaje;
    this.alert.type = 'success';
  }

  submit() {

  }
}
