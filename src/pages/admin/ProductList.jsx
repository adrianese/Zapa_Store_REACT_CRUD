import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProdCard from "../../components/admin/ProdCard";
import { useAuth } from "../../context/AuthProvider";
import "./ProductList.css";


const ProductList = () => {
  const navigate = useNavigate();
  const { usuario } = useAuth();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProductsAndDetails = async () => {
      try {
        const [productsResponse, detailsResponse] = await Promise.all([
          fetch(
            "https://68e448c88e116898997b75e3.mockapi.io/api/productos/products"
          ),
          fetch("/detalles.json"),
        ]);

        if (!productsResponse.ok || !detailsResponse.ok) {
          throw new Error("Error al obtener productos o detalles");
        }

        const productsData = await productsResponse.json();
        const detailsData = await detailsResponse.json();

        const detallesArray = detailsData.productos_deportivos;

        if (!Array.isArray(detallesArray)) {
          throw new Error(
            "El archivo detalles.json no contiene un array válido en 'productos_deportivos'."
          );
        }

        const detallesMap = new Map(detallesArray.map((d) => [d.marca, d]));

        const productosConDetalles = productsData.map((p) => {
          const detalle = detallesMap.get(p.nombre); // ahora usamos p.nombre para buscar por marca

          return {
            ...p,
            disponible: p.disponible === true || p.disponible === "true",
            actividadText:
              detalle?.actividad_apta?.[0] || "Sin descripción disponible.",
            materialesText:
              detalle?.beneficios_materiales?.[0] ||
              "Sin materiales especificados.",
          };
        });

        setProducts(productosConDetalles);
      } catch (err) {
        console.error("Error al cargar datos:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProductsAndDetails();
  }, []);

  const handleDelete = (id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  if (loading) return <p className="loading-text">🔄 Cargando productos...</p>;
  if (error) return <p className="error-text">❌ Error: {error}</p>;

  return (
    <div className="product-list">
      <h2>Bienvenido, {usuario?.nombre}</h2>
      <button onClick={() => navigate("/admin/create")} className="boton-amarillo ">
        Crear Nuevo Producto
      </button>
      <button onClick={() => navigate("/admin/orders")} className="boton-amarillo ">
      Ver Órdenes
      </button>
      <h1>Lista de Productos</h1>
      <div className="productos-lista">
        {products.map((product) => (
          <ProdCard
            key={product.id}
            producto={product}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductList;

