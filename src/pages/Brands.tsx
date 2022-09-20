import { Key, useEffect, useState } from 'react'
import localStorageService from '../services/localStorage.service';
import { useParams } from 'react-router-dom';
import KeyValuePairList from '../models/key-value-pairs.interface';
import '../components/styles/Brands.scss'
import ApiService from '../services/api.service';
import { MenuItem } from '../models/menu-item.interface';

export const Brands = () => {
  const localStorageServiceInstance = new localStorageService();
  const apiService = new ApiService();
  const userData = localStorageServiceInstance.getData('userData');
  const brandsData = localStorageServiceInstance.getData('brands');
  const allItemsData = localStorageServiceInstance.getData('allItems');
  const [sections, setSections] = useState<KeyValuePairList[]>([]);
  const [menuData, setMenuData] = useState<KeyValuePairList[]>([]);
  const [allItems, setAllItems] = useState<MenuItem[]>([]);
  const [itemsFetched, setItemsFetched] = useState(false);
  const { code } = useParams();

  useEffect(() => {
    console.log(allItems, Date.now());
    const populateData = async () => {
      if (allItemsData.length > 0) {
        setAllItems(allItemsData);
      } else {
        const menuItemData = await apiService.get(`Shared/all_items`);
        setAllItems(menuItemData);
        localStorageServiceInstance.saveData('allItems', menuItemData);
      }
      setItemsFetched(true);
    }
    if (allItems.length < 1) {
      populateData();
    }
  }, [allItems])

  useEffect(() => {
    console.log(itemsFetched, Date.now());
    const loadSections = async () => {
      
      if (sections.length > 0 && sections.find((s) => s.code === code)) {
        return;
      }
      const sectData = await apiService.get(`Shared/sec_bcode/${code}`);
      setSections(sectData);
      const sectionId = sectData[0].id;
      
      const menuOnly = await apiService.get(`Shared/cat_scode/${sectionId}`);
      const menuData = await Promise.all(menuOnly.map(async (menuItem: KeyValuePairList) => {
        return allItems.filter((mid: MenuItem) => mid.cid === menuItem.id)
          .map((menuItemFiltered: MenuItem) => {
           return {...menuItemFiltered, category: menuItem.name} 
          })
      }));
      console.log(menuData.flat(2));
      setMenuData(menuData.flat(2).sort((a,b) => a.availableStatus.localeCompare(b.availableStatus) ));
    }

    if (itemsFetched) {
      loadSections();
    }
  }, [itemsFetched]);

  return (
    <section className='Brand'>
      <div className='menuContainer'>
        {
          menuData.map((menuItem, mIndex) => {
            return (
              <div className={`menuItem ${menuItem.availableStatus === 'UNAVAILABLE' ? 'disabled' : ''}`} key={mIndex}>
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