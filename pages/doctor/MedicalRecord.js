import {useState, useEffect, React} from 'react'
import moment from 'moment';
import { io } from 'socket.io-client';

// layout for page
import Admin from "../layouts/Admin.js";

// components
import CardMedicalRecord from "../components/Cards/CardMedicalRecord.js";
import Modal from "../components/Modal/Modal.js";
import CardTable from "../components/Cards/CardTable.js";

// serivces
import { restService } from "../../services/RestService.js";
import { userService } from "../../services/UserServices.js";

export default function MedicalRecord() {
  
  const [loading, isLoading] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [statusModal, setStatusModal] = useState(false);
  const [messageModal, setMessageModal] = useState(false);

  const [dataVisit, setDataVisit] = useState([]);

  useEffect(() => {
    const loadDataPatient = async () => {
        const request = {
            doctorName : 'Dr. John Doe'
          }
        restService.post(`${process.env.BASE_URL}/visitHIstory/getTodayVisit`, request).then((response) => {
            setDataVisit(response.data.object); 
        });
      };
      loadDataPatient();
  },[]);

  const handleSaveMedicalRecord = (request) => {
    const containsNull = Object.values(request).some(value => value === null || value === '');
    if (containsNull) {
      setShowModal(true);
      setStatusModal('Gagal')
      setMessageModal('Silahkan lengkapi form terlebih dahulu');
      return;
    }
    try { 
      isLoading(true);
        const req = {
            id: request.id,
            status: 'FINISHED',
            compliant: request.complaint
        }
        restService.post(`${process.env.BASE_URL}/visitHistory/updateVisitHistory`, req ).then((response) => {
            if ( response.status == '200' ) {
              isLoading(false);
                restService.post(`${process.env.BASE_URL}/medicalRecord/save`, request ).then((response) => {
                    console.log(response.data.object)
                    if ( response.status == '200' ) {
                      setStatusModal('Sukses')
                      setMessageModal('Data berhasil dikirim');
                      socket.emit('sendMessage', response.data.object);
                    } else {
                      setStatusModal('Gagal')
                      setMessageModal('Silahkan coba beberapa saat lagi');
                    }
                    setShowModal(true);
                });
            } else {
              setStatusModal('Gagal')
              setMessageModal('Silahkan coba beberapa saat lagi');
            }
            setShowModal(true);
        });
    } catch (e) {
      console.log(e);
    }
  }

  const reloadPage = () => {
    setShowModal(false)
    if ( statusModal != 'Gagal' ) {
      window.location.reload();
    }
  }

  return (
    <Admin>
      <Modal show={showModal} statusModal={statusModal} messageModal={messageModal} onClose={() => reloadPage()}></Modal>
      <div className="flex flex-wrap mt-4">
        <div className="w-full mb-12 px-4">
          <CardMedicalRecord isLoading={loading} dataVisit={dataVisit} saveMedicalRecord={handleSaveMedicalRecord} />
        </div>
      </div>
    </Admin>
  );
}