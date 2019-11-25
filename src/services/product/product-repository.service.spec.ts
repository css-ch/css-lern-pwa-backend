import {ProductController} from '../../controllers/product/product.controller';
import {ProductRepository} from './product-repository.service';

describe('AppController', () => {
    let productController: ProductController;
    let productService: ProductRepository;

    beforeEach(async () => {
        productService = new ProductRepository();
        productController = new ProductController(productService);
    });

    describe('testGetProductDataByNameWhenProductbyNameIsFound', () => {
        it('should return filled productData', async () => {
            let expected;
            expected = {
                productEntities: [
                    {
                        id: 1,
                        name: 'Adidas Busenitz Pro',
                        price: 87.95,
                        color: 'Schwarz',
                        image: 'https://assets.adidas.com/images/w_840,h_840,f_auto,q_auto:sensitive,fl_lossy/87e278ebf8cf4706a3bda7fa00e450a5_9366/Busenitz_Pro_Schuh_Schwarz_G48060_01_standard.jpg',
                        brand: 'Adidas',
                        type: 'Schuhe',
                    },
                ],
            };
            jest.spyOn(productService, 'getProductDataByName').mockImplementation(() => expected);

            expect(await productService.getProductDataByName('adid')).toBe(expected);
        });
    });

    describe('testGetProductDataByNameWhenProductbyNameIsNotFound', () => {
        it('should return empty productData', async () => {
            let expected;
            expected = {
                productEntities: [],
            };
            jest.spyOn(productService, 'getProductDataByName').mockImplementation(() => expected);

            expect(await productService.getProductDataByName('vvv')).toBe(expected);
        });
    });

    describe('testProductDataByTypeBrandColorWhenProductFound', () => {
        it('should return filled productData', async () => {
            let expected;
            expected = {
                productEntities: [
                    {
                        id: 1,
                        name: 'Adidas Busenitz Pro',
                        price: 87.95,
                        color: 'Schwarz',
                        image: 'https://assets.adidas.com/images/w_840,h_840,f_auto,q_auto:sensitive,fl_lossy/87e278ebf8cf4706a3bda7fa00e450a5_9366/Busenitz_Pro_Schuh_Schwarz_G48060_01_standard.jpg',
                        brand: 'Adidas',
                        type: 'Schuhe',
                    },
                ],
            };
            jest.spyOn(productService, 'getProductDataByTypeBrandColor').mockImplementation(() => expected);

            expect(await productService.getProductDataByTypeBrandColor('Schuhe', 'Adidas', 'Schwarz')).toBe(expected);
        });
    });

    describe('testProductDataByTypeBrandColorWhenProductNotFound', () => {
        it('should return empty productData', async () => {
            let expected;
            expected = {
                productEntities: [],
            };
            jest.spyOn(productService, 'getProductDataByTypeBrandColor').mockImplementation(() => expected);

            expect(await productService.getProductDataByTypeBrandColor('Hosen', 'Nike', 'Weiss')).toBe(expected);
        });
    });
});
