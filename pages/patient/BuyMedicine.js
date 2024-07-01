import {useState, useEffect, React} from 'react'

// layout for page
import Admin from "../layouts/Admin.js";

// components
import CardListMedicine from "../components/Cards/CardListMedicine.js";
import CardBuyMedicine from "../components/Cards/CardBuyMedicine.js";
import Modal from "../components/Modal/Modal.js";
import ModalConfirmation from "../components/Modal/ModalConfirmation.js";
import ModalReceipt from "../components/Modal/ModalReceipt.js";

// serivces
import { restService } from "../../services/RestService.js";
import { userService } from "../../services/UserServices.js";

export default function BuyMedicine() {

  const [userBalance, setUserBalance] = useState(0);

  const [listMedicine, setListMedicine] = useState([]);
  const [total, setTotal] = useState(0);
  const [balance, setBalance] = useState(0);
  const [cartToConfirm, setCartToConfirm] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [statusModal, setStatusModal] = useState(false);
  const [messageModal, setMessageModal] = useState(false);

  const [receiptData, setReceiptData] = useState([]);

  const [showModalConfirm, setShowModalConfirm] = useState(false);

  const [showModalReceipt, setShowModalReceipt] = useState(false);

  useEffect(() => {
    setUserBalance(100000);
    const loadInfo = async () => {
      restService.get(`${process.env.BASE_URL}/medicine/getListMedicine`).then((response) => {
        console.log(response)
        setListMedicine(response.data.object);    
      });
    };
    loadInfo();
  },[]);

  const handleAddToCart = ( data ) => {
    const existing = cartToConfirm.find(cartToConfirm => cartToConfirm.medicineName === data.medicineName);
    let currentTotalPrice = data.quantity * data.price;
    if ( existing ) {
      updateCart(data.medicineName, Number(data.quantity) );
      countTotal();
    } else {
      setCartToConfirm([...cartToConfirm, data]);
      setTotal(total + currentTotalPrice);
      setBalance(userBalance  - (total + currentTotalPrice) );  
    }
  }

  const updateCart = (medicineName, qty) => {
    setCartToConfirm((prevItems) =>
      prevItems.map((item) =>
        item.medicineName === medicineName ? {...item, quantity: qty} : item
      )
    );
  };

  const countTotal = () => {
    let sum = 0
    for (let i = 0; i < cartToConfirm.length; i++) {
      sum += Number((cartToConfirm[i].quantity + cartToConfirm[i].price))
    }
    setTotal(sum);
    setBalance(userBalance - sum );    
  }

  const handleRemoveCart = ( data ) => {
    setCartToConfirm(cartToConfirm.filter(({medicineName}) => medicineName !== data))
    const existing = cartToConfirm.find(cartToConfirm => cartToConfirm.medicineName === data);
    let currentTotalPrice = existing.quantity * existing.price;
    setTotal(total - Number(currentTotalPrice));
    setBalance(balance + Number(currentTotalPrice));
  }

  const handleBuy = () => {
    try { 
      setShowModalConfirm(false);
      restService.post(`${process.env.BASE_URL}/purchase/medicine`, cartToConfirm).then((response) => {
        if ( response.status == '200' ) {
          debugger;
          console.log(response.data.object)
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
      <Modal show={showModal} statusModal={statusModal} messageModal={messageModal} onClose={() => setShowModal(false)}></Modal>
      <ModalReceipt show={showModalReceipt} receiptData={receiptData} />
      <ModalConfirmation show={showModalConfirm} onClose={() => setShowModalConfirm(false)} onSubmit={() => handleBuy()} 
        text ='Apakah anda yakin melakukan pembelian produk ini ?'>
      </ModalConfirmation>
      <div className="flex flex-wrap mt-4">
        <div className="w-full xl:w-7/12 mb-12 xl:mb-0 px-4">
          <CardListMedicine listMedicine={listMedicine} cartToBuy={handleAddToCart}/>
        </div>
        <div className="w-full xl:w-5/12 px-4">
          <CardBuyMedicine cartToConfirm={cartToConfirm} cartChangeQty={handleAddToCart}
            confirmBuy={()=> setShowModalConfirm(true)} total={total} balance={balance} cartToRemove={handleRemoveCart} />
        </div>
      </div>
    </Admin>
  );
}