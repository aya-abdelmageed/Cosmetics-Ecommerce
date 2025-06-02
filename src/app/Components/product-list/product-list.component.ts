// product-list.component.ts
import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../../Services/product.service';
import { Product } from '../../../models/product.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CartService } from '../../../Services/cart.service';
import { subscribeOn } from 'rxjs';
import { WishlistService } from '../../../Services/wishlist.service';

@Component({
  selector: 'app-product-list',
  imports:[CommonModule,FormsModule],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  // Product data properties
  products: Product[] = [];
  filteredProducts: Product[] = [];
  paginatedProducts: Product[] = [];
  selectedCategoryTypes: string[] = [];
  isLoading = true;
  error: string | null = null;
  
  // Pagination
  currentPage = 1;
  itemsPerPage = 20;
  totalItems = 0;

  // Filter properties
  pendingFilters = {
    priceRange: { min: 0, max: 30 },
    selectedBrands: [] as string[],
    selectedTags: [] as string[]
  };
 

  activeFilters = {
    priceRange: { min: 0, max: 30 },
    selectedBrands: [] as string[],
    selectedTags: [] as string[]
  };

  // Filter options
  brands = [
      "almay",
  "alva",
  "anna sui",
  "annabelle",
  "benefit",
  "boosh",
  "burt's bees",
  "butter london",
  "c'est moi",
  "cargo cosmetics",
  "china glaze",
  "clinique",
  "coastal classic creation",
  "colourpop",
  "covergirl",
  "dalish",
  "deciem",
  "dior",
  "dr. hauschka",
  "e.l.f.",
  "essie",
  "fenty",
  "glossier",
  "green people",
  "iman",
  "l'oreal",
  "lotus cosmetics usa",
  "maia's mineral galaxy",
  "marcelle",
  "marienatie",
  "maybelline",
  "milani",
  "mineral fusion",
  "misa",
  "mistura",
  "moov",
  "nudus",
  "nyx",
  "orly",
  "pacifica",
  "penny lane organics",
  "physicians formula",
  "piggy paint",
  "pure anada",
  "rejuva minerals",
  "revlon"
  ]; 

  tags = [
      "Canadian",
  "CertClean",
  "Chemical Free",
  "Dairy Free",
  "EWG Verified",
  "EcoCert",
  "Fair Trade",
  "Gluten Free",
  "Hypoallergenic",
  "Natural",
  "No Talc",
  "Non-GMO",
  "Organic",
  "Peanut Free Product",
  "Sugar Free",
  "USDA Organic",
  "Vegan",
  "alcohol free",
  "cruelty free",
  "oil free",
  "purpicks",
  "silicone free",
  "water free"
  ];

  wishlist :number[] = [];
  constructor(private productsService: ProductsService,private router: Router, private cartServices : CartService, private wishService : WishlistService) {
  
    this.wishService.wishlist$.subscribe(items => {
      this.wishlist = items || [];
    });
    
  }

  

  addtobag(id:number):void{
    this.cartServices.addToCart(id).subscribe(cart => {
      if(cart)
      {
        alert("💖 Great pick! Your beauty essential is on its way to your bag.");
      //  console.log("Added to cart Successfully")
      }
      else
        console.log("can't add to cart")
    }
    );
  }

  isInWishlist(id:number){
    return this.wishlist.includes(id);
  }
  addtowish(id:number):void{
    this.wishService.addToWishlist(id).subscribe(wish =>{
      if(wish){
        console.log("added successfully to your wishlist")
      }
      else
        console.log("error at adding to wishlist")
    }
      
    )
  }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.isLoading = true;
    this.error = null;
    
    this.productsService.getProducts().subscribe({
      next: (data: Product[]) => {
        this.products = data;
        this.totalItems = data.length;
        this.applyFilters(); // Apply default filters
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching products:', err);
        this.error = 'Failed to load products. Please try again later.';
        this.isLoading = false;
      }
    });
  }

  toggleBrand(brand: string): void {
    const index = this.pendingFilters.selectedBrands.indexOf(brand);
    if (index === -1) {
      this.pendingFilters.selectedBrands.push(brand);
    } else {
      this.pendingFilters.selectedBrands.splice(index, 1);
    }
  }

  toggleTag(tag: string): void {
    const index = this.pendingFilters.selectedTags.indexOf(tag);
    if (index === -1) {
      this.pendingFilters.selectedTags.push(tag);
    } else {
      this.pendingFilters.selectedTags.splice(index, 1);
    }
  }

  applyFilters(): void {
    // Update active filters
    this.activeFilters = {
      priceRange: { ...this.pendingFilters.priceRange },
      selectedBrands: [...this.pendingFilters.selectedBrands],
      selectedTags: [...this.pendingFilters.selectedTags]
    };

    // Apply filtering
    this.filteredProducts = this.products.filter(product => {
      // Price filter
      const price = parseFloat(product.price) || 0;
      const matchesPrice = price >= this.activeFilters.priceRange.min && 
                         price <= this.activeFilters.priceRange.max;

      // Brand filter
      const matchesBrand = this.activeFilters.selectedBrands.length === 0 || 
        (product.brand && this.activeFilters.selectedBrands.includes(product.brand.toLowerCase()));

      // Tag filter
      const matchesTag = this.activeFilters.selectedTags.length === 0 ||
        (product.tag_list && this.activeFilters.selectedTags.some(tag => 
          product.tag_list.map(t => t.toLowerCase()).includes(tag.toLowerCase())));
        
      const matchesCategory = this.selectedCategoryTypes.length === 0 ||
      (product.product_type && this.selectedCategoryTypes.includes(product.product_type.toLowerCase()));

      return matchesPrice && matchesBrand && matchesTag && matchesCategory;
    });

    this.totalItems = this.filteredProducts.length;
    this.currentPage = 1;
    this.updatePaginatedProducts();
  }
   filterByCategory(types: string[]): void {
    this.selectedCategoryTypes = types;
    this.applyFilters();
    console.log("filter applied")
  }
  resetFilters(): void {
    this.pendingFilters = {
      priceRange: { min: 0, max: 1000 },
      selectedBrands: [],
      selectedTags: []
    };
    this.applyFilters();
  }

  // Pagination methods
  updatePaginatedProducts(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    this.paginatedProducts = this.filteredProducts.slice(startIndex, startIndex + this.itemsPerPage);
  }

  changePage(page: number): void {
    if (page < 1 || page > this.totalPages()) return;
    this.currentPage = page;
    this.updatePaginatedProducts();
  }

  totalPages(): number {
    return Math.ceil(this.totalItems / this.itemsPerPage);
  }

  getPageNumbers(): number[] {
    const totalPages = this.totalPages();
    const visiblePages = 5;
    const halfVisible = Math.floor(visiblePages / 2);
    let startPage = Math.max(1, this.currentPage - halfVisible);
    let endPage = Math.min(totalPages, startPage + visiblePages - 1);

    if (endPage - startPage + 1 < visiblePages) {
      if (this.currentPage < totalPages / 2) {
        endPage = Math.min(totalPages, startPage + visiblePages - 1);
      } else {
        startPage = Math.max(1, endPage - visiblePages + 1);
      }
    }

    return Array.from({length: endPage - startPage + 1}, (_, i) => startPage + i);
  }
  goToProductDetails(product: any) {
  this.router.navigate(['/product'], { state: { product } });
}

}