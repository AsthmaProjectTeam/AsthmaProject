import { combineReducers } from 'redux';
import QuestionReducer from './QuestionReducer';

export default combineReducers({
    questions: QuestionReducer
});
