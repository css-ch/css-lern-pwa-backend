import {Product} from './product.type';
import {PersonalData} from './personal-data.type';

export interface Favorite {
    id: number;
    userId: PersonalData;
    products: Product;
}
