import React, {useEffect} from 'react';

import '../assets/styles/popUp.scss'

const PopUp = props => {
    const closePopUp = props.closePopUp;
    const show = props.show;
    const message = props.message;
    const imageLink = props.imageLink;

    useEffect(() => {
        const onKeyDown = e => {
            if(e.keyCode === 27)
                closePopUp();
            };
        document.addEventListener('keydown', onKeyDown);
        return () => {
            document.removeEventListener('keydown', onKeyDown);
        };
    }, []);

    return(
        <div className={`pop-up-bgr pop-up-bgr_${show}`}>
            <button onClick={()=> closePopUp()} className="pop-up-bgr__close-button close-button">&#10006;</button>
            <div className="pop-up-bgr__modal-window modal-window">
                <div className="modal-window__content">
                    <label>{message}</label>
                    <img src={`https://drive.google.com/uc?export=view&id=${imageLink}`} className="modal-window__image"/>
                </div>
            </div>
        </div>
    );
};

export default PopUp