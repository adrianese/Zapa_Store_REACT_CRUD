import React from "react";
import Header from "../components/admin/Header";
import Footer from "../components/admin/Footer";




const AdminLayout = ({ children }) => (

  <>
    <Header />
    <main>{children}</main>
    <Footer />
  </>
);

export default AdminLayout;
