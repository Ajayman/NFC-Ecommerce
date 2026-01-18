"use client"
import { useState } from 'react';
import { ShoppingBag, Check } from "lucide-react"
const AddToCartButton = () => {
    const [isAdded, setIsAdded] = useState(false)
    const handleAddToCart = () => {
        setIsAdded(true)
        setTimeout(() => setIsAdded(false), 2000)
    }
    return (
        <div>
            <button
                onClick={handleAddToCart}
                className={`w-full py-4 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all ${isAdded ? "bg-green-600 text-white" : "bg-primary text-primary-foreground hover:bg-primary/90"
                    }`}
            >
                {isAdded ? (
                    <>
                        <Check size={20} />
                        Added to Cart
                    </>
                ) : (
                    <>
                        <ShoppingBag size={20} />
                        Add to Cart
                    </>
                )}
            </button>

        </div>
    );
}

export default AddToCartButton;
