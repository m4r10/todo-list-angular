import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseCrudService } from './base-crud.service';
import { Tarea } from 'src/model/model';

@Injectable({
  providedIn: 'root'
})
export class TareaService extends BaseCrudService<Tarea>{
  constructor(protected httpClient: HttpClient) {
    super(httpClient, '/tarea');
  }
}
