import React, { useEffect, useState } from 'react'
import AccountFormSection from '../components/AccountFormSection';
import {
    Form, message,
     Input, Button, Space 
} from 'antd';
import MaterialTable from "material-table";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import requester from '../api/requester';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
import ActionsButton from '../components/ActionsButton';
import { FiTrash2 } from 'react-icons/fi';
const EditableContext = React.createContext(null);

export default function AccountManagementPage() {
    document.title = "Quản lí tài khoản";
    const [form] = Form.useForm();
    const [accounts, setAccounts] = useState([]);

    const onFinish = () => {
       requester.put('/account',{
          username: form.getFieldValue("username"),
          password: form.getFieldValue("password")
       }).then(response => {
           if(response.error){
               message.error(response.error.message)
           }
           else{
               message.success(response.success.message)
               
               getAccounts();
           }
       })
    }
    const getAccounts = () => {
        requester.get('/account').then((data)=>{
            if(data.error){
                message.error(data.error.message);
            }
            else{
                data.forEach(v => {
                    v.createAt = new Date(v.createAt).toLocaleString();
                    v.updateAt = new Date(v.updateAt).toLocaleString();
                })
                setAccounts(data);
                console.log(data);
            }
        })
    }
    useEffect(() => {
        getAccounts();
    }, []);
    const removeAccount = (account) => {
        if(account){
            requester.delete('/account',{
                id: account.id,
                username: account.username
            }).then(res => {
                if(res.error){
                    message.error(res.error.message);
                }
                else{
                    message.success(res.success.message);
                }
            }).catch(err=>{
                console.log(err);
                message.error("Something errors");
            })
        }
    }
    const columns = [
        
          {"title":"ID","field":"id", editable: "never", defaultSort: "desc"},
          {"title":"Username","field":"username"},
          {"title":"Password","field":"password"},
          
      
          {"title":"Create at","field":"createAt",type:"datetime", editable: "never"},
          {"title":"Update at","field":"updateAt",type:"datetime", editable: "never"},
        
    ];
    const update = (newAccount,dataUpdated) => {
        if(newAccount){
            requester.post('/account',{
                ...newAccount
            }).then(res => {
                if(res.error){
                    message.error(res.error.message);
                }
                else{
                    message.success(res.success.message);
                    setAccounts([...dataUpdated]);
                }
            }).catch(err=>{
                console.log(err);
                message.error("Something errors");
            })
        }
    }
    return (
        
        <div className="accounts-wrap">
            <h2>Quản lí tài khoản</h2>
            <Form 
           form={form}
           autoComplete="off"
           colon={false}
           onFinish={onFinish}
   
           scrollToFirstError
           requiredMark={false}
      
           validateTrigger="onChange"
           labelCol={{ sm: 24, md: 24, lg: 8, xl: 8 }}
           wrapperCol={{ sm: 24, md: 24, lg: 16, xl: 16 }}
           >
            <AccountFormSection/>
            </Form>
            <div >
            <MaterialTable

editable={{
   onRowUpdate: (newData, oldData)=>{
     return new Promise((resolve, reject) => {
       setTimeout(()=>{
         const dataUpdate = [...accounts];
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
          const newData = accounts?.filter((data) => data.id !== oldData.id);
          removeAccount(oldData);
          setAccounts([...newData])
          resolve(newData);
        },1000)
      })
   }
}}

columns={columns}

data={accounts}
title="Account"

>

</MaterialTable>
            </div>
        </div>
    )
}
