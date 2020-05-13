import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { EntidadBase } from 'src/model/model';

export abstract class BaseCrudService<T extends EntidadBase> {

    constructor(
      protected httpClient: HttpClient,
      protected path: string,
    ) { }
  
    protected getURLBase(path: string): string {
      return `${environment.apiEndPoint}${path}`;
    }
  
    protected getURL(extraPath?: string): string {
      let finalPath  = `${environment.apiEndPoint}${this.path}`;
      if (extraPath) {
        finalPath = `${finalPath}${extraPath}`;
      }
      return finalPath;
    }

    public list(): Observable <T[]> {
        const url = this.getURL();
        return this.httpClient.get<[T]>(url) ;
      }

    public get(id: number): Observable<T> {
        const url = this.getURL(`/${id}`);
        return this.httpClient.get<T>(url);
    }
    
    public delete(id: number) {
        const url = this.getURL(`/${id}`);
        return this.httpClient.delete(url);
    }
    
    public update(entidad:T) {
        const url = this.getURL(`/${entidad.id}`);
        return this.httpClient.put<T>(url, entidad);
    }

    public create(entidad: T): Observable<T> {
        const url = this.getURL();
        return this.httpClient.post<T>(url, entidad);
    }
  }