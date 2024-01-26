import axios from 'axios'

export const GET_DRIVERS = 'GET_DRIVERS';
export const GET_BY_NAME = 'GET_BY_NAME';
export const GET_BY_ID = 'GET_BY_ID';


export function getDrivers(){
    return async function (dispatch) {
        //ruta local host!!!!
        //const response = await axios('http://localhost:3001/drivers');
        //ruta IP host!!!!
        const response = await axios('http://192.168.0.102:3001/drivers');
        return dispatch({
            type:'GET_DRIVERS',
            payload:response.data
        })
    };
}

export function getByName(name){
    return async function (dispatch) {
        //ruta local host!!!!
        //const response = await axios(`http://localhost:3001/drivers/name?name=${name}`);
        //ruta IP host!!!!
        const response = await axios(`http://192.168.0.102:3001/drivers/name?name=${name}`);
        return dispatch({
            type:'GET_BY_NAME',
            payload:response.data
        })
    };
}

export function getById(id){
    return async function (dispatch) {
        //ruta local host!!!!
        //const response = await axios(`http://localhost:3001/drivers/idDriver/${id}`);
        //ruta IP host!!!!
        const response = await axios(`http://192.168.0.102:3001/drivers/idDriver/${id}`);
        return dispatch({
            type: 'GET_BY_ID',
            payload:response.data
        })
    }
}