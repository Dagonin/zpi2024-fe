import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormErrorsService } from '../../form-errors/form-errors.service';
import { CommonModule } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSidenavModule } from '@angular/material/sidenav';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [MatFormFieldModule,
    MatInputModule,
    MatIcon,
    MatButton,
    ReactiveFormsModule,
    CommonModule,
    MatSidenavModule,
    RouterLink,
    MatButtonToggleModule],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.css'
})
export class ChangePasswordComponent {
  protected change_passwordForm = new FormGroup({
    new_password: new FormControl('', [Validators.required]),
    new_password_repeat: new FormControl('', [Validators.required])
  }, { updateOn: 'change' })


  constructor(
    private formErrorService: FormErrorsService,
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient
  ) {
  }

  requestID!: string | null;

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.requestID = params.get('requestid');
      console.log('Request ID:', this.requestID);
    });
  }

  onSubmit() {

    if (this.change_passwordForm.valid && this.requestID) {
      this.changePassword(this.change_passwordForm.getRawValue().new_password!).subscribe({
        next(value) {
          console.log(value)
          window.location.reload();
        },
        error(err) {
          console.log(err)
        },
      })
    }
  }

  errorMessage(vals: any, name: string) {
    return this.formErrorService.errorMessage(vals, name);
  }


  changePassword(password: string) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    return this.http.post<boolean>(`http://localhost:8080/api/crud/customer/password-change/${this.requestID}`, { password: password }, httpOptions);
  }


}
