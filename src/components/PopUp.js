import React from 'react';
import '../assets/styles/popUp.css'


const PopUp = props => {
    const closePopUp = props.closePopUp;
    const show = props.show;
    const message = props.message;
    const imageLink = props.imageLink;

    return(
        <div id="bgr" className={show}>
            <button onClick={()=> closePopUp()} className="close-pop-up">&#10006;</button>
            <div id='modal-window'>
                <div id='content'>
                    <label>{message}</label>
                    <img src={`https://drive.google.com/uc?export=view&id=${imageLink}`}/>
                </div>
            </div>
        </div>
    );
};

export default PopUp