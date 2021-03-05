import React,{useEffect, useState}from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { useDispatch, useSelector } from 'react-redux';
import { deleteProduct, getProduct, setProductDetail } from '../../slices/shopSlice';
import { productsListSelector, statusSelector } from '../../utils/selectors';
import { Link } from 'react-router-dom';
import Modal from '../modal/index'
import { searchProduct } from '../../utils';
import Search from '../search';
const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);


const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

export default function ProductsList() {
  const classes = useStyles();
  const dispatch = useDispatch()
  const status = useSelector(statusSelector);
  const products = useSelector(productsListSelector);
  const [id, setId] = useState(0)
  const [sync, setSync] = useState(false)
const [open, setOpen] = useState(false)



  const handleVender = (e)=>{
      setId(e)
      dispatch(setProductDetail(searchProduct(e,products)))
      setSync(false)
    setOpen(true)
}
const handleDelete = (e)=> {
   
dispatch(deleteProduct(e))
setSync(false)
}
const handleVerTodo = (e)=>{
    dispatch(getProduct())
}
useEffect(()=>{
    if(!sync){
        dispatch(getProduct())
        setSync(true);
    }
},[sync])

useEffect(()=>{
   setSync(false)
},[status])
  return (
    <TableContainer component={Paper}>
        <h1> LISTA DE PRODUCTOS</h1>
        <Search></Search>
        <Button onClick={handleVerTodo}>Ver Todo</Button>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Nombre del producto</StyledTableCell>
            <StyledTableCell align="right">Descripcion</StyledTableCell>
            <StyledTableCell align="right">Stock</StyledTableCell>
            <StyledTableCell align="right">Precio Unitario</StyledTableCell>
            <StyledTableCell align="right">Vender</StyledTableCell>
            <StyledTableCell align="right">Editar</StyledTableCell>
            <StyledTableCell align="right">Eliminar</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          { products.map((dato,i) => (
            <StyledTableRow key={dato.name + i}>
              <StyledTableCell component="th" scope="row">
                {dato.name}
              </StyledTableCell>
              <StyledTableCell align="right">{dato.description}</StyledTableCell>
              <StyledTableCell align="right">{dato.stock}</StyledTableCell>
              <StyledTableCell align="right">{dato.price_unit}</StyledTableCell>
              <StyledTableCell align="right">
                  <Button onClick={()=>handleVender(dato.id)}>Vender</Button></StyledTableCell>
              <StyledTableCell align="right"> <Button component={Link} to={`/update/${dato.id}`}>Editar</Button> </StyledTableCell>
              <StyledTableCell align="right"><Button onClick={ ()=>handleDelete(dato.id)}>Eliminar</Button></StyledTableCell>

            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
          <Modal open={open} setOpen={setOpen} id={id}></Modal>
    </TableContainer>
  );
}
