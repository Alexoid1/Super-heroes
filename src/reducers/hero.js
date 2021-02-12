import {
    HERO_FAILURE,
    HERO_REQUEST,
    HERO_SUCCESS,
    
} from '../action-types';

const initialState = {
    hero: {},
    loading: false,
    error: '',
};

  
const heroReducer = (state = initialState, action) => {
    switch (action.type) {
      case HERO_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case HERO_SUCCESS:
        return {
            ...state,
            loading: false,
            hero: action.payload,
            
        };
      case HERO_FAILURE:
        return {
            ...state,
            loading: false,
            error: action.payload,
        }; 
      default:
        return state;
      }
};
      
export default heroReducer;              