import { Dispatch, Key, SetStateAction, useEffect, useState } from "react";
import KeyValuePairList from "../models/key-value-pairs.interface";
import ApiService from "../services/api.service";
import './styles/Modifiers.scss';

export const Modifiers = ({ menuItemId, selectedMods, unrequiredMods, setSelectedMods, setUnrequiredMods }: {menuItemId: string, selectedMods: KeyValuePairList[], unrequiredMods: string[], setSelectedMods:Dispatch<SetStateAction<KeyValuePairList[]>>, setUnrequiredMods:Dispatch<SetStateAction<string[]>>}) => {
  const [modifiers, setModifiers] = useState<KeyValuePairList[]>([]);
  const apiService = new ApiService();

  useEffect(() => {
    if (modifiers.length > 0) {
      return ;
    }
    const fetchData = async () => {
      const data = await apiService.get(`Modifier_c/get_modifier_for_menu/${menuItemId}`);
      setModifiers(data);
    };

    fetchData();
  }, [menuItemId]);

  const modifierFunc = (e: any, id: string, mid: string, req?: boolean) => {
    if(e.target.checked) {
      const sm = [...selectedMods];
      const modG = modifiers.find(m => m.id === mid)?.modifiers || [];
      const mod = modG.find((m: KeyValuePairList) => m.id === id) || {};
      sm.push({...mod, modifierGroupId: mid, menuItemId});

      if (req) {
        setUnrequiredMods([...unrequiredMods, mid]);
      }
      setSelectedMods(sm);
    } else {
      const ind = selectedMods.findIndex(m => m.id === id);
      const sm = [...selectedMods];
      sm.splice(ind, 1);

      if (req) {
        const ind = unrequiredMods.findIndex(id => id === mid);
        const um = [...unrequiredMods];
        um.splice(ind, 1);
        setUnrequiredMods(um);
      }
      setSelectedMods(sm);
    }
  }

  const isRequiredMod = (mid: string) => {
    return unrequiredMods.findIndex(m => m === mid) < 0;
  }

  const isDisabledMod = (modifierGroup: KeyValuePairList, mid: string) => {
    const {selectionRangeMax, id} = modifierGroup;
    const isChecked = selectedMods.findIndex(mId => mid === mId.id);

    // element is already checked. why disable
    if (isChecked > -1) {
      return false;
    }

    const sel = selectedMods.filter(m => m.modifierGroupId === id);
    return sel.length >= selectionRangeMax
  }

  const isCheckedMod = (id: string) => {
    const isChecked = selectedMods.findIndex(mId => id === mId.id);
    return isChecked > -1;
  }

  return (modifiers.length > 0) ?
  (
    <div className="modifiersData">
      {
        modifiers.sort((a, b) => a.sequence-b.sequence).map((modifierGroup) => {
          return (
            <span key={modifierGroup.id} className={`modifierGroup ${modifierGroup.availableStatus === 'UNAVAILABLE' ? 'disabled' : ''}`}>
              <h2>
                {modifierGroup.name}
                <em>
                  (Pick {
                    modifierGroup.selectionRangeMin == modifierGroup.selectionRangeMax ? 
                    modifierGroup.selectionRangeMin :
                    `${modifierGroup.selectionRangeMin} - ${modifierGroup.selectionRangeMax}`
                  })                  
                </em>
              </h2>
              {
                (
                modifierGroup.selectionRangeMin == 0 ? 
                  (
                    modifierGroup.modifiers.filter((m: KeyValuePairList) => m.availableStatus === 'AVAILABLE').sort((a: KeyValuePairList, b: KeyValuePairList)=>a.sequence-b.sequence).map((modifier: KeyValuePairList) => {
                      return (
                        <div className="form-group" key={modifier.id}>                          
                          <input type='checkbox' checked={isCheckedMod(modifier.id)} onChange={event => modifierFunc(event, modifier.id, modifierGroup.id)} disabled={isDisabledMod(modifierGroup, modifier.id)}/>
                          <span className="details">
                            <b>{modifier.name}</b>
                            <i>{modifier.price * 0.01}</i>
                          </span>
                        </div>
                      )
                    })
                  )
                  :
                  (
                    modifierGroup.modifiers.filter((m: KeyValuePairList) => m.availableStatus === 'AVAILABLE').sort((a: KeyValuePairList, b: KeyValuePairList)=>a.sequence-b.sequence).map((modifier: KeyValuePairList) => {
                      return (
                        <div className="form-group" key={modifier.id}>                          
                          <input type='checkbox' checked={isCheckedMod(modifier.id)} onChange={event => modifierFunc(event, modifier.id, modifierGroup.id, true)} required={isRequiredMod(modifierGroup.id)} disabled={isDisabledMod(modifierGroup, modifier.id)}/>
                          <span className="details">
                            <b>{modifier.name}</b>
                            <i>{modifier.price * 0.01}</i>
                          </span>
                        </div>
                      )
                    })                
                  )
                )
              }
            </span>
          )       
        }) 
      }
    </div>
  )
  :
  (<></>)
};