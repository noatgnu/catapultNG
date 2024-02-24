import {AfterViewInit, Component} from '@angular/core';
import {AccountsService} from "../accounts.service";
import {FormBuilder, ReactiveFormsModule} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements AfterViewInit{

  form = this.fb.group({
    username: [''],
    password: [''],
    remember: [false]
  })

  constructor(private accounts: AccountsService, private fb: FormBuilder, private router: Router) {

  }

  loginHandler() {
    if (this.form.valid) {
      if (this.form.value['username'] && this.form.value['password']) {
        this.accounts.login(this.form.value['username'], this.form.value['password']).subscribe((response: any) => {
          this.accounts.token = response.token
          this.accounts.loggedIn = true
          if (this.form.value['username'] && this.form.value['remember']) {
            this.accounts.saveToken(this.form.value['username'], response.token)
          }
          if (this.accounts.loggedIn) {
            this.router.navigate(["/"])
          }
        })
      }
    }
  }

  ngAfterViewInit(): void {
    if (this.accounts.loggedIn) {
      this.router.navigate(["/"])
    }
  }
}
