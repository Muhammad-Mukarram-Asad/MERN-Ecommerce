import ComponentForm from "@/components/common/form";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import React, { Fragment, useEffect, useState } from "react";
import { addProductFormElements } from "@/config";
import { Button } from "@/components/ui/button";
import ProductImageUpload from "@/components/adminView/imageUpload";
import {
  addNewProduct,
  editProduct,
  fetchAllProducts,
} from "@/store/admin/productSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import ProductListingView from "@/components/adminView/productListingView";

const AdminProduct = () => {
  const initialFormData = {
    image: null,
    title: "",
    description: "",
    category: "",
    brand: "",
    price: "",
    salePrice: "",
    totalStock: "",
    averageReview: 0,
  };
  const [openCreateProductsDialog, setOpenCreateProductsDialog] =
    useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const [currentEditedId, setCurrentEditedId] = useState(null);

  const dispatch = useDispatch();

  const { productList } = useSelector((state) => state.adminProducts);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const result =
        currentEditedId !== null
          ? await dispatch(
              editProduct({
                ...formData,
                image: uploadedImageUrl,
                id: currentEditedId,
              })
            )
          : await dispatch(
              addNewProduct({
                ...formData,
                image: uploadedImageUrl,
              })
            );

      if (result) {
        currentEditedId !== null
          ? toast.success("Product Edited Successfully...")
          : toast.success("New Product Added Successfully...");
        setOpenCreateProductsDialog(false);
        setFormData(initialFormData);
        setImageFile(null);
        setCurrentEditedId(null);
        dispatch(fetchAllProducts());
      }
    } catch (error) {
      currentEditedId !== null
        ? toast.error(`Error occurred in editing product: ${error.message}`)
        : toast.error(`Error occurred in adding product: ${error.message}`);
    }
  };

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  console.log("productList => ", productList);

  return (
    <Fragment>
      <div className="w-full flex justify-end mb-5">
        <Button onClick={() => setOpenCreateProductsDialog(true)}>
          Add New Product
        </Button>
      </div>
      <div className="flex justify-around flex-wrap gap-5">
        {productList.length > 0
          ? productList.map((prodItem, index) => (
              <ProductListingView
                key={index}
                product={prodItem}
                setOpenCreateProductsDialog={setOpenCreateProductsDialog}
                setCurrentEditedId={setCurrentEditedId}
                setFormData={setFormData}
              />
            ))
          : null}
      </div>

      <Sheet
        open={openCreateProductsDialog}
        onOpenChange={() => {
          setOpenCreateProductsDialog(false);
          // setCurrentEditedId(null);
          // setFormData(initialFormData);
        }}
      >
        <SheetContent side="right" className="overflow-auto">
          <SheetHeader>
            <SheetTitle>
              {" "}
              {currentEditedId !== null ? "Edit Product" : "Add New Product"}
            </SheetTitle>
          </SheetHeader>

          <ProductImageUpload
            imageFile={imageFile}
            setImageFile={setImageFile}
            uploadedImageUrl={uploadedImageUrl}
            setUploadedImageUrl={setUploadedImageUrl}
            imageLoadingState={imageLoadingState}
            setImageLoadingState={setImageLoadingState}
          />
          <div className="py-6">
            <ComponentForm
              onSubmit={onSubmit}
              formData={formData}
              setFormData={setFormData}
              buttonText={currentEditedId !== null ? "Edit" : "Add"}
              formControls={addProductFormElements}
              // isBtnDisabled={!isFormValid()}
            />
          </div>
        </SheetContent>
      </Sheet>
    </Fragment>
  );
};

export default AdminProduct;
