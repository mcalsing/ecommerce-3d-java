import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  baseURL = 'https://www.viewstl.com/?embed&url='
  
  shades = 
  [
    {
      id: 1,
      name: 'Vertex',
      url: `${this.baseURL}https://images3dproducts.s3.us-east-1.amazonaws.com/shades/vertexShade.stl`,
      price: 49.90,
      image: 'https://images3dproducts.s3.us-east-1.amazonaws.com/shades/simple.png'
    },
    {
      id: 2,
      name: 'Orbital',
      url: `${this.baseURL}https://images3dproducts.s3.us-east-1.amazonaws.com/shades/orbitalShade.stl`,
      price: 69.90,
      image: 'https://images3dproducts.s3.us-east-1.amazonaws.com/shades/orbital.png'
    }
  ]
}
