import { useState } from 'react'
import { Nav } from './Nav'
import { UserInfo } from './UserInfo'

export const Header = ({ data, setData }) => {
  const user = data?.user;
  const token = data?.token;
  console.log(user);
  console.log(token);
  return (
    <>
      <header className="Header">
        <section>
          <span>
            <img src="/vite.svg"/>
          </span>
          <b className="title">Header</b>
          <UserInfo user={user} token={token} setData={setData} />
        </section>
      </header>
    </>
  )
}

Header.defaultProps = {

}

Header.propTypes = {
  
}


