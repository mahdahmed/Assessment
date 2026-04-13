const ProductCard = ({ product }) => {
    return (
      <div className="bg-white relative rounded-md shadow hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col h-full">
        <div className="h-52 bg-white p-4 flex items-center justify-center">
          <img
            src={product.thumbnail}
            alt={product.title}
            className="max-h-full max-w-full object-contain"
          />
        </div>
  
        <div className="p-4 flex-1 flex flex-col">
          <span className="text-xs font-medium px-3 py-1 absolute top-2 left-2 bg-lime-800 text-white rounded-md capitalize w-fit">
            {product.category}
          </span>
  
          <h3 className=" font-semibold text-sm leading-tight line-clamp-1">
            {product.title}
          </h3>
  
          <div className=" flex items-end justify-between mb-auto">
            <span className="text-xl font-bold">${product.price}</span>
            
            <div className="text-right">
              <div className="flex items-center gap-1 text-amber-400 text-lg">
                {'★'.repeat(Math.floor(product.rating))}
              </div>
              <p className="text-xs text-gray-500">({product.stock} left)</p>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default ProductCard;