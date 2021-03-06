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


  searchByName()
  {
    if(this.searchTerm=="" || this.searchTerm==null)
    {
      Swal.fire({
        title: 'Warning!',
        text: "search bar field is empty!",
        icon: 'info',
        confirmButtonText: 'Ok'
      })
      return
    }

    this.productService.searchProductByName(this.searchTerm).subscribe(response=>{
      if(response.products.length!=null&&response.products.length!=0)
        this.productData = response.products;
      else
      {
        Swal.fire({
          title: 'Warning!',
          text: "No search result found!",
          icon: 'info',
          confirmButtonText: 'Ok'
        })
        return
      }
    });
  }

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
    debugger
    if(this.productQuantity==null || this.productQuantity==0 || this.productQuantity <0)
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

    this.productService.checkProductQuantityInStock(this.selectedProduct.productId).subscribe(response=>{
     stockQuantity= response.quantity;
     console.log("stock quantity"+stockQuantity)
     if(Number(stockQuantity) < Number(this.productQuantity))
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
        text: "Product Added to the Cart!",
        icon: 'success',
        confirmButtonText: 'Ok'
      }).then(()=>{
        var orderedQuantity=this.productQuantity;

        var cartProducts=this.cartService.getProductsFromShoppingCart();

        let product=cartProducts.find(p=>p.product.productId === this.selectedProduct.productId);
        if(product===undefined || product===null)
        {
          cartProducts.push({product:this.selectedProduct,quantity:orderedQuantity});

        }
        else{

            cartProducts.map(p=>{
              if(p.product.productId === this.selectedProduct.productId)
              {
                p.quantity=p.quantity+orderedQuantity;
              }
            })
        }
        this.cartService.addPrductToShoppingCart(cartProducts);

      
        console.log(orderedQuantity)
        this.productQuantity=0;
        this.productData.forEach(p=>{
          if(this.selectedProduct.productId===p.productId)
          {
            p.productQuantity=p.productQuantity-orderedQuantity;
          }
        })
      })
    }
    });

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

