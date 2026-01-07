import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink ,Router} from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Auth } from '../../services/auth';
@Component({
  selector: 'app-login',
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login implements OnInit {
  constructor(private auth: Auth, private router: Router) {}
  ngOnInit() {}
  userForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });
  onSubmit() {
    if (this.userForm.valid) {
      const { email, password } = this.userForm.value;

      this.auth.login(email!, password!).subscribe({
        next: (res: AuthModel) => {
          console.log('Login success:', res);
          localStorage.setItem('token', res.token);

          this.router.navigate(['/products']);
        },
        error: (err) => {
          console.error('Login failed:', err);
        },
      });
    }
  }
}
