/**
 * Created by tengzhongwei on 8/3/17.
 */
import {Card,  Slider, Icon, Row, Col, Tag, Radio, Button} from 'antd';
import { connect } from 'dva';
import styles from '../styles/components/PainCheckerBox.less';

const CheckableTag = Tag.CheckableTag;
const locations = ['upper left', 'upper right', 'belly',

    "right upper back","left upper back",
    "lower back","left side","right side"

];
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

const MEDICATION_QUESTION = {
    "_id": 13,
    "app": "pain_check",
    "type": "option",
    "description": "When did you last take your medication?",
    "options": {
        "A": "within 30 minutes",
        "B": "within 1 hour",
        "C": "within 4 hours",
        "D": "within 8 hours",
        "E": "within 24 hours",
        "F": "over 24 hours",
    }
};

const ACT_QUESTION ={
    "_id": 14,
    "author": 2,
    "app": "pain_check",
    "type": "option",
    "description": "What was your activity level before answering this question?",
    "options": {
        "A": "Lying down in bed",
        "B": "Sitting in bed",
        "C": "Standing",
        "D": "Walking in rooms",
        "E": "Walking in hallway",
        "F": "Sleeping",
    }
};


class PainCheckerBox extends React.Component{
    componentWillMount(){
        this.state = {
            selectedLocations:[],
            painLevel:0,
            medication: 'A',
            activity: 'A'
        }
    }

    handleTagsChange(tag, checked) {
        const { selectedLocations } = this.state;
        const nextSelectedTags = checked ?
            [...selectedLocations, tag] :
            selectedLocations.filter(t => t !== tag);

        this.setState({ selectedLocations: nextSelectedTags });
    }

    onSubmit(){
        let results =  {
            app: "pain_check",
            results:[
                {
                    "q_id": 8,
                    "key": this.state.painLevel,
                    "value": this.state.painLevel,
                    "description": "How would you rate your pain level right now?"
                },
                {
                    "q_id": 15,
                    "key": "pain location",
                    "value": this.state.selectedLocations.join(','),
                    "description": "Where is your pain located?"
                },
                {
                    "q_id": 14,
                    "key": this.state.activity,
                    "value": ACT_QUESTION.options[this.state.activity],
                    "description": "What was your activity level before answering this question?"
                },
                {
                    "q_id": 13,
                    "key": this.state.medication,
                    "value": MEDICATION_QUESTION.options[this.state.medication],
                    "description": "When did you last take your medication?"
                }
        ]};
        const patient_id = this.props.params.patient_id;
        this.props.dispatch({type:'patient/answerQuestion', payload:{patient_id, results}});

    }

    render(){

        return(
            <Row type="flex" justify="center" style ={{marginTop:30}}>
                <Col span={22}>
                <Card title="Please Answer Following Questions Below">
                    <Row type="flex" justify="center">
                        <Col span={12}>
                            <Card title="1. How would you rate your pain level right now?">
                                <Row type="flex" justify="center">
                                    <Col ><Icon  type='frown-o' style={{ fontSize: 28, color: 'red',marginRight:4 }} /></Col>
                                    <Col span={16}>
                                        <Slider min={0} max={10}
                                                onChange = {(value)=>{this.setState({...this.state, painLevel:value})}}
                                        />
                                    </Col>
                                    <Col span={2} > <Icon type='smile-o' style={{ fontSize: 28, color: '#08c',marginLeft:4 }}/></Col>
                                </Row>
                            </Card>
                            <Card title="2. Where is your pain located?" style ={{marginTop:30}}>
                                {locations.map(tag => (
                                    <CheckableTag
                                        className={styles.tags}
                                        key={tag}
                                        checked={this.state.selectedLocations.indexOf(tag) > -1}
                                        onChange={checked => this.handleTagsChange(tag, checked)}
                                    >
                                        {tag}
                                    </CheckableTag>
                                ))}
                            </Card>
                            <Card title="3. What was your activity level before answering this question?" style ={{marginTop:30}}>
                                <RadioGroup value={this.state.activity} size="large"
                                            onChange={(e)=>{this.setState({...this.state, activity:e.target.value} ) }}
                                >
                                    <RadioButton value="A">Lying down in bed</RadioButton>
                                    <RadioButton value="B">Sitting in bed</RadioButton>
                                    <RadioButton value="C">Standing</RadioButton>
                                    <RadioButton value="D">Walking in room</RadioButton>
                                    <RadioButton value="E">Walking in hallway</RadioButton>
                                    <RadioButton value="F">Sleeping</RadioButton>
                                </RadioGroup>
                            </Card>
                            <Card title="4. When did you last take your medication?" style ={{marginTop:30}}>
                                <RadioGroup value={this.state.medication} size="large"
                                            onChange={(e)=>{this.setState({...this.state, medication:e.target.value} ) }}
                                >
                                    <RadioButton value="A">within 30 minutes</RadioButton>
                                    <RadioButton value="B">within 1 hour</RadioButton>
                                    <RadioButton value="C">within 4 hours</RadioButton>
                                    <RadioButton value="D">within 8 hours</RadioButton>
                                    <RadioButton value="E">within 24 hours</RadioButton>
                                    <RadioButton value="F">over 24 hours</RadioButton>
                                </RadioGroup>
                            </Card>
                        </Col>
                        <Col offset={1} span={10} style={{marginTop:100}} >
                            <Card title="You have chosen:" >
                                <div className={styles.summary}>
                                    <p><strong>Pain Level:</strong></p>
                                    <p className={styles.border}>{this.state.painLevel}</p>
                                    <p><strong>Pain Location: </strong></p>
                                    <p className={styles.border}>{this.state.selectedLocations.length ===0?'Nothing':
                                        this.state.selectedLocations.join(',')}</p>
                                    <p><strong>Activity:</strong></p>
                                    <p className={styles.border}>{ACT_QUESTION.options[this.state.activity]}</p>
                                    <p ><strong>Medician:</strong></p>
                                    <p className={styles.border}>{MEDICATION_QUESTION.options[this.state.medication]}</p>


                                    <Button onClick={this.onSubmit.bind(this)} style={{marginTop:15}} type="primary">Submit</Button>
                                </div>

                            </Card>
                        </Col>

                    </Row>

                </Card>
                </Col>
            </Row>
        )

    }
}

export default connect()(PainCheckerBox);