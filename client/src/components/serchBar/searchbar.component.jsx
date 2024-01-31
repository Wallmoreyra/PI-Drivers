import './searchbar.styles.css'

function Searchbar({handleChange, handleSubmit}) {
    return (
        <div className='search-box'>     
            <form className='search-box-items'  onChange={handleChange}>
                <label>Por Name:</label>
                <input placeholder='Busqueda'  type='search' />
                <button className='search-box-item-boton' type='submit' onClick={handleSubmit}>Buscar</button>
            </form>
        </div>
    );
}

export default Searchbar;