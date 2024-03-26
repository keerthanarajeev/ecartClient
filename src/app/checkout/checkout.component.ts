import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import {
  IPayPalConfig,
  ICreateOrderRequest
} from 'ngx-paypal';
import { ProductService } from '../productService/product.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  public payPalConfig?: IPayPalConfig;
  products: any = []

  buyStatus: any = false
  totalPrice: any = 0

  constructor(private fb: FormBuilder, private rout: Router,private ps: ProductService) { }


  ngOnInit(): void {
    if (localStorage.getItem("total")) {
      this.totalPrice = localStorage.getItem("total")
    }
  }


  private initConfig(): void {
    this.payPalConfig = {
      currency: 'USD',
      clientId: 'sb',
      createOrderOnClient: (data) => <ICreateOrderRequest>{
        intent: 'CAPTURE',
        purchase_units: [{
          amount: {
            currency_code: 'USD',
            value: this.totalPrice,
            breakdown: {
              item_total: {
                currency_code: 'USD',
                value: this.totalPrice
              }
            }
          },

        }]
      },
      advanced: {
        commit: 'true'
      },
      style: {
        label: 'paypal',
        layout: 'vertical'
      },
      onApprove: (data, actions) => {
        console.log('onApprove - transaction was approved, but not authorized', data, actions);
        actions.order.get().then((details: any) => {
          console.log('onApprove - you can get full order details inside onApprove: ', details);
        });

      },
      onClientAuthorization: (data) => {
        console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);

        this.ps.emptyCart().subscribe({
          next: () => {
            console.log('Cart emptied successfully.');
            // Update cart count
            this.ps.updateCartCount();
            // Redirect to home
            this.rout.navigateByUrl('');
          },
          error: error => {
            console.error('Error emptying cart:', error);
            // Handle error accordingly
          }
        });

      },
      onCancel: (data, actions) => {
        console.log('OnCancel', data, actions);
        alert("Transaction has been cancelled")

      },
      onError: err => {
        console.log('OnError', err);
        alert("Transaction Failed.....Try after some time....")
      },
      onClick: (data, actions) => {
        console.log('onClick', data, actions);
      }
    };
  }


  checkOut = this.fb.group({
    email: [''],
    address: [''],
    place: [''],
    pin: [''],
  })

  cancel() {
    this.rout.navigateByUrl('/cart')
  }

  proceedToBuy() {
    this.buyStatus = true
  }

  cancelPayment() {
    this.buyStatus = false
  }

  payment() {
    this.initConfig()
  }
}
