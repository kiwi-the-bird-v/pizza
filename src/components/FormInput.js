import React from 'react';

const FormInput = ({title,name,value,changeInputValue}) =>{

    return(
      <div id={name}>
          <label>{title}</label>
          <input name={name}
                 value={value}
                 onChange={() => {
                     return changeInputValue(event)}}/>
      </div>
    );
};

export default FormInput