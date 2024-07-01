import {useState, useEffect, React} from 'react'
import moment from 'moment';
import socket from '../../lib/socket.js';

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

export default function QueueRegistration() {
  
  const menu = 'Daftar Antrian';

  const [loading, isLoading] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [statusModal, setStatusModal] = useState(null);
  const [messageModal, setMessageModal] = useState(null);

  const [showModalQueue, setShowModalQueue] = useState(false);

  const [dataPatient, setDataPatient] = useState({
    fullname: '',
    bpjs: '',
    gender: '',
    birthDate: ''
  });

  const [dataQueue, setDataQueue] = useState({
    ticketNo: '',
    specialization: '',
    visitingTime: ''
  });

  const [slcDoctor, setSlcDoctor] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const request = {
          param : 'fullname',
          value: 'Alex'
        }
        const response = await Promise.all([
          restService.get(`${process.env.BASE_URL}/doctor/getListDoctor`),
          restService.post(`${process.env.BASE_URL}/patient/getPatient`, request )]);
        setSlcDoctor(response[0].data.object);
        setDataPatient({
          fullname: response[1].data.object[0].fullname,
          bpjs: response[1].data.object[0].bpjs,
          gender: response[1].data.object[0].gender,
          birthDate: moment(response[1].data.object[0].birthDate).format('DD-MM-YYYY')
        })
      } catch (e) { 
        console.log(e);
      }
    };
    fetchData();
  },[]);
  
  const addQueue = (req) => {
    const containsNull = Object.values(req).some(value => value === null || value === '');
    if (containsNull) {
      setShowModal(true);
      setStatusModal('Gagal')
      setMessageModal('Silahkan lengkapi form terlebih dahulu');
      return;
    }
    isLoading(true);
    try { 
      const request = {
        patientName: dataPatient.fullname,
        bpjsNo: dataPatient.bpjs,
        doctorName: req.doctorName,
        complaint: req.complaint,
        poli: req.poli,
        visitingDay: req.visitingDay,
        visitingShift: req.visitingShift
      }
      restService.post(`${process.env.BASE_URL}/visitHistory/saveVisitHistory`, request ).then((response) => {
        isLoading(false);
        if ( response.status == '200') {
          const reqQueue = {
            fullname: response.data.object.patientName,
            ticketNo: response.data.object.ticketNo,
            sequence: response.data.object.sequence,
            poli : response.data.object.poli,
            status: response.data.object.status
          }
          if ( response.data.object.ticketNo == '001' ) {
            if ( response.data.object.poli === 'UMUM' ){
              socket.emit('add_to_general', reqQueue);
            } else if ( response.data.object.poli === 'GIGI' ) {
              socket.emit('add_to_dentist', reqQueue);
            } else if ( response.data.object.poli === 'IBU DAN ANAK' ) {
              socket.emit('add_to_pediatric', reqQueue);
            }
          } 
          setDataQueue({
            ticketNo: response.data.object.ticketNo,
            poli: 'Dokter ' + response.data.object.poli,
            visitingTime: 'Waktu Kunjungan : ' + response.data.object.visitingShift
          });
          setShowModalQueue(true);
        } 
      });
    } catch (e) {
      console.log(e);
    }
  }

  const reloadPage = () => {
    setShowModal(false);
    setShowModalQueue(false);
    // if ( statusModal != 'Gagal' ) {
    //   window.location.reload();
    // }
  }

  return (
    <Admin>
      <Modal show={showModal} statusModal={statusModal} messageModal={messageModal} onClose={() => reloadPage()}></Modal>
      <ModalQueue show={showModalQueue} dataQueue={dataQueue} onClose={() => reloadPage()}></ModalQueue>
      <div className="flex flex-wrap mt-4">
        <div className="w-full mb-12 px-4">
          <CardInputQueue isLoading={loading} slcDoctor={slcDoctor} dataPatient={dataPatient} addQueue={addQueue}/>
        </div>
      </div>
    </Admin>
  );
}