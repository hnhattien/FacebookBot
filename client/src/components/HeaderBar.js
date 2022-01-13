
import React, { useCallback, useEffect, useState, memo } from 'react'
import styled from 'styled-components';
import { FiMenu } from 'react-icons/fi';


import  media, { getAnyMedia }  from '../responsive/media';
const Logo = styled.h1`
@media ${media.xxs}{
    flex: 1 0 auto;
}
@media ${media.lg}{
    flex: initial;
}
`


const MenuButton = styled.span`
    @media ${media.xxs}{
        cursor: pointer;
        display: initial;
        color: #000;
    
    }
    @media ${media.lg}{
        display: none;
    }
`

function HeaderBar() {
    const [contentlayoutmargin, setcontentlayoutmargin] = useState(0);

    const setSizeContentLayout = useCallback(()=>{
        const marginLeft = document.querySelector("#navbar-layout").clientWidth;
        if(marginLeft){
          setcontentlayoutmargin(marginLeft);
        }
    })

    const showMobileNavBar = () => {
        document.querySelector("#navbar-wrap").classList.toggle("show");
    }
    useEffect(()=>{
        setSizeContentLayout();  
    })

    
const bgUrl = "https://pickywallpapers.com/img/2020/7/facebook-hd-wallpaper-2087-2122-hd-wallpapers.jpg"
    return (
        <div  contentlayoutmargin={contentlayoutmargin} style={{display: "flex", alignItems: "center", justifyContent: "center", height: "100%"}}>
            <MenuButton onClick={showMobileNavBar}>
            <FiMenu size={40}></FiMenu>
            </MenuButton>
            <Logo style={{textAlign: "center"}}>Auto bot Facebook App</Logo>
        </div>
       
                
        
    )
}

export default memo(HeaderBar);
