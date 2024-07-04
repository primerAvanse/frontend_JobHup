import { Component, Input } from '@angular/core';
import { EmpleoResponse } from 'src/app/models/Empleo/EmpleoDto';

@Component({
  selector: 'app-empleo-det',
  templateUrl: './empleo-det.component.html',
  styleUrls: ['./empleo-det.component.scss']
})

export class EmpleoDetComponent {
  @Input() empleo: EmpleoResponse;
}
