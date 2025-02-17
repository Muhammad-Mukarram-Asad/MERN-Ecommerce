import { Item } from "@radix-ui/react-select"
import { LayoutDashboardIcon, ListOrderedIcon, ShoppingBasket } from "lucide-react"

export const registerFormControls = [
    {
      type: "text",
      name: "userName",
      placeholder: "Enter your user name",
      label: "User Name",
      componentType: "input",
    },

    {
        type: "email",
        name: "email",
        placeholder: "Enter your email address",
        label: "Email",
        componentType: "input",
        required: true
      },

      {
        type: "password",
        name: "password",
        placeholder: "Enter your password",
        label: "Password",
        componentType: "input",
        required: true

      },

   ]

   export const loginFormControls = [
    {
        type: "email",
        name: "email",
        placeholder: "Enter your email address",
        label: "Email",
        componentType: "input",
        required: true

      },

      {
        type: "password",
        name: "password",
        placeholder: "Enter your password",
        label: "Password",
        componentType: "input",
        required: true

      },

   ]

   export const adminSidebarMenuItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      path: '/admin/dashboard',
      icon: <LayoutDashboardIcon />
    },
    {
      id: 'products',
      label: 'Products',
      path: '/admin/products',
      icon: <ShoppingBasket />
    },
    {
      id: 'orders',
      label: 'Orders',
      path: '/admin/orders',
      icon: <ListOrderedIcon />
    }
   ]

   export const addProductFormElements = [
    {
      label: "Title",
      name: "title",
      componentType: "input",
      type: "text",
      placeholder: "Enter product title",
    },
    {
      label: "Description",
      name: "description",
      componentType: "textarea",
      placeholder: "Enter product description",
    },
    {
      label: "Category",
      name: "category",
      componentType: "select",
      options: [
        { id: "men", label: "Men" },
        { id: "women", label: "Women" },
        { id: "kids", label: "Kids" },
        { id: "accessories", label: "Accessories" },
        { id: "footwear", label: "Footwear" },
      ],
    },
    {
      label: "Brand",
      name: "brand",
      componentType: "select",
      options: [
        { id: "nike", label: "Nike" },
        { id: "adidas", label: "Adidas" },
        { id: "puma", label: "Puma" },
        { id: "levi", label: "Levi's" },
        { id: "zara", label: "Zara" },
        { id: "h&m", label: "H&M" },
      ],
    },
    {
      label: "Price",
      name: "price",
      componentType: "input",
      type: "number",
      placeholder: "Enter product price",
    },
    {
      label: "Sale Price",
      name: "salePrice",
      componentType: "input",
      type: "number",
      placeholder: "Enter sale price (optional)",
    },
    {
      label: "Total Stock",
      name: "totalStock",
      componentType: "input",
      type: "number",
      placeholder: "Enter total stock",
    },
  ];
  
  export const shoppingViewHeaderMenuItems = [
    {
      id: "home",
      label: "Home",
      path: "/shop/home",
    },
    {
      id: "products",
      label: "Products",
      path: "/shop/listing",
    },
    {
      id: "men",
      label: "Men",
      path: "/shop/listing",
    },
    {
      id: "women",
      label: "Women",
      path: "/shop/listing",
    },
    {
      id: "kids",
      label: "Kids",
      path: "/shop/listing",
    },
    {
      id: "footwear",
      label: "Footwear",
      path: "/shop/listing",
    },
    {
      id: "accessories",
      label: "Accessories",
      path: "/shop/listing",
    },
    {
      id: "search",
      label: "Search",
      path: "/shop/search",
    },
  ];
  
  export const categoryOptionsMap = {
    men: "Men",
    women: "Women",
    kids: "Kids",
    accessories: "Accessories",
    footwear: "Footwear",
  };
  
  export const brandOptionsMap = {
    nike: "Nike",
    adidas: "Adidas",
    puma: "Puma",
    levi: "Levi",
    zara: "Zara",
    "h&m": "H&M",
  };
  
  export const filterOptions = {
    category: [
      { id: "men", label: "Men" },
      { id: "women", label: "Women" },
      { id: "kids", label: "Kids" },
      { id: "accessories", label: "Accessories" },
      { id: "footwear", label: "Footwear" },
    ],
    brand: [
      { id: "nike", label: "Nike" },
      { id: "adidas", label: "Adidas" },
      { id: "puma", label: "Puma" },
      { id: "levi", label: "Levi's" },
      { id: "zara", label: "Zara" },
      { id: "h&m", label: "H&M" },
    ],
  };
  
  export const sortOptions = [
    { id: "price-Low-to-High", label: "Price: Low to High" },
    { id: "price-High-to-Low", label: "Price: High to Low" },
    { id: "title-A-to-Z", label: "Title: A to Z" },
    { id: "title-Z-to-A", label: "Title: Z to A" },
  ];
  
  export const addressFormControls = [
    {
      label: "Address",
      name: "address",
      componentType: "input",
      type: "text",
      placeholder: "Enter your address",
    },
    {
      label: "City",
      name: "city",
      componentType: "input",
      type: "text",
      placeholder: "Enter your city",
    },
    {
      label: "Pincode",
      name: "pincode",
      componentType: "input",
      type: "text",
      placeholder: "Enter your pincode",
    },
    {
      label: "Phone",
      name: "phone",
      componentType: "input",
      type: "text",
      placeholder: "Enter your phone number",
    },
    {
      label: "Notes",
      name: "notes",
      componentType: "textarea",
      placeholder: "Enter any additional notes",
    },
  ];