import React, { Component } from 'react';
import { Text, View, ListView, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import ListItem from './ListItem';
import { Button } from './common/Button';
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
            <View style={styles.button}>
                <TouchableOpacity>
                    <Text style={styles.buttonText}>Submit</Text>
                </TouchableOpacity>
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

const styles = {
    button: {
        width: '80%',
        alignSelf: 'center',
        backgroundColor: '#eee',
        borderRadius: 5,
        borderWidth: 1.5,
        borderColor: '#4ea0ed',
        margin: 5
    },

    buttonText: {
        alignSelf: 'center',
        color: '#4ea0ed',
        fontSize: 16,
        fontWeight: '600',
        paddingTop: 10,
        paddingBottom: 10
    }
}

const mapStateToProps = state => {
    return { questions: state.questions };
};

export default connect(mapStateToProps)(QuestionList);