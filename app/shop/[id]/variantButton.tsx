"use client";
import { useState } from "react";
const sizes = ["XS", "S", "M", "L", "XL", "XXL"];
const colors = ["Ivory", "Sage", "Charcoal", "Blush"];

const VariantButton = (props: { colors?: string[], sizes?: string[] }) => {
    const [selectedSize, setSelectedSize] = useState(sizes[0])
    const [selectedColor, setSelectedColor] = useState(colors[0])
    if (props?.sizes) {
        return (
            <div className="mb-8">
                <label className="block text-sm font-semibold text-primary mb-3">Size: {selectedSize}</label>
                <div className="flex gap-3 flex-wrap">
                    {sizes.map((size) => (

                        <button
                            key={size}
                            onClick={() => setSelectedSize(size)}
                            className={`px-4 py-2 rounded-lg font-medium transition-all ${selectedSize === size
                                ? "bg-primary text-primary-foreground"
                                : "bg-muted hover:bg-muted/80 text-foreground"
                                }`}
                        >
                            {size}
                        </button>
                    ))}
                </div>
            </div>
        )
    } else if (props?.colors) {
        return (
            <div className="mb-8">
                <label className="block text-sm font-semibold text-primary mb-3">Color: {selectedColor}</label>
                <div className="flex gap-3 flex-wrap">
                    {colors.map((color) => (

                        <button
                            key={color}
                            onClick={() => setSelectedColor(color)}
                            className={`px-4 py-2 rounded-lg font-medium transition-all ${selectedColor === color
                                ? "bg-primary text-primary-foreground"
                                : "bg-muted hover:bg-muted/80 text-foreground"
                                }`}
                        >
                            {color}
                        </button>
                    ))}
                </div>
            </div>
        )

    }
}

export default VariantButton;
