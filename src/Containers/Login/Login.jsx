
import { useEffect, useState} from 'react';
import axiosInstance from '../../axios';
import {useNavigate} from 'react-router-dom'

const Login = (props) => {

    const [authentication, setAuthentication] = useState({username: '', password: ''})
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('userId')) {
            navigate('/ListRecipe')
        }
    }, []);

    const submit = () => {
        axiosInstance({
            method: 'POST',
            url: 'authenticate',
            data: {
                authentication: {
                    username: authentication.username,
                    password: authentication.password
                }
            }
        }).then(data => {
            localStorage.setItem('userId', data.data.user.Id);
            navigate('/ListRecipe')
        })
        .catch(err => {
            alert('well...shit happens :(');
        })
    }

    return (
        <div className="container mt-4">
            <div style={{width: '400px', margin: 'auto'}}>
                <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="form2Example1">Username</label>
                    <input onChange={(e) => {setAuthentication({...authentication, username: e.target.value})}} type="username" id="form2Example1" className="form-control" />
                </div>

                <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="form2Example2">Password</label>
                    <input onChange={(e) => {setAuthentication({...authentication, password: e.target.value})}} type="password" id="form2Example2" className="form-control" />
                </div>
                <button style={{ float: 'right' }} type="button" className="btn btn-primary btn-block mb-4" onClick={submit}>Sign in</button>
            </div>
        </div>
    )
}

export default Login;