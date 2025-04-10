import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "../../components/ui/sheet";
import { Button } from "../../components/ui/button";
import React, { Fragment, useEffect, useState } from "react";
import CommonForm from "../../components/common/commonForm";
import { addProductFormElements } from "../../config/index";
import ProductImageUpload from "../../components/admin-view/imageUpload";
import { useDispatch, useSelector } from "react-redux";
import {
  handleAddNewProduct,
  handleDeleteProduct,
  handleEditProduct,
  handleFetchAllProducts,
} from "../../store/admin/product-slice/index";
import toast from "react-hot-toast";
import AdminProductTile from "../../components/admin-view/product-tile";
import { SkeletonCard } from "../../components/skeletons/skeleteonCard";

const initialFormData = {
  image: null,
  title: "",
  description: "",
  category: "",
  brand: "",
  price: "",
  salePrice: "",
  totalStock: "",
};

const AdminProductsPage = () => {
  const [openCreateProductDialog, setOpenCreateProductDialog] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const [currentEditedId, setCurrentEditedId] = useState(null);
  const dispatch = useDispatch();
  const { productLists, isLoading } = useSelector(
    (state) => state.admin_product_slice
  );

  function isFormDataFilled() { 
    // return Object.keys(formData)
    //   .map((key) => formData[key] !== null && formData[key] !== "" )
    //   .every((item) => item);
    return Object.keys(formData)
      .filter((key) => key !== 'salePrice')
      .every((key) => formData[key] !== null && formData[key] !== "");
  }

  console.log({formData})  

  function onSubmit(event) {
    event.preventDefault();
    const newProductData = { ...formData, image: uploadedImageUrl };
    if (uploadedImageUrl !== "") {
      if (currentEditedId !== null) {
        dispatch(
          handleEditProduct({
            id: currentEditedId,
            updatedProductData: imageFile ? newProductData : formData,
          })
        ).then((response) => {
          if (response?.payload?.success) {
            dispatch(handleFetchAllProducts());
            setImageFile(null);
            setUploadedImageUrl("");
            setFormData(initialFormData);
            setCurrentEditedId(null);
            setOpenCreateProductDialog(false);
            toast.success(response?.payload?.message);
          } else {
            toast.error(response?.error?.message || response?.payload?.message);
          }
        });
      } else {
        dispatch(handleAddNewProduct(newProductData)).then((response) => {
          if (response?.payload?.success) {
            dispatch(handleFetchAllProducts());
            setImageFile(null);
            setFormData(initialFormData);
            setOpenCreateProductDialog(false);
            toast.success(response?.payload?.message);
          } else {
            toast.error(response?.error?.message || response?.payload?.message);
          }
        });
      }
    } else {
      toast.error("Image hasn't set, try uploading image again");
    }
  }

  console.log('uploadImageUrl' + uploadedImageUrl)

  function handleOnDelete(productId) {
    console.log(productId);
    dispatch(handleDeleteProduct(productId)).then((response) => {
      if(response?.payload?.success){
        dispatch(handleFetchAllProducts());
        toast.success(response?.payload?.message);
      }else{
        toast.error(response?.error?.message || response?.payload?.message);
      }
    })
  }

  const handleOpenAddProduct = () => {
    setFormData({
      ...formData,
      image: null
    });
    setUploadedImageUrl(null)
  };

  useEffect(() => {
    dispatch(handleFetchAllProducts());
  }, [dispatch]);

  if (isLoading) {
    return <SkeletonCard />;
  }
  return (
    <Fragment>
      <div className="mb-5 flex justify-end w-full">
        <Button
          className="bg-black text-white cursor-pointer"
          onClick={() => {
            setOpenCreateProductDialog(true);
            setFormData(initialFormData);
            setCurrentEditedId(null);
            handleOpenAddProduct();
          }}
        >
          Add New Product
        </Button>
      </div>
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
        {productLists && productLists?.data?.length > 0
          ? productLists?.data?.map((productItem) => (
              <AdminProductTile
                key={productItem._id}
                product={productItem}
                setCurrentEditedId={setCurrentEditedId}
                setFormData={setFormData}z
                setOpenCreateProductDialog={setOpenCreateProductDialog}
                handleOnDelete={handleOnDelete}
              />
            ))
          : toast.error("something")}
      </div>
      <Sheet
        open={openCreateProductDialog}
        onOpenChange={() => setOpenCreateProductDialog(false)}
      >
        <SheetContent side="right" className="overflow-auto bg-white">
          <SheetHeader>
            <SheetTitle>Add New Product</SheetTitle>
          </SheetHeader>
          <ProductImageUpload
            imageFile={imageFile}
            setImageFile={setImageFile}
            uploadedImageUrl={uploadedImageUrl}
            setUploadedImageUrl={setUploadedImageUrl}
            setImageLoadingState={setImageLoadingState}
            currentEditedId={currentEditedId}
            formData={formData}
            setFormData={setFormData}
          />
          <div className="py-6">
            <CommonForm
              formControls={addProductFormElements}
              formData={formData}
              setFormData={setFormData}
              buttonText="Add"
              onSubmit={onSubmit}
              isButtonDisabled={!isFormDataFilled()}
            />
          </div>
        </SheetContent>
      </Sheet>
    </Fragment>
  );
};

export default AdminProductsPage;
