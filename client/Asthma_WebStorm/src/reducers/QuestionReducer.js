// import data from './question.json';
const INITIAL_STATE = {
    checked_option: null,
    questionset: null,
    currentquestionset:null,
    currentquestion: null
};

export default (state=INITIAL_STATE, action) => {
    console.log(action.type);
    switch (action.type){
        case 'getAllQuestionSets':
            return {  ...state, questionset:action.payload.questionset };
        case 'startButtonClicked':
            return { ...state,
                currentquestionset:action.payload.currentquestionset,
                currentquestion:action.payload.currentquestion
            };
        case 'displayCurrentQuestion':
            return { ...state, currentquestion:action.payload.currentquestion };
        case 'nextButtonClicked':
            return { ...state,
                currentquestion:action.payload.currentquestion,
                checked_option:action.payload.checked_option
            };
        case 'optionSelected' :
            return { ...state, checked_option:action.payload.checked_option };
        default:
            return state;
    }
};
