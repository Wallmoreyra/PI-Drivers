
import { useState } from 'react';
import './form.styles.css'

function Form() {
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

    const [error, setError] = useState({
        name:'',
        surname:'',
        description:'',
        image:'',
        nationality:'',
        birthdate:'',
        teams:[]
    });

    const validate = (state) => {
        if(/\d/.test(state.name)){
            setError({...error,name:'Formato invalido'})
            //console.log('Formato invalido')
            return;
        }
        //console.log('Todo ok haz tu dispatch');
        setError({...error,name:''})
    };


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

        validate({
            ...state,
            [event.target.name]:event.target.value,
        });
        
    }

    const remove = (event) => {
        const value = document.getElementById(event.target.name).value
        setState({
            ...state,
            [event.target.name]: [...state[event.target.name].filter(x => x!==event.target.id)]
        })
    }

    const equipos = [
        'Audi', 'BMW', 'Ferrary', 'Citroen', 'Maceraty', 'Pagany', 'Mazda', 'Toyota', 'VW'
    ];

    const filteredEquipos = ['seleccione'].concat(equipos.filter((p) =>
    p.toLowerCase().includes(state.teamsFilter.toLowerCase())
    ));
    
    return (
        <div>
            {console.log(state)}
            <p>Aca va el form</p>
            <form >
                <div>
                    <label>Nombre</label>
                    <input type='text' name='name' value={state.value} onChange={handleChange} placeholder='Nombre'/>
                    <span>{error.name}</span>
                </div>
                <div>
                    <label>Apellido</label>
                    <input type='text' name='surname' value={state.value} onChange={handleChange} placeholder='Apellido'/>
                </div>
                <div>
                    <label>Nacionalidad</label>
                    <input type='text' name='nationality' value={state.value} onChange={handleChange} placeholder='Nacionalidad'/>
                </div>
                <div>
                    <label>Imagen</label>
                    <input type='text' name='image' value={state.image} onChange={handleChange} placeholder='URL de la img'/>
                </div>
                <div>
                    <label>Descripción</label>
                    <input/>
                </div>
                <div>
                    <label>Fecha de Nacimiento</label>
                    <input/>
                </div>
                {/* <div>
                    <label>Teams:</label>
                    <input />
                    <select onChange={handleChange} name="teams" id="">
                        {
                            equipos.map(p => <option key={p} value={p}>{p}</option>)
                        }
                        
                    </select>
                    {
                        state.teams.map(p => <div key={p}><span id={'teams'} key={p}>{p}</span> <button type='button' name='teams' id={p} onClick={remove} >x</button></div> )
                    }
                    
                </div> */}
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
                
                {error.name ? null : <button type='submit'>Enviar</button>}
                
            </form>
        </div>
    );
}

export default Form;