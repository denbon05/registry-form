import React from 'react';
import _ from 'lodash';
import axios from 'axios';
import validate from './validator';
import './RegistryForm.css';

const sendData = async (data) => {
  const headers = {
    'Content-Type': 'application/json;charset=UTF-8',
    'Access-Control-Allow-Origin': '*',
  };
  const res = await axios.post(
    '/users',
    { data, headers },
    {
      proxy: {
        host: '127.0.0.1',
        port: 9000,
      },
    }
  );
  return res;
};

const getNameOfInput = (err) => {
  if (_.isArray(err)) return 'net';
  return _.head(_.words(err)) || null;
};
export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        username: '',
        password: '',
      },
      status: 'filling',
      error: null,
    };
  }

  componentDidMount() {
    document.getElementById('username').focus();
  }

  submitForm = async (e) => {
    e.preventDefault();
    const { data } = this.state;
    try {
      await validate(data);
      this.setState({ status: 'sending', error: null });
      const res = await sendData(data);
      console.log('RESPONSE=>', res);
      const { errors } = res.data;
      if (errors) {
        this.setState({ status: 'failed', error: errors });
      } else {
        console.log('response=>', res);
        this.setState({ status: 'success', data: { username: '', password: '' }, error: null });
      }
    } catch (error) {
      console.log('validate-message=>>', error);
      if (error.name === 'ValidationError') {
        this.setState({ status: 'filling', error: error.message });
      }
      if (error.name === 'NetErr') this.setState({ status: 'failed', error: error.message });
      this.setState({ status: 'failed', error: error.message });
    }
  };

  handlerInput = (dataType) => ({ target }) => {
    const { data } = this.state;
    this.setState({ data: { ...data, [dataType]: target.value } });
  };

  render() {
    console.log('state-in-RENDER=>', this.state);
    const { status, error, data } = this.state;
    const buttonOff = status === 'sending';
    const nameInputDanger = getNameOfInput(error);
    const inputsIds = ['username', 'password'];
    console.log('nameInputDanger-RENDER=>', nameInputDanger);
    const inputClasses = {
      username: 'input-filed',
      password: 'input-filed',
    };
    if (nameInputDanger) inputClasses[nameInputDanger] = `${inputClasses[nameInputDanger]} danger`;
    return (
      <div className="form-container">
        <form className="form" onSubmit={this.submitForm}>
          {status === 'failed' && !inputsIds.includes(nameInputDanger) && (
            <div className="err">{error}</div>
          )}
          {status === 'success' && <div className="success">Registered success!</div>}
          <div className="form-item">
            <label htmlFor="username">Username:</label>
            <input
              value={data.username}
              onChange={this.handlerInput('username')}
              type="text"
              className={inputClasses.username}
              aria-label="username"
              id="username"
            />
            {nameInputDanger === 'username' && <div className="err">{error}</div>}
          </div>
          <div className="form-item">
            <label htmlFor="password">Password:</label>
            <input
              value={data.password}
              onChange={this.handlerInput('password')}
              type="password"
              aria-label="password"
              className={inputClasses.password}
              id="password"
            />
            {nameInputDanger === 'password' && <div className="err">{error}</div>}
          </div>

          <div className="form-item">
            <input disabled={buttonOff} type="submit" value="Sign Up" id="formButton" />
          </div>
        </form>
      </div>
    );
  }
}
