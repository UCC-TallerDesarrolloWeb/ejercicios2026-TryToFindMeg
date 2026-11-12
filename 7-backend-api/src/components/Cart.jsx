import { formatPrice } from '../utils/formatPrice.js';

function Cart({ items, onRemove, onClear }) {
  const units = items.reduce((sum, { quantity }) => sum + quantity, 0);
  const total = items.reduce((sum, { product, quantity }) => sum + product.precio * quantity, 0);

  return (
    <aside className="store-cart card" aria-labelledby="cart-title">
      <h2 id="cart-title">Carrito</h2>
      {items.length === 0 ? (
        <p>El carrito está vacío.</p>
      ) : (
        <ul className="store-cart-items">
          {items.map(({ product, quantity }) => (
            <li key={product.id}>
              <h3>{product.nombre}</h3>
              <p>{quantity} × {formatPrice(product.precio)}</p>
              <p className="store-price">{formatPrice(product.precio * quantity)}</p>
              <button
                type="button"
                className="store-button store-button-secondary"
                aria-label={'Quitar una unidad de ' + product.nombre}
                onClick={() => onRemove(product.id)}
              >
                Quitar una unidad
              </button>
            </li>
          ))}
        </ul>
      )}
      <dl className="product-facts store-cart-summary" role="status">
        <dt>Unidades</dt>
        <dd>{units}</dd>
        <dt>Total</dt>
        <dd className="store-price">{formatPrice(total)}</dd>
      </dl>
      {items.length > 0 && (
        <button className="store-button store-button-secondary" type="button" onClick={onClear}>
          Vaciar carrito
        </button>
      )}
    </aside>
  );
}

export default Cart;
