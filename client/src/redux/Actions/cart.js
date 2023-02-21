export const ADD_ITEM = 'ADD_ITEM';
export const REMOVE_ITEM = 'REMOVE_ITEM';
export const UPDATE_ITEM = 'UPDATE_ITEM';

export const addItem= (items)=> {
    return {
        type: ADD_ITEM,
        payload: items
    }
}
export const removeItem= (id)=> {
    return {
        type: REMOVE_ITEM,
        payload: id
    }
}
export const updateItem= (items)=> {
    return {
        type: UPDATE_ITEM,
        payload: items
    }
}

