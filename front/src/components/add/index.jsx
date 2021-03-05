import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct } from '../../slices/shopSlice';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
      width:'50%',
      display:'flex',
      flexDirection:'column',
      margin:'auto',
      alignItems:'center',
      border:'1px solid black',
      marginTop:'50px',
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

export default function NewProduct() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory()
    const [datos, setDatos]=useState({name:'', description:'', price_unit:0, stock:0})
    const [error,setError] = useState({
        name:'Debes llenar este campo',
        description:'Debes llenar este campo',
        price_unit:' Debes llenar este campo',
        stock:'Debes llenar este campo'
    })
    const [isok, setIsOk] = useState(false)
    const validate = ()=>{
    if(!datos.name){ setError({...error, name:'Debes llenar este campo'}) 
    setIsOk(false)}
    else
    if(!datos.description) {setError({...error, description:'Debes llenar este campo'}) 
    setIsOk(false)}
    else
    if(!datos.price_unit ) {setError({...error, price_unit:'Debes llenar este campo'}) 
    setIsOk(false)}
    else
    if(datos.price_unit <0) {setError({...error, price_unit:'No puede ser menor a 0'}) 
    setIsOk(false)}
    else
    if(!datos.stock) {setError({...error, stock:'Debes llenar este campo'}) 
    setIsOk(false)}
    else
    if(datos.stock <0) {setError({...error, stock:'No puede ser menor a 0'}) 
    setIsOk(false)}
    else
        setIsOk(true)
    }
    const handlerSubmit = ( e)=>{
        e.preventDefault()
        console.log(datos)
        dispatch(addProduct(datos))
        history.push('/')
    }
    const handlerOnChange = (e)=>{
        if(e.target.name == 'stock' || e.target.name ==='price_unit'){
            if(e.target.value >0 ){
                console.log(e.target.value)
                setDatos({...datos, [e.target.name] : e.target.value})
            }
        }else{

            setDatos({...datos, [e.target.name] : e.target.value})
        }
        validate()
    }
    useEffect(()=>{},[datos])
        
  return (
    <form  onSubmit={handlerSubmit} className={classes.root} noValidate autoComplete="off"> 
    <h1 style={{color:'#3f51b5'}}> AGREGAR NUEVO PRODUCTO</h1>
    <hr/>
    <label for='name'className={datos.name == '' ? 'error': 'success'} >
      <TextField id="standard-basic" value={datos.name} onChange={handlerOnChange} name='name' label='Nombre de Producto'/>
        {datos.name == '' && error.name}
    </label>
    <label for='description'className={datos.description == '' ? 'error': 'success'} >
      <TextField id="standard-basic" value={datos.description} onChange={handlerOnChange} name='description' label='Descripcion' />
      {datos.description == '' && error.description}
</label>
<label for='price_unit'className={datos.price_unit == '' ? 'error': 'success'} >
      <TextField id="standard-basic" value={datos.price_unit} type='number' onChange={handlerOnChange} name='price_unit' label='Precio unitario'/>
      {datos.price_unit == '' && error.price_unit}
</label>
<label for='stock'className={datos.stock == '' ? 'error': 'success'} >
      <TextField id="standard-basic" value={datos.stock} type='number' onChange={handlerOnChange} name='stock'  label='Stock' />
      {datos.stock == '' && error.stock}
</label>
      <Button type='submit' disabled={!isok} color="inherit">Agregar</Button>
    </form>
  );
}
