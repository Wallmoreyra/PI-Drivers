//import { GET_BY_NAME, GET_BY_ID } from "../actions/actions"
import { GET_DRIVERS, GET_BY_NAME, GET_BY_ID, GET_TEAMS } from "../actions/action-types";


let initialState = {allDrivers:[], allTeams:[], driversCopy:[], post: [], driver: {}}

function rootReducer(state = initialState, action){
    switch(action.type){
        case GET_TEAMS:
        return{
            ...state,
            allTeams: action.payload,
        };

        case GET_DRIVERS:
        return{
            ...state,
            allDrivers: [...action.payload]. splice(0, 9),
            driversCopy: action.payload
        };

        case GET_BY_NAME:
        return {
            ...state,
            allDrivers: action.payload,
        };

        case GET_BY_ID:
        return {
            ...state,
            driver: action.payload,
        }

        default:
            return state
    }
}

export default rootReducer