import * as errorActions from './errorActions';
import * as loaderActions from './loaderActions';
import * as userActions from './userActions';

const actions = {
    ...errorActions,
    ...loaderActions,
    ...userActions,
}

// in real live application we should check for unique names here

export default actions