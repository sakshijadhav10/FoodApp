import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    carts: []
}

const cartSlice = createSlice({
    name: 'Cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            // Adds the new item to the carts array
            
            const ItemIndex=state.carts.findIndex((item)=>item.id===action.payload.id)
             if(ItemIndex>=0){
                state.carts[ItemIndex].qnty+=1
             }
             else{
                const temp={...action.payload,qnty:1}
                
                state.carts=[...state.carts,temp]
            }          
            
            // state.carts=[...state.carts,action.payload]

        },
        removeCart:(state,action)=>{
            const data=state.carts.filter((element)=>element.id!=action.payload)
            state.carts=data

        },
        removeSingleItems:(state,action)=>{
            const ItemIndex=state.carts.findIndex((item)=>item.id===action.payload.id)
             if(ItemIndex>=0){
                state.carts[ItemIndex].qnty-=1
             }
             else{
                const temp={...action.payload,qnty:1}
                
                state.carts=[...state.carts,temp]
            }       
        },
        emptyCarts:(state,action)=>{
            state.carts=[]
        }
    }
})

export const { addToCart ,removeCart,removeSingleItems,emptyCarts} = cartSlice.actions
export default cartSlice.reducer
