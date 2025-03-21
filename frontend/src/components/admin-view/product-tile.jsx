import React from 'react'
import { Card, CardContent, CardFooter } from '../ui/card';
import { Button } from '../ui/button';
import { SkeletonCard } from '../skeletons/skeleteonCard';

const AdminProductTile = ({product, setCurrentEditedId, setFormData, setOpenCreateProductDialog, handleOnDelete}) => {
  return (
    <Card className="w-full max-w-sm mx-auto">
      <div>
        <div className='relative'>
          <img src={product?.image} alt={product?.title} className='w-full h-[300px] object-cover rounded-lg' />

        </div>
        <CardContent> 
          <h2 className='text-xl font-bold mb-2'>{product?.title}</h2>
          <div className='flex justify-between items-center mb-2'>
            <span className={`${product?.salePrice > 0 ? 'line-through' : ''}text-lg font-semibold text-primary`}>{product?.price}</span>
            <span className='text-lg font-bold'>{product?.salePrice}</span>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between items-center">
          <Button
            onClick={() => {
              setOpenCreateProductDialog(true);
              setFormData(product);
              setCurrentEditedId(product?._id);
            }}
          >Edit</Button>
          <Button onClick={() => handleOnDelete(product._id)}>Delete</Button>
        </CardFooter>
      </div>
    </Card>
  )
}

export default AdminProductTile;
