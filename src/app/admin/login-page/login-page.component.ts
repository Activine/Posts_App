import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { User } from '../../shared/interfaces';
import { AuthService } from '../shared/services/auth.service';


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit{
  user: User;
  submitted: boolean = false;
  form: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
    acceptTerms: new FormControl(false),
  });
  message: string
  forgot: boolean = false

  constructor(
    private formBuilder: FormBuilder,
    public auth: AuthService,
    private router: Router,
    private route: ActivatedRoute
    ) {
    this.user = {} as User;
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((param: Params) => {
      if(param['loginAgain']) {
        this.message = 'Plese enter email and password'
      } else if(param['authFailed']) {
        this.message = 'Session timed out. Enter email and password again'
      }
    })

    this.form = this.formBuilder.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(40),
          ],
        ],
        acceptTerms: [false, Validators.requiredTrue],
      }
    );
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  onSubmit(): void {
    console.log(this.form);
    this.submitted = true

    if (this.form.invalid) {
      return;
    }
    // this.user = this.form.value
    // console.log(this.user);
    // this.auth.login(this.form.value)

    const user: User = this.form.value
    delete user.acceptTerms
    user.returnSecureToken = true
    console.log(JSON.stringify(user));
    this.auth.login(user).subscribe(() => {
      this.form.reset();
      this.router.navigate(['/admin', 'dashboard'])
      this.submitted = false
    }, () => {
      this.submitted = false
    })
  }

  onReset(): void {
    this.form.reset();
  }
}
