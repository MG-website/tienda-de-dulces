import React, { useEffect, useState } from 'react'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {search} from '../../slices/shopSlice';
import { useDispatch} from 'react-redux';

function Search() {
    const [value,setValue]=useState('')
    const dispatch = useDispatch()
    const handleOnchange = (e)=>{
        setValue((val) => val = e.target.value)
    }
    const handleSubmit = (e) =>{
        e.preventDefault()
        dispatch(search(value))
        setValue('')   
    }

 
    return (
        <div>
            <form onSubmit={handleSubmit}>
            <TextField id="standard-basic" onChange={handleOnchange} value={value}  name='description'/>
            <Button type='submit'>Buscar</Button>
            </form>
        </div>
    )
}

export default Search
