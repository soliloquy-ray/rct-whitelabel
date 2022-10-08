import { useState } from 'react'
import LocalStorageService from '../services/localStorage.service'
import { Nav } from './Nav'
import { UserInfo } from './UserInfo'

export const Header = ({ data, setData }) => {
  const localStorageServiceInstance = new LocalStorageService();
  const {user, token} = localStorageServiceInstance.getData();
  return (
    <>
      <header className="Header">
        <section>
          <span>
            <img src="/vite.svg"/>
          </span>
          <div className="title">My Business Assistant</div>
          <UserInfo user={user} setData={setData} />
        </section>
      </header>
    </>
  )
}

Header.defaultProps = {

}

Header.propTypes = {
  
}


