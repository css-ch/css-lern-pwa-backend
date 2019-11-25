import {FavoriteController} from '../../controllers/favorite/favorite.controller';
import {FavoriteRepository} from './favorite-repository.service';

describe('FavoriteController', () => {
    let favoriteController: FavoriteController;
    let favoriteService: FavoriteRepository;

    beforeEach(async () => {
        favoriteService = new FavoriteRepository();
        favoriteController = new FavoriteController(favoriteService);
    });

    describe('testGetFavoriteFromUserWhenUserFoundAndHasFavorites', () => {
        it('should return an array of favorites', async () => {
            let expected;
            expected = [
                {
                    id: 1,
                    user: {
                        id: 1,
                        fullname: 'Bernd Brot',
                        address: 'Some address 4',
                        postcode: '4262',
                        city: 'Some city',
                        uid: '2r0mbJKxKlasCo7TJaXG54ojKSR2',
                    },
                    product: {
                        id: 1,
                        name: 'Adidas Busenitz Pro',
                        price: 87.95,
                        color: 'Schwarz',
                        image: 'https://assets.adidas.com/images/w_840,h_840,f_auto,q_auto:sensitive,fl_lossy/87e278ebf8cf4706a3bda7fa00e450a5_9366/Busenitz_Pro_Schuh_Schwarz_G48060_01_standard.jpg',
                        brand: 'Adidas',
                        type: 'Schuhe',
                    },
                },
            ];
            jest.spyOn(favoriteService, 'getFavoritesFromUser').mockImplementation(() => expected);

            expect(await favoriteController.getFavoritesForUser('testUid')).toBe(expected);
        });
    });

    describe('testGetFavoriteFromUserWhenUserFoundAndHasNoFavorites', () => {
        it('should return empty array', async () => {
            let expected;
            expected = [];
            jest.spyOn(favoriteService, 'getFavoritesFromUser').mockImplementation(() => expected);

            expect(await favoriteController.getFavoritesForUser('testUid')).toBe(expected);
        });
    });

    describe('testGetFavoriteFromUserWhenUserNotFound', () => {
        it('should return empty array', async () => {
            let expected;
            expected = [];
            jest.spyOn(favoriteService, 'getFavoritesFromUser').mockImplementation(() => expected);

            expect(await favoriteController.getFavoritesForUser('testUidThatDoesntExists')).toBe(expected);
        });
    });
});
