/**
 * Created by tengzhongwei on 7/31/17.
 */
import {Row, Col, Card, Button, Form, Input, Table} from 'antd';
import { connect } from 'dva';
import moment from 'moment';
const FormItem = Form.Item;
class AppendPatientsBox extends React.Component{
    componentWillMount(){
        this.state ={
            searched: false,
            selectedRowKeys: []
        };
        this.props.dispatch({type:'admin/menuClick', payload:{selectedMenu:'append_patients'}});
    }

    onSearchClick(e){
        e.preventDefault();
        this.props.form.validateFields((err, fieldsValue) => {
            if (err) {
                return;
            }
            else {
                this.props.dispatch({type:'patient/queryPatients', payload:{
                    ...fieldsValue
                }});
                this.setState({...this.state, searched:true, selectedRowKeys: []});
            }
        });
    }

    onAppendClick(e){
        e.preventDefault();
        this.props.dispatch({type:'patient/appendPatients', payload:{
            patients_id: this.state.selectedRowKeys
        }});
        this.setState({...this.state, selectedRowKeys: []});
    }

    onSelectChange(selectedRowKeys, selectedRows){

        this.setState({ ...this.state, selectedRowKeys });
        this.props.dispatch({type:'patient/putSelectedPatients', payload: {selected_patients:selectedRows}});
    }


    render(){
        const { getFieldDecorator } = this.props.form;
        const cols = [
            {title:'First Name',
                dataIndex: 'first_name',
                key:'first_name'
            },
            {title:'Last Name',
                dataIndex: 'last_name',
                key:'last_name'
            },
            {title: 'MRN',
                dataIndex:'mrn',
                key:'mrn'
            },
            {title:'Date Of Birth',
                dataIndex:'date_of_birth',
                key:'date_of_birth',
                render: date=> {
                    return moment(date).format('YYYY-MM-DD');
                }
            },
        ];
        const rowSelection = {
            selectedRowKeys: this.state.selectedRowKeys,
            onChange: this.onSelectChange.bind(this),

        };

        return(
            <div>
                <Row align="top" type="flex">
                    <Col span={11}>
                        <Card title="Search Patients in Database">
                            <Form onSubmit={this.onSearchClick.bind(this)}>
                                <Row type="flex" justify="center" gutter={10}>
                                    <Col >
                                        <FormItem>
                                            {getFieldDecorator('first_name', {
                                                initialValue:''
                                            })(
                                                <Input placeholder="First Name" />
                                            )}
                                        </FormItem>
                                    </Col>
                                    <Col>
                                        <FormItem>
                                            {getFieldDecorator('last_name', {
                                                initialValue:''
                                            })(
                                                <Input placeholder="Last Name" />
                                            )}
                                        </FormItem>
                                    </Col>
                                    <Col >
                                        <Button shape="circle" icon="search" htmlType="submit" />

                                    </Col>
                                </Row>
                            </Form>
                            {
                                this.state.searched?
                                    <Card title="Found Patients">
                                        {this.props.found_patients?
                                            <Table columns={cols} dataSource={this.props.found_patients}
                                                   rowSelection={rowSelection}
                                                   rowKey="_id"

                                                   locale={{
                                                       emptyText: 'No Patient Found!'
                                                   }}
                                                   pagination={{pageSize:5 }}
                                            />:null
                                        }
                                    </Card>:null
                            }
                        </Card>
                    </Col>
                    <Col offset={1} span={12}>
                        <Card title="Selected Patients">
                            <Table columns={cols} dataSource={this.props.selected_patients}
                                   rowKey="_id"
                                   locale={{
                                       emptyText: 'No Patient Selected'
                                   }}
                                   pagination={{pageSize:5 }}
                            />
                            <Row justify="end" type="flex" style={{marginTop:30}}>
                                <Button type='primary'
                                        disabled={this.state.selectedRowKeys.length===0 }
                                        onClick={this.onAppendClick.bind(this)}

                                >Append Selected Patients</Button>
                            </Row>
                        </Card>

                    </Col>
                </Row>
            </div>
        )
    }
}

const f = Form.create()(AppendPatientsBox);


function mapStateToProps(state) {
    return {
        found_patients: state.patient.found_patients,
        selected_patients: state.patient.selected_patients
    }
}

export default connect(mapStateToProps)(f);