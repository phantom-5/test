import { Injectable } from '@angular/core';
import {EventEmitter} from '@angular/core'

@Injectable({
  providedIn: 'root'
})
export class FormsserviceService {
  emailAddress: string
  password: string
  checkBox: boolean
  selectBox: string
  textBox: string
  fileInput: string
  radioBox: string

  formsValueEvent: EventEmitter<string> = new EventEmitter()

  constructor() { }

  setEmailAddress(val: string){
    console.log('setEmail fun called in service')
    this.emailAddress = val
    this.formsValueEvent.emit('true')

  }
  getEmailAddress(){
    return this.emailAddress
  }
  setPassword(val: string){
    this.password = val
    this.formsValueEvent.emit('true')
  }
  getPassword(){
    return this.password
  }
  setCheckBox(val: boolean){
    this.checkBox = val ? true:false
    this.formsValueEvent.emit('true')
  }
  getCheckBox(){
    return this.checkBox
  }
  setSelectBox(val: string){
    this.selectBox = val
    this.formsValueEvent.emit('true')
  }
  getSelectBox(){
    return this.selectBox
  }
  setTextBox(val: string){
    this.textBox = val
    this.formsValueEvent.emit('true')
  }
  getTextBox(){
    return this.textBox
  }
  setFileInput(val: string){
    this.fileInput = val
    this.formsValueEvent.emit('true')
  }
  getFileInput(){
    return this.fileInput
  }
  setRadioBox(val: string){
    this.radioBox = val
    this.formsValueEvent.emit('true')
  }
  getRadioBox(){
    return this.radioBox
  }

  reset(){
    this.emailAddress=''
    this.password=''
    this.checkBox=null
    this.selectBox=''
    this.textBox=''
    this.fileInput=''
    this.radioBox=''
    this.setEmailAddress('') //emits an event so that forms get triggered to take new values

  }
}
