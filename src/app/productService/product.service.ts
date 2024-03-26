import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Token } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {


  BaseUrl = "http://localhost:8000"

  serachString = new BehaviorSubject("")
  cartCount = new BehaviorSubject(0)

  constructor(private http: HttpClient) {
    this.updateCartCount()
   }

  updateCartCount(){
    this.getCart().subscribe({
      next:(result:any)=>{
        this.cartCount.next(result.length)
      }
    })
  }

  getProducts(searchData: any) {
    return this.http.get(`${this.BaseUrl}/get-all-products?search=${searchData}`)
  }

  getProduct(id: any) {
    return this.http.get(`${this.BaseUrl}/get-product/${id}`)
  }

  signup(bodyData:any){
    return this.http.post(`${this.BaseUrl}/add-new-user`,bodyData)
  }

  signin(bodyData:any){
    return this.http.post(`${this.BaseUrl}/login`,bodyData)
  }


// token

accessTokenHeader(){
  var headers=new HttpHeaders()
  if(localStorage.getItem("token")){
    const token=localStorage.getItem("token")  
  var headers=headers.append("access_token",`Bearer ${token}`)
  }
  return {headers}
}


  addtoWishlist(bodyData:any){
    return this.http.post(`${this.BaseUrl}/user/add-to-wishlist`,bodyData,this.accessTokenHeader())
  }

  getWishlist(userId:any){
    return this.http.get(`${this.BaseUrl}/user/get-wishlist/${userId}`,this.accessTokenHeader())
  }

  deleteWishlistitem(productId: any) {
    return this.http.delete(`${this.BaseUrl}/user/delete-wishlist/${productId}`,this.accessTokenHeader());
  }

  addToCart(bodyData:any){
    return this.http.post(`${this.BaseUrl}/user/add-to-cart`,bodyData,this.accessTokenHeader())
  }

  getCart(){
    return this.http.get(`${this.BaseUrl}/user/get-cart`,this.accessTokenHeader())
  }

  removeCart(itemId: any) {
    return this.http.delete(`${this.BaseUrl}/user/remove-cart/${itemId}`,this.accessTokenHeader());
  }

  incrementCart(id:any){
    return this.http.get(`${this.BaseUrl}/user/increment-cart/${id}`,this.accessTokenHeader())
  }

  decrementCart(id:any){
    return this.http.get(`${this.BaseUrl}/user/decrement-cart/${id}`,this.accessTokenHeader())
  }

  emptyCart(){
    return this.http.delete(`${this.BaseUrl}/user/empty-cart`,this.accessTokenHeader())
  }
}
