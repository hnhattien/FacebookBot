import React, { useEffect, useState } from 'react'
import PostFormSection from '../components/PostFormSection';
import {
    Form, message,
     Input, Button, Space,
     Upload, 
     Image,
     Checkbox, 
     

} from 'antd';

import { UploadOutlined } from '@ant-design/icons';
import MaterialTable from "material-table";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import requester from '../api/requester';
import ActionsButton from '../components/ActionsButton';
import { FiTrash2 } from 'react-icons/fi';
import AccountOptionsPopover from '../components/AccountOptionsPopover';
async function getBase64(file) {
    if(file){
        let result_base64 = await new Promise((resolve) => {
            let fileReader = new FileReader();
            fileReader.onload = (e) => resolve(String(fileReader.result).split(";base64,").pop());
            fileReader.readAsDataURL(file);
        });
    
        console.log(result_base64); 
    
        return result_base64;
    }
    else{
        return null;
    }
}



export default function PostManagementPage() {
    document.title = "Quản lí bài viết";
    const [form] = Form.useForm();
    const postImageFileRef = React.useRef();
    const [posts, setPosts] = useState([]);
    
    
   
    useEffect(() => {
        getPosts();
    }, [])
    const getPosts = () => {
        requester.get('/post').then(res => {
            if(res.error){
                message.error(res.error.message);
            }
            else{
                
                setPosts(res);
               
            }
        }).catch(err => {
            message.error("Something errors");
        })
    }
    const onFinish = async () => {
        createPost();
     }
     const createPost = async () => {
        const {text, image} = form.getFieldsValue();
        console.log(form.getFieldsValue());
        if(text && image?.fileList?.length && image?.fileList?.length > 0){
            console.log(form.getFieldValue('image')?.fileList[0]?.originFileObj);
            const imageFile = await getBase64(form.getFieldValue('image')?.fileList[0]?.originFileObj);
            requester.put('/post',{
            text: form.getFieldValue('text'),
            image: form.getFieldValue('image')?.file?.name,
            imageFile
            }).then(response => {
                if(response.error){
                    message.error(response.error.message)
                }
                else{
                    message.success(response.success.message)
                    
                    getPosts();
                }
            })
        }
        else{
            requester.put('/post',{
                text: form.getFieldValue('text'),
                noImagePost: true
                }).then(response => {
                    if(response.error){
                        message.error(response.error.message)
                    }
                    else{
                        message.success(response.success.message)
                        
                        getPosts();
                    }
            })
        }
     }
    const removePost = (post, newPostRows) => {
        if(post){
            requester.delete('/post',{
                id: post.id,
            }).then(res => {
                if(res.error){
                    message.error(res.error.message);
                }
                else{
                    message.success(res.success.message);
                    setPosts([...newPostRows])
                }
            }).catch(err=>{
                console.log(err);
                message.error("Something errors");
            })
        }
    }
    const postOnFacebook = (rowData, accountInfo)=>{
        
        if(accountInfo && accountInfo?.length > 0){
            message.warn("Không tương tác khi bot đang chạy", 50)

            if(rowData){
                if(!rowData.image){
                    requester.post('/bot/post_pure_text_post', {
                        postInfo: rowData,
                        accountInfo: accountInfo
                    }).then(res => {
                
                    }).catch(err => {
                        message.error("Something errors");
                        console.log(err);
                    })
                    
                }
                else{
                    
                    requester.post('/bot/post_image_post', {
                        postInfo: rowData,
                        accountInfo
                    }).then(res => {
                    }).catch(err => {
                        message.error("Something errors");
                        console.log(err);
                    })
                }
            }
        }
        
        else{
            message.error("Chọn ít nhất một tài khoản")
        }


    }
    

    const columns = [
          {"title":"Facebook Actions","field":"Post", editable: "never", render: (rowData) => {
              return <AccountOptionsPopover postOnFacebook={postOnFacebook} rowData={rowData}/>;
          }},
          {"title":"ID","field":"id", editable: "never", defaultSort: "desc"},
          {"title":"Nội dung bài viết","field":"text"},
          {"title":"Image" , render: (rowData) =>
            {
                console.log(rowData);
              return rowData.image ? 
              (<div>
                  <Image style={{zIndex: "10000"}} className="table-data-image" title={"Image post"} src={`/upload/${rowData.image}`}/>
                  <Upload 
                  maxCount={1}
                  
                name="imageFileUpdate"
                multiple={false}
                accept='image/*'
                beforeUpload = {(file) => {
                    update(null, rowData, true, file)
                   return false;
                }}
                ><Button icon={<UploadOutlined />}>Change</Button></Upload>  
                </div>) 
              :(<Upload 
                name="imageFileUpdate"
                multiple={false}
                accept='image/*'
                beforeUpload = {(file) => {
                    update(null, rowData, true, file)
                   return false;
                }}
                ><Button icon={<UploadOutlined />}>Click to Upload</Button></Upload>) 
            },
            
              
          },
          {"title":"Create at","field":"createAt",type:"datetime", editable: "never"},
          {"title":"Update at","field":"updateAt",type:"datetime", editable: "never"},
        
    ];

    const update = async(newpost, updatedRows, isUpdateImagePost = false, postImageFile = null) => {
        if(isUpdateImagePost){
            console.log(postImageFile)
            const imageFile = await getBase64(postImageFile);
            const imageName = postImageFile.name;
            requester.post('/post',{
                imageUpdateOnly: true,
                id: updatedRows.id,
                imageFile: imageFile,
                image: imageName
            }).then(res => {
                if(res.error){
                    message.error(res.error.message);
                }
                else{
                    message.success(res.success.message);
                    getPosts();
                }
            }).catch(err=>{
                console.log(err);
                message.error("Something errors");
            })
        }
        else if(newpost){
            requester.post('/post',{
                ...newpost
            }).then(res => {
                if(res.error){
                    message.error(res.error.message);
                }
                else{
                    message.success(res.success.message);
                    setPosts([...updatedRows]);
                }
            }).catch(err=>{
                console.log(err);
                message.error("Something errors");
            })
        }
        
    }


    const resetImageField = () => {
        form.setFieldsValue({image: null})
    }
    
    return (
        <div>

<h2>Quản lí tài khoản</h2>
<Form 

style={{paddingTop: "20px", paddingBottom: "20px"}}

           form={form}
           autoComplete="off"
           colon={false}
           onFinish={onFinish}
   
           scrollToFirstError
           requiredMark={false}
      labelAlign="left"
           validateTrigger="onChange"
           labelCol={{ sm: 24, md: 24, lg: 8, xl: 8 }}
           wrapperCol={{ sm: 24, md: 24, lg: 16, xl: 16 }}
           >
                <PostFormSection resetImageField={resetImageField} />
           </Form>

                <MaterialTable

editable={{    
   onRowUpdate: (newData, oldData)=>{
     return new Promise((resolve, reject) => {
       setTimeout(()=>{
         const dataUpdate = [...posts];
         const index = oldData.tableData.id;
         dataUpdate[index] = newData;
        
         update(newData, dataUpdate);
         
         resolve(newData);
       },1000)
     })
   },
   
   
   
   onRowDelete: (oldData) => {
    return new Promise((resolve, reject) => {
        setTimeout(()=>{
          const newDataRows = posts?.filter((data) => data.id !== oldData.id);
          removePost(oldData, newDataRows);
          resolve();
        },1000)
      })
   },
   
}}

columns={columns}

data={posts}
title="Post"

>

</MaterialTable>

        </div>
    )
}
