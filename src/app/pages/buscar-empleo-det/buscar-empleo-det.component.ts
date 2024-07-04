import { Component, EventEmitter, Input, Output } from '@angular/core';
import { EmpleoResponse } from 'src/app/models/Empleo/EmpleoDto';

@Component({
  selector: 'app-buscar-empleo-det',
  templateUrl: './buscar-empleo-det.component.html',
  styleUrls: ['./buscar-empleo-det.component.scss']
})
export class BuscarEmpleoDetComponent {

  @Input() empleo: EmpleoResponse;
  @Output() childEvent = new EventEmitter<EmpleoResponse>();

  sendEvent() {
    this.childEvent.emit(this.empleo);
  }

}
