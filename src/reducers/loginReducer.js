import Immutable from 'immutable';
import * as ActionTypes from '../actions/ActionTypes'

let initState = {
    isLogined: false,
    info: {name: 'NitMoon'}
}

export const loginReducer = (state = initState, action) => {
    let it = Immutable.fromJS(state);
    switch (action.type) {
        case ActionTypes.SET_LOGIN_STATUS:
            it = it.set('isLogined', Immutable.fromJS(action.payload));
            break;
        case ActionTypes.SET_LOGIN_INFO:
            it = it.set('info', Immutable.fromJS(action.payload));
            break;
        default:
            break;
    }
    return it.toJS();
}