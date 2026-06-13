import React from 'react';
import { Product } from '../types';
import { Heart, Star, Plus } from 'lucide-react';
import { formatPrice } from '../utils/validation';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  const [isFavorite, setIsFavorite] = React.useState(false);
  const [quantity, setQuantity] = React.useState(1);

  const handleAddToCart = () => {
    onAddToCart(product);
    setQuantity(1);
  };

  return (
    <div className="card overflow-hidden group hover:shadow-lg transition-all duration-300 h-full flex flex-col">
      {/* Image Container */}
      <div className="relative overflow-hidden bg-gray-200 h-48">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        
        {/* Favorite Button */}
        <button
          onClick={() => setIsFavorite(!isFavorite)}
          className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:scale-110 transition"
        >
          <Heart
            size={20}
            className={isFavorite ? 'fill-primary text-primary' : 'text-gray-400'}
          />
        </button>

        {/* Availability Badge */}
        {!product.available && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <span className="text-white font-bold">Out of Stock</span>
          </div>
        )}

        {product.spicy && (
          <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-bold flex items-center gap-1">
            🌶️ Spicy
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex-1 flex flex-col">
        <h3 className="font-bold text-lg text-dark mb-2 line-clamp-2">{product.name}</h3>
        
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{product.description}</p>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={14}
                className={i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
              />
            ))}
          </div>
          <span className="text-xs text-gray-600">({product.reviews})</span>
        </div>

        {/* Preparation Time */}
        <p className="text-xs text-gray-500 mb-3">⏱️ {product.preparationTime} mins</p>

        {/* Footer */}
        <div className="flex items-center justify-between mt-auto pt-4 border-t">
          <div>
            <p className="text-2xl font-bold text-primary">{formatPrice(product.price)}</p>
          </div>
          <button
            onClick={handleAddToCart}
            disabled={!product.available}
            className="bg-primary text-white p-2 rounded-lg hover:bg-secondary transition disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            <Plus size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
