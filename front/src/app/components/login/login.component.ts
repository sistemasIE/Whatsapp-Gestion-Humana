import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule],
  templateUrl: `./login.component.html`,
  styleUrl: './login.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  public isLoggedIn = false;
  public errorMessage = '';

  // Lista estática de usuarios válidos
  private users = [
    { username: 'amedina', password: '1234' },
    { username: 'ngiron', password: '1234' },
  ];

  public username = '';
  public password = '';

  public login(): void {
    const isValid = this.users.some(
      (user) =>
        user.username === this.username.trim() &&
        user.password === this.password
    );

    if (isValid) {
      this.isLoggedIn = true;
      localStorage.setItem('token', 'token');
      this.errorMessage = '';
      window.location.reload();
    } else {
      this.isLoggedIn = false;
      this.errorMessage = '❌ Usuario o contraseña incorrectos';
    }
  }
}
