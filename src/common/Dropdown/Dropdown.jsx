// Dropdown.js
import React from 'react';
import Select from 'react-select';

const Dropdown = ({ name, placeholder, options, onChange, post }) => {
    const handleChange = (selectedOption) => {
        onChange(name, selectedOption.value);
    };

    return (
        <Select
            placeholder={placeholder}
            options={options}
            isSearchable={true}
            onChange={handleChange}
            defaultValue={post ? options[0] : null}
        />
    );
};

export default Dropdown;
