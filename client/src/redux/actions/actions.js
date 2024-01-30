// importar las action-types

import axios from 'axios'

// export const GET_DRIVERS = 'GET_DRIVERS';
// export const GET_BY_NAME = 'GET_BY_NAME';
// export const GET_BY_ID = 'GET_BY_ID';

// action creators

export function getTeams(){
    return async function (dispatch) {
        try {
            //ruta local host!!!!
            //const response = await axios('http://localhost:3001/teams');
            //ruta IP host!!!!
            const response = await axios.get('http://192.168.0.102:3001/teams');
            return dispatch({
                type:'GET_TEAMS',
                payload:response.data
            })
        } catch (error) {
            console.log(error)
        }
        
    };
}
export function getDrivers(){
    return async function (dispatch) {
        try {
            //ruta local host!!!!
            //const response = await axios('http://localhost:3001/drivers');
            //ruta IP host!!!!
            const response = await axios.get('http://192.168.0.102:3001/drivers');
            return dispatch({
                type:'GET_DRIVERS',
                payload:response.data
            })
        } catch (error) {
            console.log(error)
        }
        
    };
}

export function getByName(name){
    return async function (dispatch) {
        try {
            //ruta local host!!!!
            //const response = await axios(`http://localhost:3001/drivers/name?name=${name}`);
            //ruta IP host!!!!
            const response = await axios.get(`http://192.168.0.102:3001/drivers/name?name=${name}`);
            return dispatch({
                type:'GET_BY_NAME',
                payload:response.data
            })
        } catch (error) {
            console.log(error)
        }
    };
}

export function getById(id){
    return async function (dispatch) {
        try {
            //ruta local host!!!!
            //const response = await axios(`http://localhost:3001/drivers/idDriver/${id}`);
            //ruta IP host!!!!
            const response = await axios.get(`http://192.168.0.102:3001/drivers/idDriver/${id}`);
            return dispatch({
                type: 'GET_BY_ID',
                payload:response.data
            })
        } catch (error) {
            console.log(error)
        }
    }
}

export function postDriver(state){
    return async function(dispatch) {
        try{
            //ruta local host!!!!
            //const response = await axios.post('http://localhost:3001/drivers');
            //ruta IP host!!!!
            await axios.post('http://192.168.0.102:3001/drivers', state);
            alert('Driver creado con exito.')

        } catch (error) {
            alert(error.response.data.error)
        }
    }
}

export function page (order) {
    return function(dispatch){
        dispatch({
            type:'PAGINATE',
            payload:order
        })
    }
}

export function driversFilter (order) {
    return function(dispatch){
        dispatch({
            type:'FILTER',
            payload:order
        })
    }
}

export function driverByTeam (dataTeam) {
    return function(dispatch){
        dispatch({
            type:'DRIVER_BY_TEAM',
            payload:{dataTeam}
        })
    }
}

export function resetDrivers () {
    return function(dispatch){
        dispatch({
            type:'RESET',
        })
    }
}

export const cleanDetail = () => {
    return {
        type: 'CLEAN_DETAIL',
    }
}