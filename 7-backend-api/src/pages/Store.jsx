import { useEffect, useState } from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import Card from '@components/Card.jsx';
import Cart from '@components/Cart.jsx';
import ProductDetail from '@components/ProductDetail.jsx';
import { formatPrice } from '../utils/formatPrice.js';
import '@styles/Store.css';

const cartStorageKey = 'unidad7-carrito';

function readCart() {
  try {
    const cart = JSON.parse(localStorage.getItem(cartStorageKey));
    return Array.isArray(cart) ? cart : [];
  } catch {
    return [];
  }
}

function Store() {
  const { isLogin } = useOutletContext();
  const [products, setProducts] = useState(null);
  const [hasError, setHasError] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cart, setCart] = useState(readCart);

  useEffect(() => {
    const controller = new AbortController();

    async function loadProducts() {
      try {
        const response = await fetch('http://127.0.0.1:4000/products', {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error('La consulta de productos falló.');
        }

        const data = await response.json();
        if (!Array.isArray(data)) {
          throw new Error('Formato de productos incorrecto.');
        }
        if (!controller.signal.aborted) {
          setProducts(data);
        }
      } catch {
        if (!controller.signal.aborted) {
          setHasError(true);
        }
      }
    }

    loadProducts();
    return () => controller.abort();
  }, []);

  useEffect(() => {
    localStorage.setItem(cartStorageKey, JSON.stringify(cart));
  }, [cart]);

  const cartItems = (products ?? []).map((product) => ({
    product,
    quantity: cart.filter((id) => id === product.id).length,
  })).filter(({ quantity }) => quantity > 0);

  function addProduct(id) {
    if (isLogin) {
      setCart((currentCart) => [...currentCart, id]);
    }
  }

  function removeProduct(id) {
    setCart((currentCart) => {
      const position = currentCart.indexOf(id);
      return currentCart.filter((_, index) => index !== position);
    });
  }

  return (
    <section className="store-page">
      <h1>Tienda</h1>
      {!products && !hasError && <p role="status">Cargando productos...</p>}
      {hasError && <p role="alert">No se pudieron cargar los productos. Recargá la página para reintentar.</p>}
      {products && (
        <>
          {!isLogin && <p><Link to="/login">Iniciá sesión</Link> para agregar productos al carrito.</p>}
          <div className="store-content">
            <div className="store-products">
              {products.length === 0 && <p>No hay productos disponibles.</p>}
              {products.map((product) => (
                <Card key={product.id} titulo={product.nombre} subtitulo={product.marca}>
                  <img className="store-product-image" src={product.imagen} alt={product.nombre} loading="lazy" />
                  <p className="store-price">{formatPrice(product.precio)}</p>
                  <div className="store-actions">
                    <button
                      className="store-button store-button-secondary"
                      type="button"
                      aria-label={'Ver detalle de ' + product.nombre}
                      onClick={() => setSelectedProduct(product)}
                    >
                      Ver detalle
                    </button>
                    {isLogin && (
                      <button
                        className="store-button"
                        type="button"
                        aria-label={'Agregar al carrito ' + product.nombre}
                        onClick={() => addProduct(product.id)}
                      >
                        Agregar al carrito
                      </button>
                    )}
                  </div>
                </Card>
              ))}
            </div>
            <Cart items={cartItems} onRemove={removeProduct} onClear={() => setCart([])} />
          </div>
        </>
      )}
      {selectedProduct && (
        <ProductDetail product={selectedProduct} onClose={() => setSelectedProduct(null)} />
      )}
    </section>
  );
}

export default Store;
