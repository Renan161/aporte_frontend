import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { LoginResponseDTO } from 'src/app/interfaces/login-response-dto';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup = this.formBuilder.group({
    email: ['', [Validators.required]],
    senha: ['', [Validators.required]]
  });

  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private loginService: LoginService // Injeção do serviço LoginService
  ) {}

  ngOnInit(): void {}

  loginUser() {
    if (this.loginForm.valid) {
      const { email, senha } = this.loginForm.value;
      this.loginService.login(email, senha).subscribe(
        (response: LoginResponseDTO) => {
          localStorage.setItem('token', response.token); // Guarda o token no local storage
          this.router.navigate(['/dashboard']); // Redireciona para a página de dashboard ou a página que você preferir
        },
        error => {
          alert("Erro ao realizar login"); // Mostra uma mensagem de erro se a autenticação falhar
        }
      );
    }
  }
}
