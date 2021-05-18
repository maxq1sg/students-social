import React from 'react'
import styled from 'styled-components'
import Input from './Input'
import MiniProfile from './MiniProfile'
const SearchBarFlex=styled.div`
    display:flex;
    flex-wrap:nowrap;
    padding:0 20px;
    background: white;
`

const SearchBar = () => {
    return (
        <SearchBarFlex>
            <Input/>
            <MiniProfile/>
        </SearchBarFlex>
    )
}

export default SearchBar
