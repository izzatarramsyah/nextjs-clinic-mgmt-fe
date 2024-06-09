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
 
  const listDataType = [
    { value: 'buyMedicine', text:'Pembelian Obat' },
    { value: 'visitRecord', text:'Riwayat Kunjungan'}
  ];
  
  const listInformation = [
    { title:'Pembelian Obat', url :`${process.env.BASE_URL}/purchase/history`,
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
        { name: 'Total Beli', width: "300px",
          cell:(row) => {
            return (
              <div>{row.totalBuy}</div>
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
        },
        { name: 'Detail Pembelian', width: "300px",
          cell:(row) => {
            return (
              <button onClick={()=> detailPurchase(row.listMedicine)}
                className="text-blue-500 no-underline hover:underline"> Detail
              </button> 
            )
          }, 
          sortable: true, center: true
        }
      ]
    },
    {
      title: 'Riwayat Kunjungan', url: `${process.env.BASE_URL}/visitHistory/getHistory`,
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
              if ( row.status == 'cancel' ) {
                status = 'Di Batalkan';
              } else if ( row.status == 'finished' ) {
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

  const headerDetailPurchase = [
    { name: 'Nama Obat', width: "150px",
      cell:(row) => {
        return (
          <div>{row.medicineName}</div>
        )
      }, sortable: true, center: true
    },
    { name: 'Harga Satuan', width: "140px",
        cell:(row) => {
        return (
            <div>{row.price}</div>
        )
        }, sortable: true, center: true
    },
    { name: 'Jumlah', width: "100px",
        cell:(row) => {
        return (
            <div>{row.quantity}</div>
        )
        }, sortable: true, center: true
    },
    { name: 'Total Pembelian', width: "100px",
        cell:(row) => {
        return (
            <div>{row.ttlBuy}</div>
        )
        }, sortable: true, center: true
    },
  ];
  const [columnDetailPurchase, setColumnDetailPurchase] = useState([]);

  const detailPurchase = (data) => {
    setShowDetailPurchase(true);
    setColumnDetailPurchase(data);
  }

  const [url, setUrl] = useState('');
  const [parameter, setParameter] = useState([]);
  const [headerTable, setHeaderTable] = useState([]);
  const [columnTable, setColumnTable] = useState([]);

  const [showDetailPurchase, setShowDetailPurchase] = useState(false);

  const handleChangeData = (data) => {
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
      <ModalTable show={showDetailPurchase} headerDetail={headerDetailPurchase} 
        columnDetail={columnDetailPurchase} onClose={() => setShowDetailPurchase(false)}></ModalTable>
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