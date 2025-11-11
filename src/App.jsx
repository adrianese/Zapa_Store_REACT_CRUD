import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthProvider";
import { CarritoProvider } from "./context/CarritoProvider";

import UserLayout from "./layouts/UserLayout";
import AdminLayout from "./layouts/AdminLayout";
import PrivateRoute from "./routes/PrivateRoute";

// Páginas públicas
import Inicio from "./pages/Inicio";
import Productos from "./pages/Productos";
import Nosotros from "./pages/Nosotros";
import Contacto from "./pages/Contacto";
import Carrito from "./pages/Carrito";
import Producto from "./pages/Producto";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Error404 from "./pages/Error404";

// Páginas privadas usuario
import MisCompras from "./pages/MisCompras";

// Páginas privadas admin
import LoginAdmin from "./components/admin/LoginAdmin";
import ProductList from "./pages/admin/ProductList";
import ProductForm from "./pages/admin/ProductForm";
import PedidosAdmin from "./pages/admin/PedidosAdmin";

function App() {
  return (
    <AuthProvider>
      <CarritoProvider>
        <Router>
          <Routes>
            {/* Layout público */}
            <Route
              path="/"
              element={
                <UserLayout>
                  <Inicio />
                </UserLayout>
              }
            />
            <Route
              path="/productos"
              element={
                <UserLayout>
                  <Productos />
                </UserLayout>
              }
            />
            <Route
              path="/nosotros"
              element={
                <UserLayout>
                  <Nosotros />
                </UserLayout>
              }
            />
            <Route
              path="/contacto"
              element={
                <UserLayout>
                  <Contacto />
                </UserLayout>
              }
            />
            <Route
              path="/carrito"
              element={
                <UserLayout>
                  <Carrito />
                </UserLayout>
              }
            />
            <Route
              path="/producto/:id"
              element={
                <UserLayout>
                  <Producto />
                </UserLayout>
              }
            />
            <Route
              path="/login"
              element={
                <UserLayout>
                  <Login />
                </UserLayout>
              }
            />
            <Route
              path="/register"
              element={
                <UserLayout>
                  <Register />
                </UserLayout>
              }
            />
            <Route
              path="/mis-compras"
              element={
                <PrivateRoute>
                  <UserLayout>
                    <MisCompras />
                  </UserLayout>
                </PrivateRoute>
              }
            />

            {/* Layout admin */}
            <Route
              path="/admin"
              element={
                <AdminLayout>
                  <LoginAdmin />
                </AdminLayout>
              }
            />
            <Route
              path="/admin/board"
              element={
                <PrivateRoute rolRequerido="admin">
                  <AdminLayout>
                    <ProductList />
                  </AdminLayout>
                </PrivateRoute>
              }
            />
            <Route
              path="/admin/create"
              element={
                <PrivateRoute rolRequerido="admin">
                  <AdminLayout>
                    <ProductForm />
                  </AdminLayout>
                </PrivateRoute>
              }
            />
            <Route
              path="/admin/update/:id"
              element={
                <PrivateRoute rolRequerido="admin">
                  <AdminLayout>
                    <ProductForm />
                  </AdminLayout>
                </PrivateRoute>
              }
            />
            <Route
              path="/admin/orders"
              element={
                <PrivateRoute rolRequerido="admin">
                  <AdminLayout>
                    <PedidosAdmin />
                  </AdminLayout>
                </PrivateRoute>
              }
            />

            {/* Error 404 */}
            <Route
              path="*"
              element={
                <UserLayout>
                  <Error404 />
                </UserLayout>
              }
            />
          </Routes>
        </Router>
      </CarritoProvider>
    </AuthProvider>
  );
}

export default App;

