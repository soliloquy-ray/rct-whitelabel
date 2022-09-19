import { useEffect, useState } from 'react'
import localStorageService from '../services/localStorage.service';
import { useParams } from 'react-router-dom';
import KeyValuePairList from '../models/key-value-pairs.interface';
import '../components/styles/Brands.scss'

export const Brands = () => {
  const localStorageServiceInstance = new localStorageService();
  const userData = localStorageServiceInstance.getData('userData');
  const brandsData = localStorageServiceInstance.getData('brands');
  const [sections, setSections] = useState<KeyValuePairList[]>([]);
  const [menuData, setMenuData] = useState<KeyValuePairList[]>([]);
  const { code } = useParams();
  useEffect(() => {
    console.log(sections);

    const loadSections = async () => {
      if (sections.length > 0 && sections.find((s) => s.code === code)) {
        return;
      }
      const sectData = await (await fetch(`http://localhost/cloudbistro/Shared/sec_bcode/${code}`)).json();
      setSections(sectData);
      const sectionId = sectData[0].id;
      
      const menuOnly = await (await fetch(`http://localhost/cloudbistro/Shared/cat_scode/${sectionId}`)).json();
      const menuData = await Promise.all(menuOnly.map(async (menuItem, index) => {
        const menuItemData = await (await fetch(`http://localhost/cloudbistro/Shared/menu_item_ccode/${menuItem?.id}`)).json();
        return menuItemData.map(mid => { return {...mid, category: menuItem.name} })
      }));
      console.log(menuData.flat(2));
      setMenuData(menuData.flat(2));
    }

    loadSections();
  }, []);

  return (
    <section className='Brand'>
      <div className='menuContainer'>
        {
          menuData.map((menuItem, mIndex) => {
            return (
              <div className='menuItem' key={mIndex}>
                <img src={menuItem?.photos} />
                <span>
                  <p><b>{sections[0]?.name}</b>{ menuItem?.category}</p>
                  <h1>
                    <b>{menuItem?.name}</b>
                  </h1>
                  <i>P {menuItem?.price}</i>
                </span>
              </div>
            );
          })
        }
      </div>
    </section>
  )
}

const appStyle = {
  height:'100%',
  width:'100%',
  // border: '1px solid yellow'
}