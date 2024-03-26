import { Component, OnInit } from '@angular/core';
import { ProductService } from '../productService/product.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  sData: any = ""

  login: any = false
  cartCount: any = 0

  constructor(private ps: ProductService) { }

  ngOnInit(): void {
    if (localStorage.getItem("currentUser")) {
      this.login = true

      this.ps.cartCount.subscribe({
        next: (result: any) => {
          this.cartCount = result
        }
      })
    }
    else {
      this.login = false
    }

  }

  sendData(event: any) {
    this.sData = (event.target.value);
    this.ps.serachString.next(this.sData)
  }


  logout() {
    alert("Are you sure want to Logout")
    localStorage.removeItem("currentUser")
    localStorage.removeItem("currentUserId")
    localStorage.removeItem("token")
    this.ps.cartCount.next(0)
    this.login = false
  }

}
