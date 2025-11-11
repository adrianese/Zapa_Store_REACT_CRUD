import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import "./ProductForm.css";

const ProductForm = () => {
  const [product, setProduct] = useState({
    nombre: "",
    actividad: "",
    disponible: false,
    precio: "",
    imagen: "",
    actividadText: "",
    materialesText: "",
  });

  const [details, setDetails] = useState([]);
  const [errores, setErrores] = useState({});
  const [preview, setPreview] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  const validarImagen = (nombreArchivo, nombreMarca) => {
    if (!nombreArchivo) return false;
    const extensionValida = nombreArchivo.toLowerCase().endsWith(".jpg");
    const marca = nombreMarca.slice(0, 2).toUpperCase();
    const regex = new RegExp(`^${marca}-\\d{4}\\.jpg$`);
    return extensionValida && regex.test(nombreArchivo);
  };

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await fetch("/detalles.json");
        if (!response.ok) throw new Error("Error de red");
        const detailsData = await response.json();
        setDetails(detailsData);
      } catch (error) {
        console.error("Error al cargar detalles:", error);
        Swal.fire(
          "Error",
          "No se pudieron cargar los detalles del producto.",
          "error"
        );
      }
    };

    fetchDetails();
  }, []);

  useEffect(() => {
    const fetchProductData = async () => {
      if (id && details.productos_deportivos) {
        try {
          const response = await fetch(
            `https://68e448c88e116898997b75e3.mockapi.io/api/productos/products/${id}`
          );
          if (!response.ok) throw new Error("Error de red");
          const productData = await response.json();

          const detallesArray = details.productos_deportivos;
          const matchedDetail = detallesArray.find(
            (d) => d.marca.toLowerCase() === productData.nombre.toLowerCase()
          );

          const actividadText = matchedDetail?.actividad_apta?.[0] || "";
          const materialesText =
            matchedDetail?.beneficios_materiales?.[0] || "";

          setProduct({
            ...productData,
            actividadText,
            materialesText,
          });

          setPreview(`/img/${productData.imagen}`);
        } catch (error) {
          console.error("Error al cargar producto:", error);
          Swal.fire(
            "Error",
            "No se pudo cargar el producto para editar.",
            "error"
          );
          navigate("/admin/board");
        }
      }
    };

    fetchProductData();
  }, [id, details, navigate]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const nuevoValor = type === "checkbox" ? checked : value;

    // Actualizamos el campo editado
    let updatedProduct = { ...product, [name]: nuevoValor };

    // Si se está creando un producto y se modifica el nombre
    if (name === "nombre" && !id) {
      const detallesArray = details.productos_deportivos || [];

      const matchedDetail = detallesArray.find(
        (d) => d.marca.toLowerCase() === value.toLowerCase()
      );

      if (matchedDetail) {
        updatedProduct = {
          ...updatedProduct,
          actividadText: matchedDetail.actividad_apta?.[0] || "",
          materialesText: matchedDetail.beneficios_materiales?.[0] || "",
        };
      } else {
        updatedProduct = {
          ...updatedProduct,
          actividadText: "",
          materialesText: "",
        };
      }
    }

    if (name === "imagen") {
      setPreview(`/img/${nuevoValor}`);
    }

    setProduct(updatedProduct);
    setErrores((prev) => ({ ...prev, [name]: false }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const nuevosErrores = {};

    if (!product.nombre.trim()) nuevosErrores.nombre = true;
    if (!product.actividad.trim()) nuevosErrores.actividad = true;
    if (!product.precio || isNaN(Number(product.precio)))
      nuevosErrores.precio = true;
    if (!product.imagen || !validarImagen(product.imagen, product.nombre))
      nuevosErrores.imagen = true;

    if (Object.keys(nuevosErrores).length > 0) {
      setErrores(nuevosErrores);

      const campos = Object.keys(nuevosErrores)
        .map((campo) => `• ${campo.charAt(0).toUpperCase() + campo.slice(1)}`)
        .join("<br/>");

      Swal.fire({
        title: "Atención",
        html: `Por favor completá correctamente los siguientes campos:<br/><br/>${campos}`,
        icon: "warning",
      });

      return;
    }

  

    const productoFinal = {
      ...product,
      disponible: product.disponible === true || product.disponible === "true",
    };


    const url = id
      ? `https://68e448c88e116898997b75e3.mockapi.io/api/productos/products/${id}`
      : "https://68e448c88e116898997b75e3.mockapi.io/api/productos/products";
    const method = id ? "PUT" : "POST";

    try {
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productoFinal),
      });

      if (!response.ok) throw new Error("Error en la operación");

      Swal.fire(
        "Éxito",
        `Producto ${id ? "actualizado" : "creado"} correctamente.`,
        "success"
      );
      navigate("/admin/board");
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
      Swal.fire("Error", "Hubo un problema al enviar los datos.", "error");
    }
  };

  return (
    <div className="product-form-container">
      <h2>{id ? "Editar Producto" : "Crear Producto"}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nombre</label>
          <input
            type="text"
            name="nombre"
            value={product.nombre}
            onChange={handleChange}
            className={errores.nombre ? "input-error" : ""}
            required
          />
        </div>
        <div className="form-group">
          <label>Actividad</label>
          <input
            type="text"
            name="actividad"
            value={product.actividad}
            onChange={handleChange}
            className={errores.actividad ? "input-error" : ""}
            required
          />
        </div>
        <div className="form-group">
          <label>Precio</label>
          <input
            type="number"
            name="precio"
            value={product.precio}
            onChange={handleChange}
            className={errores.precio ? "input-error" : ""}
            required
          />
        </div>
        <div className="form-group">
          <label>Nombre de imagen (ej: CO-1234.jpg)</label>
          <input
            type="text"
            name="imagen"
            value={product.imagen}
            onChange={handleChange}
            className={errores.imagen ? "input-error" : ""}
            required
          />
        </div>
        {preview && (
          <div className="previe">
            <p>Vista previa:</p>
            <img className="previe-img" src={preview} alt="Vista previa" />
          </div>
        )}
        <div className="form-group">
          <label>Descripción de actividad</label>
          <textarea
            name="actividadText"
            value={product.actividadText}
            readOnly
          />
        </div>
        <div className="form-group">
          <label>Materiales</label>
          <textarea
            name="materialesText"
            value={product.materialesText}
            readOnly
          />
        </div>
        <div className="radio-group">
          <label>
            <input
              type="radio"
              name="disponible"
              value="true"
              checked={product.disponible === true}
              onChange={() =>
                setProduct((prev) => ({ ...prev, disponible: true }))
              }
            />
            ✅ Disponible
          </label>
          <label>
            <input
              type="radio"
              name="disponible"
              value="false"
              checked={product.disponible === false}
              onChange={() =>
                setProduct((prev) => ({ ...prev, disponible: false }))
              }
            />
            ❌ Sin stock
          </label>
        </div>
        <div className="form-actions">
          <button
            type="button"
            className="boton-verde redondeado"
            onClick={() => navigate(-1)}
          >
             Volver
          </button>
          <button type="submit" className="boton-verde redondeado">
            {id ? " Actualizar Producto" : " Crear Producto"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
