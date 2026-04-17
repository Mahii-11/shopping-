import { Button } from "../components/ui/button";
import { Minus, Plus, X, ArrowRight, ShoppingBag } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { isVariantValid } from "../utils/cartHelpers";
import {
  getCart,
  getTotalCartPrice,
  getTotalCartQuantity,
  decreaseQty,
  increaseQty,
  removeItem,
  generateCartKey
} from "../cart/cartSlice";
import { Link } from "react-router";

export default function CartPage() {
  const dispatch = useDispatch();

  const items = useSelector(getCart);
  const total = useSelector(getTotalCartPrice);
  const totalQty = useSelector(getTotalCartQuantity);



  // Empty Cart
  if (items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-24 text-center">
        <div className="w-24 h-24 rounded-full bg-muted mx-auto flex items-center justify-center mb-6">
          <ShoppingBag className="w-10 h-10 text-muted-foreground" />
        </div>

        <h1 className="font-serif text-4xl mb-3">Your Cart is Empty</h1>

        <p className="text-muted-foreground mb-8">
          Looks like you haven’t added anything yet.
        </p>

        <Link to="/">
          <Button className="h-12 px-8">
            Continue Shopping
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-24 font-sans">

      {/* Heading */}
      <h1 className="font-serif text-3xl md:text-5xl text-foreground mb-12 border-b border-border pb-6">
        Shopping Cart
        <span className="text-muted-foreground text-2xl font-sans font-light ml-2">
          ({totalQty})
        </span>
      </h1>

      <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">

        {/* Cart Items */}
        <div className="lg:w-2/3">

          {/* Desktop header */}
          <div className="hidden sm:grid grid-cols-12 gap-4 pb-4 border-b border-border text-xs uppercase tracking-wider text-muted-foreground font-semibold">
            <div className="col-span-6">Product</div>
            <div className="col-span-2 text-center">Price</div>
            <div className="col-span-2 text-center">Quantity</div>
            <div className="col-span-2 text-right">Total</div>
          </div>

          <div className="divide-y border-border">
            {items.map((item, index) => (
              <div
                key={`${item.slug}-${item.variation_id}-${item.color_id}-${index}`}
                className="py-8 flex flex-col sm:grid sm:grid-cols-12 gap-4 sm:items-center relative"
              >
                {/* Mobile delete */}
                <button
                  onClick={() => dispatch(removeItem(generateCartKey(item)))}
                  className="absolute top-8 right-0 sm:hidden text-muted-foreground hover:text-destructive"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Product */}
                <div className="col-span-6 flex gap-6">
                  <div className="w-24 h-32 bg-muted flex-shrink-0 rounded overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex flex-col justify-center">
                    <p className="font-semibold text-base pr-8 sm:pr-0">
                      {item.name}
                    </p>

                  {isVariantValid(item) && (
                   <span className="text-muted-foreground text-sm mt-1">
                   Variant Selected
                  </span>
                  )}

                    {/* Mobile Controls */}
                    <div className="sm:hidden mt-4 flex items-center justify-between">
                      <span className="font-medium text-foreground">
                        ৳{item.price}
                      </span>

                      <div className="flex items-center border border-border h-8">
                        <button
                          onClick={() =>
                            dispatch(decreaseQty(generateCartKey(item)))
                          }
                          className="px-2 hover:bg-muted"
                        >
                          <Minus className="w-3 h-3" />
                        </button>

                        <span className="w-8 text-center text-xs">
                          {item.quantity}
                        </span>

                        <button
                          onClick={() =>
                            dispatch(increaseQty(generateCartKey(item)))
                          }
                          className="px-2 hover:bg-muted"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Price */}
                <div className="col-span-2 text-center hidden sm:block font-medium">
                  ৳{item.price}
                </div>

                {/* Quantity */}
                <div className="col-span-2 justify-center hidden sm:flex">
                  <div className="flex items-center border border-border h-10">
                    <button
                      onClick={() =>
                        dispatch(decreaseQty(generateCartKey(item)))
                      }
                      className="px-3 hover:bg-muted"
                    >
                      <Minus className="w-3 h-3" />
                    </button>

                    <span className="w-8 text-center text-sm font-medium">
                      {item.quantity}
                    </span>

                    <button
                      onClick={() =>
                        dispatch(increaseQty(generateCartKey(item)))
                      }
                      className="px-3 hover:bg-muted"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                {/* Total */}
                <div className="col-span-2 text-right hidden sm:flex justify-end items-center gap-4">
                  <span className="font-semibold">
                    ৳{item.price * item.quantity}
                  </span>

                  <button
                    onClick={() => dispatch(removeItem(generateCartKey(item)))}
                    className="text-muted-foreground hover:text-destructive p-1"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Summary */}
        <div className="lg:w-1/3">
          <div className="bg-card p-8 border border-border sticky top-32 rounded-xl">

            <h3 className="font-serif text-2xl mb-6 border-b border-border pb-4">
              Order Summary
            </h3>

            <div className="space-y-4 mb-6 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-medium">৳{total}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-muted-foreground">Shipping</span>
                <span className="font-medium">
                  {total > 5000 ? "Free" : "Calculated at checkout"}
                </span>
              </div>
            </div>

            <div className="border-t border-border pt-6 mb-8 flex justify-between items-center text-lg">
              <span className="font-semibold">Total</span>
              <span className="font-serif font-bold text-2xl">
                ৳{total}
              </span>
            </div>

            <Button className="w-full h-14 text-[15px] flex justify-center items-center gap-2">
              Proceed to Checkout
              <ArrowRight className="w-4 h-4" />
            </Button>

            <div className="mt-6 text-center text-xs text-muted-foreground flex flex-col gap-2">
              <p>Taxes and shipping calculated at checkout</p>

              <div className="flex justify-center gap-4 mt-2 opacity-50">
                <span className="font-serif italic font-bold">VISA</span>
                <span className="font-serif italic font-bold">MASTER</span>
                <span className="font-serif italic font-bold">AMEX</span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}