/**
 * Created by tengzhongwei on 7/13/17.
 */

import { connect } from 'dva';
import { Form, Row, Col, Input, Button, Icon, DatePicker } from 'antd';
import styles from '../styles/components/ExportBox.less';

const FormItem = Form.Item;


class ExportBox extends React.Component{
    onExportClick(e){
        e.preventDefault();
        this.props.form.validateFields((err, fieldsValue) => {
            if (err) {
                return;
            }
            else {
                const values = {
                    ...fieldsValue,
                    'start_date': fieldsValue['start_date']?fieldsValue['start_date'].format('YYYY-MM-DD'):null,
                    'end_date': fieldsValue['end_date']?fieldsValue['end_date'].format('YYYY-MM-DD'):null,
                };
                this.props.dispatch({type:'admin/downloadResults', payload:{
                    query:values,
                }});
            }
        });
    }

    toggle(){
        this.props.dispatch({type:'admin/toggleAdvanceSearch', payload:{advanceSearch:!this.props.advanceSearch}})
    }

    check(){
        this.props.form.validateFields((err, fieldsValue) => {
            const values = {
                ...fieldsValue,
                'start_date': fieldsValue['start_date']?fieldsValue['start_date'].format('YYYY-MM-DD'):null,
                'end_date': fieldsValue['end_date']?fieldsValue['end_date'].format('YYYY-MM-DD'):null,
            };
            console.log(values);
        })
    }

    render(){
        const { getFieldDecorator } = this.props.form;
        return(
            <Row  type="flex" justify="center" className={styles.container}>
                <Col span={12}>
                    <Form onSubmit={this.onExportClick.bind(this)} className={styles.form}>
                        <Col span={14}>

                            <FormItem>
                                {getFieldDecorator('mrn', {
                                })(
                                    <Input placeholder="MRN" />
                                )}
                            </FormItem>
                            <a style={{ marginLeft: 8, fontSize: 12}} onClick={this.toggle.bind(this)}>
                                Advance Search <Icon type={this.props.advanceSearch ? 'up' : 'down'} />
                            </a>
                            {this.props.advanceSearch?
                                <div>
                                    <FormItem>
                                        {getFieldDecorator('first_name', {
                                        })(
                                            <Input placeholder="First Name" />
                                        )}
                                    </FormItem>
                                    <FormItem>
                                        {getFieldDecorator('last_name', {
                                        })(
                                            <Input placeholder="Last Name" />
                                        )}
                                    </FormItem>
                                    <FormItem>
                                        {getFieldDecorator('start_date')(
                                            <DatePicker placeholder="Start From..." />
                                        )}
                                    </FormItem>
                                    <FormItem>
                                        {getFieldDecorator('end_date')(
                                            <DatePicker placeholder="End To..." />
                                        )}
                                    </FormItem>
                                </div>:null

                            }


                        </Col>
                        <Col span={9} offset={1}>
                            <Button type="primary" icon="poweroff" htmlType="submit" >
                                Export!
                            </Button>
                        </Col>

                    </Form>
                </Col>
                {/*<Button onClick={this.check.bind(this)}>check</Button>>*/}
            </Row>


        )
    }
}

function mapStateToProps(state) {
    return{
        advanceSearch:state.admin.advanceSearch
    }
}

const form = Form.create()(ExportBox);

export default connect(mapStateToProps)(form);