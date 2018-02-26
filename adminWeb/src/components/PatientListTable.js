/**
 * Created by tengzhongwei on 7/28/17.
 */
import { connect } from 'dva';
import { Table, Input, Icon, Row, Col } from 'antd';
import { browserHistory } from 'dva/router'
import moment from 'moment';

class PatientListTable extends React.Component{
    componentWillMount(){
        this.props.dispatch({type:'admin/menuClick', payload:{selectedMenu:'my_patients'}});
        this.props.dispatch({type:'admin/getDoctorProfile',payload:null});
        this.state = {searched_patients: [], touched: false};
    }

    onFirstNameChange(e){

        const first_name = new RegExp('.*'+e.target.value+'.*', 'i');
        let new_patients = [];
        for(let p of this.props.all_patients){
            if(p.first_name.match(first_name)) new_patients.push(p);
        }
        this.setState({...this.state, searched_patients: new_patients, touched:true});
    }

    onLastNameChange(e){
        const last_name =new RegExp('.*'+e.target.value+'.*', 'i');
        let new_patients = [];
        for(let p of this.props.all_patients){
            if(p.last_name.match(last_name)) new_patients.push(p);
        }
        this.setState({...this.state, searched_patients: new_patients, touched:true});
    }

    render(){


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
        return(

            <div>
                <Row>
                    <Col span={2}>
                        <Input
                            placeholder="First Name"
                            prefix={<Icon type="user" />}
                            onChange = {this.onFirstNameChange.bind(this)}
                        />
                    </Col>
                    <Col span={2} style={{marginLeft:15}}>
                        <Input
                            placeholder="Last Name"
                            onChange = {this.onLastNameChange.bind(this)}
                        />
                    </Col>
                </Row>
                <Row style={{marginTop:15}}>
                    {this.props.all_patients?
                        this.state.touched?
                        <Table columns={cols} dataSource={this.state.searched_patients} rowKey="_id"
                               onRowClick={(record, index, event)=>{
                                   browserHistory.push('/my/patients/'+ record._id+ '/profile');
                               }}

                        />:
                            <Table columns={cols} dataSource={this.props.all_patients} rowKey="_id"
                                   onRowClick={(record, index, event)=>{
                                       browserHistory.push('/my/patients/'+ record._id+ '/profile');
                                   }}

                            />
                        :null
                    }
                </Row>
            </div>

        )
    }
}

function mapStateToProps(state) {
    return {all_patients: state.admin.profile?state.admin.profile.patients:null };
}

export default connect(mapStateToProps)(PatientListTable);