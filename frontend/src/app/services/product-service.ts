import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
    shades = 
    [
      {
        id: 1,
        name: 'Vertex',
        url: 'https://images3dproducts.s3.us-east-1.amazonaws.com/shades/vertexShade.stl',
        price: 49.90,
        image: 'https://images3dproducts.s3.us-east-1.amazonaws.com/shades/simple.png'
      },
      {
        id: 2,
        name: 'Orbital',
        url: 'https://images3dproducts.s3.us-east-1.amazonaws.com/shades/shadeMax.stl',
        price: 69.90,
        image: 'https://images3dproducts.s3.us-east-1.amazonaws.com/shades/orbital.png'
      }
    ]
}
