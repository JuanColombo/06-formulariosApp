import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

import { ValidatorService } from '../../../shared/validator/validator.service';
import { EmailValidatorService } from '../../../shared/validator/email-validator.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styles: [
  ]
})
export class RegistroComponent implements OnInit {




  miFormulario: FormGroup = this.fb.group({
    nombre: ['',[Validators.required, Validators.pattern(this.vs.nombreApellidoPattern)]],
    email: ['',[Validators.required, Validators.pattern(this.vs.emailPattern)], [this.ev]],
    username: ['',[Validators.required, this.vs.noPuedeSerStrider]],
    password: ['',[Validators.required, Validators.minLength(6)]],
    password2: ['',[Validators.required ]],
  },{
    validators : [this.vs.camposIguales('password','password2')]
  })


  get emailErrorMsg () : string{
    const errors = this.miFormulario.get('email')?.errors;
    if (errors?.required){
      return 'Email es obligatorio'
    } 
    else if (errors?.pattern){
      return 'El email no tiene formato de correo'
    }else if (errors?.emailTomado){
      return ' El correo ya se encuentra registrado'
    }
    return '';
  }

  constructor(private fb : FormBuilder, private vs : ValidatorService, private ev : EmailValidatorService) { }

  ngOnInit(): void {
    this.miFormulario.reset({
      nombre:'Juan Pablo Colombo',
      email:'test1@test.com',
      username:'JuanP',
      password:'123456',
      password2:'123456'

    })
  }

  campoNoValido(campo:string){
    return this.miFormulario.get(campo)?.invalid 
    && this.miFormulario.get(campo)?.touched
  }



  submitFormulario(){
    this.miFormulario.markAllAsTouched();
  }

}
