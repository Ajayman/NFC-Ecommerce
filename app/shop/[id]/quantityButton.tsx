"use client";
import { useState } from 'react';

const QuantityButton = () => {
    const [quantity, setQuantity] = useState(1)
    return (
        <div className="mb-8">
            <label className="block text-sm font-semibold text-primary mb-3">Quantity</label>
            <div className="flex items-center gap-4">
                <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-2 bg-muted hover:bg-muted/80 rounded-lg transition-colors"
                >
                    −
                </button>
                <span className="text-xl font-semibold min-w-12 text-center">{quantity}</span>
                <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-4 py-2 bg-muted hover:bg-muted/80 rounded-lg transition-colors"
                >
                    +
                </button>
            </div>
        </div>
    );
}

export default QuantityButton;
