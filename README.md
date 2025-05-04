# Clinic Management System (Next.js)

A simple **Next.js frontend** web application designed for **Clinic Management**. This application helps manage clinic operations with features such as dashboards, appointment scheduling, and real-time updates. It also includes secure authentication with **JWT** and data encryption using **AES256** for sensitive data.

---

## 📦 Tech Stack

- **Next.js** for frontend development
- **JWT (JSON Web Token)** for authentication
- **AES256** for encryption/decryption of sensitive data
- **Socket.io** for real-time communication
- **npm** for package management

---

## 🔧 Features (On Going)

- 🏥 **Dashboard**: Overview of clinic operations and key metrics.
- 📅 **Appointment Scheduling**: Manage patient appointments and track upcoming visits.
- 🔒 **Secure Authentication**: Uses **JWT** to authenticate users and protect private routes.
- 🗝️ **Data Encryption**: Ensures sensitive patient data is securely encrypted and decrypted using **AES256**.
- 🔄 **Real-time Updates**: **Socket.io** provides real-time updates for users (e.g., appointment status changes).

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** (latest version recommended)
- **npm** (for dependency management)

### Installation

1. **Clone the repository:**
    ```bash
    git clone https://github.com/izzatarramsyah/nextjs-clinic-mgmt-fe
    cd clinic-management-nextjs
    ```

2. **Install dependencies**:
    ```bash
    npm install
    ```

3. **Configure environment variables**: Create a `.env` file based on the provided `.env.example` file and configure it with the necessary values (e.g., backend API URL, JWT secret, etc.).

4. **Run the application**:
    ```bash
    npm run dev
    ```

5. **Access the application**: The application will be available at `http://localhost:3000`.

---

## 🖼️ Project Preview

**Dashboard**:
- Queue Information
<img width="956" alt="queue" src="https://github.com/izzatarramsyah/clinic-frontend-nextjs/assets/24617733/ca2dbed1-482e-437e-b9f7-d8597ea3bd11">

1. **Admin Page**:
  - Input data patient
    <img width="946" alt="input_admin" src="https://github.com/izzatarramsyah/clinic-frontend-nextjs/assets/24617733/61c56e56-2ef8-4c99-b356-24e2400ee587">
  - Input data doctor
    <img width="948" alt="input_dokter" src="https://github.com/izzatarramsyah/clinic-frontend-nextjs/assets/24617733/e6c78144-862a-4d21-b027-c5324ec925c3">
  - Manage Inventory & Medicine Stock
    <img width="956" alt="kelola inventaris" src="https://github.com/izzatarramsyah/clinic-frontend-nextjs/assets/24617733/e4af429b-dfd5-478e-b1f5-ec510849a48c">
  - Information
     <img width="946" alt="informasi_data" src="https://github.com/izzatarramsyah/clinic-frontend-nextjs/assets/24617733/cca9cec5-f361-48b2-a164-1128c9416736">
2. **Patient Page**:
  - buy medicine
    <img width="946" alt="buy medic" src="https://github.com/izzatarramsyah/clinic-frontend-nextjs/assets/24617733/99f1b06d-bc3e-48cf-8ac4-5030f4fa8f3a">
  - Queue Registration
    <img width="942" alt="pendaftaran_antrian" src="https://github.com/izzatarramsyah/clinic-frontend-nextjs/assets/24617733/ca32c618-9358-451c-8c68-e5bab39488e6">
  - View History ( Visit, Purchase History )
    <img width="944" alt="information2" src="https://github.com/izzatarramsyah/clinic-frontend-nextjs/assets/24617733/cb44e7a6-72cc-4174-b3b1-76a61153fdc7">
  - Consultation Chat with Doctor
    <img width="945" alt="konsultasi" src="https://github.com/izzatarramsyah/clinic-frontend-nextjs/assets/24617733/811ff519-e915-4399-8571-1798e413ce2e">
3. **Doctor Page**:
  - medical record
    <img width="944" alt="rekam_medis" src="https://github.com/izzatarramsyah/clinic-frontend-nextjs/assets/24617733/09f76dde-063e-41da-a347-088736ee9818">
  - Information
    <img width="947" alt="informasi3" src="https://github.com/izzatarramsyah/clinic-frontend-nextjs/assets/24617733/4bbd82c2-0c58-45d3-a382-501e9c17c53d">
  - List Queue
    <img width="953" alt="daftar_antrian" src="https://github.com/izzatarramsyah/clinic-frontend-nextjs/assets/24617733/94f81cd7-b27e-412d-a506-5875777deea9">
  - Consultation Chat with Patient
    <img width="946" alt="konsultasi2" src="https://github.com/izzatarramsyah/clinic-frontend-nextjs/assets/24617733/e0d2bd2f-2204-441b-bfa6-8694ecbc8378">


