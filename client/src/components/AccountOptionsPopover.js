import React, { useState } from 'react'
import {
    Popover, Checkbox, Button, message
} from 'antd';
import requester from '../api/requester';
export default function AccountOptionsPopover({postOnFacebook, rowData}) {
    const [popoverVisible, setPopoverVisible] = useState(false);
    const [postAccountOptions, setPostAccountOptions] = useState([]);
    const [selectedAccounts, setSelectedAccounts] = useState(null);
    const getAccountOptions = () => {

        requester.get('/account').then(res => {
            const accountOptions = res.map(account => {
                return {label: account?.username, value: account?.username}
            })
            console.log(accountOptions);
      
            setPostAccountOptions(accountOptions)
        }).catch((err) =>{
            message.error("Something errors");
            console.log(err);
        })
        
    }
    const confirmPostOnFace = () => {
        postOnFacebook(rowData, selectedAccounts)
    }
    const accountToPostOptions = <>
    
       <Checkbox.Group onChange={(checkedValues) => {setSelectedAccounts(checkedValues)}} style={{ display: "block", marginLeft: 0 }} options={postAccountOptions}></Checkbox.Group>
    
    <Button style={{marginTop: "20px"}} onClick={()=>{
        setPopoverVisible(false);
        confirmPostOnFace();
        }}>Xác nhận đăng</Button>
    <Button type="danger" style={{marginTop: "20px", marginLeft: "20px"}} onClick={()=>{setPopoverVisible(false);}}>Hủy</Button>
    <p>(Chọn dưới 5 tài khoản cho hiệu suất)</p>
    
    
    </>;
    return (
        <Popover visible={popoverVisible} content={accountToPostOptions} title="Chọn tài khoản đăng" trigger="click">
            <Button onClick={() => {setPopoverVisible(true); getAccountOptions()}}>Đăng</Button>
        </Popover>
    )
}
