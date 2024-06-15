import {useState, useEffect, React} from 'react'
import moment from 'moment';

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

  const handleSaveMedicalRecord = (data) => {
    try { 
      isLoading(true);
        const req = {
            id: data.id,
            status: 'ACTIVE',
            compliant: data.complaint
        }
        restService.post(`${process.env.BASE_URL}/visitHistory/updateVisitHistory`, req ).then((response) => {
            if ( response.status == '200' ) {
              isLoading(false);
                const request = {
                    doctorName: data.doctorName,
                    patientName: data.patientName,
                    bpjsNo: data.bpjsNo,
                    complaint: data.complaint,
                    consul: data.consul,
                    diagnose: data.diagnose,
                    receiptMedicine : data.receiptMedicine
                }
                restService.post(`${process.env.BASE_URL}/medicalRecord/save`, request ).then((response) => {
                    console.log(response.data.object)
                    if ( response.status == '200' ) {
                        setStatusModal('Sukses')
                        setMessageModal('Data berhasil dikirim');
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

  return (
    <Admin>
      <Modal show={showModal} statusModal={statusModal} messageModal={messageModal} 
        onClose={() => setShowModal(false)}></Modal>
      <div className="flex flex-wrap mt-4">
        <div className="w-full mb-12 px-4">
          <CardMedicalRecord isLoading={loading} dataVisit={dataVisit} saveMedicalRecord={handleSaveMedicalRecord} />
        </div>
      </div>
    </Admin>
  );
}