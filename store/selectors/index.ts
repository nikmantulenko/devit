import * as errorSelectors from './errorSelectors';
import * as loaderSelectors from './loaderSelectors';

const selectors = {
    ...errorSelectors,
    ...loaderSelectors,
}

// in real live application we should check for unique names here

export default selectors