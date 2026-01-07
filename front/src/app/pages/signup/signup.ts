import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-signup',
  standalone: true, // agar tum standalone component bana rahe ho
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './signup.html',
  styleUrls: ['./signup.css'],
})
export class Signup {
  constructor(private auth: Auth, private router: Router) {}

  userForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    confirmPassword: new FormControl('', [Validators.required]),
  });

  onSubmit() {
    const { name, email, password, confirmPassword } = this.userForm.value;

    if (password !== confirmPassword) {
      console.log('❌ Passwords do not match');
      return;
    }

    this.auth.signup(name!, email!, password!).subscribe({
      next: (res: any) => {
        console.log('✅ Signup success:', res);

        localStorage.setItem('token', res.token);
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('❌ Signup failed:', err);
      },
    });
  }
}
