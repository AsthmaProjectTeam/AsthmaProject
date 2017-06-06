import data from './question.json';

export default (state={}, action) => {
    switch (action.type){
        case 'startButtonClicked':
            return {  ...state, ...data };
        default:
            return state;
    }
};
