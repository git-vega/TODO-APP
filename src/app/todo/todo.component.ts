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

  ngOnInit() {
    // Laden der Todos aus LocalStorage
    const savedTodos = localStorage.getItem('todos'); // prüfen ob todos im LocalStorage vorhanden sind
    if(savedTodos){
      this.todos = JSON.parse(savedTodos);  // Lädt die gespeicherten Produkte in die Liste
    }
  }

  addTodo() {
    if (this.newTodo.trim()) {
      this.todos.push({ task: this.newTodo, done: false });
      this.newTodo = '';
      this.saveTodosToLocalStorage();
    }
  }

  removeTodo(index: number) {
    this.todos.splice(index, 1);
    this.saveTodosToLocalStorage();
  }

  toggleDone(index: number) {
    this.todos[index].done = !this.todos[index].done;
  }

  // Methode zum Speichern in LocalStorage
  saveTodosToLocalStorage() {
    localStorage.setItem('todos', JSON.stringify(this.todos));
  }
}
