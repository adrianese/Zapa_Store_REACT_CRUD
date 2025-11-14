import React from "react";
import Header from "../components/admin/Header";
import Footer from "../components/admin/Footer";
import AdminNav from "../components/admin/AdminPanel";



const AdminLayout = ({ children }) => {
  return (
    <div className="admin-layout">
      <Header />
     
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default AdminLayout;