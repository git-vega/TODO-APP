import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule] // Importieren der Module für Template- und Formular-Direktiven
})
export class TodoComponent {
  newTodo: string = '';
  todos: { task: string, done: boolean }[] = [];

  addTodo() {
    if (this.newTodo.trim()) {
      this.todos.push({ task: this.newTodo, done: false });
      this.newTodo = '';
    }
  }

  removeTodo(index: number) {
    this.todos.splice(index, 1);
  }

  toggleDone(index: number) {
    this.todos[index].done = !this.todos[index].done;
  }
}
