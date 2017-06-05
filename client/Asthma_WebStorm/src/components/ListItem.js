import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Card  from './common/Card';
import { CardSection } from './common/CardSection';
//import { RadioButton } from './common/RadioButton';

import { List, Radio, Flex, WhiteSpace } from 'antd-mobile';

const RadioItem = Radio.RadioItem;
class ListItem extends Component {
    state = {
        value: null,
    };
    onChange = (value) => {
        this.setState({
            value,
        });
    };
    render() {
        const { value, value2, value3, value4 } = this.state;
        const { titleStyle, optionStyle } = styles;
        // const options = [this.props.question.options.map(option=>{
        //     return(
        //         {label: {option.detail}}
        //     );
        // })];

        return (
            <Card>
                <CardSection>
                    <Text style={titleStyle}>
                        {this.props.question.content}
                    </Text>
                </CardSection>

                <CardSection>
                    <View>

                        <List>
                            {this.props.question.options.map(i => (
                                <RadioItem key={i.option} checked={value === i.option} onChange={() => this.onChange(i.option)}
                                           >
                                    {i.detail}
                                </RadioItem>
                            ))}
                        </List>
                    </View>
                </CardSection>
            </Card>
        );
    }
}

const styles = {
    titleStyle: {
        fontSize: 18,
        textAlign: 'left',
        padding: 15
    }
};

export default ListItem;