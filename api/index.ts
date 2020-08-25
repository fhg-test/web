import rest from '@fhg-test/rest';

import { isServer } from '@app/utils';

const init = () => rest.init(isServer() ? `${process.env.API_URL}/api` : '/api');

export default init;
