const INITIAL_STATE = {
    checked_option: null,
    checked_option_value: null,
    checked_color: 'red',
    questionset: [],
    currentquestionset:null,
    currentquestion: null,
    app: null,
    title:null,
    results:[],
    history:[],
    spinning: true,
    error:null
};

export default (state=INITIAL_STATE, action) => {
    switch (action.type){
        case 'getAllQuestionSets':
            return {  ...state, questionset:action.payload.questionset, spinning: action.payload.spinning };
        case 'startButtonClicked':
            return { ...state,
                currentquestionset:action.payload.currentquestionset,
                currentquestion:action.payload.currentquestion,
                app:action.payload.app,
                checked_option: null,
                checked_option_value: null,
                history: action.payload.history,
                results: action.payload.results,
                error: null
            };
        case 'displayCurrentQuestion':
            return { ...state, currentquestion:action.payload.currentquestion, error: null };
        case 'nextButtonClicked':
            return { ...state,
                results:action.payload.results,
                currentquestion:action.payload.currentquestion,
                checked_option:null,
                checked_option_value: null,
                history:action.payload.history,
                error: null
            };
        case 'backButtonClicked':
            return { ...state,
                results:action.payload.results,
                checked_option: null,
                checked_option_value: null,
                history: action.payload.history,
                currentquestion: action.payload.currentquestion,
                error: null
            };
        case 'medicationBackButtonClicked':
            return { ...state,
                results:action.payload.results,
                checked_option: null,
                checked_option_value: null,
                error: null
            };
        case 'lastQuestionReached':
            return { ...state, results:action.payload.results, error: null };
        case 'clearHistory':
            return { ...state,
                results: action.payload.results,
                history:action.payload.history,
                checked_option: null,
                checked_option_value: null,
                error: null
            };
        case 'optionSelected' :
            return { ...state,
                checked_option:action.payload.checked_option,
                checked_option_value: action.payload.checked_option_value,
                error: null
            };
        case 'optionBlankError':
            return { ...state, error:action.payload.error };
        case 'clearError':
            return { ...state, error: null };
        case 'unclickForgot':
            return { ...state, checked_option: null, checked_option_value: null, error: null };
        default:
            return state;
    }
};
