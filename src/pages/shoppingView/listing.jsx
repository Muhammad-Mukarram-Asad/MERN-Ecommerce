import React, { useEffect, useState } from "react";
import ShoppingHeader from "@/components/shoppingView/header";
import ProductFilter from "@/components/shoppingView/filter";
import { DropdownMenu } from "@/components/ui/dropdown-menu";
import {
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ArrowUpDownIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { sortOptions } from "@/config";
// import ShoppingProductTile from "@/components/shoppingView/productTile";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllFilteredProducts, fetchProductDetails } from "@/store/shop";
import ShoppingProductTile from "@/components/shoppingView/productTile";
import { useSearchParams } from "react-router-dom";
import ShoppingProductDetails from "@/components/shoppingView/productDetails";

const ShoppingListing = () => {
  const {productList, productDetails} = useSelector(state => state.shoppingProducts);
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [openDialog, setOpenDialog] = useState(false);

  const dispatch = useDispatch();

  console.log("prod list => ", productList);
  console.log("prod details => ", productDetails);
  useEffect(() => {
    if(filters !== null && sort !== null){
    dispatch(fetchAllFilteredProducts({filterParams: filters, sortParams: sort}));
    }
  }, [dispatch, filters, sort]);

  useEffect(() => {
    if (sessionStorage.getItem("filters")) {
      setFilters(JSON.parse(sessionStorage.getItem("filters")));
    }

    setSort("price-Low-to-High");
  }, []);

  useEffect(() => {
    if(productDetails !== null) {
      setOpenDialog(true);
    }
  }, [productDetails]);

  useEffect(() => {
    if(filters && Object.keys(filters).length > 0){
      let queryString = "";
      Object.keys(filters).forEach((key) => {
        filters[key].forEach((value) => {
          queryString += `&${key}=${value}`;
        });
      });
      setSearchParams(queryString);
    }
    else{
      setSearchParams({});
    }
  }, [filters]);
 

  const handleFilters = (getSectionId, getCurrentFilter) => {
    console.log("getSectionId => ", getSectionId, "getCurrentFilter => ", getCurrentFilter);
    
    let copyFilters = {...filters};
    console.log("copyFilters => ", copyFilters);
    console.log("obj keys => ", Object.keys(copyFilters));
    let indexOfCurrentSection = Object.keys(copyFilters).indexOf(getSectionId);
    console.log("indexOfCurrentSection => ", indexOfCurrentSection);
    if (indexOfCurrentSection === -1) {
      copyFilters = {
        ...copyFilters,
        [getSectionId]: [getCurrentFilter]
      }
    } 

    else{
      let indexOfCurrentFilter = copyFilters[getSectionId].indexOf(getCurrentFilter);
      console.log("indexOfCurrentFilter => ", indexOfCurrentFilter);
      if (indexOfCurrentFilter === -1) {
        copyFilters[getSectionId].push(getCurrentFilter);
      }
      else{
        copyFilters[getSectionId].splice(indexOfCurrentFilter, 1);
      }

    }
    setFilters(copyFilters);
    sessionStorage.setItem("filters", JSON.stringify(copyFilters));
  }
  
  console.log("filters => ", filters, "searchParams => ", searchParams);


  const handleGetProductDetails = (productId) => {
    console.log("productId => ", productId);
    dispatch(fetchProductDetails(productId))

  }
  return (
    <main className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-6 p-4 md:p-6">
      <ProductFilter filters={filters} handleFilters={handleFilters} />
      <div className="bg-background rounded-lg shadow-sm w-full">
        <div className="p-3 border-b flex items-center justify-between">
          <h2 className="text-lg font-extrabold"> All Products</h2>
          <div className="flex items-center gap-4">
            <span className="text-muted-foreground"> {productList?.length} Products</span>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-1"
                >
                  <ArrowUpDownIcon className="w-4 h-4" />
                  <span>{sort === null ? "Sort By" : sort}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[200px]">
                <DropdownMenuRadioGroup value={sort} onValueChange={(value) => setSort(value)}>
                  {sortOptions.map((sortItem) => (
                    <DropdownMenuRadioItem
                      value={sortItem.id}
                      key={sortItem.id}
                    >
                      {sortItem.label}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 cursor-pointer">
          {productList?.length > 0 && productList?.map((productItem) => (
            <ShoppingProductTile 
            key={productItem._id}
            product={productItem}
            handleGetProductDetails={handleGetProductDetails}
            />
          ))}
        </div>

        <ShoppingProductDetails open={openDialog} setOpen={setOpenDialog} productDetails={productDetails} />
      </div>



    </main>
  );
};

export default ShoppingListing;
