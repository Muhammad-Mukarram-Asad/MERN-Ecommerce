import React, { useEffect } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useRef } from "react";
import { FileIcon, Loader2Icon, UploadCloud, XIcon } from "lucide-react";
import axios from "axios";

const ProductImageUpload = ({
  imageFile,
  setImageFile,
  uploadedImageUrl,
  setUploadedImageUrl,
  imageLoadingState,
  setImageLoadingState,
}) => {
  const imageRef = useRef(null);

  const handleUploadImageFile = (e) => {
    const file = e.target.files[0];
    file && setImageFile(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files?.[0];
    droppedFile && setImageFile(droppedFile);
  };

  const handleRemoveFile = () => {
    setImageFile(null);
    if (imageRef.current) {
      imageRef.current.value = "";
    }
  };

  const uploadImageToCloudinary = async () => {
    setImageLoadingState(true);
    const formData = new FormData();
    formData.append("myFile", imageFile);
    const response = await axios.post(
      "http://localhost:5000/api/admin/products/upload-image",
      formData
    );
    console.log("Image upload response => ", response);
    response && (
        setUploadedImageUrl(response?.data?.data?.url),
        setImageLoadingState(false)
    );

  };

  useEffect(() => {
    imageFile && uploadImageToCloudinary();
  }, [imageFile]);

  return (
    <main className="w-full max-w-md mx-auto mt-4">
      <Label className="text-lg font-semibold mb-2 block">
        Upload Product Images
      </Label>
      <div
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className="border-2 border-dashed rounded-lg p-4"
      >
        <Input
          type="file"
          id="image-upload"
          className=""
          ref={imageRef}
          onChange={handleUploadImageFile}
        />

        {!imageFile && !uploadedImageUrl ? (
          <Label
            htmlFor="image-upload"
            className="flex flex-col justify-center items-center h-32 cursor-pointer"
          >
            <UploadCloud className="h-10 w-10 text-muted-foreground mb-2 text-center" />
            <span>Drag & drop or Click to Upload</span>
          </Label>
        )  : (
          <div className="flex items-center justify-between mt-5">
            <div className="flex items-center">
              <FileIcon className="w-8 h-8 text-primary mr-2" />
            </div>
            <p className="text-sm font-medium">{imageFile.name}</p>
            <Button
              variant="secondary"
              size="icon"
              classNam="text-muted-foreground hover:text-foreground"
              onClick={handleRemoveFile}
            >
              <XIcon className="w-4 h-4" />
              <span className="sr-only">Remove Image</span>
            </Button>
          </div>
        )}
      </div>
    </main>
  );
};

export default ProductImageUpload;
