import { Component, OnInit } from '@angular/core';
import { ProductService } from '../productService/product.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {

  userId: any = "";
  products: any = [];

  constructor(private ps: ProductService) { }

  ngOnInit(): void {
    const userIdFromStorage = localStorage.getItem("currentUserId");

    if (userIdFromStorage) {
      this.userId = userIdFromStorage;
      this.getWishlistdata()
      
    } else {
      console.warn("User ID not found in local storage.");
    }
  }

  getWishlistdata(){
    this.ps.getWishlist(this.userId).subscribe({
      next: (result: any) => {
        this.products = result;
        console.log(this.products);
      },
      error: (error: any) => {
        console.error("Error fetching wishlist:", error);
      }
    });
  }

  removeWishlistdata(productId: any){
  this.ps.deleteWishlistitem(productId).subscribe({
    next: (result:any) => {
      alert(result)
      // refresh wishlist
      this.getWishlistdata()
      
    },
    error: (result: any) => {
      alert(result.error)
    }
  });
}


addToCart(product:any) {
    // alert("add to cart work")

    // add quantity=1 in product object

    Object.assign(product,{quantity:1})
    console.log(product);

    this.ps.addToCart(product).subscribe({
      next:(result:any)=>{
        this.ps.updateCartCount()
        this.removeWishlistdata(product._id)
        alert(result)
      },
      error:(result:any)=>{
        alert(result.error)
      }
    })
    
  }
 

}


