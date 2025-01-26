import React from "react";

interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
}

interface ProductCardProps {
  cart: CartItem[];
  setCart: React.Dispatch<React.SetStateAction<CartItem[]>>;
}

const ProductCard: React.FC<ProductCardProps> = ({ cart, setCart }) => {
  const books = [
    { 
      id: 1, 
      name: "Simple Way Of Peace Life", 
      price: 40, 
      image: "https://images.pexels.com/photos/1166649/pexels-photo-1166649.jpeg" // Peaceful nature image
    },
    { 
      id: 2, 
      name: "Great Travel At Desert", 
      price: 38, 
      image: "https://images.pexels.com/photos/1785745/pexels-photo-1785745.jpeg" // Desert landscape
    },
    { 
      id: 3, 
      name: "The Lady Beauty Scarlet", 
      price: 45, 
      image: "https://images.pexels.com/photos/2060407/pexels-photo-2060407.jpeg" // Fashion beauty
    },
    { 
      id: 4, 
      name: "Once Upon A Time", 
      price: 35, 
      image: "https://images.pexels.com/photos/1261727/pexels-photo-1261727.jpeg" // Fairytale landscape
    },
    { 
      id: 5, 
      name: "Mystery of the Unknown", 
      price: 50, 
      image: "https://images.pexels.com/photos/1403341/pexels-photo-1403341.jpeg" // Mysterious foggy scene
    },
    { 
      id: 6, 
      name: "Adventures Galore", 
      price: 42, 
      image: "https://images.pexels.com/photos/3471412/pexels-photo-3471412.jpeg" // Adventure in nature
    },
  ];
  
  
  
  
  
  
  

  const handleAddToCart = (book: CartItem) => {
    setCart((prevCart) => [...prevCart, book]);
  };

  return (
    <div className="container mx-auto px-5 py-16">
      <h1 className="text-2xl font-bold my-4">Book List</h1>
      <div className="grid grid-cols-3 gap-4">
        {books.map((book) => (
          <div
            key={book.id}
            className="border rounded-lg p-4 hover:shadow-lg transition relative"
          >
            <img src={book.image} alt={book.name} className="w-full h-48 object-cover" />
            <h2 className="text-lg font-semibold mt-2">{book.name}</h2>
            <p className="text-gray-600">${book.price.toFixed(2)}</p>
            <button
              onClick={() => handleAddToCart(book)}
              className="bg-blue-500 text-white py-1 px-4 rounded mt-2 hover:bg-blue-600"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductCard;
