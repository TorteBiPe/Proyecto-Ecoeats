import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from './users.service';
import { User } from './User';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  errores!: string[];

  public user: User = new User();

  constructor(
    public userService: UsersService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}
  ngOnInit(): void {
    if (localStorage.getItem('login')) this.router.navigate(['/home']);
  }
  //Función que sirve para logear al Admin
  login() {
    const user = { login: this.user.login, password: this.user.password };
    this.userService.login(user).subscribe((data: any) => {
      switch (user.login&&user.password) {

        case data[0].login&&data[0].password:
          this.router.navigate(['/home']);
          localStorage.setItem('login', JSON.stringify(user));
          break;

        default:
          this.errores = ['Error al iniciar sesion, repita las credenciales'];
          //alert("Error al iniciar sesion, repita las credenciales")
          break;
      }
    });
  }
}
