import { Component, OnInit } from '@angular/core';
import { TodoitemService } from '../../services/todoitem.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-todoitems',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './todoitems.component.html',
  styleUrl: './todoitems.component.css',
})
export class TodoitemsComponent implements OnInit {
  todoItems!: any[];
  todoItem: any = { name: '', isComplete: false };

  constructor(private todoService: TodoitemService) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getTodoItems();
  }

  getTodoItems(): void {
    this.todoService.getTodoItems().subscribe({
      next: (response) => {
        console.log(response);
        this.todoItems = response;
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  editTodoItem(id: number, item: any): void {
    this.todoService.putTodoItem(id, item).subscribe({
      next: (response) => {
        const index = this.todoItems.findIndex((item) => item.id === id);
        if (index !== -1) {
          this.todoItems[index] = { ...item };
        }
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  onEnterKey(event: Event) {
    event.preventDefault();
    this.createTodoItem(); 
}
  onEnterKeyEdit(event: Event, id:number, item:any) {
    event.preventDefault();
    this.editTodoItem(id, item); 
}


  createTodoItem(): void {
    if (this.todoItem.name == '') return;

    this.todoService.postTodoItem(this.todoItem).subscribe({
      next: (response) => {
        this.todoItems.push(response);
        this.todoItem = { name: '', isComplete: false };
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  deleteTodoItem(id: number): void {
    const itemToDeleteIndex = this.todoItems.findIndex((item) => item.id == id);
    this.todoService.deleteTodoItem(id).subscribe({
      next: (response) => {
        this.todoItems.splice(itemToDeleteIndex, 1);
        console.log('deleted todo item!');
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  complete(todoItem: any): void {
    const updatedItem = { ...todoItem, isComplete: !todoItem.isComplete };
    this.todoItems = this.todoItems.map((item) =>
      item.id === todoItem.id ? updatedItem : item
    );
    // Save to database
    this.editTodoItem(todoItem.id, updatedItem);
  }
}
