import { DropdownMenu, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger } from '../../components/ui/dropdown-menu'
import ProductFilter from '../../components/shopping-view/filter'
import React from 'react'
import { Button } from '../../components/ui/button'
import { ArrowUpDownIcon } from 'lucide-react'
import { sortOptions } from '../../config/index'

const ShoppingListingPage = () => {
  return (
    <div className='grid grid-cols-1 md:grid-cols-[300px_1fr] gap-6 p-4 md:p-6'>
      <ProductFilter/>
      <div className='bg-white w-full rounded-lg shadow-sm'>
        <div className='p-4 border-b flex items-center justify-between'>
          <h2 className='text-lg font-extrabold'>All Products</h2>
          <div className='flex items-center gap-3'>
            <span className='text-gray-400'>10 Products</span>
            <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <ArrowUpDownIcon className='h-4 w-4'/>
                <span>Sort by</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[200px] bg-white">
              <DropdownMenuRadioGroup>
                {
                  sortOptions.map(sortItem => (
                    <DropdownMenuRadioItem key={sortItem?.id} className="hover:bg-slate-200 cursor-pointer">
                      {sortItem?.label}
                    </DropdownMenuRadioItem>
                  ))
                }
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
          </div>
        </div>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4'>
          
        </div>
      </div>
    </div>
  )
}

export default ShoppingListingPage
