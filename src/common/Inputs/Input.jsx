import React from 'react'

const Input = ({ label, type, onChange, name, placeholder }) => {
    return (
        <div className='input-parent'>
            <label htmlFor={name}>
                {label}
            </label>
            <input placeholder={placeholder} className='main-input' type={type ? type : "text"} onChange={(e) => onChange(name, e.target.value)} name={name} id={name} />
        </div>
    )
}

export default Input
