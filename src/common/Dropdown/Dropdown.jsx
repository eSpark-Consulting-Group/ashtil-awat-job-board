import React from 'react'
import { locationOptions } from '../../constant'

const Dropdown = ({ placeholder, options }) => {
    return (
        <div>
            <select>
                <option disabled selected>{placeholder}</option>
                {options.map((item, index) => (
                    <option value={item?.value} key={index}>{item?.option}</option>
                ))}
            </select>
        </div>
    )
}


export default Dropdown
