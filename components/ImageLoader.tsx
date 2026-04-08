// ImageLoader.jsx
import React, { useState } from 'react';
import LoadingSpinner from './LoadingSpinner';
import "@/app/lib/css/style.css" // Add CSS for positioning
import Image from 'next/image';
const ImageLoader = ({ src, alt }: { src: string, alt: string }) => {
    const [isLoading, setIsLoading] = useState(true);

    const handleImageLoad = () => {
        setIsLoading(false);
    };

    return (
        <div className="image-container">
            {isLoading && (
                <div className="spinner-overlay">
                    <LoadingSpinner />
                </div>
            )}
            <Image
                src={src}
                alt={alt}
                width={50}
                height={50}
                onLoad={handleImageLoad}
                style={{ display: isLoading ? 'none' : 'block' }} // Hide image until loaded
            />
        </div>
    );
};

export default ImageLoader;