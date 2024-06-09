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

export default function QueueRegistration() {
  
  const menu = 'Daftar Antrian';
  const [loading, isLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
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

  const slcDays = [
    { value: 'monday', text: 'Senin'},
    { value: 'tuesday', text: 'Selasa'},
    { value: 'wednesday', text: 'Rabu'},
    { value: 'thursday', text: 'Kamis'},
    { value: 'friday', text: 'Jumat'},
    { value: 'saturday', text: 'Sabtu'},
    { value: 'sunday', text: 'Minggu'}
  ];

  const slcVisitingTime = [
    { value: 'SHIFT1', text: '08:00 - 11:00'},
    { value: 'SHIFT2', text: '13:00 - 16:00'},
    { value: 'SHIFT3', text: '19:00 - 22:00'}
  ];

  const [slcDoctor, setSlcDoctor] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const request = {
          param : 'email',
          value: userService.userValue.email
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
  
  const addQueue = (data) => {
    isLoading(true);
    try { 
      const request = {
        patientName: dataPatient.fullname,
        bpjsNo: dataPatient.bpjs,
        doctorName: data.doctorName,
        complaint: data.complaint,
        specialization: data.specialization,
        visitingDay: data.visitingDay,
        visitingShift: data.visitingShift
      }
      restService.post(`${process.env.BASE_URL}/visitHistory/saveVisitHistory`, request ).then((response) => {
        isLoading(false);
        if ( response.status == '200') {
          let foundVisitingTime = slcVisitingTime.find(d => d.value === response.data.object.visitingShift);
          let foundDoctor = slcDoctor.find(d => d.name === response.data.object.doctorName);          
          setDataQueue({
            ticketNo: response.data.object.ticketNo,
            specialization: 'Dokter ' + foundDoctor.specialization,
            visitingTime: 'Waktu Kunjungan : ' + foundVisitingTime.text
          });
          setShowModalQueue(true);
        } 
      });
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <Admin>
      <Modal show={showModal} onClose={() => setShowModal(false)}></Modal>
      <ModalQueue show={showModalQueue} dataQueue={dataQueue} onClose={() => setShowModalQueue(false)}></ModalQueue>
      <div className="flex flex-wrap mt-4">
        <div className="w-full mb-12 px-4">
          <CardInputQueue isLoading={loading} slcDoctor={slcDoctor} dataPatient={dataPatient} addQueue={addQueue} />
        </div>
      </div>
    </Admin>
  );
}