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
    { title:'Pembelian Obat', value: 'buyMedicine', url :`${process.env.BASE_URL}/purchase/history`,
      parameter:[
        { value: 'date', text: 'Tanggal Pembelian'}
      ],  
      headerTable : [
        { name: 'Transaksi ID', width: "300px",
          cell:(row) => {
            return (
              <div>{row._id}</div>
            )
          }, 
          sortable: true, center: true
        },
        { name: 'Nama Obat', width: "300px",
          cell:(row) => {
            return (
              <div>{row.medicineName}</div>
            )
          }, 
          sortable: true, center: true
        },
        { name: 'Harga Satuan', width: "150px",
          cell:(row) => {
            return (
              <div>Rp. {row.price}</div>
            )
          }, 
          sortable: true, center: true
        },
        { name: 'Jumlah', width: "150px",
          cell:(row) => {
            return (
              <div>{row.quantity}</div>
            )
          }, 
          sortable: true, center: true
        },
        { name: 'Tanggal Beli', width: "300px",
          cell:(row) => {
            let createdAt = moment(row.createdAt).format('DD-MM-YYYY hh:mm:ss');
            return (
              <div>{createdAt}</div>
            )
          }, 
          sortable: true, center: true
        }
      ]
    },
    {
      title: 'Riwayat Kunjungan',  value: 'visitRecord', url: `${process.env.BASE_URL}/visitHistory/getHistory`,
      parameter:[
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
          { name: 'Nama Dokter', width: "250px",
          cell:(row) => {
            return (
              <div>{row.doctorName}</div>
            )
          },  
          sortable: true 
          },
          { name: 'Nomor Tiket', width: "150px",
            cell:(row) => {
              return (
                <div>{row.ticketNo}</div>
              )
            }, 
            sortable: true 
          },
          { name: 'Status', width: "200px",
            cell:(row) => {
              let status = 'Menunggu Antrian';
              if ( row.status == 'CANCEL' ) {
                status = 'Di Batalkan';
              } else if ( row.status == 'FINISHED' ) {
                status = 'Selesai';
              }
              return (
                <div>{status}</div>
              )
            }, 
            sortable: true 
          },
          { name: 'Waktu Pendaftaran', width: "200px",
            cell:(row) => {
              let createdAt = moment(row.createdAt).format('DD-MM-YYYY hh:mm:ss');
              return (
                <div>{createdAt}</div>
              )
            }, 
            sortable: true 
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
    setParameter(listInformation[index].parameter);
    setHeaderTable(listInformation[index].headerTable);
    setUrl(listInformation[index].url);
  }

  const handleSearch = (request) => {
    isLoading(true);
    try { 
      console.log(request)
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