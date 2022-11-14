import * as errorSelectors from './errorSelectors';
import * as loaderSelectors from './loaderSelectors';
import * as userSelectors from './userSelectors';

const selectors = {
    ...errorSelectors,
    ...loaderSelectors,
    ...userSelectors,
}

// in real live application we should check for unique names here

export default selectors