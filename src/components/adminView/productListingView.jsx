import React from "react";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import { useDispatch } from "react-redux";
import { deleteProduct, fetchAllProducts } from "@/store/admin/productSlice";
import { toast } from "react-toastify";

const ProductListingView = ({ product, setOpenCreateProductsDialog, setCurrentEditedId, setFormData }) => {
  
    const dispatch = useDispatch();
  const handleDeleteProduct = async (id) => {
    console.log("delete id => ", id);
    try {
        const deleteProdResult =  await dispatch(deleteProduct(id));
        if (deleteProduct.fulfilled.match(deleteProdResult) || deleteProdResult?.payload?.success) {
          toast.success("Product deleted successfully");
          dispatch(fetchAllProducts());
        }
      } catch (error) {
          toast.error(`Error occurred in deleting product: ${error.message}`);
      }
    }

    const handleEditProduct = (id) => {
      setCurrentEditedId(id);
      setFormData(product);
      setOpenCreateProductsDialog(true);
    }
    return (
      <Card className="w-full max-w-sm mx-auto">
        <div>
      <div className="relative">
        <img
          src={product?.image}
          alt={product?.title}
          className="w-full h-[300px] object-cover rounded-t-lg"
        />
      </div>

      <CardContent>
        <h2 className="text-lg font-bold mb-2 mt-2">{product?.title}</h2>
        <div className="flex justify-between items-center mb-2 p-0">
          <span
            className={`${
              product?.salePrice > 0 ? "line-through" : ""
            } text-md font-semibold text-primary`}
          >
            ${product?.price}
          </span>
          {product?.salePrice > 0 && (
            <span className="text-lg font-bold m-0 p-0">${product?.salePrice}</span>
          )}
        </div>
      </CardContent>

      <CardFooter className="flex justify-between items-center p-0 mb-2 ">
        <Button onClick={() => handleEditProduct(product?._id)}>Edit</Button>
        <Button onClick={() => handleDeleteProduct(product?._id)}>Delete</Button>
      </CardFooter>
    </div>
    </Card>
  );
};

export default ProductListingView;
