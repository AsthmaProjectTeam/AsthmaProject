import { Actions } from 'react-native-router-flux';

// export const startButtonClicked = () => {
//     return (dispatch) => {
//         dispatch({
//             type: 'startButtonClicked'
//         });
//
//         Actions.questionList();
//     };
// };

export const startButtonClicked = () => {
    return {
        type: startButtonClicked
    };
};