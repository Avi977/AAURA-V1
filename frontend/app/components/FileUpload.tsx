import React, { useState } from 'react';
import axios from 'axios';

interface PresignedUrlResponse {
  url: string;
  key: string;
}

const FileUpload: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    try {
      // Step 1: Get a pre-signed URL from your Django backend
      const { data } = await axios.post<PresignedUrlResponse>('http://localhost:8000/api/get-upload-url/',{
        filename: file.name,
        content_type: file.type,
      });

      const uploadUrl = data.url;
      const s3key = data.key;

      // Step 2: Upload the file directly to S3
      await axios.put(uploadUrl, file, {
        headers: {
          'Content-Type': file.type,
        },
      });

      alert('Upload successful!');
    } catch (error) {
      console.error('Upload failed:', error);
      alert('Upload failed!');
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={!file}>
        Upload
      </button>
    </div>
  );
};

export default FileUpload;
