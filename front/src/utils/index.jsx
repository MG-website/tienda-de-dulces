export const searchProduct = (id, array)=>{
    let res = array.find( e =>  e.id === id*1)
    return res
};