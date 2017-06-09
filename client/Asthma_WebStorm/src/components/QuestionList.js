import React, { Component } from 'react';
import { Text, View, ListView, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import ListItem from './ListItem';
import Header from './common/Header';
import Button from './common/Button';
import { Actions } from 'react-native-router-flux'

class QuestionList extends Component {
    componentWillMount() {
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });
        this.dataSource = ds.cloneWithRows(this.props.questions);
    }

    renderRow(question) {
        return <ListItem question = {question} />;
    }

    renderFooter() {
        return (
            <View>
                <Button
                    onPress={console.log("yes")}
                >
                    Submit
                </Button>
            </View>
        )
    }

    render() {

        return (
            <ListView
                dataSource={this.dataSource}
                renderRow={this.renderRow}
                renderFooter={this.renderFooter}
            />
        );
    }
}

const mapStateToProps = state => {
    return { questions: state.questions };
};

export default connect(mapStateToProps)(QuestionList);