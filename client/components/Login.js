import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import './Login.scss';



export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: '',
            password: ''
        };
    }

    login(e) {
        e.preventDefault();
        console.log('login');

        Auth.login(this.state.user, this.state.password)
            .catch((err)=> {
                console.log('Error logging in ', err)
            });
    }

    render() {
        return(
            <div className="form-page">
                <Paper className="form-window" zDepth={2}>
                    <form action="">
                        <TextField
                            hintText="User name"
                            fullWidth={true}
                            floatingLabelText="User name"
                        />

                        <TextField
                            hintText="Password"
                            fullWidth={true}
                            floatingLabelText="Password"
                        />

                        <RaisedButton
                            className="login-button"
                            label="Login"
                            fullWidth={true}
                            primary={true}
                            onClick={this.login.bind(this)}
                        />
                    </form>
                </Paper>
            </div>
        )
    }
}