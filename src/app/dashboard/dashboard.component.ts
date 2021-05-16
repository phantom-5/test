import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import Swal, { SweetAlertResult } from 'sweetalert2'
import { DbserviceService } from '../dbservice.service';
import randomName from 'node-random-name'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  username: string
  currentDate: Date
  studentDetails: {name: string, sub1:number, sub2:number,sub3:number, hover:boolean}[] = []
  detailsForm: FormGroup

  constructor(private route: ActivatedRoute, private dbService: DbserviceService) { }

  ngOnInit(): void {
    this.currentDate= new Date()
    console.log(this.currentDate)
    this.route.params.subscribe(
      (params: Params) => {
        this.username = params['username']
      }
    )
    this.retrieveFromDatabase()
    this.initForm()
  }

  private initForm(){
    let studentName = 'noname'
    let sub1 = 0
    let sub2 = 0
    let sub3 = 0
    this.detailsForm = new FormGroup({
      studentName: new FormControl(null,Validators.required),
      sub1: new FormControl(null),
      sub2: new FormControl(null),
      sub3: new FormControl(null),
    })
  }

  formSubmit(){
    let studentName = this.detailsForm.value['studentName']
    let sub1 = this.detailsForm.value['sub1']
    let sub2 = this.detailsForm.value['sub2']
    let sub3 = this.detailsForm.value['sub3']
    this.studentDetails.push({
      name: studentName,
      sub1,
      sub2,
      sub3,
      hover: false
    })
    this.updateToDatabase(this.studentDetails)
  }

  async editRow(i: number){
    let rowData = this.studentDetails[i]
    const newData = await Swal.fire({
      title: 'Edit Row',
      confirmButtonText: 'Apply Changes',
      confirmButtonColor:'#000000',
      html:`
        <form>
        <div class="form-group row">
        <label class="bg-info text-white">Change Name</label>
        <input type="text" class="form-control" id="name" value="${rowData.name}">
        </div>
        <hr/>
        <div class="form-group row">
        <label class="bg-info text-white">Change Score: Subject 1</label>
        <input type="number" class="form-control" id="sub1" value="${rowData.sub1}">
        </div>
        <hr/>
        <div class="form-group row">
        <label class="bg-info text-white">Change Score: Subject 2</label>
        <input type="number" class="form-control" id="sub2" value="${rowData.sub2}">
        </div>
        <hr/>
        <div class="form-group row">
        <label class="bg-info text-white">Change Score: Subject 3</label>
        <input type="number" class="form-control" id="sub3" value="${rowData.sub3}">
        </div>
        </form>
      `,
      preConfirm: () => {
        const name = (<HTMLInputElement>Swal.getPopup().querySelector('#name')).value
        const sub1 = +(<HTMLInputElement>Swal.getPopup().querySelector('#sub1')).value
        const sub2 = +(<HTMLInputElement>Swal.getPopup().querySelector('#sub2')).value
        const sub3 = +(<HTMLInputElement>Swal.getPopup().querySelector('#sub3')).value

        return {
          name,
          sub1,
          sub2,
          sub3,
          hover: false
        }
      }
    })
    if(!newData.isDismissed){
      rowData = newData.value
      this.studentDetails[i]=rowData
      this.updateToDatabase(this.studentDetails)
    }
  }

  deleteRow(i: number){
    this.studentDetails.splice(i,1)
    this.updateToDatabase(this.studentDetails)
  }


  private updateToDatabase(studentDetails: any){
      //update studentDetails to database against username
      this.dbService.postUserData(this.username,studentDetails).subscribe(
        responseData => {
          console.log(responseData)
        }
      )
  }

  private retrieveFromDatabase(){
    this.dbService.getUserData(this.username).subscribe(
        responseData=>{
          let lastKey = ''
          for (var key in responseData){
            lastKey=key
          }
          this.studentDetails=responseData[lastKey].username
  })

  

}
  hoverShow(i){
    this.studentDetails[i].hover = true
  }
  hoverHide(i){
    this.studentDetails[i].hover = false
  }
  generateRandom(){
    for(var i=0;i<10;i++){
      let name = randomName({first:true, random: Math.random})
      let sub1 = Math.floor(Math.random() * 101)
      let sub2 = Math.floor(Math.random() * 101)
      let sub3 = Math.floor(Math.random() * 101)
      let hover = false
      this.studentDetails.push({
        name,
        sub1,
        sub2,
        sub3,
        hover
      })
    }
    this.updateToDatabase(this.studentDetails)
  }
}
