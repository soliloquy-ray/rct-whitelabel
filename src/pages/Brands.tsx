import { Dispatch, Key, SetStateAction, useEffect, useState } from 'react'
import localStorageService from '../services/localStorage.service';
import { useParams } from 'react-router-dom';
import KeyValuePairList from '../models/key-value-pairs.interface';
import '../components/styles/Brands.scss'
import ApiService from '../services/api.service';
import { MenuItem } from '../models/menu-item.interface';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {addCircleSharp, removeCircleSharp, closeCircle} from 'ionicons/icons';
import { IonIcon } from '@ionic/react'
import { Modifiers } from '../components/Modifiers';

interface CartItem {
  id: string;
  qty: number;
}

export const Brands = ({ checkout, setCheckout }: { checkout: KeyValuePairList[], setCheckout: Dispatch<SetStateAction<KeyValuePairList[]>> }) => {
  const [lgShow, setLgShow] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<MenuItem>();
  const [selectedItemCt, setSelectedItemCt] = useState<number>(1);
  const [selectedModsPrc, setSelectedModsPrc] = useState<number>(0);
  const localStorageServiceInstance = new localStorageService();
  const apiService = new ApiService();
  const userData = localStorageServiceInstance.getData('userData');
  const brandsData = localStorageServiceInstance.getData('brands');
  const allItemsData = localStorageServiceInstance.getData('allItems');
  const [sections, setSections] = useState<KeyValuePairList[]>([]);
  const [menuData, setMenuData] = useState<MenuItem[]>([]);
  const [allItems, setAllItems] = useState<MenuItem[]>([]);
  const [itemsFetched, setItemsFetched] = useState(false);
  const { code } = useParams();
  const [selectedMods, setSelectedMods] = useState<KeyValuePairList[]>([]);
  const [unrequiredMods, setUnrequiredMods] = useState<string[]>([]);

  const chooseItem = (item: MenuItem) => {
    if (item.availableStatus.toLocaleUpperCase() === 'UNAVAILABLE') {
      return;
    }
    setLgShow(true);
    setSelectedItem(item);
  }

  useEffect(() => {
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

  const computeModifierPrice = (): number => {
    const prc = selectedMods.filter(sm => sm.menuItemId === selectedItem?.id).reduce((a, b) => a + (b.price * .01), 0);
    return prc;
  }

  useEffect(() => {
    if (!selectedItem) {
      return ;
    }
    const crt = [...cart];
    const ind = crt.findIndex(it => it.id === selectedItem.id);
    if (ind < 0) {
      updateCart(selectedItem.id, 1);
    }
    const item = crt[ind];
    setSelectedItemCt(item?.qty);
    setSelectedIndex(ind);
    setSelectedModsPrc(computeModifierPrice);
  }, [selectedItem])

  useEffect(() => {
    setSelectedModsPrc(computeModifierPrice);
  }, [selectedMods])

  useEffect(() => {
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
      setMenuData(menuData.flat(2).sort((a,b) => a.availableStatus.localeCompare(b.availableStatus) ));
    }

    if (itemsFetched) {
      loadSections();
    }
  }, [itemsFetched]);

  const updateCart = (id: string|undefined, qty: number) => {
    const crt = [...cart];
    const itemId: number = crt.findIndex(it => it.id === id);
    let item = crt[itemId];
    if (item) {
      item.qty += qty;
      if (item.qty < 1) {
        item.qty = 1;
      }
      crt.splice(itemId, 1, item);
    } else {
      item = {
        qty: qty,
        id: Number(id).toFixed(0)
      }
      crt.splice(itemId, 0, item);
    }
    setSelectedItemCt(item?.qty);
    // console.log(crt, itemId, id, qty);
    setCart(crt);
  }
  
  const addToCart = () => {
    const si = {...selectedItem};
    const modifiers = selectedMods.filter(sm => sm.menuItemId === selectedItem?.id).map(md => { return {name: md.name, price: md.price, modifierGroup: md.modifierGroupId} });
    if (modifiers.length > 0) {
      si.modifiers = modifiers;
      si.price = (Number(si.price) + (modifiers.reduce((a, b) => a + b.price, 0) * 0.01)).toFixed(2);
    }
    setCheckout([...checkout, {qty: selectedItemCt ?? 1, item: si}]);
    setLgShow(false);
  }

  return (
    <>
      <section className='Brand'>
        <div className='menuContainer'>
          {
            menuData.map((menuItem, mIndex) => {
              return (
                <div className={`menuItem ${menuItem.availableStatus.toLocaleUpperCase() === 'UNAVAILABLE' ? 'disabled' : ''}`} key={mIndex} onClick={() => chooseItem(menuItem)}>
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
      { (selectedItem) ? 
      <Modal
        size="lg"
        show={lgShow}
        onHide={() => setLgShow(false)}
        aria-labelledby="order-item-modal"
      >
        <Modal.Body>
          <div className='orderItemContainer'>
            <a className='closebtn shadow-none' onClick={() => setLgShow(false)}><IonIcon icon={closeCircle}/></a>
            <div className='leftPane'>
              <img src={selectedItem?.photos}/>
            </div>
            <div className='rightPane'>
              <span className='title'>
                <i>{selectedItem?.category}</i>
                <b>{selectedItem?.name}</b>
                <em>P{selectedItem?.price}</em>
              </span>
              <div className='body'>
                <p className='description'>{selectedItem?.description}</p>
                <Modifiers menuItemId={selectedItem.id} selectedMods={selectedMods} unrequiredMods={unrequiredMods} setSelectedMods={setSelectedMods} setUnrequiredMods={setUnrequiredMods}/>
              </div>
              <span className='orderController'>
                <button className='form-control shadow-none'><IonIcon icon={removeCircleSharp} className={`${(!selectedItemCt || selectedItemCt <= 1) ? 'disabled' : ''}`} onClick={() => updateCart(selectedItem?.id, -1)} title={''}/></button>
                <input className='form-control shadow-none' readOnly type='text' value={selectedItemCt ?? 1}/>
                <button className='form-control shadow-none'><IonIcon icon={addCircleSharp} onClick={() => updateCart(selectedItem?.id, 1)} title={''}/></button>
                <div className='checkoutHandler'>
                  <Button variant="primary" onClick={addToCart}>Add to Cart <b >P{ selectedItem && selectedItemCt ? ((Number(selectedItem.price) + selectedModsPrc) * selectedItemCt) : (selectedItem.price ? Number(selectedItem.price) + selectedModsPrc : 0) }</b></Button>
                </div>
              </span>
            </div>
          </div>
        </Modal.Body>
      </Modal>
          : (<></>)
          }
    </>
  )
}

const appStyle = {
  height:'100%',
  width:'100%',
  // border: '1px solid yellow'
}