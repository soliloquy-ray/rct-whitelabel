import { useEffect, useState } from "react";
import KeyValuePairList from "../models/key-value-pairs.interface";
import ApiService from "../services/api.service";
import DataTable from 'react-data-table-component';
import './styles/BusinessProfiles.scss';

export const BusinessProfiles = () => {
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

  useEffect(() => {
    const apiServiceInstance = new ApiService();
    const getBusinesses = async () => {
      const data = await apiServiceInstance.get('api/business_profile');
      setBusiness(data);
    }

    getBusinesses();
  }, [])
  
  return (
    <main className="page businessProfiles" style={appStyle}>
      <section className="content">
        <DataTable columns={columns} data={business} fixedHeader dense striped={true} responsive/>
      </section>
    </main>
  )
};

const appStyle = {
  height:'100%',
  width:'100%',
  // border: '1px solid yellow'
}