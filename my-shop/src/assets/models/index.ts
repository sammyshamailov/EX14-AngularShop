export interface IProduct {
  CategoryId: string;
  Image: string;
  BigImage: string;
  Title: string;
  Price: string;
  Description: string;
}

export interface IProductCategory {
  id: string;
  Title: string;
}

export enum MenuItems {
  Home = "Home", Cart = "Cart",
  Products = "Products", LogIn = "Log In",
  LogOut = "Log Out", Admin = "Add/Edit",
  About = "About", Contact = "Contact"
}