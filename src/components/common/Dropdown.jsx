import React from 'react';
import Select from 'react-select';

const Dropdown = ({ name, placeholder, options, onChange, post, value }) => {

    return (
        <Select
            placeholder={placeholder}
            options={options}
            isSearchable={true}
            onChange={onChange}
            defaultValue={post ? options[0] : null}
            value={value}
        />
    );
};

export default Dropdown;
