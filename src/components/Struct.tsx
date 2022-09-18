import { useState } from 'react'
import KeyValuePairList from '../models/key-value-pairs.interface';

export const Struct = ({ data }: { data: KeyValuePairList}) => {
  console.log(data);
  return (
    <main className="Struct">
      <section>
        I am struct
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </section> 
    </main>
  );
}

Struct.defaultProps = {

}

Struct.propTypes = {

}
