import React from 'react'
import {
    Form,
    Input,
    Row,
    Col,
    Skeleton,
    Button
  } from 'antd';

const FormItem = Form.Item;
export default function AccountFormSection() {
    
    return (
        <>
          
           <Row gutter={48}>
                <Col md={{ span: 12 }} xs={{ span: 24 }}>
                    <FormItem
                    
                        label="Tên đăng nhập"
                        name="username"
                    >
                       <Input />
                    </FormItem>
                </Col>
            </Row>
            
            <Row gutter={48}>
                <Col md={{ span: 12 }} xs={{ span: 24 }}>
                    <FormItem
                        label="Mật khẩu"
                        name="password"
                    >
                     <Input.Password />
                    </FormItem>
                </Col>
            </Row>
            <Row gutter={48}>
                <Col md={{ span: 12 }} xs={{ span: 24 }}>
                <Button htmlType="submit"  type='primary'>Thêm</Button>
                </Col>
            </Row>
            
         
        </>
    )
}
