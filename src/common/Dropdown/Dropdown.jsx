import React from 'react';
import Select from 'react-select';

const Dropdown = ({ placeholder, options }) => {
    return (
        <Select
            placeholder={placeholder}
            options={options}
            isSearchable={true}
        />
    );
};

export default Dropdown;
