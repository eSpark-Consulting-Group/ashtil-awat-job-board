// Dropdown.js
import React from 'react';
import Select from 'react-select';

const Dropdown = ({ name, placeholder, options, onChange }) => {
    const handleChange = (selectedOption) => {
        onChange(name, selectedOption.value);
    };

    return (
        <Select
            placeholder={placeholder}
            options={options}
            isSearchable={true}
            onChange={handleChange}
        />
    );
};

export default Dropdown;
