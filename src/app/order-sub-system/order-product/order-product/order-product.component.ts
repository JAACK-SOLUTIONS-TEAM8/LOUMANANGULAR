import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart/cart.service';
import { ProductService } from 'src/app/services/product/product.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-order-product',
  templateUrl: './order-product.component.html',
  styleUrls: ['./order-product.component.css']
})
export class OrderProductComponent implements OnInit {

  productData:any[]=[]
  selectedProduct:any;
  searchTerm:string;
  orignalProductData:any[]=[]
  
  productQuantity:number;
  sizeData:any[]=[]
  typeData:any[]=[]
  constructor(
    private productService:ProductService,
    private router:Router,
    private cartService:CartService,
  ) { }

  ngOnInit(): void {
    this.getAllProducts();
    this.getProductAllSizes()
    this.getProductAllTypes();
  }

  getAllProducts()
  {
    this.productService.getAllProducts().subscribe(response=>{
        this.productData=response.products;
        this.orignalProductData=this.productData;
        console.log(this.productData)
    });
  }

  addToCart(product:any)
  {
   
    this.selectedProduct=product;
  }


  // searchByName()
  // {
  //   if(this.searchTerm=="" || this.searchTerm==null)
  //   {
  //     Swal.fire({
  //       title: 'Warning!',
  //       text: "search bar field is empty!",
  //       icon: 'info',
  //       confirmButtonText: 'Ok'
  //     })
  //     return
  //   }

  //   this.productData.forEach(product=>{
  //     let index=this.productData.findIndex(p=>!(p.productName.startsWith(this.searchTerm)));
      
  //   })

  //   this.productService.searchProductByName(this.searchTerm).subscribe(response=>{
  //     if(response.enquiryTypes.length!=null&&response.enquiryTypes.length!=0)
  //       this.productData = response.enquiryTypes;
  //     else
  //     {
  //       Swal.fire({
  //         title: 'Warning!',
  //         text: "No search result found!",
  //         icon: 'info',
  //         confirmButtonText: 'Ok'
  //       })
  //       return
  //     }
  //   });
  // }

  filterByType(type:any)
  {
    if(type=='all')
    {
      this.productData=this.orignalProductData;
      return;
    }
    this.productData=this.orignalProductData.filter(product=>product.productTypeId==type.productTypeId);
  }

  filterBySize(size:any)
  {
    if(size=='all')
    {
      this.productData=this.orignalProductData;
      return;
    }
    this.productData=this.orignalProductData.filter(product=>product.productSizeId==size.productSizeId);
  }

  confirmAddToCart()
  { 
    
    if(this.productQuantity==null || this.productQuantity==0)
    {
      Swal.fire({
        title: 'Warning!',
        text: "quantity must be greater than 0!",
        icon: 'info',
        confirmButtonText: 'Ok'
      })
      return;
    }
var stockQuantity=0;
var orderedQuantity=this.productQuantity;
    this.productService.checkProductQuantityInStock(this.selectedProduct.productId).subscribe(response=>{
     stockQuantity= response.quantity;
     console.log("stock quantity"+stockQuantity)
     if(Number(stockQuantity) < Number(orderedQuantity))
     {
      Swal.fire({
        title: 'Warning!',
        text: "Not Enough quantity in the stock!",
        icon: 'info',
        confirmButtonText: 'Ok'
      })
      return;
    }
    else
    {
      Swal.fire({
        title: 'Success!',
        text: "Product Added to the Stock!",
        icon: 'success',
        confirmButtonText: 'Ok'
      })
    }
    })

    var cartProducts=this.cartService.getProductsFromShoppingCart();
    cartProducts.push({product:this.selectedProduct,quantity:this.productQuantity});
    this.cartService.addPrductToShoppingCart(cartProducts);

    console.log(cartProducts)
    this.productQuantity=0;

  }


  getProductAllSizes()
  {
    this.productService.getAllProductSizes().subscribe(response=>{
      this.sizeData=response.productSizes
    })  
  }

  getProductAllTypes()
  {
    this.productService.getAllProductTypes().subscribe(response=>{
      this.typeData=response.productTypes
    })  
  }

}

