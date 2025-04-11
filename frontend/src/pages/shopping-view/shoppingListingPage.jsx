import { DropdownMenu, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger } from '../../components/ui/dropdown-menu'
import ProductFilter from '../../components/shopping-view/filter'
import React, { useEffect, useState } from 'react'
import { Button } from '../../components/ui/button'
import { ArrowUpDownIcon } from 'lucide-react'
import { sortOptions } from '../../config/index'
import { useDispatch, useSelector } from 'react-redux'
import { handleAllFilteredProducts } from '../../store/shop/product-slice/index'
import ShoppingProductTile from '../../components/shopping-view/product-tile'
import { useSearchParams } from 'react-router-dom'
import convertKeysToLowercase from '../../config/convertKeysToLowerCase'

const ShoppingListingPage = () => {
  const dispatch = useDispatch();
  const {productList} = useSelector((state) => state.shop_product_slice);
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();


  function handleSort(value){
    setSort(value);
    console.log(value);
  };

  function handleFilter(getSectionId, getCurrentOptions){
    let copyFilters = {...filters};
    const indexOfCurrentSection = Object.keys(copyFilters).indexOf(getSectionId);
    if(indexOfCurrentSection === -1){
      copyFilters = {
        ...copyFilters,
        [getSectionId]: [getCurrentOptions],
      };
    }else{
      const indexOfCurrentOption = copyFilters[getSectionId].indexOf(getCurrentOptions);
      if(indexOfCurrentOption === -1){
        copyFilters[getSectionId].push(getCurrentOptions);
      }else{
        copyFilters[getSectionId].splice(indexOfCurrentOption, 1);
      }
    };
    setFilters(copyFilters);
    sessionStorage.setItem('filters', JSON.stringify(copyFilters));
  };

  function createSearchParamsHelper(filter){
    const queryParams = [];
    for(const [key, value] of Object.entries(filter)){
      const paramValue = value.join(',');
      queryParams.push(`${key}=${encodeURIComponent(paramValue)}`);
    };

    return queryParams.join('&');
  }
  
  useEffect(() => {
    if(filters !== null && sort !== null){
      const lowerCaseFilters = convertKeysToLowercase(filters);
      dispatch(handleAllFilteredProducts({filterParams: lowerCaseFilters, sortParams: sort}));
    }
  }, [dispatch, filters, sort]);

  useEffect(() => {
    setSort('price-lowtohigh');
    setFilters(JSON.parse(sessionStorage.getItem('filters')) || {});
  }, []);

  useEffect(() => {
    if(filters && Object.keys(filters).length > 0){
      const createQueryString = createSearchParamsHelper(filters);
      setSearchParams(new URLSearchParams(createQueryString));
    }
  }, [filters]);

  // console.log('Filters', filters);
  // console.log(searchParams.toString());
  // console.log(productList);
  return (
    <div className='grid grid-cols-1 md:grid-cols-[300px_1fr] gap-6 p-4 md:p-6'>
      <ProductFilter filters={filters} handleFilter={handleFilter} />
      <div className='bg-white w-full rounded-lg shadow-sm'>
        <div className='p-4 border-b flex items-center justify-between'>
          <h2 className='text-lg font-extrabold'>All Products</h2>
          <div className='flex items-center gap-3'>
            <span className='text-gray-400'>{productList?.length}</span>
            <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <ArrowUpDownIcon className='h-4 w-4'/>
                <span>Sort by</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[200px] bg-white">
              <DropdownMenuRadioGroup value={sort} onValueChange={handleSort}>
                {
                  sortOptions.map(sortItem => (
                    <DropdownMenuRadioItem value={sortItem.id} key={sortItem?.id} className="hover:bg-slate-200 cursor-pointer">
                      {sortItem?.label}
                    </DropdownMenuRadioItem>
                  ))
                }
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
          </div>
        </div>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4'>
          {productList && productList.length > 0 ? (
            productList.map((productItem) => (
              <ShoppingProductTile key={productItem._id} product={productItem}/>
            ))
          ) : null}
        </div>
      </div>
    </div>
  )
}

export default ShoppingListingPage
