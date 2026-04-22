/* eslint-disable no-unused-vars */
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/lebel";
import {
  RadioGroup,
  RadioGroupItem,
} from "../components/ui/radio-group";
import { Button } from "../components/ui/button";
import { useState } from "react";
import Swal from "sweetalert2";
import { createOrder } from "../services/api";
import {
  useDispatch,
  useSelector,
} from "react-redux";
import {
  getCart,
  clearCart,
} from "../cart/cartSlice";
import { useNavigate } from "react-router";

export default function CheckoutPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartItems = useSelector(getCart);

  const [loading, setLoading] = useState(false);

  const [deliveryType, setDeliveryType] =
    useState("inside");

  const [formData, setFormData] = useState({
    shipping_name: "",
    order_phone: "",
    shipping_address: "",
  });

  // ======================
  // DELIVERY
  // ======================
  const deliveryFee =
    deliveryType === "inside" ? 60 : 120;

  // ======================
  // PRICE
  // ======================
  const subtotal = cartItems.reduce(
    (sum, item) =>
      sum +
      Number(item.price) *
        Number(item.quantity),
    0
  );

  const total = subtotal + deliveryFee;

  // ======================
  // INPUT CHANGE
  // ======================
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  // ======================
  // SUBMIT ORDER
  // ======================
  const handleOrderSubmit =
    async () => {
      if (loading) return;

      if (cartItems.length === 0) {
        Swal.fire({
          icon: "warning",
          title: "Cart Empty",
          text: "Please add products first.",
        });
        return;
      }

      if (
        !formData.shipping_name ||
        !formData.order_phone ||
        !formData.shipping_address
      ) {
        Swal.fire({
          icon: "warning",
          title:
            "Missing Information",
          text: "Please fill all fields.",
        });
        return;
      }

      const phoneRegex =
        /^01[3-9]\d{8}$/;

      if (
        !phoneRegex.test(
          formData.order_phone
        )
      ) {
        Swal.fire({
          icon: "error",
          title:
            "Invalid Phone Number",
        });
        return;
      }

      try {
        setLoading(true);

        Swal.fire({
          title:
            "Placing Order...",
          allowOutsideClick:
            false,
          didOpen: () =>
            Swal.showLoading(),
        });
const data = new FormData();

// CUSTOMER INFO
data.append("shipping_name", formData.shipping_name);
data.append("order_phone", formData.order_phone);
data.append("shipping_address", formData.shipping_address);
data.append("shipping_method", deliveryType === "inside" ? "21" : "22");
//data.append("shipping_cost", deliveryFee);
data.append("payment_method", "1");

// GLOBAL TOTALS
data.append("total_amount", String(total)); 
data.append("product_qty", String(cartItems.reduce((sum, item) => sum + item.quantity, 0)));
data.append("shipping_cost", String(deliveryFee || 0)); // Extra Safety

// PRODUCTS LOOP
cartItems.forEach((product, index) => {
    data.append(`product_data[${index}][product_id]`, String(product.product_id || product.id));
    data.append(`product_data[${index}][product_name]`, product.name || "");
    data.append(`product_data[${index}][unit_price]`, String(product.price));
    data.append(`product_data[${index}][qty]`, String(product.quantity));
    
    // Color logic
    data.append(`product_data[${index}][variation_color_id]`, product.color_name || ""); 
    data.append(`product_data[${index}][color_id]`, String(product.color_id || 0));
    
    // Size logic
    data.append(`product_data[${index}][variation]`, product.size_name || ""); 
    data.append(`product_data[${index}][size_id]`, String(product.size_id || 0));

    data.append(
    `product_data[${index}][product_image]`,
    (product.image || product.thumbnail || "").split("/").pop()
    );

    // Variation ID (Oboshshoi pathabe jodi thake)
  //  if (product.variation_id) {
  //      data.append(`product_data[${index}][variation_id]`, String(product.variation_id));
  //  }
});

        const result =
          await createOrder(
            data
          );

        Swal.close();

        if (
          result?.success
        ) {
          await Swal.fire({
            icon: "success",
            title:
              "Order Placed Successfully 🎉",
            text: "We will contact you soon.",
            confirmButtonText:
              "OK",
          });

          dispatch(
            clearCart()
          );

          navigate("/");
        } else {
          Swal.fire({
            icon: "error",
            title:
              "Order Failed",
            text:
              result?.msg ||
              "Try again later.",
          });
        }
      } catch (error) {
        Swal.close();

        Swal.fire({
          icon: "error",
          title:
            "Something Went Wrong",
          text:
            "Please try again.",
        });
      } finally {
        setLoading(false);
      }
    };

  return (
    <div className="bg-gray-100 min-h-screen py-4 md:py-8 lg:py-16 px-3 sm:px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 md:p-8 lg:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-10">

            {/* LEFT */}
            <div className="lg:col-span-2 space-y-6">

              {/* SHIPPING */}
              <div className="bg-background p-4 sm:p-6 rounded-2xl border">
                <h2 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6">
                  Shipping Address
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                  <div className="sm:col-span-2 space-y-2">
                    <Label>
                      Full Name
                    </Label>

                    <Input
                      name="shipping_name"
                      value={
                        formData.shipping_name
                      }
                      onChange={
                        handleChange
                      }
                      className="h-11"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>
                      Phone Number
                    </Label>

                    <Input
                      name="order_phone"
                      value={
                        formData.order_phone
                      }
                      onChange={
                        handleChange
                      }
                      className="h-11"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>
                      Address
                    </Label>

                    <Input
                      name="shipping_address"
                      value={
                        formData.shipping_address
                      }
                      onChange={
                        handleChange
                      }
                      className="h-11"
                    />
                  </div>

                </div>
              </div>

              {/* DELIVERY */}
              <div className="bg-background p-4 sm:p-6 rounded-2xl border">
                <h2 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6">
                  Delivery Area
                </h2>

                <RadioGroup
                  value={
                    deliveryType
                  }
                  onValueChange={
                    setDeliveryType
                  }
                  className="flex flex-col gap-4"
                >
                  <div className="flex items-center gap-3 rounded-xl border p-4">
                    <RadioGroupItem value="inside" />

                    <Label className="font-normal flex-1 cursor-pointer">
                      Inside Dhaka
                    </Label>

                    <span>
                      ৳60
                    </span>
                  </div>

                  <div className="flex items-center gap-3 rounded-xl border p-4">
                    <RadioGroupItem value="outside" />

                    <Label className="font-normal flex-1 cursor-pointer">
                      Outside Dhaka
                    </Label>

                    <span>
                      ৳120
                    </span>
                  </div>
                </RadioGroup>
              </div>

            </div>

            {/* RIGHT */}
            <div className="bg-[#F8FAFC] p-4 sm:p-6 rounded-2xl shadow-inner h-fit lg:sticky lg:top-24">

              <h2 className="text-lg sm:text-xl font-semibold mb-4">
                Order Summary
              </h2>

              <div className="flex flex-col gap-4 mb-4 max-h-[320px] overflow-y-auto pr-2">

                {cartItems.map(
                  (
                    product,
                    i
                  ) => (
                    <div
                      key={i}
                      className="flex gap-3"
                    >
                      <img
                        src={
                          product.image ||
                          product.thumbnail
                        }
                        className="w-16 h-16 rounded-lg object-cover"
                      />

                      <div className="flex-1">
                        <p className="font-medium text-sm">
                          {
                            product.name
                          }
                        </p>

                        <p className="text-xs text-gray-500">
                          Qty:{" "}
                          {
                            product.quantity
                          }
                        </p>

                        {(product.size_name ||
                          product.color_name) && (
                          <div className="text-xs text-gray-500 flex gap-2">
                            {product.size_name && (
                              <span>
                                Size:{" "}
                                {
                                  product.size_name
                                }
                              </span>
                            )}

                            {product.color_name && (
                              <span>
                                Color:{" "}
                                {
                                  product.color_name
                                }
                              </span>
                            )}
                          </div>
                        )}

                        <p className="text-red-500 font-semibold text-sm mt-1">
                          ৳
                          {(
                            product.price *
                            product.quantity
                          ).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  )
                )}
              </div>

              <div className="space-y-2 border-t pt-4">

                <div className="flex justify-between text-sm">
                  <span>
                    Subtotal
                  </span>

                  <span>
                    ৳
                    {subtotal.toLocaleString()}
                  </span>
                </div>

                <div className="flex justify-between text-sm">
                  <span>
                    Delivery
                  </span>

                  <span>
                    ৳
                    {deliveryFee}
                  </span>
                </div>

                <div className="flex justify-between font-bold text-lg border-t pt-3">
                  <span>
                    Total
                  </span>

                  <span>
                    ৳
                    {total.toLocaleString()}
                  </span>
                </div>

              </div>

              <Button
                onClick={
                  handleOrderSubmit
                }
                disabled={
                  loading
                }
                className="w-full h-12 mt-6"
              >
                {loading
                  ? "Processing..."
                  : "Place Order"}
              </Button>

            </div>

          </div>
        </div>
      </div>
    </div>
  );
}