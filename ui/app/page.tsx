'use client'
import React from 'react';
export default function Home() {
  const [image, setImage] = React.useState<File | null>(null);
  const [preview, setPreview] = React.useState<string | null>(null);
  const [response, setresponse] = React.useState<{image:string; data:[]}|null>(null);

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
      console.log(data)
      setresponse(data);
      // setPreview(data.image)
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  return (
    <div>
      <div>
        <input type='file' onChange={handleImageChange}/>
        {preview && <img src={preview} width="300" height="300" alt="Preview" />}
        {response!=null ?<img src={`data:image/jpeg;base64, ${response.image}`} width="300" height="300"alt="Preview"/>: null}
        <button onClick={handleUpload}>upload</button>
      </div>
      <div>
        
        {response!=null ? <p>JSON response from model{JSON.stringify(response.data)}</p> : null}
      </div>
    </div>
  );
}
