import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormsserviceService } from '../formsservice.service';

@Component({
  selector: 'app-templateform',
  templateUrl: './templateform.component.html',
  styleUrls: ['./templateform.component.css']
})
export class TemplateformComponent implements OnInit {
  emailAddress: string
  password: string
  checkBox: boolean
  selectBox: string
  textBox: string
  fileInput: string
  radioBox: string

  constructor(private formsService: FormsserviceService) { }

  ngOnInit(): void {
  }

  formSubmit(formRef: NgForm){
    console.log('formsData',formRef.value)
    this.emailAddress = formRef.value['emailAddress']
    this.password = formRef.value['password']
    this.checkBox = formRef.value['checkBox']
    this.selectBox = formRef.value['selectBox']
    this.textBox = formRef.value['textBox']
    this.fileInput = formRef.value['fileInput']
    this.radioBox = formRef.value['radioBox']
    this.formsService.setEmailAddress(this.emailAddress)
    this.formsService.setPassword(this.password)
    this.formsService.setCheckBox(this.checkBox)
    this.formsService.setSelectBox(this.selectBox)
    this.formsService.setTextBox(this.textBox)
    this.formsService.setFileInput(this.fileInput)
    this.formsService.setRadioBox(this.radioBox)
  }
}
