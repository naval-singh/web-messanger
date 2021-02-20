import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { signup } from '../../actions';
import Layout from '../../componants/Layout';
import Card from '../../componants/UI/Card';
import '../style.css';

/**
* @author
* @function SignupPage
**/

const SignupPage = (props) => {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();

    const handleSubmit = e => {
        e.preventDefault()
        const user = {
            firstName, lastName, email, password
        }
        dispatch(signup(user))
    }
    return (
        <Layout>
            <div className='credentialContainer'>
                <Card>
                    <form onSubmit={handleSubmit} className='credentialForm'>
                        <h3>Sign Up</h3>
                        <div style={{ display: 'flex' }}>
                            <input
                                style={{ marginRight: 7 }}
                                type='text'
                                value={firstName}
                                placeholder='first name'
                                onChange={e => setFirstName(e.target.value)}
                            />
                            <input
                                style={{ marginLeft: 8 }}
                                type='text'
                                value={lastName}
                                placeholder='last name'
                                onChange={e => setLastName(e.target.value)}
                            />
                        </div>
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
                            <button>Sign Up</button>
                        </div>
                    </form>
                </Card>
            </div>
        </Layout>
    )
}

export default SignupPage;