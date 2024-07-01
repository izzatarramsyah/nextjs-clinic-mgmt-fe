import {useEffect, useState, React} from "react";
import Head from 'next/head'
import Router from "next/router";
import { io } from 'socket.io-client';

// components
import AdminNavbar from "../components/Navbars/AdminNavbar.js";
import Sidebar from "../components/Sidebar/Sidebar.js";
import HeaderStats from "../components/Header/HeaderStats.js";
import FooterAdmin from "../components/Footers/FooterAdmin.js";

// services
import { userService } from "../../services/UserServices.js";
import { restService } from "../../services/RestService.js";

export default function Admin({ children }) {

  const [username, setUsername] = useState('');

  var menuSidebar = [
    {
      menuId : '1',
      path: '/admin/DataPatient',
      title: 'Input Pasien'
    },
    {
      menuId : '2',
      path: '/admin/DataDoctor',
      title: 'Input Dokter'
    },
    {
      menuId : '3',
      path: '/admin/Information',
      title: 'Informasi Data'
    },
    {
      menuId : '4',
      path: '/admin/Inventory',
      title: 'Kelola Inventaris'
    },
    {
      menuId : '5',
      path: '/patient/QueueRegistration',
      title: 'Pendaftaran Antrian'
    },
    {
      menuId : '6',
      path: '/patient/BuyMedicine',
      title: 'Beli Obat'
    },
    {
      menuId : '7',
      path: '/patient/Information',
      title: 'Informasi Data'
    },
    {
      menuId : '8',
      path: '/doctor/MedicalRecord',
      title: 'Input Rekam Medis'
    },
    {
      menuId : '9',
      path: '/doctor/Information',
      title: 'Informasi Pasien'
    },
    {
      menuId : '10',
      path: '/doctor/QueueProcess',
      title: 'Antrian Pasien'
    },
    {
      menuId : '11',
      path: '/patient/InboxMessage',
      title: 'Konsultasi Dokter'
    },
    {
      menuId : '12',
      path: '/doctor/InboxMessage',
      title: 'Konsultasi Pasien'
    }
  ];

  const [headerStat, setHeaderStat] = useState([]);

  const [menu, setMenu] = useState([]);

  useEffect(() => {
    if (userService.userValue) {
  
      const loadMenu = async () => {
        var menuFilter = userService.userValue.menuId.split(',').map(item => item.trim());
        setMenu(menuSidebar.filter((item)=>{ 
          return menuFilter.includes(item.menuId)
        }));
      };
      const loadInfo = async () => {
        if ( userService.userValue.role == 'admin' ) {
          restService.get(`${process.env.BASE_URL}/dashboard/adminStats`).then((response) => {
            setHeaderStat([
              {
                statSubtitle : 'Jumlah Peserta',
                statTitle: response.data.object.countDoctor,
                statIconName: 'fa-solid fa-person',
                statPercentColor: 'fa-solid fa-person',
                statIconColor: 'bg-green-300'
              },
              {
                statSubtitle : 'Jumlah Dokter Tersedia',
                statTitle: response.data.object.countPurchase,
                statIconName: 'fa-solid fa-user-md',
                statPercentColor: 'text-emerald-500',
                statIconColor: 'bg-blue-300'
              },
              {
                statSubtitle : 'Jumlah Antrian',
                statTitle: response.data.object.countQueue,
                statIconName: 'fa-solid fa-users',
                statPercentColor: 'text-red-500',
                statIconColor: 'bg-red-500'
              }
            ])
          });
        } else if ( userService.userValue.role == 'patient' ) {
          const request = {
            username : userService.userValue.username
          }
          restService.post(`${process.env.BASE_URL}/dashboard/patientStats`, request).then((response) => {
            setHeaderStat([
              {
                statSubtitle : 'Jumlah Saldo',
                statTitle: 'Rp. ' + response.data.object.countBalance[0].balance,
                statIconName: 'fa-solid fa-wallet',
                statPercentColor: 'text-emerald-500',
                statIconColor: 'bg-green-300'
              },
              {
                statSubtitle : 'Jumlah Kunjungan',
                statTitle: response.data.object.countVisit,
                statIconName: 'fa-solid fa-calendar-check',
                statPercentColor: 'text-emerald-500',
                statIconColor: 'bg-blue-300'
              },
              {
                statSubtitle : 'Jumlah Pembelian Obat',
                statTitle: 'Rp. ' + response.data.object.countPurchase.length > 0 ? response.data.object.countPurchase[0].totalPurchase : 0,
                statIconName: 'fa-solid fa-pills',
                statPercentColor: 'text-red-500',
                statIconColor: 'bg-red-500'
              }
            ])
          });
        } else if ( userService.userValue.role == 'doctor' ) {
          const request = {
            username : userService.userValue.username
          }
          restService.post(`${process.env.BASE_URL}/dashboard/doctortStats`, request).then((response) => {
            setHeaderStat([
              {
                statSubtitle : 'Jumlah Antrian',
                statTitle: response.data.object.countQueue,
                statIconName: 'fa-solid fa-users',
                statPercentColor: 'text-red-500',
                statIconColor: 'bg-red-300'
              },
              {
                statSubtitle : 'Total Pasien',
                statTitle: response.data.object.countPatient,
                statIconName: 'fa-solid fa-user',
                statPercentColor: 'text-emerald-500',
                statIconColor: 'bg-blue-300'
              },
              {
                statSubtitle : 'Jumlah Kunjungan',
                statTitle: response.data.object.countVisit,
                statIconName: 'fa-solid fa-users',
                statPercentColor: 'text-green-300',
                statIconColor: 'bg-green-300'
              }
            ])
          });
        }
      };
      loadMenu();
      loadInfo();
      setUsername(userService.userValue.username);
    } 
  },[]);

  const onLogout = async(e) => {
    e.preventDefault(); 
    try { 
      const request = {
        username : username
      }
      userService.logout( request );
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div>
      <Sidebar menu={menu} />
      <div className="relative md:ml-64 bg-blueGray-100">
        <AdminNavbar username={username} onLogout={onLogout} openNotification={null}/>
        <HeaderStats headerStat={headerStat}/>
        <div className="px-4 md:px-10 mx-auto w-full -m-24">
          {children}
          <FooterAdmin />
        </div>
      </div>
    </div>
  );
}
