
import { useState } from 'react';
import './form.styles.css'

function Form() {
    const [input, setInput] = useState({
        name:'',
        surname:'',
        description:'',
        image:'',
        nationality:'',
        birthdate:'',
        teams:[]
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

    const validate = (input) => {
        if(/\d/.test(input.name)){
            setError({...error,name:'Formato invalido'})
            //console.log('Formato invalido')
            return;
        }
        //console.log('Todo ok haz tu dispatch');
        setError({...error,name:''})
    };


    function handleChange(event){
        setInput( {
            ...input,
            [event.target.name]:event.target.value,
        });

        validate({
            ...input,
            [event.target.name]:event.target.value,
        });
        
    }
    
    return (
        <div>
            <p>Aca va el form</p>
            <form onSubmit={""}>
                <div>
                    <label>Nombre</label>
                    <input name='name' value={input.value} onChange={handleChange}/>
                    <span>{error.name}</span>
                </div>
                <div>
                    <label>Apellido</label>
                    <input name='surname' value={input.value} onChange={handleChange}/>
                </div>
                <div>
                    <label>Nacionalidad</label>
                    <input name='nationality' value={input.value} onChange={handleChange}/>
                </div>
                <div>
                    <label>Imagen</label>
                    <input/>
                </div>
                <div>
                    <label>Descripción</label>
                    <input/>
                </div>
                <div>
                    <label>Fecha de Nacimiento</label>
                    <input/>
                </div>
                <div>
                    <label>Escuderias:</label>
                    <input/>
                </div>
                {error.name ? null : <button type='submit'>Enviar</button>}
                
            </form>
        </div>
    );
}

export default Form;