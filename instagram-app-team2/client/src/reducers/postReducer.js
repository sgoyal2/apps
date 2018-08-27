import { ADD_POST, GET_POST} from '../actions/types';


const initialState = {
    posts: [],
    post: {}
};

export default function(state= initialState, action) {
    switch(action.type) {
        case GET_POST:
        return {
            ...state,
            posts: action.payload
        };
        case ADD_POST:
        return {
            ...state,
            posts: [action.payload, ...state.posts]
    };
    default:
    return state;
    }
}