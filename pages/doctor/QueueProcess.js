import {useState, useEffect, React} from 'react'
import moment from 'moment';

// layout for page
import Admin from "../layouts/Admin.js";

// components
import CardInputQueue from "../components/Cards/CardInputQueue.js";
import CardTable from "../components/Cards/CardTable.js";
import Modal from "../components/Modal/Modal.js";
import ModalQueue from "../components/Modal/ModalQueue.js";

// serivces
import { restService } from "../../services/RestService.js";
import { userService } from "../../services/UserServices.js";

export default function QueueProcess() {
  
  const headerTable = [
  { name: 'Nama Pasien', width: "200px",
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
  { name: 'Nomor Tiket', width: "200px",
    cell:(row) => {
      return (
        <div>{row.ticketNo}</div>
      )
    }, 
    sortable: true 
  },
  { name: 'Status', width: "200px",
    cell:(row) => {
      let text = row.status == 'IDLE' ? 'Menunggu Antrian' : 'Selesai';
      return (
        <div> { row.status == 'IDLE' ? (<i className="fas fa-circle text-orange-500 mr-2"></i> )  : 
            (<i className="fas fa-circle text-emerald-500 mr-2"></i>)  } {text}
        </div>
      )
    },sortable: true
  },
  { name: 'Waktu Pendaftaran', width: "200px",
    cell:(row) => {
        let createdAt = moment(row.createdAt).format('DD-MM-YYYY hh:mm:ss');
        return (
            <div>{createdAt}</div>
        )
    }, 
    sortable: true 
  },
  { name: 'Keluhan', width: "300px",
    cell:(row) => {
        return (
        <div>{row.complaint}</div>
        )
    }, 
    sortable: true 
  }];
  const [columnTable, setColumnTable] = useState([]);

  useEffect(() => {
    const loadQueue = async () => {
        const request = {
            doctorName : 'Dr. John Doe'
          }
        restService.post(`${process.env.BASE_URL}/visitHIstory/getListTodayVisit`, request).then((response) => {
            setColumnTable(response.data.object); 
        });
    };
    loadQueue();
  },[]);
  
  
  return (
    <Admin>
      <div className="flex flex-wrap mt-4">
        <div className="w-full mb-12 px-4">
            <CardTable headerTable={headerTable} columnTable={columnTable} />
        </div>
      </div>
    </Admin>
  );
}