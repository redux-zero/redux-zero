import apiRoutes from './apiRoutes';

import utils from '../../utils';

describe('Test API Routes unit', () => {
  it('Check if structure keeps equal', () => {
    expect(utils.object.generateNewObjectWithAllFunctionsInvoked(apiRoutes))
      .toMatchSnapshot();
  });
});
