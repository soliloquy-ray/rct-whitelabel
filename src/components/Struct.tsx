import { Dispatch, SetStateAction, useState } from 'react'
import { Link } from 'react-router-dom';
import KeyValuePairList from '../models/key-value-pairs.interface';

export const Struct = ({ data, brands, setBrands }: { data: KeyValuePairList, brands: Record<string, any>[], setBrands: Dispatch<SetStateAction<any[]>>}) => {
  return (
    <>    
      <h1>Our Restaurants</h1>
      <main className="Struct">
        <section>
          { brands.map((b, bIndex) => {
            return (
              <div className='brandContainer' key={bIndex}>
                <Link to={{
                  pathname: `/brands/${b.code}`,
                }}>
                  <h3>
                    <b>
                      {b?.name}
                    </b>
                  </h3>
                </Link>
              </div>
            );
          })}
        </section> 
      </main>
    </>
  );
}

Struct.defaultProps = {

}

Struct.propTypes = {

}
