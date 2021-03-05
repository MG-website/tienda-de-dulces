import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import {addEndpoint, updateEndpoint, deleteEndpoint, getEndpoint, venderEndpoint} from '../utils/constants/endpoints'

const initialState_product = {
     status:'idle',
     products : [],
     productDetail:{},
  };

  
export const addProduct = createAsyncThunk(
    'shop/add',
    async (payload) => {
      const resp = await axios.post(addEndpoint, payload);
      return resp;
    }
  );
  
  export const getProduct = createAsyncThunk(
    'shop/get',
    async () => {
      const resp = await axios.get(getEndpoint);
      return resp.data;
    }
  );
  
  export const updateProduct = createAsyncThunk(
    'shop/update',
    async (payload) => {
      const resp = await axios.put(updateEndpoint, payload);
      return resp;
    }
  );
  
  export const venderProduct = createAsyncThunk(
    'shop/vender',
    async (payload,{dispatch}) => {
        const resp = await axios.put(venderEndpoint, payload);
        const get = await dispatch(getProduct())
      return resp;
    }
  );
  
  
export const deleteProduct = createAsyncThunk(
    'shop/delete',
    async (payload,{dispatch}) => {
      const resp = await axios.delete(deleteEndpoint +'/'+ payload);
      const get = await dispatch(getProduct())
      return resp;
    }
  );
  
const shopSlice = createSlice({
    name: 'productDetail',
    initialState: initialState_product,
    reducers: {
      setProductDetail(state, {payload}) {
        state.productDetail = payload;
      },
      search(state, {payload}) {
          let dato = payload.toLowerCase()
          state.products = state.products.filter(e => e.name.toLowerCase() === dato )
      },
    },
    extraReducers: {
      [addProduct.pending]: (state, action) => {
        state.status = 'loading';
      },
      [addProduct.fulfilled]: (state, { payload }) => {
        state.status = 'successful';
      },
      [addProduct.rejected]: (state, action) => {
        state.status = 'rejected';
      },
      [updateProduct.pending]: (state, action) => {
        state.status = 'loading';
      },
      [updateProduct.fulfilled]: (state, { payload }) => {
        state.status = 'successful';
      },
      [updateProduct.rejected]: (state, action) => {
        state.status = 'rejected';
      },
      [deleteProduct.pending]: (state, action) => {
        state.status = 'loading';
      },
      [deleteProduct.fulfilled]: (state, { payload }) => {
        state.status = 'successful';
      },
      [deleteProduct.rejected]: (state, action) => {
        state.status = 'rejected';
      },
      [getProduct.pending]: (state, action) => {
        state.status = 'loading';
      },
      [getProduct.fulfilled]: (state, { payload }) => {
        state.status = 'successful';
        state.products = payload
      },
      [getProduct.rejected]: (state, action) => {
        state.status = 'rejected';
        state.error = action.payload
      },
      [venderProduct.pending]: (state, action) => {
        state.status = 'loading';
      },
      [venderProduct.fulfilled]: (state, { payload }) => {
        state.status = 'successful';
      },
      [venderProduct.rejected]: (state, action) => {
        state.status = 'rejected';
        state.error = action.payload
      },
    },
  });
  export const {setProductDetail, search} = shopSlice.actions;
  export default shopSlice;
