import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {productsListSelector} from '../../utils/selectors'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useParams } from 'react-router-dom';
import { searchProduct } from '../../utils';
import {setProductDetail, updateProduct} from '../../slices/shopSlice'
const useStyles = makeStyles((theme) => ({
  root: {
      width:'50%',
      display:'flex',
      flexDirection:'column',
      margin:'auto',
      marginTop:'50px',
      border:'1px solid black',
      alignItems:'center',
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

export default function UpdateProduct() {
    
    const classes = useStyles();
    const [datos, setDatos]=useState({name:'', description:'', price_unit:0, stock:0})
    const products = useSelector(productsListSelector);
    const id = useParams().id
    const [messege, setMessege] = useState(false)
    const dispatch = useDispatch()
    const history = useHistory()
    const [error,setError] = useState({
        name:'Nombre de Producto',
        description:'Descripcion',
        price_unit:'Precio unitario',
        stock:'Stock'
    })
    const [isok, setIsOk] = useState(false)
    const validate = ()=>{
        console.log(')==')
    if(!datos.name){ setError({...error, name:'Debes llenar este campo'}) 
    setIsOk(false)}
    else
    if(!datos.description) {setError({...error, description:'Debes llenar este campo'}) 
    setIsOk(false)}
    else
    if(!datos.price_unit) {setError({...error, price_unit:'Debes llenar este campo'}) 
    setIsOk(false)}
    else
    if(datos.price_unit <0) {setError({...error, price_unit:'No puede ser menor a 0'}) 
    setIsOk(false)}
    else
    if(datos.stock <0) {setError({...error, stock:'No puede ser menor a 0'}) 
    setIsOk(false)}
    else
    if(!datos.stock) {setError({...error, stock:'Debes llenar este campo'}) 
    setIsOk(false)}
    else
        setIsOk(true)
    }

    const handlerSubmit = ( e)=>{
        e.preventDefault()
        console.log(datos)
        dispatch(updateProduct(datos))
        // history.push('/')
        setMessege(true)
    }
    const handlerOnChange = (e)=>{
    
        setDatos({...datos, [e.target.name] : e.target.value})
        validate()
    }
    useEffect(()=>{

        if(!id || products.length === 0) history.push('/')
        else  setDatos(searchProduct(id,products)) 

    },[])
    useEffect(()=>{
        

console.log('render')
        
            },[datos])
  return (
      <div>
          {messege && <>
          <h1>SE MODIFICO EXITOSAMENTE</h1>
         </> }
    <form  onSubmit={handlerSubmit} className={classes.root} noValidate autoComplete="off"> 
   <h1 style={{color:'#3f51b5'}}>EDITAR PRODUCTO</h1>
      <TextField id="standard-basic" value={datos.name} onChange={handlerOnChange} name='name' label={error.name}  />
      <TextField id="standard-basic" value={datos.description} onChange={handlerOnChange} name='description' label={error.description} />
      <TextField id="standard-basic" value={datos.price_unit} type='number' onChange={handlerOnChange} name='price_unit' label={error.price_unit}/>
      <TextField id="standard-basic" value={datos.stock} type='number' onChange={handlerOnChange} name='stock'  label={error.stock} />
      <Button type='submit' disabled={!isok}  color="primary">Agregar</Button>
          <Button component={Link} to='/' style={{color:'white', backgroundColor:'blue'}}> Volver</Button>
    </form>
      </div>
  );
}
