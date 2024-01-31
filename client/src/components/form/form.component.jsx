
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
            if(errors[error] === 'OK') disabledAux = false;
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
        <div className='contenedor-formulario'>
            {/* {console.log(state)}
            {console.log(errors)} */}
            {/* {console.log(allTeams)} */}
            <form onSubmit={handleSubmit} className='cont-form'>
                <div className='cont-form-item'>
                    <label>Nombre</label>
                    <div className='cont-form-info'>
                        <input type='text' name='name' value={state.name} onChange={handleChange} placeholder='Nombre'/>
                        <span>{errors.name}</span>
                    </div>
                </div>
                <div className='cont-form-item'>
                    <label>Apellido</label>
                    <div className='cont-form-info'>
                        <input type='text' name='surname' value={state.surname} onChange={handleChange} placeholder='Apellido'/>
                        <span>{errors.surname}</span>
                    </div>
                </div>
                <div className='cont-form-item'>
                    <label>Nacionalidad</label>
                    <div className='cont-form-info'>
                        <input type='text' name='nationality' value={state.nationality} onChange={handleChange} placeholder='Nacionalidad'/>
                        <span>{errors.nationality}</span>
                    </div>
                </div>
                <div className='cont-form-item'>
                    <label>Imagen</label>
                    <div className='cont-form-info'>
                        <input type='text' name='image' value={state.image} onChange={handleChange} placeholder='URL de la img'/>
                        <span>{errors.image}</span>
                    </div>
                </div>
                <div className='cont-form-item'>
                    <label>Descripción</label>
                    <div className='cont-form-info'>
                        <input type='text' name='description' value={state.description} onChange={handleChange} placeholder='Descripcion'/>
                        <span>{errors.description}</span>
                    </div>
                </div>
                <div className='cont-form-item'>
                    <label>Fecha de Nacimiento YY-MM-DD </label>
                    <div className='cont-form-info'>
                        <input type='text' name='birthdate' value={state.birthdate} onChange={handleChange} placeholder='Fecha de nacimiento'/>
                        <span>{errors.birthdate}</span>
                    </div>
                </div>
                <div className='cont-teams'>
                    <label>Teams:</label>
                    <div className='cont-teams-info'>
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

                    </div>
                    <div className='cont-teas-selec'>
                        {
                        state.teams.map(p => (
                            <div key={p}>
                                <button className='bton-borrar' type='button' name='teams' id={p} onClick={remove} >
                                    x
                                </button>
                                <span className='team-item' id={'teams'} key={p}>
                                    {p}
                                </span>{' '}
                            </div>
                        ))
                        }
                    </div>
                </div>
                <div className='cont-boton'>
                    <input className='cont-for-button' disabled={botonSend()} type='submit' />
                </div>
            </form>
        </div>
    );
}

export default Form;