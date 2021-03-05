import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { searchProduct } from '../../utils';
import { productDetailSelector, productsListSelector } from '../../utils/selectors';
import { useDispatch, useSelector } from 'react-redux';
import { venderProduct } from '../../slices/shopSlice';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function Vender({open,setOpen}) {
  const classes = useStyles();
const[value, setValue] = useState(0)
const product = useSelector(productDetailSelector)
const dispatch = useDispatch()
const handleClose = () => {
    setOpen(false);
  };
const handlerOnChange = (e)=>{
if(e.target.value >=0 && e.target.value <= product.stock){

    setValue(e.target.value)
}
}

const handleSubmit = (e)=>{
    e.preventDefault();
    let restante = product.stock - value
    setOpen(false)
     dispatch(venderProduct({id:product.id, quantity:restante}))
}
useEffect(()=>{
console.log(product)
setValue(0)
},[product])

useEffect(()=>{
    setValue(0)
    },[])
    
  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
            timeout: 500,
        }}
        >
        {!product ? 
        <h1>Cargando..</h1>
        :

        <Fade in={open}>
          <div className={classes.paper}>
           <h1>Cuadro de venta de {product.name}</h1>
              <form onSubmit={handleSubmit} >
              <TextField id="standard-basic" value={value} type='number' onChange={handlerOnChange} name='vender' label='cantidad a vender'/>
                    <Button type='submit'>Vender</Button>
              </form>
          </div>
        </Fade>
        }
      </Modal>
    </div>
  );
}
