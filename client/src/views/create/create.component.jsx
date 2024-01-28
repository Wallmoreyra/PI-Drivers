import './create.styles.css'

import Navbar from '../../components/navbar/navbar.component';
import Form from '../../components/form/form.component';

function Create() {
    return (
        <>
            <div >
                <p>Create page</p>
            </div>
            <div>
                <Navbar/>
            </div>
            <div>
                <Form/>
            </div>
        </>
    );
}

export default Create;