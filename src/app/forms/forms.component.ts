import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsserviceService } from '../formsservice.service';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.css']
})
export class FormsComponent implements OnInit {
  emailAddress: string
  password: string
  checkBox: boolean
  selectBox: string
  textBox: string
  fileInput: string
  radioBox: string

  activeVal = true

  constructor(private formsService: FormsserviceService,private router:Router, private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.router.navigate(['/formsdemo/templateform'],{relativeTo:this.route})
    this.formsService.formsValueEvent.subscribe((val)=>{
      this.emailAddress = this.formsService.getEmailAddress()
      this.password = this.formsService.getPassword()
      this.checkBox = this.formsService.getCheckBox()
      this.selectBox = this.formsService.getSelectBox()
      this.textBox = this.formsService.getTextBox()
      this.fileInput = this.formsService.getFileInput()
      this.radioBox = this.formsService.getRadioBox()
    })
    
  }

  activeTab(){
    this.activeVal=!this.activeVal
    this.formsService.reset()
  }

}
