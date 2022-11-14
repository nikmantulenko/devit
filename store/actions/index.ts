import * as errorActions from './errorActions';
import * as loaderActions from './loaderActions';

const actions = {
    ...errorActions,
    ...loaderActions,
}

// in real live application we should check for unique names here

export default actions