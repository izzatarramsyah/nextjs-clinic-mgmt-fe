import {useEffect, useState, React} from "react";
import Head from 'next/head'
import Router from "next/router";

// components
import AdminNavbar from "../components/Navbars/AdminNavbar.js";
import Sidebar from "../components/Sidebar/Sidebar.js";
import HeaderStats from "../components/Header/HeaderStats.js";
import FooterAdmin from "../components/Footers/FooterAdmin.js";
import ModalSubmit from "../components/Modal/ModalSubmit.js";

// services
import { userService } from "../../services/UserServices.js";
import { restService } from "../../services/RestService.js";

export default function Admin({ children }) {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [stat1, setStat1] = useState("");
  const [stat2, setStat2] = useState("");
  const [stat3, setStat3] = useState("");

  const [showProfile, setShowProfile] = useState(false);

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
      title: 'Pencarian Data'
    },
    {
      menuId : '4',
      path: '/admin/Inventory',
      title: 'Kelola Inventaris'
    },
    {
      menuId : '5',
      path: '/user/QueueRegistration',
      title: 'Pendaftaran Antrian'
    },
    {
      menuId : '6',
      path: '/user/BuyMedicine',
      title: 'Beli Obat'
    },
    {
      menuId : '7',
      path: '/user/Information',
      title: 'Informasi Riwayat'
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
                statTitle: response.data.countPatient,
                statIconName: 'fa-solid fa-person',
                statPercentColor: 'fa-solid fa-person',
                statIconColor: 'bg-green-300'
              },
              {
                statSubtitle : 'Jumlah Dokter Tersedia',
                statTitle: response.data.countDoctor,
                statIconName: 'fa-solid fa-user-md',
                statPercentColor: 'text-emerald-500',
                statIconColor: 'bg-blue-300'
              },
              {
                statSubtitle : 'Jumlah Antrian',
                statTitle:response.data.countQueue,
                statIconName: 'fa-solid fa-users',
                statPercentColor: 'text-red-500',
                statIconColor: 'bg-red-500'
              }
            ])
          });
        } else if ( userService.userValue.role == 'user' ) {
          restService.get(`${process.env.BASE_URL}/dashboard/adminStats`).then((response) => {
            setHeaderStat([
              {
                statSubtitle : 'Jumlah Saldo',
                statTitle: response.data.countPatient,
                statIconName: 'fa-solid fa-wallet',
                statPercentColor: 'text-emerald-500',
                statIconColor: 'bg-green-300'
              },
              {
                statSubtitle : 'Jumlah Kunjungan',
                statTitle: response.data.countDoctor,
                statIconName: 'fa-solid fa-calendar-check',
                statPercentColor: 'text-emerald-500',
                statIconColor: 'bg-blue-300'
              },
              {
                statSubtitle : 'Jumlah Pembelian Obat',
                statTitle:response.data.countQueue,
                statIconName: 'fa-solid fa-pills',
                statPercentColor: 'text-red-500',
                statIconColor: 'bg-red-500'
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

  const openProfile = async(e) => {
    e.preventDefault(); 
    setShowProfile(true)
  }

  return (
    <div>
      <Sidebar menu={menu} />
      <ModalSubmit show={showProfile} title='Data Profile'
        onClose={() => setShowProfile(false)} onSubmit={() => updateDoctor()}>
        <div class="grid gap-4 mb-4 grid-cols-2">
          <div class="col-span-2">
            <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
            <input value={username} onChange={(e) => setUsername(e.target.value)} type="text" 
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" />
          </div>
          <div class="col-span-2">
            <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} 
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" />
          </div>
        </div>
      </ModalSubmit>
      <div className="relative md:ml-64 bg-blueGray-100">
        <AdminNavbar username={username} onLogout={onLogout} openProfile={openProfile}/>
        <HeaderStats headerStat={headerStat}/>
        <div className="px-4 md:px-10 mx-auto w-full -m-24">
          {children}
          <FooterAdmin />
        </div>
      </div>
    </div>
  );
}
