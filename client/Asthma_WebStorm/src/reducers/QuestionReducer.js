import data from './question.json';
const INITIAL_STATE = {
    index: 0,
    value: null
};

export default (state=INITIAL_STATE, action) => {
    switch (action.type){
        case 'startButtonClicked':
            return {  ...state, ...data };
        case 'nextButtonClicked':
            return { ...state, index:action.payload.index };
        case 'optionSelected' :
            return { ...state, value:action.payload.value };
        default:
            return state;
    }
};
