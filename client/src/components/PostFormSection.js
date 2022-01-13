import React from 'react'
import {
    Form,
    Input,
    Row,
    Col,
    Skeleton,
    Button,
    Upload,
    message

  } from 'antd';
  import { UploadOutlined } from '@ant-design/icons';
const FormItem = Form.Item;
const imageUploadProps = {
    name: 'file',
    
    
    
    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };
  
export default function PostFormSection({resetImageField}) {
    
    return (
        <>
          
           <Row gutter={48}>
                <Col md={{ span: 12 }} xs={{ span: 24 }}>
                    <FormItem
                    
                        label="Nội dung bài viết"
                        name="text"
                    >
                       <Input.TextArea />
                    </FormItem>
                </Col>
            </Row>
            
          
            <Row gutter={48}>
                <Col md={{ span: 12 }} xs={{ span: 24 }}>
                    <FormItem
                        label="Image Post"
                        name="image"
                    >
                     <Upload
                     maxCount={1}
                      {...imageUploadProps}
                     multiple={false}
                     onRemove={(file) => {resetImageField()}}
                     accept='image/*'
                     beforeUpload = {(file) => {
                    
                        return false;
                     }}
                     >
    <Button icon={<UploadOutlined />}>Click to Upload</Button>
  </Upload>
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
