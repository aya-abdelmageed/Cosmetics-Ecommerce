import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductDetailsService {

  constructor() { }
    private defaultProductDetails = {
    details: "This product is designed to provide exceptional performance and quality. Perfect for everyday use, it offers a long-lasting effect that enhances your natural features. Whether you're looking to brighten, hydrate, or perfect your look, this product will meet your needs with its premium ingredients and easy application.",
    howToUse: "Apply a small amount to your desired area. For best results, use consistently as part of your daily routine. Make sure to follow the recommended steps for optimal performance, whether it’s for skincare, makeup, or haircare. For makeup products, use brushes or applicators for even and precise coverage. For skincare, massage gently into the skin in circular motions.",
    shippingAndReturn: "We offer free shipping on all orders over $50. Our hassle-free return policy allows you to return products within 30 days of purchase. Items must be in their original condition and packaging to be eligible for a return. If you're not completely satisfied with your purchase, please reach out to our customer service team.",
  };

  getProductDetails() {
    return this.defaultProductDetails;
  }
}
