import React from 'react';
import {Link} from 'dva/router'
import { connect } from 'dva';
import {Col,Row, Button, Card} from 'antd';
import LoginBox from '../components/LoginBox';
import styles from '../styles/routes/LoginPage.less';
import Container from "../components/Container";


function IndexPage() {
  return (
      <Container >
        <Row className = {styles.box}>
            <Col span={8} offset={8}>
                <Card className = {styles.card}>
                    <p className={styles.title}>Project Admin System</p>
                    <LoginBox/>
                </Card>
            </Col>
        </Row>
      </Container>

  );
}

export default connect()(IndexPage);
