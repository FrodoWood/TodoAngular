import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TodoitemService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getTodoItems(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/todoitems`);
  }

  putTodoItem(id: number, item: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/todoitems/${id}`, item);
  }

  postTodoItem(item: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/todoitems`, item);
  }

  deleteTodoItem(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/todoitems/${id}`);
  }
}
