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
import ModalSubmit from "../components/Modal/ModalSubmit.js";
import CardInventory from "../components/Cards/CardInventory.js";

// serivces
import { restService } from "../../services/RestService.js";
// import { userService } from "../../services/UserServices.js";

export default function Inventory() {
  
  const [trxType, setTrxType] = useState([]);
  const [loading, isLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [statusModal, setStatusModal] = useState(false);
  const [messageModal, setMessageModal] = useState(false);

  const handleInputType = (value) => {
    setTrxType(value);
  };

  const handleAddInventory = ( request ) => {
    isLoading(true);
    let url = trxType == 'medicine' ? `${process.env.BASE_URL}/medicine/saveMedicine` :  `${process.env.BASE_URL}/inventory/saveInventory`;
    try { 
      restService.post(url, request ).then((response) => {
        isLoading(false);
        if ( response.status == '200' ) {
          setShowModal(true);
          setStatusModal('Sukses')
          setMessageModal('Data berhasil di tambahkan');
        } else {
          setShowModal(true);
          setStatusModal('Gagal')
          setMessageModal('Silahkan coba beberapa saat lagi');
        }
      });
    } catch (e) {
      console.log(e);
    }
  }
  
  return (
    <Admin>
      <Modal show={showModal} statusModal={statusModal} messageModal={messageModal} onClose={() => setShowModal(false)}></Modal>
      <div className="flex flex-wrap mt-4">
        <div className="w-full mb-12 px-4">
          <CardInventory isLoading={loading} inputType={handleInputType} formData={handleAddInventory}/>
        </div>
      </div>
    </Admin>
  );
}