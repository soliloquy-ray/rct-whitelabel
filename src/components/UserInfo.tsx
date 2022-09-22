import {SetStateAction, Dispatch, useState} from 'react'
import { LoginModal } from './LoginModal'
import { IonIcon } from '@ionic/react'
import { chevronDown, chevronUp } from 'ionicons/icons';
import localStorageService from '../services/localStorage.service';
import KeyValuePairList from '../models/key-value-pairs.interface';

type UserInfo = {
  user: KeyValuePairList;
  setData: Dispatch<SetStateAction<Record<string, any>[]>>;
  token: string;
}

export const UserInfo = ({ user, setData, token }: UserInfo) => {
  const [loginFlag, setLogFlag] = useState(false);
  const loginButton = () => {
    return (
      <a onClick={() => setLogFlag(true)}>Login</a>
    )
  }
  if(user) {
    return (
      <div className='userInfo'><UserInfoData user={user} token={token} setData={setData}/></div>
    )
  } else {
    return (
      <>
        <div className='loginHandler'>{loginButton()}</div>
        <LoginModal user={user} loginFlag={loginFlag} setLogFlag={setLogFlag} setData={setData} />
      </>
    )
  }
}

export const UserInfoData = ({ user, token, setData }: UserInfo) => {
  const [show, setShow] = useState(false);
  const [icon, setIcon] = useState(chevronDown);
  const showStatus = (showStatus: boolean) => {
    setShow(showStatus);
    if(showStatus) {
      setIcon(chevronUp);
    }else{
      setIcon(chevronDown);
    }
  }
  return (
    <>
      <span className='userName'>Hi, {user.name}!
        <UserActionsPane show={show} token={token} setData={setData} setShow={setShow} icon={icon} setIcon={setIcon} />
      </span>
      <a onClick={() => showStatus(!show)}>
        <IonIcon icon={icon} />
      </a>
    </>    
  )
}

type UserActionsPane = {
  show: boolean;
  token: string;
  setData: Dispatch<SetStateAction<Record<string, any>[]>>;
  setShow: Dispatch<SetStateAction<boolean>>;
  icon: string;
  setIcon: Dispatch<SetStateAction<string>>;
}

const UserActionsPane = ({ show, token, setData, setShow, icon, setIcon }: UserActionsPane) => {
  const localStorageServiceInstance = new localStorageService();
  const handleLogout = async () => {
    const res = await logoutProc(token);
    if (res) {
      setData([]);
      localStorageServiceInstance.clearData()
    }
  }
  const showStatus = () => {
    setShow(false);
    setIcon(chevronDown);
  }
  return (
    <>
      <span className={`userActionsModal ${ show ? 'show' : ''}`} onClick={() => showStatus()}>
      </span>
      <div className={`userActionsPane ${ show ? 'show' : ''}`}>
        <a href='/profile'>Profile</a>
        <a  onClick={handleLogout}>Logout</a>
      </div>
    </>
  )
};

const logoutProc = async (token: string) => {
  const res = await fetch('http://localhost:8000/api/logout', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  })
  return res.json();
}