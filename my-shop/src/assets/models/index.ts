export interface IProduct{
    CategoryId: string;
    Image: string;
    BigImage: string;
    Title: string;
    Price: string;
    Description: string;
  }
  
  export interface IProductCategory{
    id: string;
    Title: string;
  }

  export enum MenuItems {Home = 'Home', Cart = 'Cart', About = 'About', Products = 'Products', Contact = 'Contact'}