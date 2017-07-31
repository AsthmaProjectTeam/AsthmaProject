/**
 * Created by tengzhongwei on 7/23/17.
 */
import { connect } from 'dva';
import { Form, Row, Col, Input, Button, Card, DatePicker } from 'antd';
import styles from '../styles/components/UploadSingleBox.less';
const FormItem = Form.Item;

class UploadSingleBox extends React.Component{
    onUploadClick(e){
        e.preventDefault();
        this.props.form.validateFields((err, fieldsValue) => {
            if (err) {
                return;
            }
            else {
                const values = {
                    ...fieldsValue,
                    'date_of_birth':fieldsValue['date_of_birth'].format('YYYY-MM-DD')
                };
                this.props.dispatch({type:'admin/createNewPatient', payload:{ form:values}});
                this.props.form.resetFields();
            }
        });
    }


    render(){
        const { getFieldDecorator } = this.props.form;
        return(
            <Row>
                <Col span={12}>
                    <Card  style={{ height: 300, width:400 }}>
                    <Form onSubmit={this.onUploadClick.bind(this)} >
                        <Col span={14}>
                            <FormItem>
                                {getFieldDecorator('mrn', {
                                    rules: [{ type: 'string', required: true, message: 'Please input correct MRN!' }],
                                })(
                                    <Input placeholder="MRN" />
                                )}
                            </FormItem>
                            <FormItem>
                                {getFieldDecorator('first_name', {
                                    rules: [{ type: 'string', required: true, message: 'Please input first name' }],
                                })(
                                    <Input placeholder="First Name" />
                                )}
                            </FormItem>
                            <FormItem>
                                {getFieldDecorator('last_name', {
                                    rules: [{ type: 'string', required: true, message: 'Please input last name' }],
                                })(
                                    <Input placeholder="Last Name" />
                                )}
                            </FormItem>
                            <FormItem>
                                {getFieldDecorator('date_of_birth', {
                                    rules: [{  required: true, message: 'Please input date of birth' }],
                                })(
                                    <DatePicker placeholder="Date of birth" />
                                )}
                            </FormItem>

                        </Col>
                        <Col span={9} offset={1}>
                            <Button type="primary" icon="poweroff" htmlType="submit" >
                                Create Patient
                            </Button>
                        </Col>
                    </Form>
                    </Card>
                </Col>

            </Row>

        )
    }
}
const form = Form.create()(UploadSingleBox);



export default connect()(form);