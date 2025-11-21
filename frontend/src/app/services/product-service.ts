import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  baseURL = 'https://www.viewstl.com/?embed&url='
  
  bases = 
  [
    {
      id: 1,
      name: 'Vertex',
      url: `${this.baseURL}https://images3dproducts.s3.us-east-1.amazonaws.com/bases/vertexBase.stl`,
      price: 49.90,
      image: 'https://images3dproducts.s3.us-east-1.amazonaws.com/bases/vertexBase.png'
    },
    {
      id: 2,
      name: 'Orbital',
      url: `${this.baseURL}https://images3dproducts.s3.us-east-1.amazonaws.com/bases/kinectBase.stl`,
      price: 69.90,
      image: 'https://images3dproducts.s3.us-east-1.amazonaws.com/bases/kinectBase.png'
    },
    {
      id: 3,
      name: 'Siege',
      url: `${this.baseURL}https://images3dproducts.s3.us-east-1.amazonaws.com/bases/siegeBase.stl`,
      price: 69.90,
      image: 'https://images3dproducts.s3.us-east-1.amazonaws.com/bases/siegeBase.png'
    },
    {
      id: 4,
      name: 'Spark',
      url: `${this.baseURL}https://images3dproducts.s3.us-east-1.amazonaws.com/bases/sparkBase.stl`,
      price: 69.90,
      image: 'https://images3dproducts.s3.us-east-1.amazonaws.com/bases/sparkBase.png'
    },
    
  ]

    shades = 
  [
    {
      id: 1,
      name: 'Vertex',
      url: `${this.baseURL}https://images3dproducts.s3.us-east-1.amazonaws.com/shades/vertexShade.stl`,
      price: 49.90,
      image: 'https://images3dproducts.s3.us-east-1.amazonaws.com/shades/vertexShade.png'
    },
    {
      id: 2,
      name: 'Tornado',
      url: `${this.baseURL}https://images3dproducts.s3.us-east-1.amazonaws.com/shades/tornadoShade.stl`,
      price: 69.90,
      image: 'https://images3dproducts.s3.us-east-1.amazonaws.com/shades/tornadoShade.png'
    },
    {
      id: 3,
      name: 'Tornado v2',
      url: `${this.baseURL}https://images3dproducts.s3.us-east-1.amazonaws.com/shades/tornadoShadev2.stl`,
      price: 69.90,
      image: 'https://images3dproducts.s3.us-east-1.amazonaws.com/shades/tornadoShadev2.png'
    },
    {
      id: 4,
      name: 'Tornado v3',
      url: `${this.baseURL}https://images3dproducts.s3.us-east-1.amazonaws.com/shades/tornadoShadev3.stl`,
      price: 69.90,
      image: 'https://images3dproducts.s3.us-east-1.amazonaws.com/shades/tornadoShadev3.png'
    },
    {
      id: 5,
      name: 'Orbital',
      url: `${this.baseURL}https://images3dproducts.s3.us-east-1.amazonaws.com/shades/orbitalShade.stl`,
      price: 69.90,
      image: 'https://images3dproducts.s3.us-east-1.amazonaws.com/shades/orbitalShade.png'
    },
  ]
}
