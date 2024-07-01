import {useState, useEffect, React} from 'react'
import socket from '../../lib/socket.js';

// layout for page
import Admin from "../layouts/Admin.js";

// compenents
import CardQueueInformation from "../components/Cards/CardQueueInformation.js";

// services
import { userService } from "../../services/UserServices.js";
import { restService } from "../../services/RestService.js";

export default function QueueInformation() {

  const [queueGeneral, setQueueGeneral] = useState(null);
  const [queuePediatric, setQueuePediatric] = useState(null);
  const [queueDentist, setQueueDentist] = useState(null);

  useEffect(() => {
      if (userService.userValue) {
        const loadInfo = async () => {
          restService.get(`${process.env.BASE_URL}/queue/getQueue`).then((response) => {
            console.log(response)
            setQueueGeneral(response.data.object.queueGeneral)
            setQueueDentist(response.data.object.queueDentist)
            setQueuePediatric(response.data.object.queuePediatric)
          });
        };
        socket.on('queue_general', (updatedQueueGeneral) => {
          setQueueGeneral(updatedQueueGeneral);
        });
        socket.on('queue_pediatric', (updatedQueuePediatric) => {
          setQueuePediatric(updatedQueuePediatric);
        });
        socket.on('queue_dentist', (updatedQueueDentist) => {
          setQueueDentist(updatedQueueDentist);
        });
        loadInfo();
      return () => {
        socket.off('queue_general');
        socket.off('queue_pediatric');
        socket.off('queue_dentist');
      };
    }
  },[]);
  
  return (
    <Admin>
      <div className="flex flex-wrap mt-4">
        <div className="w-full mb-12 px-4">
          <CardQueueInformation queueGeneral={queueGeneral} queuePediatric={queuePediatric} queueDentist={queueDentist} />
        </div>
      </div>
    </Admin>
    
  );
}