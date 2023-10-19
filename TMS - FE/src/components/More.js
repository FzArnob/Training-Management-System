import { useState } from "react";
import { userLogout } from "../api/authentication";
import { toogleTheme } from "../features/theme";
import store from "../redux/store";
import "./css/more.css"
export default function More(props) {
    const [moreOption, setMoreOption] = useState(false);
    const handleMoreBtn = (e) => {
        e.persist();
        setMoreOption(!moreOption);
        if(moreOption) {
            document.getElementById("moreIcon").className = "fa fa-chevron-down more-right-icon c2";
            document.getElementById("moreBtn").className = "more-default c1";
            document.getElementById("moreBtn").style.border = "none";
        } else {
            document.getElementById("moreIcon").className = "fa fa-chevron-up more-right-icon c-theme";
            document.getElementById("moreBtn").className = "more-default c-theme";
            document.getElementById("moreBtn").style.border = "1px solid #007acc";
        }
        
    };
    return (
        <>
        <div className='more-box'>
            <div className='more-default c1' id='moreBtn' onClick={handleMoreBtn}>
            {store.getState().auth.user.firstName}
            </div>
            <i onClick={handleMoreBtn} className="fa fa-chevron-down more-right-icon c2" id="moreIcon"></i>
            {moreOption ? (
                <>
            <div className="more-void" onClick={handleMoreBtn}></div>
            <div className='more-options-default c1 bg2'>
                <div className='more-option-default' ><a href={"/profile?email=" + store.getState().auth.user.email} className="nav-links link c1">View Profile</a></div>
                <div className='more-option-default' ><a href="/">Find People</a></div>
                <div className='more-option-default' ><a href="/login" className="nav-links link c1" onClick={userLogout}>Log out</a></div>
                <div className="space"></div>
                <div className="themeBtn c1" onClick={toogleTheme}><i className="fa  fa-bolt"></i></div>
                <div className="space"></div>
                
            </div>
            </>
            ) : (
            <>
            </>
            )}
        </div>
        </>
    )
}