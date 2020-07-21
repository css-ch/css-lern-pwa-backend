import {PersonalDataController} from '../../controllers/personal-data/personal-data.controller';
import {PersonalDataRepository} from './personal-data-repository.service';

describe('PersonalDataController', () => {
    let personalDataController: PersonalDataController;
    let personalDataService: PersonalDataRepository;

    beforeEach(async () => {
        personalDataService = new PersonalDataRepository();
        personalDataController = new PersonalDataController(personalDataService);
    });

    describe('testGetPersonalDataByUIDWhenUIDValid', () => {
        it('should return personalData', async () => {
            const expected = {
                id: 1,
                fullname: 'Donald Duck',
                address: 'Some Address',
                postcode: '4246',
                city: 'Some City',
                uid: 'ValidUid',
                favorites: [],
                stripeId: 'someId',
            };
            jest.spyOn(personalDataService, 'getPersonalDataByUID').mockImplementation(() => Promise.resolve(expected));

            expect(await personalDataController.getPersonalDataByUID('ValidUid')).toBe(expected);
        });
    });

    describe('testGetPersonalDataByUIDWhenUIDInvalid', () => {
        it('should return empty personalData', async () => {
            const expected = {};
            jest.spyOn(personalDataService, 'getPersonalDataByUID').mockImplementation(() => Promise.resolve(expected));

            expect(await personalDataController.getPersonalDataByUID('InvalidUid')).toBe(expected);
        });
    });
});
