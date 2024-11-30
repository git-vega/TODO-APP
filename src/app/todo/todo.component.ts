import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Firestore, collection, addDoc, collectionData, deleteDoc, doc, updateDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule] // Importieren der Module für Template- und Formular-Direktiven
})
export class TodoComponent {
  newTodo: string = '';
  todos$: Observable<{ id?: string; task: string; done: boolean }[]>;

  constructor(private firestore: Firestore) {
    const todosCollection = collection(this.firestore, 'todos');
    this.todos$ = collectionData(todosCollection, { idField: 'id' }) as Observable<{ id?: string; task: string; done: boolean }[]>;
  }

  addTodo() {
    if (this.newTodo.trim()) {
      const todosCollection = collection(this.firestore, 'todos');
      const todo = { task: this.newTodo, done: false };
      addDoc(todosCollection, todo).then(() => {
        this.newTodo = '';
      });
    }
  }

  removeTodo(todoId: string) {
    const todoDoc = doc(this.firestore, `todos/${todoId}`);
    deleteDoc(todoDoc)
    .then(() => {
      console.log(`Todo mit ID ${todoId} wurde erfolgreich gelöscht.`);
    })
    .catch(error => {
      console.error(`Fehler beim Löschen des Todos mit ID ${todoId}:`, error);
    });
  }

  toggleDone(todoId: string, done: boolean) {
    const todoDoc = doc(this.firestore, `todos/${todoId}`);
    updateDoc(todoDoc, { done: !done })
    .then(() => {
      console.log(`Todo mit ID ${todoId} wurde erfolgreich aktualisiert. Neuer Status: ${!done}`);
    })
    .catch(error => {
      console.error(`Fehler beim Aktualisieren des Todos mit ID ${todoId}:`, error);
    });
  }
}
