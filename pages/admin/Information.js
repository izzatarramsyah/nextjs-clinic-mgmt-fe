import {useState, useEffect, React} from 'react'
import DatePicker from "react-datepicker";
import moment from 'moment';

// layout for page
import Admin from "../layouts/Admin.js";

// components
import CardInputDoctor from "../components/Cards/CardInputDoctor.js";
import CardFormSearch from "../components/Cards/CardFormSearch.js";
import CardTable from "../components/Cards/CardTable.js";
import Modal from "../components/Modal/Modal.js";
import ModalTable from "../components/Modal/ModalTable.js";

// serivces
import { restService } from "../../services/RestService.js";
import { userService } from "../../services/UserServices.js";

export default function Information() {
  
  const menu = 'Pencarian Data';
  const [loading, isLoading] = useState(false);
 
  const listInformation = [
    { title:'Inventaris Peralatan', value:'inventory', url :`${process.env.BASE_URL}/inventory/getInventory`,
      parameter:[
        { value: 'name', text: 'Nama Peralatan'},
        { value: 'category', text: 'Kategori peralatan'}
      ],  
      headerTable : [
        { name: 'Nama Paralatan', width: "250px",
        cell:(row) => {
          return (
            <div>{row.name}</div>
          )
        },  
        sortable: true , center: true 
        },
        { name: 'Kategori', width: "250px",
        cell:(row) => {
          return (
            <div>{row.category}</div>
          )
        },  
        sortable: true , center: true 
        },
        { name: 'Jumlah Unit', width: "100px",
          cell:(row) => {
            return (
              <div>{row.quantity}</div>
            )
          }, 
          sortable: true , center: true 
        },
        { name: 'Lokasi', width: "100px",
          cell:(row) => {
            return (
              <div>{row.location}</div>
            )
          }, 
          sortable: true , center: true 
        },
        { name: 'Tanggal Beli', width: "100px",
          cell:(row) => {
            return (
              <div>{row.purchaseDt}</div>
            )
          }, 
          sortable: true , center: true 
        },
        { name: 'Keterangan', width: "150px",
          cell:(row) => {
            return (
              <div>{row.notes}</div>
            )
          }, 
          sortable: true , center: true 
        }
      ]
    },
    { title:'Stok Obat', value:'stockMedicine', url :`${process.env.BASE_URL}/medicine/getMedicine`,
      parameter:[
        { value: 'name', text: 'Nama Obat'},
        { value: 'category', text: 'Kategori Obat'}
      ],  
      headerTable : [
        { name: 'Nama Obat', width: "250px",
        cell:(row) => {
          return (
            <div>{row.name}</div>
          )
        },  
        sortable: true , center: true 
        },
        { name: 'Kategori', width: "250px",
        cell:(row) => {
          return (
            <div>{row.category}</div>
          )
        },  
        sortable: true , center: true 
        },
        { name: 'Tanggal Expired', width: "200px",
          cell:(row) => {
            return (
              <div>{row.expired}</div>
            )
          }, 
          sortable: true , center: true 
        },
        { name: 'Jumlah Stok Masuk', width: "200px",
          cell:(row) => {
            return (
              <div>{row.quantity}</div>
            )
          }, 
          sortable: true , center: true 
        },
        { name: 'Keterangan', width: "250px",
          cell:(row) => {
            return (
              <div>{row.notes}</div>
            )
          }, 
          sortable: true , center: true 
        }
      ]
    },
    { title:'Data Dokter', value:'dataDocter', url: `${process.env.BASE_URL}/doctor/getDoctor`,
      parameter:[
        { value: 'fullname', text: 'Nama Dokter'},
        { value: 'nip', text: 'Nomor Induk Pegawai'}
      ],    
      headerTable : [
        { name: 'NIP', width: "250px",
        cell:(row) => {
          return (
            <div>{row.nip}</div>
          )
        },  
        sortable: true , center: true 
        },
        { name: 'Nama', width: "250px",
        cell:(row) => {
          return (
            <div>{row.fullname}</div>
          )
        },  
        sortable: true , center: true 
        },
        { name: 'Spesialisasi', width: "200px",
          cell:(row) => {
            return (
              <div>{row.specialization}</div>
            )
          }, 
          sortable: true , center: true 
        },
        { name: 'Waktu Kunjungan', width: "400px",
          cell:(row) => {
            return (
              <button onClick={()=> onScheduleDetail(row.schedule)}
                className="text-blue-500 no-underline hover:underline"> Detail
              </button> 
            )
          },sortable: true , center: true 
        }
      ]
    },
    { title:'Data Pasien', value:'dataPatient',url: `${process.env.BASE_URL}/patient/getPatient`,
      parameter:[
        { value: 'fullname', text: 'Nama Pasien'},
        { value: 'bpjsNo', text: 'Nomor BPJS'}
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
    { title: 'Riwayat Kunjungan', value:'visitHistory',url: `${process.env.BASE_URL}/visitHistory/getHistory`,
      parameter:[
        { value: 'fullname', text: 'Nama Pasien'},
        { value: 'bpjsNo', text: 'Nomor BPJS'}
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

  const [showDetailShift, setShowDetailShift] = useState(false);

  const headerDetailShift = [
    { name: 'Hari', width: "150px",
      cell:(row) => {
        return (
          <div>{row.day}</div>
        )
      }, sortable: true, center: true
    },
    { name: 'Waktu Kunjungan', width: "300px",
    cell:(row) => {
      return (
        <div>{row.shift}</div>
      )
    }, sortable: true, center: true
  }
  ];
  const [columnDetailShift, setColumnDetailShift] = useState([]);

  const onScheduleDetail = ( data ) => {
    setColumnDetailShift(data);
    setShowDetailShift(true);
  }

  const handleChangeData = (value) => {
    const index = listInformation.findIndex(listInformation => listInformation.value === value);
    setParameter(listInformation[index].parameter);
    setHeaderTable(listInformation[index].headerTable);
    setUrl(listInformation[index].url);
  }

  const handleSearch = (request) => {
    isLoading(true);
    try { 
      restService.post(url, request).then((response) => {
        if ( response.status == '200' ) {
          isLoading(false);
          setColumnTable(response.data.object)
        } 
      });
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <Admin>
      <ModalTable show={showDetailShift} headerDetail={headerDetailShift} 
        columnDetail={columnDetailShift} onClose={() => setShowDetailShift(false)}></ModalTable>
      <div className="flex flex-wrap mt-4">
        <div className="w-full mb-12 px-4">
          <CardFormSearch menu={menu} parameter={parameter} listInformation={listInformation}
            dataType={handleChangeData} handleSearch={handleSearch} isLoading={loading} />
        </div>
        <div className="w-full mb-12 px-4">
          <CardTable headerTable={headerTable} columnTable={columnTable} />
        </div>
      </div>
    </Admin>
  );
}