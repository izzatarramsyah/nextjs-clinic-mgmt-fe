import {useState, useEffect, React} from 'react'
import DatePicker from "react-datepicker";
import moment from 'moment';

// layout for page
import Admin from "../layouts/Admin.js";

// components
import CardInputDoctor from "../components/Cards/CardInputDoctor.js";
import CardFormSearch from "../components/Cards/CardFormSearch.js";
import CardTable from "../components/Cards/CardTable.js";
import ModalTable from "../components/Modal/ModalTable.js";

// serivces
import { restService } from "../../services/RestService.js";
// import { userService } from "../../services/UserServices.js";

export default function Information() {
  
  const menu = 'Informasi';

  const [loading, isLoading] = useState(false);
 
  const listDataType = [
    { value: 'dataPatient', text:'Data Pasien' },
    { value: 'medicalRecord', text:'Riwayat Medis'}
  ];

  const listInformation = [
    {
        title:'Data Pasien', value:'dataPatient',url: `${process.env.BASE_URL}/patient/getPatient`,
        parameter: [
          { value: 'fullname', text: 'Nama Pasien'}
        ],
        headerTable : [
          { name: 'Nama', width: "250px",
          cell:(row) => {
            return (
              <div>{row.fullname}</div>
            )
          },  
          sortable: true 
          },
          { name: 'Jenis Kelamin', width: "250px",
            cell:(row) => {
              var gender = row.gender;
              return (
                gender == "P" ? <div> Pria </div> : <div> Wanita </div>
              )
            }, 
            sortable: true 
          },
          { name: 'Tanggal Lahir', width: "300px",
            cell:(row) => {
              let birthDate = moment(row.birthDate).format('DD-MM-YYYY hh:mm:ss');
              return (
                <div>{birthDate}</div>
              )
            }, 
            sortable: true 
          },
          { name: 'BPJS', width: "300px",
            cell:(row) => {
              return (
                <div>{row.bpjs}</div>
              )
            },sortable: true 
          }
        ]
    },
    {
      title: 'Riwayat Medis', value:'medicalRecord', url: `${process.env.BASE_URL}/medicalRecord/getHistory`,
      parameter: [
        { value: 'patientName', text: 'Nama Pasien'},
        { value: 'date', text: 'Tanggal Kunjungan'}
      ],
      headerTable : [
        { name: 'Nama Pasien', width: "250px",
          cell:(row) => {
            return (
              <div>{row.patientName}</div>
            )
          },  
          sortable: true 
        },
        { name: 'Nomor BPJS', width: "200px",
          cell:(row) => {
            return (
              <div>{row.bpjsNo}</div>
            )
          },  
          sortable: true 
        },
        { name: 'Tanggal Kunjungan', width: "200px",
          cell:(row) => {
            let createdAt = moment(row.createdAt).format('DD-MM-YYYY hh:mm:ss');
            return (
              <div>{createdAt}</div>
            )
          },  
          sortable: true 
        },
        { name: 'Keluhan', width: "150px",
          cell:(row) => {
            return (
                <button onClick={()=> detailComplaint(row.complaint)}
                 className="text-blue-500 no-underline hover:underline"> Detail
                </button> 
            )
          },  
          sortable: true 
        },
        { name: 'Diagnosa', width: "150px",
          cell:(row) => {
            return (
                <button onClick={()=> detailDiagnose(row.diagnose)}
                 className="text-blue-500 no-underline hover:underline"> Detail
                </button> 
            )
          },  
          sortable: true 
        },
        { name: 'Catatan konsultasi', width: "150px",
          cell:(row) => {
            return (
                <button onClick={()=> detailConsul(row.consul)}
                 className="text-blue-500 no-underline hover:underline"> Detail
                </button> 
            )
          },  
          sortable: true 
        },
        { name: 'Resep Obat', width: "150px",
          cell:(row) => {
            return (
                <button onClick={()=> detailReceiptMedicine(row.receiptMedicine)}
                 className="text-blue-500 no-underline hover:underline"> Detail
                </button> 
            )
          },  
          sortable: true 
        },
      ]
    }
  ];

  const [url, setUrl] = useState('');
  const [parameter, setParameter] = useState([]);
  const [headerTable, setHeaderTable] = useState([]);
  const [columnTable, setColumnTable] = useState([]);

  const handleChangeData = (data) => {
    debugger;
    const val = listDataType.filter(({value}) => value == data);
    const title = val[0].text;
    const index = listInformation.findIndex(listInformation => listInformation.title === title);
    setParameter(listInformation[index].parameter);
    setHeaderTable(listInformation[index].headerTable);
    setUrl(listInformation[index].url);
  }

  const handleSearch = (request) => {
    isLoading(true);
    try { 
      restService.post(url, request).then((response) => {
        isLoading(false);
        if ( response.status == '200' ) {
          setColumnTable(response.data.object)
        } 
      });
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <Admin>
      <div className="flex flex-wrap mt-4">
        <div className="w-full mb-12 px-4">
           <CardFormSearch menu={menu} parameter={parameter} listDataType={listDataType}
            dataType={handleChangeData} handleSearch={handleSearch} isLoading={loading} />
        </div>
        <div className="w-full mb-12 px-4">
          <CardTable headerTable={headerTable} columnTable={columnTable} />
        </div>
      </div>
    </Admin>
  );
}