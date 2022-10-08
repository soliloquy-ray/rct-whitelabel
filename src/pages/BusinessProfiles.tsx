import { useEffect, useState } from "react";
import KeyValuePairList from "../models/key-value-pairs.interface";
import ApiService from "../services/api.service";
import DataTable from 'react-data-table-component';
import './styles/BusinessProfiles.scss';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { closeCircle } from "ionicons/icons";
import { IonIcon } from "@ionic/react";
import DatePicker from 'react-date-picker';

export const BusinessProfiles = () => {
  const apiServiceInstance = new ApiService();
  const [lgShow, setLgShow] = useState(false);
  const [business, setBusiness] = useState<KeyValuePairList[]>([]);
  const columns = [
    {
      name: 'Business Established',
      selector: (row) => row.business_established,
      sortable: true,
      reorder: true,
    },
    {
      name: 'Business Name',
      selector: (row) => row.business_name,
      sortable: true,
      reorder: true,
    },
    {
      name: 'Business Type',
      selector: (row) => row.business_type,
      sortable: true,
      reorder: true,
    },
    {
      name: 'Contact Person',
      selector: (row) => `${row.contact_fname} ${row.contact_lname}`,
      sortable: true,
      reorder: true,
    },
    {
      name: 'Status',
      selector: (row) => row.status,
      sortable: true,
      reorder: true,
    }
  ];

  const getBusinesses = async () => {
    const data = await apiServiceInstance.get('api/business_profile');
    setBusiness(data);
  }

  useEffect(() => {

    getBusinesses();
  }, [])
  
  return (
    <main className="page businessProfiles">
      <span className="controls">
        <Button onClick={() => setLgShow(true)}>
          Add a Business
        </Button>
      </span> 
      <AddBusinessForm lgShow={lgShow} setLgShow={setLgShow} getBusinesses={getBusinesses}/>
      <section className="content">
        <DataTable columns={columns} data={business} fixedHeader responsive/>
      </section>
    </main>
  )
};

const appStyle = {
  height:'100%',
  width:'100%',
  // border: '1px solid yellow'
}

const AddBusinessForm = ({ lgShow, setLgShow, getBusinesses }) => {

  const [establishedDate, setEstablishedDate] = useState('');
  const [formData, setFormData] = useState({
    business_name: '',
    business_established: new Date(),
    business_type: '',
    contact_fname: '',
    contact_lname: '',
    status: '',
  });

  const businessTypes = [
    'single_proprietorship',
    'partnership',
    'corporation',
    'coop',
    'unregistered',
    'others',
  ];

  const statusTypes = [
    'active',
    'suspended',
    'deactivated',
  ];

  const formChange = (field: string, e) => {
    switch (field) {
      case 'business_established': setFormData({...formData, business_established: new Date(e)});
        setEstablishedDate(new Date(e).toISOString().substring(0,10));
        break;
      default: setFormData({...formData,[field]: e.target.value});
        break;
    }    
  }

  const onSubmit = async (e: any) => {
    e.preventDefault();
    const apiServiceInstance = new ApiService();
    const res = await apiServiceInstance.post('api/business_profile', {},
      {...formData, business_established: establishedDate}
    );
    await getBusinesses();
    setLgShow(false);
    return res;
  }

  const createCompany = async (formData: FormData) => {
  }

  return (
    <div className="addBusiness">
      <Modal
        size="md"
        show={lgShow}
        onHide={() => setLgShow(false)}
        aria-labelledby="add-business-modal"
      >
        <Modal.Body>
          <form className='addBusinessForm' onSubmit={onSubmit}>
            <a className='closebtn shadow-none' onClick={() => setLgShow(false)}><IonIcon icon={closeCircle}/></a>
            <div className="form-group">
              <input className="form-control" type={'text'} value={formData?.business_name} id='business_name' onChange={event => formChange('business_name', event)} />
              <label>Business Name</label>
            </div>
            <div className="form-group">
              <DatePicker value={formData?.business_established} onChange={event => formChange('business_established', event)} />
              <label>Business Established</label>
            </div>
            <div className="form-group">
              <select className="form-control" id='business_type' value={formData?.business_type} onChange={event => formChange('business_type', event)} >
                <option value={''} disabled></option>
                {
                  businessTypes.map((biz, bInd) => (
                    <option key={bInd} value={biz}>{biz.replace('_',' ').toLocaleUpperCase()}</option>
                  ))
                }
              </select>
              <label>Business Type</label>
            </div>
            <div className="form-group">
              <input className="form-control" type={'text'} value={formData?.contact_fname} id='contact_fname' onChange={event => formChange('contact_fname', event)} />
              <label>Contact First Name</label>
            </div>
            <div className="form-group">
              <input className="form-control" type={'text'} value={formData?.contact_lname} id='contact_lname' onChange={event => formChange('contact_lname', event)} />
              <label>Contact last Name</label>
            </div>
            <div className="form-group">
              <select className="form-control" id='status' value={formData?.status} onChange={event => formChange('status', event)} >
                <option value={''} disabled></option>
                {
                  statusTypes.map((stat, sInd) => (
                    <option key={sInd} value={stat}>{stat.toLocaleUpperCase()}</option>
                  ))
                }
              </select>
              <label>Business Type</label>
            </div>
            <div className="form-group">
              <input type={'submit'} value={'Create'} />
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  )
}