
import React, { useCallback, useEffect, useState, memo } from 'react'
import styled from 'styled-components';



import  media, { getAnyMedia }  from '../responsive/media';


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
        <div  contentlayoutmargin={contentlayoutmargin}>
            <MenuButton onClick={showMobileNavBar}></MenuButton>
            <h1 style={{textAlign: "center"}}>Auto bot Facebook App</h1>
        </div>
       
                
        
    )
}

export default memo(HeaderBar);
