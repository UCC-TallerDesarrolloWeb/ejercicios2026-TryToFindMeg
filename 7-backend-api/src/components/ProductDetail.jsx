import { useEffect, useRef } from 'react';
import { formatPrice } from '../utils/formatPrice.js';

function ProductDetail({ product, onClose }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog.open) {
      dialog.showModal();
    }
  }, []);

  return (
    <dialog
      ref={dialogRef}
      className="product-detail"
      aria-labelledby="product-detail-title"
      onClose={onClose}
    >
      <h2 id="product-detail-title">{product.nombre}</h2>
      <img className="store-product-image" src={product.imagen} alt={product.nombre} />
      <p>{product.description}</p>
      <dl className="product-facts">
        <dt>Marca</dt>
        <dd>{product.marca}</dd>
        <dt>Categoría</dt>
        <dd>{product.categoria}</dd>
        <dt>Talles</dt>
        <dd>{product.talle.join(', ')}</dd>
      </dl>
      <p className="store-price">{formatPrice(product.precio)}</p>
      <form method="dialog">
        <button className="store-button store-button-secondary" type="submit">Cerrar</button>
      </form>
    </dialog>
  );
}

export default ProductDetail;
