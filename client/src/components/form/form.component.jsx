
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDrivers, getTeams, postDriver } from '../../redux/actions/actions';
import { validate, validateTeams } from './validate';

import './form.styles.css'


function Form() {
    const dispatch = useDispatch();
    const allTeams = useSelector((state) => state.allTeams);

    useEffect(() => {
        dispatch(getTeams())
    },[dispatch])

    const [state, setState] = useState({
        name:'',
        surname:'',
        description:'',
        image:'',
        nationality:'',
        birthdate:'',
        teams:[],
        teamsFilter: '',
    });

    const [errors, setError] = useState({
        name:'Requerido!!',
        surname:'Requerido!!',
        description:'Requerido!!',
        image:'Requerido!!',
        nationality:'Requerido!!',
        birthdate:'Requerido!!',
        teams: 'Requerido!!',
    });
    //Es la unica forma que conosco de poder validar el array en tiempo real
    useEffect(() => {
        const validaciones = validateTeams(state);
        setError({ ...errors, ...validaciones});
    }, [state.teams])

    const handleChange = (event) => {
        event.preventDefault()

        if(event.target.name === 'teams'){
            if(state.teams.includes(event.target.value) || event.target.value === 'seleccione') return
            setState( {
                ...state,
                [event.target.name]: [...state[event.target.name], event.target.value],
                teamsFilter: '',
            });  
            return
        }

        if (event.target.name === 'teamsFilter') {
            setState({
                ...state,
                teamsFilter: event.target.value,
            });
            return
        }

        setState( {
            ...state,
            [event.target.name]:event.target.value,
        });

        const validaciones = validate({ ...state,
            [event.target.name]: event.target.value }, event.target.name, errors);
            setError(validaciones);
    }

    const botonSend = () => {
        let disabledAux = true;
        for(let error in errors){
            if(errors[error] === '') disabledAux = false;
            else{
                disabledAux = true;
                break; //quitar en el momento de darle estilos al form
            }
        }
        return disabledAux
    }

    const remove = (event) => {
        //const value = document.getElementById(event.target.name).value
        setState({
            ...state,
            [event.target.name]: [...state[event.target.name].filter(x => x!==event.target.id)]
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(postDriver({...state, teams: state.teams.join(', ')})).then(() => {
            dispatch(getDrivers())
            //Limpiar el state al realizar el post!!
            setState({
                name:'',
                surname:'',
                description:'',
                image:'',
                nationality:'',
                birthdate:'',
                teams:[],
                teamsFilter: '',
            })
        })

    }

    const  filteredEquipos = ['seleccione'].concat(allTeams.filter((p) =>
    p.toLowerCase().includes(state.teamsFilter.toLowerCase())
    ));
    
    return (
        <div>
            {/* {console.log(state)}
            {console.log(errors)} */}
            {/* {console.log(allTeams)} */}
            <p>Aca va el form</p>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nombre</label>
                    <input type='text' name='name' value={state.name} onChange={handleChange} placeholder='Nombre'/>
                    <span>{errors.name}</span>
                </div>
                <div>
                    <label>Apellido</label>
                    <input type='text' name='surname' value={state.surname} onChange={handleChange} placeholder='Apellido'/>
                    <span>{errors.surname}</span>
                </div>
                <div>
                    <label>Nacionalidad</label>
                    <input type='text' name='nationality' value={state.nationality} onChange={handleChange} placeholder='Nacionalidad'/>
                    <span>{errors.nationality}</span>
                </div>
                <div>
                    <label>Imagen</label>
                    <input type='text' name='image' value={state.image} onChange={handleChange} placeholder='URL de la img'/>
                    <span>{errors.image}</span>
                </div>
                <div>
                    <label>Descripción</label>
                    <input type='text' name='description' value={state.description} onChange={handleChange} placeholder='Descripcion'/>
                    <span>{errors.description}</span>
                </div>
                <div>
                    <label>Fecha de Nacimiento </label>
                    <label >ejem: YEAR-MONT-DAY</label>
                    <input type='text' name='birthdate' value={state.birthdate} onChange={handleChange} placeholder='Fecha de nacimiento'/>
                    <span>{errors.birthdate}</span>
                </div>
                <div>
                    <label>Teams:</label>
                    <input
                        type="text"
                        name='teamsFilter'
                        onChange={handleChange}
                        value={state.teamsFilter || ''}
                        placeholder="Buscar equipo"
                    />
                    <select  name="teams" id="" onChange={handleChange}>
                        {filteredEquipos.map((p) => (
                            <option key={p} value={p}>
                                {p}
                            </option>
                        ))}
                        
                    </select>
                    <span>{errors.teams}</span>
                    
                        {
                        state.teams.map(p => (
                            <div key={p}>
                                <span id={'teams'} key={p}>
                                    {p}
                                </span>{' '}
                                <button type='button' name='teams' id={p} onClick={remove} >
                                    x
                                </button>
                            </div>
                        ))
                        }
                    
                </div>
                
                {/* {errors.cantidadErrores ? null : <button type='submit'>Enviar</button>} */}
                <input disabled={botonSend()} type='submit' />
            </form>
        </div>
    );
}

export default Form;