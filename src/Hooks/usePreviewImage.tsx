import React, { useState } from 'react';

function usePreviewImage() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null); 
  const imageFileSize = 4 * 1024 * 1024; 

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];

    if (file) {
      // Check if file type is an image
      if (!file.type.startsWith('image/')) {
        alert("Please select an image file");
        return;
      }

      // Check file size
      if (file.size > imageFileSize) {
        alert("File size must not exceed 4MB");
        setSelectedImage(null);
        return;
      }

      // Read the file and set the result as a data URL
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setSelectedImage(reader.result); // Only set if result is a string (data URL)
        }
      };
      reader.readAsDataURL(file);
    }
  }

  return { selectedImage, handleImageChange, setSelectedImage };
}

export default usePreviewImage;
