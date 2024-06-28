import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TodoitemService {
  private baseUrl = '/api';

  constructor(private http: HttpClient) {}

  getTodoItems(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/todoitems`);
  }

  putTodoItem(id: number, item: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/todoitems/${id}`, item);
  }

  postTodoItem(item: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/todoitems`, item);
  }

  deleteTodoItem(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/todoitems/${id}`);
  }
}
