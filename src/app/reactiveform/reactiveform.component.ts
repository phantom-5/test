import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormsserviceService } from '../formsservice.service';

@Component({
  selector: 'app-reactiveform',
  templateUrl: './reactiveform.component.html',
  styleUrls: ['./reactiveform.component.css']
})
export class ReactiveformComponent implements OnInit {

  reactiveForm: FormGroup

  constructor(private formsService:FormsserviceService) { }

  ngOnInit(): void {
    this.initForm()
  }

  initForm(){
    this.reactiveForm = new FormGroup({
      'emailAddress': new FormControl(null,Validators.email),
      'password': new FormControl(),
      'checkBox': new FormControl(),
      'selectBox': new FormControl(),
      'textBox': new FormControl(),
      'fileInput': new FormControl(),
      'radioBox': new FormControl(),

    })
  }

  formSubmit(){
    this.formsService.setEmailAddress(this.reactiveForm.value.emailAddress)
    this.formsService.setPassword(this.reactiveForm.value.password)
    this.formsService.setCheckBox(this.reactiveForm.value.checkBox)
    this.formsService.setSelectBox(this.reactiveForm.value.selectBox)
    this.formsService.setTextBox(this.reactiveForm.value.textBox)
    this.formsService.setFileInput(this.reactiveForm.value.fileInput)
    this.formsService.setRadioBox(this.reactiveForm.value.radioBox)
  }

}
