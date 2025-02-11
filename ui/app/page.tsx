'use client'
import React from 'react';
export default function Home() {
  const [image, setImage] = React.useState<File | null>(null);
  const [preview, setPreview] = React.useState<string | null>(null);
  const [response, setresponse] = React.useState<string>("");

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setImage(file);
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleUpload = async () => {
    if (!image) return alert("Please select an image first.");
    const formData = new FormData();
    formData.append("file", image);
    try {
      const result = await fetch("http://127.0.0.1:8000/detect/", {method: "POST",body: formData});
      const data = await result.json();
      setresponse(data);
    } catch (error) {
      console.error("Error uploading image:", error);
      setresponse(JSON.stringify(error))
    }
  };

  return (
    <div>
      <div>
        <input type='file' onChange={handleImageChange}/>
        {preview && <img src={preview} alt="Preview"/>}
        <button onClick={handleUpload}>upload</button>
      </div>
      <div>
        <p>{JSON.stringify(response)}</p>
      </div>
    </div>
  );
}
