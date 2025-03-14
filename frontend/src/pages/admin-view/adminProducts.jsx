import { Sheet, SheetContent, SheetHeader, SheetTitle } from '../../components/ui/sheet'
import { Button } from '../../components/ui/button'
import React, { Fragment, useEffect, useState } from 'react'
import CommonForm from '../../components/common/commonForm';
import { addProductFormElements } from '../../config/index';
import ProductImageUpload from '../../components/admin-view/imageUpload';
import { useDispatch } from 'react-redux';
import { handleAddNewProduct, handleFetchAllProducts } from '../../store/admin/product-slice/index';
import toast from 'react-hot-toast';

const initialFormData = {
  image: null,
  title: '',
  description: '',
  category: '',
  brand: '',
  price: '',
  salePrice: '',
  totalStock: '',
};


const AdminProductsPage = () => {
  const [openCreateProductDialog, setOpenCreateProductDialog] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState('');
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const dispatch = useDispatch();

  function onSubmit(event){
    event.preventDefault();
    const newProductData = {...formData, image: uploadedImageUrl};
    if(uploadedImageUrl !== ''){
      dispatch(handleAddNewProduct(newProductData)).then((response) => {
        if(response?.payload?.success){
          dispatch(handleFetchAllProducts())
          setImageFile(null);
          setFormData(initialFormData);
          setOpenCreateProductDialog(false);
          toast.success(response?.payload?.message);
        }else{
          toast.error(response?.error?.message || response?.payload?.message);
        }
      })
    }else{
      toast.error("Image hasn't set, try uploading image again");
    }
  };

  useEffect(() => {
    dispatch(handleFetchAllProducts());
  }, [dispatch]);

  return (
    <Fragment>
      <div className='mb-5 flex justify-end w-full'>
        <Button className="bg-black text-white cursor-pointer" onClick={() => setOpenCreateProductDialog(true)}>
          Add New Product
        </Button>
      </div>
      <div className='grid gap-4 md:grid-cols-3 lg:grid-cols-4'></div>
      <Sheet open={openCreateProductDialog} onOpenChange={() => setOpenCreateProductDialog(false)}>
        <SheetContent side="right" className="overflow-auto bg-white">
          <SheetHeader>
            <SheetTitle>
             Add New Product 
            </SheetTitle>
          </SheetHeader>
          <ProductImageUpload imageFile={imageFile} setImageFile={setImageFile} uploadedImageUrl={uploadedImageUrl} setUploadedImageUrl={setUploadedImageUrl} setImageLoadingState={setImageLoadingState}/>
          <div className='py-6'>
            <CommonForm 
              formControls={addProductFormElements}
              formData={formData}
              setFormData={setFormData}
              buttonText='Add'
              onSubmit={onSubmit}
            />
          </div>
        </SheetContent>
      </Sheet>
    </Fragment>
  )
}

export default AdminProductsPage
