import { filterOptions } from '../../config/index'
import React, { Fragment } from 'react'
import { Label } from '../ui/label'
import { Checkbox } from '../ui/checkbox'
import { Separator } from '../ui/separator'

const ProductFilter = () => {
  return (
    <div className='bg-white rounded-lg shadow-sm'>
      <div className='p-4 border-b'>
        <h2 className='text-lg font-extrabold'>Filters</h2>
      </div>
      <div className='p-4 space-y-4'>
        {
          Object.keys(filterOptions).map(keyItems => (
            <Fragment>
              <div>
                <h3 className='text-base font-bold'>{keyItems}</h3>
                <div className='grid gap-2 mt-2'>
                  {
                    filterOptions[keyItems].map(option => (
                      <Label className="flex items-center font-medium gap-2">
                        <Checkbox />
                        {option?.label}
                      </Label>
                    ))
                  }
                </div>
              </div>
              <Separator />
            </Fragment>
          ))
        }
      </div>
    </div>
  )
}

export default ProductFilter
