// Create a new file: product.interface.ts
export interface Product {
  id: number;
  brand: string | null;
  name: string;
  price: string;
  price_sign: string | null;
  currency: string | null;
  image_link: string;
  product_link: string;
  website_link: string;
  description: string;
  rating: number | null;
  category: string | null;
  product_type: string;
  tag_list: string[];
  created_at: string;
  updated_at: string;
  product_api_url: string;
  api_featured_image: string;
  product_colors: ProductColor[];
}

export interface ProductColor {
  hex_value: string;
  colour_name: string;
}
