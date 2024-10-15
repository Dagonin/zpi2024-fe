import { Component } from '@angular/core';
import { MapComponent } from "../map/map.component";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [
    MapComponent,
    MatFormFieldModule,
    MatInputModule,
    MatIcon,
    MatButton,
    ReactiveFormsModule,
  ],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css'
})
export class MainPageComponent {
  protected contactForm = new FormGroup({
    login: new FormControl('',[Validators.required, Validators.minLength(5)]),
    password: new FormControl('',[Validators.required, Validators.minLength(8)])
  },{updateOn: 'blur'},) 

onSubmit() {
throw new Error('Method not implemented.');
}
errorMessage(arg0: any,arg1: string) {
throw new Error('Method not implemented.');
}

scroll(el: HTMLElement) {
  el.scrollIntoView({behavior: 'smooth'});
}

}
