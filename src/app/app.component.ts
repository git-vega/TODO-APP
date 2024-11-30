import { Component } from '@angular/core';
import { TodoComponent } from './todo/todo.component'; // Stellen Sie sicher, dass der Import vorhanden ist

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [TodoComponent] // TodoComponent muss hier importiert werden
})
export class AppComponent {

  //title = 'Einkaufswagen';
}
