import { useEffect, useState } from "react";
import KeyValuePairList from "../models/key-value-pairs.interface";
import ApiService from "../services/api.service";
import DataTable from 'react-data-table-component';
import './styles/AgentProfiles.scss';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { closeCircle } from "ionicons/icons";
import { IonIcon } from "@ionic/react";
import DatePicker from 'react-date-picker';
import LocalStorageService from "../services/localStorage.service";

export const AgentProfiles = () => {
  const apiServiceInstance = new ApiService();
  const [lgShow, setLgShow] = useState(false);
  const [agents, setAgents] = useState<KeyValuePairList[]>([]);
  const columns = [
    {
      name: 'Business ID',
      selector: (row) => row.business_id,
      sortable: true,
      reorder: true,
    },
    {
      name: 'Agent Name',
      selector: (row) => `${row.agent_fname} ${row.agent_lname}`,
      sortable: true,
      reorder: true,
    },
    {
      name: 'Agent Position',
      selector: (row) => row.agent_position,
      sortable: true,
      reorder: true,
    },
    {
      name: 'Agent Code',
      selector: (row) => row.agent_code,
      sortable: true,
      reorder: true,
    },
    {
      name: 'Agent Type',
      selector: (row) => row.agent_type,
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

  const getAgents = async () => {
    const data = await apiServiceInstance.get('api/agent_profile');
    setAgents(data);
  }

  useEffect(() => {

    getAgents();
  }, [])
  
  return (
    <main className="page agentProfiles">
      <span className="controls">
        <Button onClick={() => setLgShow(true)}>
          Add an Agent
        </Button>
      </span> 
      <AddBusinessForm lgShow={lgShow} setLgShow={setLgShow} getAgents={getAgents}/>
      <section className="content">
        <DataTable columns={columns} data={agents} fixedHeader responsive/>
      </section>
    </main>
  )
};

const appStyle = {
  height:'100%',
  width:'100%',
  // border: '1px solid yellow'
}

const AddBusinessForm = ({ lgShow, setLgShow, getAgents }) => {

  const [formData, setFormData] = useState({
    business_id: 0,
    agent_position: '',
    agent_code: '',
    agent_fname: '',
    agent_lname: '',
    agent_type: '',
    status: '',
  });

  const agentTypes = [
    'manager',
    'supervisor',
    'rankfile',
  ];

  const statusTypes = [
    'active',
    'suspended',
    'deactivated',
  ];

  const formChange = (field: string, e) => {
    setFormData({...formData,[field]: e.target.value});
  }

  const onSubmit = async (e: any) => {
    e.preventDefault();
    const localStorageService = new LocalStorageService();
    const {token} = localStorageService.getData();
    const apiServiceInstance = new ApiService();
    const res = await apiServiceInstance.post('api/agent_profile', {'Authorization': `Bearer ${token}`},
      formData
    );
    await getAgents();
    setLgShow(false);
    return res;
  }

  const createCompany = async (formData: FormData) => {
  }

  return (
    <div className="addAgent">
      <Modal
        size="md"
        show={lgShow}
        onHide={() => setLgShow(false)}
        aria-labelledby="add-agents-modal"
      >
        <Modal.Body>
          <form className='addAgentForm' onSubmit={onSubmit}>
            <a className='closebtn shadow-none' onClick={() => setLgShow(false)}><IonIcon icon={closeCircle}/></a>
            <div className="form-group">
              <input className="form-control" min={0} type={'number'} value={formData?.business_id} id='business_id' onChange={event => formChange('business_id', event)} />
              <label>Business ID</label>
            </div>
            <div className="form-group">
              <input className="form-control" type={'text'} value={formData?.agent_fname} id='agent_fname' onChange={event => formChange('agent_fname', event)} />
              <label>First Name</label>
            </div>
            <div className="form-group">
              <input className="form-control" type={'text'} value={formData?.agent_lname} id='agent_lname' onChange={event => formChange('agent_lname', event)} />
              <label>Last Name</label>
            </div>
            <div className="form-group">
              <input className="form-control" type={'text'} value={formData?.agent_code} id='agent_code' onChange={event => formChange('agent_code', event)} />
              <label>Agent Code</label>
            </div>
            <div className="form-group">
              <input className="form-control" type={'text'} value={formData?.agent_position} id='agent_position' onChange={event => formChange('agent_position', event)} />
              <label>Agent Position</label>
            </div>
            <div className="form-group">
              <select className="form-control" id='agent_type' value={formData?.agent_type} onChange={event => formChange('agent_type', event)} >
                <option value={''} disabled></option>
                {
                  agentTypes.map((type, tInd) => (
                    <option key={tInd} value={type}>{type.toLocaleUpperCase()}</option>
                  ))
                }
              </select>
              <label>Agent Type</label>
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
              <label>Agent Status</label>
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