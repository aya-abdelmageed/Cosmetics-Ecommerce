import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
declare const paypal: any;

@Component({
  selector: 'app-checkout',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  checkoutForm: FormGroup = new FormGroup({});
  total = 2370;
  showPayPal = false;



  paymentMethods = [
    {
      label: 'CASH ON DELIVERY',
      value: 'cod'
    },
    {
      label: 'PAYPAL',
      value: 'paypal'
    }
  ];

  egyptCities = [
    "Cairo", "Giza", "Alexandria", "Shubra El-Kheima", "Port Said", "Suez",
    "Luxor", "Asyut", "Ismailia", "Faiyum", "Zagazig", "Aswan", "Damietta",
    "Damanhur", "Minya", "Beni Suef", "Qena", "Sohag", "Hurghada", "6th of October",
    "Sharm El-Sheikh", "Arish", "Banha", "Kafr El-Sheikh", "Mallawi", "Desouk",
    "Qalyub", "Abnub", "Manfalut", "Tanta", "Mansoura", "Mit Ghamr", "Kafr Saad"
  ];

  constructor(private fb: FormBuilder, private router: Router) {}

 ngOnInit(): void {
  this.checkoutForm = this.fb.group({
    firstName: [
      '',
      [Validators.required, Validators.minLength(2), Validators.pattern(/^[a-zA-Z\s]+$/)]
    ],
    lastName: [
      '',
      [Validators.required, Validators.minLength(2), Validators.pattern(/^[a-zA-Z\s]+$/)]
    ],
    street: [
      '',
      [Validators.required, Validators.minLength(5)]
    ],
    city: ['', Validators.required],
    phone: [
      '',
      [
        Validators.required,
        Validators.pattern(/^01[0125][0-9]{8}$/) // Egyptian mobile format
      ]
    ],
    email: [
      '',
      [
        Validators.required,
        Validators.email,
        Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
      ]
    ],
    paymentMethod: ['', Validators.required]
  });
}


    ngAfterViewInit() {
    if (this.showPayPal) {
      this.renderPayPalButton();
    }
  }


  placeOrder() {
    if (this.checkoutForm.invalid) {
      alert("Please fill all required fields");
      return;
    }

    const method = this.checkoutForm.value.paymentMethod;

    if (method === 'cod') {
      this.showPayPal = false;
      alert("Your order has been placed successfully. Please prepare cash on delivery.");
      this.router.navigate(['/']);
    } else if (method === 'paypal') {
      this.showPayPal = true;
      setTimeout(() => this.renderPayPalButton(), 100); // Delay to ensure DOM is ready
    }
  }

    renderPayPalButton() {
    if (document.getElementById('paypal-button-container')?.children.length) return;

    paypal.Buttons({
      createOrder: (data: any, actions: any) => {
        return actions.order.create({
          purchase_units: [{
            amount: {
              value: this.total.toFixed(2)
            }
          }]
        });
      },
onApprove: (data: any, actions: any) => {
  return actions.order.capture().then((details: any) => {
    setTimeout(() => {
      alert('Transaction completed by ' + details.payer.name.given_name + '!');
      this.router.navigate(['/']);
    }, 1000);
  });
}

    }).render('#paypal-button-container');
  }

}
