import React, { useState } from 'react';
import Layout from '../../componants/Layout';
import Card from '../../componants/UI/Card';
import '../style.css';

/**
* @author
* @function SigninPage
**/

const SigninPage = (props) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = e => {
        e.preventDefault()
        console.log(email, password)
    }

    return (
        <Layout>
            <div className='credentialContainer'>
                <Card>
                    <form onSubmit={handleSubmit} className='credentialForm'>
                        <h3>Sign In</h3>
                        <input
                            type='text'
                            value={email}
                            placeholder='email'
                            onChange={e => setEmail(e.target.value)}
                        />
                        <input
                            type='password'
                            value={password}
                            placeholder='password'
                            onChange={e => setPassword(e.target.value)}
                        />
                        <div className='btn'>
                            <button>Sign In</button>
                        </div>
                    </form>
                </Card>
            </div>
        </Layout>
    )
}

export default SigninPage;