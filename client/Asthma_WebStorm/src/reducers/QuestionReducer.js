// import data from './question.json';
const INITIAL_STATE = {
    checked_option: null,
    questionset: null,
    currentquestionset:null,
    currentquestion: null,
    app: null,
    title:null,
    results:null,
    history:[]
};

export default (state=INITIAL_STATE, action) => {
    console.log(action.type);
    switch (action.type){
        case 'getAllQuestionSets':
            return {  ...state, questionset:action.payload.questionset };
        case 'startButtonClicked':
            return { ...state,
                currentquestionset:action.payload.currentquestionset,
                currentquestion:action.payload.currentquestion,
                app:action.payload.app,
                checked_option: action.payload.checked_option,
                history: action.payload.history,
                results: action.payload.results,
            };
        case 'displayCurrentQuestion':
            return { ...state, currentquestion:action.payload.currentquestion };
        case 'nextButtonClicked':
            return { ...state,
                results:action.payload.results,
                currentquestion:action.payload.currentquestion,
                checked_option:action.payload.checked_option,
                history:action.payload.history
            };
        case 'backButtonClicked':
            return { ...state,
                results:action.payload.results,
                checked_options: action.payload.checked_option,
                history: action.payload.history,
                currentquestion: action.payload.currentquestion
            };
        case 'lastQuestionReached':
            return { ...state, results:action.payload.results };
        case 'clearHistory':
            return { ...state, results: action.payload.results, history:action.payload.history };
        case 'submitButtonClicked':
            return { ...state, currentresults:action.payload.currentresults };
        case 'optionSelected' :
            return { ...state, checked_option:action.payload.checked_option };
        default:
            return state;
    }
};
