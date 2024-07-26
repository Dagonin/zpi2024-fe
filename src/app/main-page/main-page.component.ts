import { Component } from '@angular/core';
import { MapComponent } from "../map/map.component";

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [MapComponent],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css'
})
export class MainPageComponent {

}
