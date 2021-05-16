import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'myapp';

  isPortrait(): boolean{
    return window.innerHeight > window.innerWidth;
  }
  
  ngOnInit(): void{
    if (this.isPortrait()){
    var swalAlert
    const checkPhone = async()=>{
        swalAlert = await Swal.fire({
        icon: 'info',
        title: 'Hello User!',
        text: 'This site is not designed for use in mobiles/portrait. Open in desktop for best experience.'
      })
    }
     checkPhone()
    }
  }
}
