import React, { Component } from 'react';
import { Text, View } from 'react-native';
import Button from './common/Button';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

class SubmitPage extends Component {

    onButtonPress(){
        const dispatch = this.props.dispatch;
        console.log(this.props.results);
        fetch('http://192.168.100.7:8080/v2/patients/results', {
            method: 'POST',
            headers: {
                'Authorization': 'token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyIkX18iOnsic3RyaWN0TW9kZSI6dHJ1ZSwiaW5zZXJ0aW5nIjp0cnVlLCJnZXR0ZXJzIjp7fSwid2FzUG9wdWxhdGVkIjpmYWxzZSwiYWN0aXZlUGF0aHMiOnsicGF0aHMiOnsidXVpZCI6InJlcXVpcmUifSwic3RhdGVzIjp7Imlnbm9yZSI6e30sImRlZmF1bHQiOnt9LCJpbml0Ijp7fSwibW9kaWZ5Ijp7fSwicmVxdWlyZSI6eyJ1dWlkIjp0cnVlfX0sInN0YXRlTmFtZXMiOlsicmVxdWlyZSIsIm1vZGlmeSIsImluaXQiLCJkZWZhdWx0IiwiaWdub3JlIl19LCJlbWl0dGVyIjp7ImRvbWFpbiI6bnVsbCwiX2V2ZW50cyI6e30sIl9ldmVudHNDb3VudCI6MiwiX21heExpc3RlbmVycyI6MH19LCJpc05ldyI6ZmFsc2UsIl9kb2MiOnsiaW5pdGlhdG9ycyI6WzJdLCJjcmVhdGVkX2RhdGUiOiIyMDE3LTA2LTI4VDIwOjM3OjM0LjcxNVoiLCJyb2xlIjoicGF0aWVudCIsInJlc3VsdF9zZXQiOltdLCJxdWVzdGlvbl9zZXQiOltdLCJ1dWlkIjoiYTdlODU1NDQtODhhZS00MDU4LTkxMjUtYTE0ZWU5NGQ5ODg3IiwiX2lkIjo1MiwiX192IjowfSwiaWF0IjoxNDk4NjgyMjU0LCJleHAiOjE1MzAyMTgyNTR9.nzjxWoVuCD5eWwYSffu693LGub4cDkq8DX_nolrxgKw',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                'app':this.props.app,
                'results': this.props.results
            })
        }).then(function (response) {
            if(response.status == 200){
                console.log('successfully submited the form!');
            }
        }).then(
            dispatch({
                type: 'clearHistory',
                payload: {
                    results: null,
                    history: null
                }
            })).then(Actions.welcome())
            .catch(error => {
                console.log(error);
            });
    }

    render() {
        return (
            <View>
                <Button
                    onPress={this.onButtonPress.bind(this)}
                >
                    Submit Form
                </Button>
            </View>
        );
    }
}

const mapStateToProps = state => {
    return {
        app: state.questions.app,
        results: state.questions.results,
        history: state.questions.history
    }
};

export default connect(mapStateToProps)(SubmitPage);