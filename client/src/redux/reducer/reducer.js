//import { GET_BY_NAME, GET_BY_ID } from "../actions/actions"
import { GET_DRIVERS, GET_BY_NAME, GET_BY_ID, GET_TEAMS, PAGINATE, FILTER, RESET, CLEAN_DETAIL, DRIVER_BY_TEAM } from "../actions/action-types";


let initialState = {
    allDrivers:[], 
    driversCopy:[],
    driversFiltered:[], 
    allTeams:[], 
    post: [], 
    driver: {},
    filters:false,
    currentPage:0
};

function rootReducer(state = initialState, action){
    const ITEMS_PER_PAGE = 9;
    switch(action.type){
        case GET_TEAMS:
            return{
                ...state,
                allTeams: action.payload,
        };

        case GET_DRIVERS:
            return{
                ...state,
                allDrivers: [...action.payload]. splice(0, ITEMS_PER_PAGE),
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
        case RESET:
            // console.log(`allDriver= ${state.allDrivers.length}`)
            console.log(`DriverCopy= ${state.driversCopy.length}`)
            // console.log(`DriverFilter= ${state.driversFiltered.length}`)
            return{
                ...state,
                allDrivers:[...state.driversCopy].splice(0, ITEMS_PER_PAGE),
                filters:false,
                driversFiltered:[],
                currentPage:0,
            }

        case CLEAN_DETAIL:
            return{
                ...state,
                driver: {}
            }

        case PAGINATE:
            const next_page = state.currentPage + 1;
            const prev_page = state.currentPage - 1;
            const firstIndex = action.payload === 'next' ? next_page * ITEMS_PER_PAGE : prev_page * ITEMS_PER_PAGE

            if(state.filters){
                if(action.payload === 'next' && firstIndex >= state.driversFiltered.length) return state
                else if(action.payload === 'prev' && prev_page < 0) return state
                return{
                    ...state,
                    allDrivers: [...state.driversFiltered].splice(firstIndex, ITEMS_PER_PAGE),
                    currentPage: action.payload === 'next' ? next_page : prev_page
                }
            }

            if(action.payload === 'next' && firstIndex >= state.driversCopy.length) return state
            else if(action.payload === 'prev' && prev_page < 0) return state

            return{
                ...state,
                allDrivers: [...state.driversCopy].splice(firstIndex, ITEMS_PER_PAGE),
                currentPage: action.payload === 'next' ? next_page : prev_page
            }

        case DRIVER_BY_TEAM:
            //console.log(action.payload.dataTeam)

            let team = action.payload.dataTeam.toLowerCase();
            let driverWhitTeam = state.driversCopy.filter((driver)=>{
                    //Busqueda presiza de los teams
                    //return driver.teams.some((teamName) => teamName.toLowerCase() === team)
                    //Busqueda de similitud en los nombres de los teams
                    return driver.teams.some((teamName) => teamName.toLowerCase().includes(team))
                })
            return{
                ...state,
                allDrivers: [...driverWhitTeam].splice(0, ITEMS_PER_PAGE),
                driversFiltered: driverWhitTeam,
                currentPage: 0,
                filters:true
            }
            


        case FILTER:
            switch (action.payload) {
                case 'AZ':
                    let asc = [];
                    if(state.filters){
                        asc = [...state.driversFiltered].sort((prev, next) =>{
                            if(prev.name.toLowerCase()>next.name.toLowerCase()) return 1
                            if(prev.name.toLowerCase()<next.name.toLowerCase()) return -1
                            return 0
                        })
                        return {
                            ...state,
                            allDrivers: [...asc].splice(0, ITEMS_PER_PAGE),
                            driversFiltered: asc,
                            currentPage: 0
                        }
                    }else{
                        asc = [...state.driversCopy].sort((prev, next) =>{
                            if(prev.name.toLowerCase()>next.name.toLowerCase()) return 1
                            if(prev.name.toLowerCase()<next.name.toLowerCase()) return -1
                            return 0
                        })
                        return {
                            ...state,
                            allDrivers: [...asc].splice(0, ITEMS_PER_PAGE),
                            driversCopy: asc,
                            currentPage: 0
                        }
                    }

                case 'ZA':
                    let dec = [];
                    if(state.filters){
                        dec = [...state.driversFiltered].sort((prev, next) =>{
                            if(prev.name.toLowerCase()>next.name.toLowerCase()) return -1
                            if(prev.name.toLowerCase()<next.name.toLowerCase()) return 1
                            return 0
                        })
                        return {
                            ...state,
                            allDrivers: [...dec].splice(0, ITEMS_PER_PAGE),
                            driversFiltered: dec,
                            currentPage: 0
                        }
                    }else{
                        dec = [...state.driversCopy].sort((prev, next) =>{
                            if(prev.name.toLowerCase()>next.name.toLowerCase()) return -1
                            if(prev.name.toLowerCase()<next.name.toLowerCase()) return 1
                            return 0
                        })
                        return {
                            ...state,
                            allDrivers: [...dec].splice(0, ITEMS_PER_PAGE),
                            driversCopy: dec,
                            currentPage: 0
                        }
                    }

                case 'API': 
                    let api = [...state.driversCopy].filter((driver)=>driver.created === false)
                    
                    return{
                        ...state,
                        allDrivers: [...api].splice(0, ITEMS_PER_PAGE),
                        driversFiltered: api,
                        currentPage: 0,
                        filters:true
                    }

                case 'DB':
                    let BDD = [...state.driversCopy].filter((driver)=>isNaN(driver.id))
                    
                    return{
                        ...state,
                        allDrivers: [...BDD].splice(0, ITEMS_PER_PAGE),
                        driversFiltered: BDD,
                        currentPage: 0,
                        filters:true
                    }

                case 'DOBUP':
                    let dobUp = []
                    if(state.filters){
                        dobUp = [...state.driversFiltered].sort((prev, next) =>{
                            if(prev.birthdate>next.birthdate) return 1
                            if(prev.birthdate<next.birthdate) return -1
                            return 0
                        })
                        return {
                            ...state,
                            allDrivers: [...dobUp].splice(0, ITEMS_PER_PAGE),
                            driversFiltered: dobUp,
                            currentPage: 0
                        }
                    }else{
                        dobUp = [...state.driversCopy].sort((prev, next) =>{
                            if(prev.birthdate>next.birthdate) return 1
                            if(prev.birthdate<next.birthdate) return -1
                            return 0
                        })
                        return {
                            ...state,
                            allDrivers: [...dobUp].splice(0, ITEMS_PER_PAGE),
                            driversCopy: dobUp,
                            currentPage: 0
                        }
                    }
                    

                case 'DOBDOWN':
                    let dobDown = [];
                    if(state.filters){
                        dobDown = [...state.driversCopy].sort((prev, next) =>{
                            if(prev.birthdate>next.birthdate) return -1
                            if(prev.birthdate<next.birthdate) return 1
                            return 0
                        })
                        return {
                            ...state,
                            allDrivers: [...dobDown].splice(0, ITEMS_PER_PAGE),
                            driversFiltered: dobDown,
                            currentPage: 0
                        }
                    }else{
                        dobDown = [...state.driversCopy].sort((prev, next) =>{
                            if(prev.birthdate>next.birthdate) return -1
                            if(prev.birthdate<next.birthdate) return 1
                            return 0
                        })
                        return {
                            ...state,
                            allDrivers: [...dobDown].splice(0, ITEMS_PER_PAGE),
                            driversCopy: dobDown,
                            currentPage: 0
                        }
                    }

                default: return state
            }

        
        default:
            return state
    }
}

export default rootReducer