import React, { useEffect, useRef } from 'react'
import { SearchOutlined } from '@ant-design/icons'
import { AutoComplete, Input } from 'antd'

const SearchAutocomplete = ({ options, onSelect, onSearch }) => {
    const searchInput = useRef();
    useEffect(() => {
        if (searchInput.current) {
            searchInput.current.focus();
        }
    }, [searchInput]);

    return (
        <AutoComplete
            options={options}
            onSelect={onSelect}
            onSearch={onSearch}
        >
            <Input
                allowClear
                placeholder='Search here'
                ref={searchInput}
                onPressEnter={(e) => onSelect(e.target.value)}
                prefix={<SearchOutlined className='site-form-item-icon' />}
            />
        </AutoComplete>
    )
}

export default SearchAutocomplete
