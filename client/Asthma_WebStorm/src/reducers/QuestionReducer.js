// import data from './question.json';
const INITIAL_STATE = {
    index: 0,
    value: null,
    questionset: []
};

export default (state=INITIAL_STATE, action) => {

    switch (action.type){
        case 'getAllQuestionSets':

            return {  ...state, questionset:action.payload.questionset };
        case 'nextButtonClicked':
            return { ...state, index:action.payload.index };
        case 'optionSelected' :
            return { ...state, value:action.payload.value };
        default:
            return state;
    }
};
