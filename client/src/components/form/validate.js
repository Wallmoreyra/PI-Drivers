export const validate = (state, name, errors) => {
    const formatoFecha = /^\d{4}-\d{2}-\d{2}$/;

    //validacion de name
    if(name === 'name'){
        if(state.name === '') return {...errors,name:'Requerido'}
        else if(state.name.length >= 20) return {...errors,name:'Menos de 20 caracteres'}
        else if(state.name.length < 3) return {...errors,name:'Al menos 4 caracteres'}
        else if(!/^[a-zA-Z]+$/.test(state.name)) return {...errors,name:'Solo puede tener letras!'}
        else return {...errors, name:'OK'}
    }
    //validacion de surname
    if(name === 'surname'){
        if(state.surname === '') return {...errors,surname:'Requerido'}
        else if(state.surname.length >= 20) return {...errors,surname:'Menos de 20 caracteres'}
        else if(state.surname.length < 3) return {...errors,surname:'Al menos 4 caracteres'}
        else if(!/^[a-zA-Z]+$/.test(state.surname)) return {...errors,surname:'Solo puede tener letras!'}
        else return {...errors, surname:'OK'}
    }
    //validacion de nacionalidad - nationality
    if(name === 'nationality'){
        if(state.nationality === '') return {...errors,nationality:'Requerido'}
        else if(state.nationality.length >= 15) return {...errors,nationality:'Menos de 15 caracteres'}
        else if(state.nationality.length < 3) return {...errors,nationality:'Al menos 4 caracteres'}
        else if(!/^[a-zA-Z]+$/.test(state.nationality)) return {...errors,nationality:'Solo puede tener letras!'}
        else return {...errors, nationality:'OK'}
    }
    //validacion de imagen - image
    if(name === 'image'){
        if(state.image === '') return {...errors,image:'Requerido'}
        else if(!/\.(jpeg|jpg|gif|png)$/i.test(state.image)) return {...errors,image:'La extencion es incorrecta!'}
        else return {...errors, image:'OK'}
    }
    //validacion de descripcion - description
    if(name === 'description'){
        if(state.description === '') return {...errors,description:'Requerido'}
        else if(state.description.length >= 200) return {...errors,description:'Menos de 200 caracteres'}
        else if(state.description.length < 3) return {...errors,description:'Al menos 4 caracteres'}
        else return {...errors, description:'OK'}
    }
    //validacion de fecha de nacimiento - birthdate
    if(name === 'birthdate'){
        if(state.birthdate === '') return {...errors,birthdate:'Requerido'}
        else if(!formatoFecha.test(state.birthdate)) return {...errors,birthdate:'Formato incorrecto'}
        else return {...errors, birthdate:'OK'}
    }
   

    return errors;
};

export const validateTeams = (state) => {
    //validacion de Teams
    if(state.teams.length === 0) return {teams:'Requerido!!'}
    else if (state.teams.length < 2) {
        return {teams: '2 teams min'};
    }else if (state.teams.length > 6) {
        return {teams: '6 teams max'};
    }

    return { teams: 'OK'}
}