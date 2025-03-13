import React, { useEffect, useRef } from 'react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { FileIcon, Rss, UploadCloudIcon, XIcon } from 'lucide-react';
import { Button } from '../ui/button';
import { axiosInstance } from '../../lib/axios';

const ProductImageUpload = ({imageFile, setImageFile, uploadedImageUrl, setUploadedImageUrl, setImageLoadingState}) => {
  const inputRef = useRef(null);
  const handleImageFileChange = (event) => {
    console.log(event.target.files);
    const selectedFile = event.target?.files[0];
    if(selectedFile) setImageFile(selectedFile);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files?.[0];
    if(droppedFile) setImageFile(droppedFile);
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    if(inputRef.current){
      inputRef.current.value = "";
    }
  };

  async function uploadImageToCloudinary(){
    setImageLoadingState(true);
    const data = new FormData();
    data.append('my_file', imageFile);
    const response = await axiosInstance.post('/admin/prodcuts/upload-image', data);
    console.log(response);
    if(response.data?.success){
      setUploadedImageUrl(response.data?.result?.url);
      setImageLoadingState(false);
    }
  }

  useEffect(() => {
    if(imageFile !== null) uploadImageToCloudinary();
  }, [imageFile]);
  return (
    <div className='w-full max-w-md mx-auto mt-4'>
      <Label className="text-lg font-semibold mb-2 block">Upload Image</Label>
      <div onDragOver={handleDragOver} onDrop={handleDrop} className='border-2 border-dashed rounded-lg p-4 hover:border-gray-950 transition-all'>
        <Input id='image-upload' type='file' className='hidden' ref={inputRef} onChange={handleImageFileChange}/>
        {!imageFile 
          ? 
          (
            <Label htmlFor="image-upload" className="flex flex-col items-center justify-center h-32 cursor-pointer" >
              <UploadCloudIcon className='w-10 h-10 text-black mb-2'/>
              <span>Drag & Drop or click to upload</span>
            </Label>
          ) 
          : 
          (
            <div className='flex items-center justify-between'>
              <div className='flex items-center'>
                <FileIcon className='w-8 h-8 text-black mr-2'/>
              </div>
              <p className='text-sm font-medium'>{imageFile.name}</p>
              <Button variant="ghost" size="icon" className="text-black hover:text-gray-800" onClick={handleRemoveImage}>
                <XIcon/>  
                <span className='sr-only'>Remove File</span>
              </Button>
            </div>
          )
        }
      </div>
    </div>
  )
}

export default ProductImageUpload
