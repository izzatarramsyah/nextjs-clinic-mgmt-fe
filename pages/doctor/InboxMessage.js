import {useState, useEffect, React} from 'react'
import DatePicker from "react-datepicker";
import moment from 'moment';

// layout for page
import Admin from "../layouts/Admin.js";

// components
import CardInboxMessage from "../components/Cards/CardInboxMessage.js";
import CardFormSearch from "../components/Cards/CardFormSearch.js";
import CardTable from "../components/Cards/CardTable.js";
import ModalTable from "../components/Modal/ModalTable.js";

// serivces
import { restService } from "../../services/RestService.js";
import { userService } from "../../services/UserServices.js";

export default function InboxMessage() {
  
  const [loading, isLoading] = useState(false);

  const [listMessage, setListMessage] = useState([]);

  const [slcPatient, setSlcPatient] = useState([]);

  useEffect(() => {
    const loadPatient = async () => {
        restService.get(`${process.env.BASE_URL}/patient/getListPatient`).then((response) => {
            setSlcPatient(response.data.object);    
        });
      };
      loadPatient();
  },[]);

  const handleSendMessage = (data) => {
    const req = {
        from: userService.userValue.username,
        to: doctor,
        message: data.message
    }
    restService.post(`${process.env.BASE_URL}/message/saveMessage`, req ).then((response) => {
        if ( response.status == '200' ) {
          
        }
    });
  }

  const handleChangeparam = (value) => {
    try { 
      const request = {
        from: userService.userValue.username,
        to: value
      }
      restService.post(`${process.env.BASE_URL}/message/getListMessage`, request ).then((response) => {
        if ( response.status == '200') { 
          setListMessage(response.data.object)
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
           <CardInboxMessage isLoading={loading} slcParameter={slcPatient} listMessage={listMessage}
            handleChangeparam={handleChangeparam} sendMessage={handleSendMessage} />
        </div>
      </div>
    </Admin>
  );
}