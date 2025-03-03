import React from 'react'
import { Dialog, DialogContent } from '../ui/dialog'
import { Button } from '../ui/button'
import { Separator } from "../ui/separator";
import { Input } from "../ui/input";
import { useDispatch, useSelector } from "react-redux";
import { StarIcon } from "lucide-react";
import { Avatar, AvatarFallback } from "../ui/avatar";
import StarRatingComponent from '../common/starRating';

const ShoppingProductDetails = ({open, setOpen, productDetails}) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="grid grid-cols-2 gap-8 sm:p-12 max-w-[90vw] md:max-w-[80vw] lg:max-w-[70vw]">
            <div className="relative overflow-hidden rounded-lg">
                <img src={productDetails?.image} alt={productDetails?.title}
                width={600} height={600} className='aspect-square object-cover w-full' 
                />
                
            </div>

            <div className="">
          <div>
            <h1 className="text-3xl font-extrabold">{productDetails?.title}</h1>
            <p className="text-muted-foreground text-2xl mb-5 mt-4">
              {productDetails?.description}
            </p>
          </div>
          <div className="flex items-center justify-between">
            <p
              className={`text-3xl font-bold text-primary ${
                productDetails?.salePrice > 0 ? "line-through" : ""
              }`}
            >
              ${productDetails?.price}
            </p>
            {productDetails?.salePrice > 0 ? (
              <p className="text-2xl font-bold text-muted-foreground">
                ${productDetails?.salePrice}
              </p>
            ) : null}
          </div>

          <div className="flex items-center gap-2 mt-2">
            <div className="flex items-center gap-0.5">
              {/* <StarRatingComponent rating={averageReview} /> */}
              <StarRatingComponent rating={4} />

            </div>
            <span className="text-muted-foreground">
              {/* ({averageReview.toFixed(2)}) */}
              (4.0)

            </span>
          </div>

          <div className="mt-5 mb-5">
            {productDetails?.totalStock === 0 ? (
              <Button className="w-full opacity-60 cursor-not-allowed">
                Out of Stock
              </Button>
            ) : (
              <Button
                className="w-full"
                onClick={() =>
                  handleAddToCart(
                      productDetails?._id,
                      productDetails?.totalStock
                    )
                }
                >
                Add to Cart
              </Button>
            )}
          </div>
          <Separator />

          <div className="max-h-[300px] overflow-auto">
            <h2 className="text-xl font-bold mb-4">Reviews</h2>
            <div className="grid gap-6">
              {/* {reviews && reviews.length > 0 ? (
                reviews.map((reviewItem) => ( */}
                  <div className="flex gap-4">
                    <Avatar className="w-10 h-10 border">
                      <AvatarFallback>
                        {/* {reviewItem?.userName[0].toUpperCase()} */}
                        {"MA"}
                      </AvatarFallback>
                    </Avatar>
                    <div className="grid gap-1">
                      <div className="flex items-center gap-2">
                        {/* <h3 className="font-bold">{reviewItem?.userName}</h3> */}
                        {"Mukarram Asad"}

                      </div>
                      <div className="flex items-center gap-0.5">
                        {/* <StarRatingComponent rating={reviewItem?.reviewValue} /> */}
                        <StarRatingComponent rating={5} />

                      </div>
                      <p className="text-muted-foreground">
                        {/* {reviewItem.reviewMessage} */}
                        {"This is an awesome product. Just loved it!!!"}
                      </p>
                    </div>
                  </div>
                {/* ))
              ) : (
                <h1>No Reviews</h1>
              )} */}
            </div>
            </div>
            </div>



        </DialogContent>
    </Dialog>
  )
}

export default ShoppingProductDetails