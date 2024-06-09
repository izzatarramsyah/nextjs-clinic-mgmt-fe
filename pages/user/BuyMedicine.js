import {useState, useEffect, React} from 'react'

// layout for page
import Admin from "../layouts/Admin.js";

// components
import CardListMedicine from "../components/Cards/CardListMedicine.js";
import CardBuyMedicine from "../components/Cards/CardBuyMedicine.js";
import Modal from "../components/Modal/Modal.js";
import ModalSubmit from "../components/Modal/ModalSubmit.js";
import ModalReceipt from "../components/Modal/ModalReceipt.js";

// serivces
import { restService } from "../../services/RestService.js";
import { userService } from "../../services/UserServices.js";

export default function BuyMedicine() {

  const [listMedicine, setListMedicine] = useState([]);
  const [total, setTotal] = useState(0);
  const [balance, setBalance] = useState(100000);
  const [cartToConfirm, setCartToConfirm] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [statusModal, setStatusModal] = useState(false);
  const [messageModal, setMessageModal] = useState(false);

  const [receiptData, setReceiptData] = useState([]);

  const [showModalConfirm, setShowModalConfirm] = useState(false);

  const [showModalReceipt, setShowModalReceipt] = useState(false);

  useEffect(() => {
    const loadInfo = async () => {
      restService.get(`${process.env.BASE_URL}/medicine/getListMedicine`).then((response) => {
        setListMedicine(response.data.object);    
      });
    };
    loadInfo();
  },[]);

  const handleAddToCart = ( data ) => {
    const existing = cartToConfirm.find(cartToConfirm => cartToConfirm._id === data._id);
      if ( existing ) {
        const index = cartToConfirm.findIndex(cartToConfirm => cartToConfirm._id === data._id);
        let currentQty = existing.quantity += 1;
        let currentTotalPrice = currentQty * data.price;
        let temp_state = [...cartToConfirm];  
        temp_state[index] = {...temp_state[index], 
          quantity : currentQty, 
          ttlBuy : Number(currentTotalPrice)};
        setCartToConfirm(temp_state);
      } else {
        setCartToConfirm([...cartToConfirm, data]);
      }
      setTotal(total + Number(data.price));
      setBalance(balance - (total + Number(data.price)) );
  }

  const handleChangeQty = ( data ) => {
    const index = cartToConfirm.findIndex(cartToConfirm => cartToConfirm._id === data._id);
    let currentTotalBuy = data.quantity * data.price;
    let tempSisaDompul = balance - Number(currentTotalBuy);
    if ( tempSisaDompul > 0 ) {
      let temp_state = [...cartToConfirm];  
      temp_state[index] = {...temp_state[index], 
        quantity : data.quantity, 
        ttlBuy : Number(currentTotalBuy)
      };
      setCartToConfirm(temp_state);
      setTotal(getTotalPayment(temp_state));
    }
  };

  const getTotalPayment = (cartToConfirm) => {
    let sum = 0
    for (let i = 0; i < cartToConfirm.length; i++) {
      sum += Number(cartToConfirm[i].ttlBuy)
    }
    setBalance(balance - sum);
    return sum;
  }

  const handleBuy = () => {
    try { 
      let sum = 0;
      cartToConfirm.forEach(item => {
        sum += item.quantity * item.price;
      });
      const request = {
        username : userService.userValue.username,
        totalBuy : sum,
        listMedicine : cartToConfirm
      }
      setShowModalConfirm(false);
      restService.post(`${process.env.BASE_URL}/purchase/medicine`, request ).then((response) => {
        console.log(response.data.object)
        if ( response.status == '200' ) {
          setShowModalReceipt(true);
          setReceiptData(response.data.object);
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
      <Modal show={showModal} statusModal={statusModal} messageModal={messageModal} 
        onClose={() => setShowModal(false)}></Modal>
      <ModalReceipt show={showModalReceipt} receiptData={receiptData} />
      <ModalSubmit show={showModalConfirm} title='Konfirmasi'
        onClose={() => setShowModalConfirm(false)} onSubmit={() => handleBuy()}>
        <svg className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
        </svg>
        <h3 className="mb-7 text-lg font-bold text-black-500 dark:text-black-400">Apakah anda yaking melakukan pembelian produk ini ?</h3>
      </ModalSubmit>
      <div className="flex flex-wrap mt-4">
        <div className="w-full xl:w-7/12 mb-12 xl:mb-0 px-4">
        <CardListMedicine listMedicine={listMedicine} cartToBuy={handleAddToCart}/>
        </div>
        <div className="w-full xl:w-5/12 px-4">
          <CardBuyMedicine cartToConfirm={cartToConfirm} cartChangeQty={handleChangeQty}
            confirmBuy={()=> setShowModalConfirm(true)} total={total} balance={balance} />
        </div>
      </div>
    </Admin>
  );
}