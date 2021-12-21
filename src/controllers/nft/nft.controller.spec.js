import MockExpressResponse from 'mock-express-response';
import { allNfts } from './nft.controller';

import { successResponse } from '../../helpers';

import { User } from '../../models';
// mock success and error function mock
jest.mock('./../../helpers');

// extress response object for (req, res) function
const res = new MockExpressResponse();

describe('Nft controller', () => {
  test('allNfts', async () => {
    const spyUserFindAndCountAll = jest
      .spyOn(User, 'findAndCountAll')
      .mockImplementation(() => Promise.resolve([]));

    const req = {
      params: {
        page: 1,
      },
    };

    // call function
    await list(req, res);
    // check database function is calling or not
    expect(spyUserFindAndCountAll).toBeCalled();
    // check response is correct or not
    expect(successResponse).toHaveBeenCalledWith(
      expect.any(Object),
      expect.any(Object),
      expect.any(Object)
    );
    // restore database/model function that we have mocked
    spyUserFindAndCountAll.mockRestore();
  });
});
