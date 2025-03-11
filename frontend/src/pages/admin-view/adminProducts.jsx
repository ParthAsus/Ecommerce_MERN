import { Sheet, SheetContent, SheetHeader, SheetTitle } from '../../components/ui/sheet'
import { Button } from '../../components/ui/button'
import React, { Fragment, useState } from 'react'
import CommonForm from '../../components/common/commonForm';
import { addProductFormElements } from '../../config/index';
import ProductImageUpload from '../../components/admin-view/imageUpload';

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

function onSubmit(){

};

const AdminProductsPage = () => {
  const [openCreateProductDialog, setOpenCreateProductDialog] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState('');
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
          <ProductImageUpload imageFile={imageFile} setImageFile={setImageFile} uploadedImageUrl={uploadedImageUrl} setUploadedImageUrl={setUploadedImageUrl} />
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
