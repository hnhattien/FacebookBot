import React from 'react';
import styled from 'styled-components';
import {NavLink} from 'react-router-dom';
import { RiAuctionLine } from 'react-icons/ri'
import { CgSmartHomeWashMachine } from 'react-icons/cg';
import { IoMdArrowDropright, IoIosPerson } from 'react-icons/io';
import { IoAppsOutline, IoNewspaper } from 'react-icons/io5';
import media from '../responsive/media';

import { MdOutlineLightMode, MdOutlineNightlight } from 'react-icons/md';

import { Switch } from 'antd';
const NavItemList = styled.ul`
color: #000;
@media ${media.xxs}{
    & li {
        height: max-content;
    }
    & > li.has-child-list{
        &:hover ul{
            display: block;
        }    
        &:hover{
            color: unset;
            background-color: unset !important;
        }
    }
}
    @media ${media.lg}{
        & > li{
            display: flex;
            justify-content: space-between;
            position: relative;
        }
        & > li.has-child-list{
            display: flex;
            ul{
                display: none;
            }
            &:hover ul{
                display: flex;
            }    
        }
        & li.has-child-list:hover{
            background-color: #E40B7B !important;
            
            color: #000 !important;
        }
    }
    
    list-style: none;
    padding: 15px;
    margin: 0;
    
    & > li{
        padding-left: 10px;
        padding-right: 10px;
    }
    & > li{
        display: block;
        position: relative;
    }
    & li{
        font-weight: 700;
        width: 100%;
        
        margin-top: 10px;
        border-radius: 10px 10px;
        margin-bottom: 10px;
        color: #000;
        align-items: center;
        cursor: pointer;
        .text{
            margin-left: 10px;
        }
    }
    & li > span{
        padding-top: 1em;
        padding-bottom: 1em;
    }
    & li a{
        
        text-decoraction: none !important;
        color: #000;
        display: block;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        padding-top: 1em;
        padding-bottom: 1em;
    }
    & li:hover{
        background-color: #E40B7B;
        
        color: #ffffff !important;
    }
    & li a:hover{
        
        color: #ffffff !important;
    }
`
const NavItemListWrap =  styled.div`
    display: flex;
    justify-content: center;
    flex-flow: column;
`

const Dropdown = styled.ul`
width: fit-content;
@media ${media.xxs}{
    position: static;
    display: block;
    background: #fff;
    &{
        border: 1px solid rgba(10,10,10,0.1);
        margin-top: 1em !important;
        margin-bottom: 2em !important;
       
    }
    
}
    @media ${media.lg}{
        position: absolute !important;
        left: 100%;
        box-shadow: 10px 10px 20px rgb(0 0 0 / 7%), -10px -10px 20px rgb(0 0 0 / 7%);
        margin-top: 0 !important;
        margin-bottom: 0 !important;
        z-index: 900;
        
    }
    
    padding: 0 5px;
    
    display: flex;
    flex-direction: column;
    background: #fff;
    
    top: 0;
    justify-content: center;
    border-radius: 10px;
    li{
        
        text-align: center;
        display: flex;
        justify-content: center;
        margin: 2px;
    }
    a{
        text-align: center !important;
        padding: 0 1.7rem;
    }
    
`

export default function Navigation() {
   
   
    return (
        <>
        <NavItemListWrap>
            <NavItemList>
                <li>  
                    <NavLink to={"/"}>
                         <CgSmartHomeWashMachine></CgSmartHomeWashMachine>
                        <span className="text">Home</span>
                    </NavLink>
                    
                </li>
                <li className="has-child-list">
                    <span>
                        <IoAppsOutline></IoAppsOutline>
                        <span className="text">Người dùng</span>
                    </span>
                    <IoMdArrowDropright></IoMdArrowDropright>
                    <Dropdown className="dropdown">
                       <li>
                           <NavLink to={'/accounts'}>
                               Quản lí tài khoản
                           </NavLink>
                       </li>
                      
                     
                    </Dropdown>
                </li>
                <li className="has-child-list">
                    <span>
                        <IoAppsOutline></IoAppsOutline>
                        <span className="text">Bài viết</span>
                    </span>
                    <IoMdArrowDropright></IoMdArrowDropright>
                    <Dropdown className="dropdown">
                       <li>
                           <NavLink to={'/post'}>
                               Quản lí bài viết
                           </NavLink>
                       </li>
                       <li>
                           <NavLink to={'/post/upload'}>
                               Đăng bài viết
                           </NavLink>
                       </li>
                     
                    </Dropdown>
                </li>
               
            </NavItemList>
            
        </NavItemListWrap>
        
        
        </>
    )
}
