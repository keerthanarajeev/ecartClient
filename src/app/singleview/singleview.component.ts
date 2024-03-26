import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../productService/product.service';

@Component({
  selector: 'app-singleview',
  templateUrl: './singleview.component.html',
  styleUrls: ['./singleview.component.css']
})
export class SingleviewComponent implements OnInit{

id:any=""
product:any={}

constructor(private ar:ActivatedRoute,private ps:ProductService, private rout:Router){}
  ngOnInit(): void {
    this.ar.params.subscribe((data:any)=>{
      this.id=data.id
      this.ps.getProduct(this.id).subscribe({
        next:(result:any)=>{
          this.product=result
          console.log(this.product);
          
        },
        error:(result:any)=>{
          alert(result.error.messege)
        }
      })
    })
  }

  addToCart(product:any) {
    if (localStorage.getItem("currentUserId")) {
      // alert("add to cart work")

      // add quantity=1 in product object

      Object.assign(product, {quantity:1})
      console.log(product);

      this.ps.addToCart(product).subscribe({
        next:(result:any)=>{
          this.ps.updateCartCount()

          alert(result)
        },
        error:(result:any)=>{
          alert(result.error)
        }
      })
      
    }
    else {
      alert("Please Login First")
      this.rout.navigateByUrl("login")
    }

  }



  addToWishlist(id:any, title:any, price:any,description:any,  category:any, image:any, rating:any) {
   

      if (localStorage.getItem("currentUserId")) {
        var userId = localStorage.getItem("currentUserId")
        const bodyData = {
          userId,id,title,price,description,category,image,rating
        }
        this.ps.addtoWishlist(bodyData).subscribe({
          next: (result: any) => {
            alert(result)
          },
          error: (result: any) => {
            alert(result.error);
            
          }
        })
      
    }
    else {
      alert("Please Login First")
      this.rout.navigateByUrl("login")
    }


  }


}
