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
  
  const menu = 'Pencarian Data';

  const [loading, isLoading] = useState(false);
 
  const listInformation = [
    { title:'Riwayat Kunjungan Pasien', value: 'visitHistory', url :`${process.env.BASE_URL}/visitHistory/getHistoryByDoctor`,
      parameter:[
        { value: 'date', text: 'Tanggal Kunjungan'},
        { value: 'patientName', text: 'Nama Pasien'}
      ],  
      headerTable : [
        { name: 'Nama Pasien', width: "250px",
          cell:(row) => {
            return (
              <div>{row.patientName}</div>
            )
          },  
          sortable: true , center: true 
          },
          { name: 'Nomor BPJS', width: "200px",
          cell:(row) => {
            return (
              <div>{row.bpjsNo}</div>
            )
          },  
          sortable: true , center: true 
          },
          { name: 'Nama Dokter', width: "250px",
          cell:(row) => {
            return (
              <div>{row.doctorName}</div>
            )
          },  
          sortable: true , center: true 
          },
          { name: 'Nomor Tiket', width: "150px",
            cell:(row) => {
              return (
                <div>{row.ticketNo}</div>
              )
            }, 
            sortable: true , center: true 
          },
          { name: 'Status', width: "200px",
            cell:(row) => {
              let text = row.status == 'IDLE' ? 'Menunggu Antrian' : 'Selesai';
              return (
                <div> { row.status == 'IDLE' ? (<i className="fas fa-circle text-orange-500 mr-2"></i> )  : 
                    (<i className="fas fa-circle text-emerald-500 mr-2"></i>)  } {text}
                </div>
              )
            }, 
            sortable: true , center: true 
          },
          { name: 'Waktu Pendaftaran', width: "200px",
            cell:(row) => {
              let createdAt = moment(row.createdAt).format('DD-MM-YYYY hh:mm:ss');
              return (
                <div>{createdAt}</div>
              )
            }, 
            sortable: true , center: true 
          }
      ]
    },
    {
      title: 'Rekam Medis Pasien',  value: 'visitRecord', url: `${process.env.BASE_URL}/medicalRecord/getHistoryByDoctor`,
      parameter:[
        { value: 'date', text: 'Tanggal Kunjungan'},
        { value: 'patientName', text: 'Nama Pasien'}
      ],
      headerTable : [
        { name: 'Nama Pasien', width: "250px",
          cell:(row) => {
            return (
              <div>{row.patientName}</div>
            )
          },  
          sortable: true , center: true 
          },
          { name: 'Nomor BPJS', width: "200px",
          cell:(row) => {
            return (
              <div>{row.bpjsNo}</div>
            )
          },  
          sortable: true , center: true 
          },
          { name: 'Tanggal Kunjungan', width: "200px",
            cell:(row) => {
              let createdAt = moment(row.createdAt).format('DD-MM-YYYY hh:mm:ss');
              return (
                <div>{createdAt}</div>
              )
            }, 
            sortable: true , center: true 
          },
          { name: 'Detail Pemeriksaan', width: "250px",
            cell:(row) => {
              return (
                <button onClick={()=> onClickDetail(row)}
                  className="text-blue-500 no-underline hover:underline"> Detail
                </button> 
              )
            }, 
            sortable: true , center: true 
          }
      ]
    }
  ];

  const [url, setUrl] = useState('');
  const [parameter, setParameter] = useState([]);
  const [headerTable, setHeaderTable] = useState([]);
  const [columnTable, setColumnTable] = useState([]);

  const handleChangeData = (value) => {
    const index = listInformation.findIndex(listInformation => listInformation.value === value);
    setColumnTable([]);
    setParameter(listInformation[index].parameter);
    setHeaderTable(listInformation[index].headerTable);
    setUrl(listInformation[index].url);
  }

  const handleSearch = (data) => {
    isLoading(true);
    try { 
      const request = {
        doctorName : 'Dr. John Doe',
        param : data.param,
        value : data.value,
        startDate : data.startDate,
        endDate : data.endDate
      }
      restService.post(url, request).then((response) => {
        console.log(response)
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
          <CardFormSearch menu={menu} parameter={parameter} listInformation={listInformation}
            changeData={handleChangeData} handleSearch={handleSearch} isLoading={loading} />
        </div>
        <div className="w-full mb-12 px-4">
          <CardTable headerTable={headerTable} columnTable={columnTable} />
        </div>
      </div>
    </Admin>
  );
}