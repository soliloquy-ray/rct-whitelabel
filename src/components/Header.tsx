import { Dispatch, SetStateAction, useState } from 'react'
import KeyValuePairList from '../models/key-value-pairs.interface';
import { UserInfo } from './UserInfo'

type Header = {
  data: KeyValuePairList;
  setData: Dispatch<SetStateAction<Record<string, any>[]>>;
}

export const Header = ({ data, setData }: Header) => {
  const user = data?.user;
  const token = data?.token;
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


