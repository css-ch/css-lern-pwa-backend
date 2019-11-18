import {Product} from './product.type';

export interface Favorite {
    id: number;
    userId: number;
    products: Product;
}
