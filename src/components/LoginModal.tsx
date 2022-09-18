import { useState } from 'react';
import localStorageService from '../services/localStorage.service';
import './styles/LoginModal.scss'
export const LoginModal = ({ loginFlag, setLogFlag, setData, user }) => {
  return (
    <div className={`login-modal ${ loginFlag ? 'show' : ''}`}>
      <ModalBody setLogFlag={setLogFlag} setData={setData} user={user} />
    </div>
  )
};

export const ModalBody = ({ setLogFlag, setData, user }) => {
  const localStorageServiceInstance = new localStorageService();
  const [email, setEmail] = useState('');
  const [password, setPass] = useState('');
  const logOff = () => {
    changeEmail('')
    changePass('')
    setLogFlag(false);
  }
  const changeEmail = (data) => {
    setEmail(data)
  }
  const changePass = (data) => {
    setPass(data)
  }
  const onSubmit = async (e) => {
    console.log(e.target);
    e.preventDefault();
    const res = await loginProc(new FormData(e.target));
    localStorageServiceInstance.saveData(res);
    setData(res);
  }
  return (
    <div className='modal-container'>
      <div className='backdrop' onClick={logOff}>
      </div>
      <form className="modal" onSubmit={onSubmit}>
        <div>
          <label>Username</label>
          <input type="email" name="email" id="email" value={email} onChange={(e) => changeEmail(e.target.value)}/>
        </div>
        <div>
          <label>Password</label>
          <input type="password" name="password" id="password" value={password} onChange={(e) => changePass(e.target.value)}/>
        </div>
        <div>
          <input type="submit" name="login" value="Login" />
        </div>
      </form>
    </div>
  )
}

const loginProc = async (formData) => {
  const object = {};
  formData.forEach(function(value, key){
      object[key] = value;
  });
  const res = await fetch('http://localhost:8000/api/login', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(object)
  })
  return res.json();
}



