import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { signin } from '../../actions';
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
    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth);

    const handleSubmit = e => {
        e.preventDefault()
        const user = {
            email, password
        }
        dispatch(signin(user))
    }

    if (auth.authenticated) {
        return <Redirect to='/' />
    }

    return (
        <Layout>
            <div className='credentialContainer'>
                <Card>
                    <form onSubmit={handleSubmit} className='credentialForm'>
                        <h3>Sign In</h3>
                        <input
                            required
                            type='email'
                            value={email}
                            placeholder='email'
                            onChange={e => setEmail(e.target.value)}
                        />
                        <input
                            required
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