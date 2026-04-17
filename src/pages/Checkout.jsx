/* eslint-disable no-unused-vars */
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/lebel";
import { RadioGroup, RadioGroupItem } from "../components/ui/radio-group";
import { Button } from "../components/ui/button";
import { useState } from "react";
import Swal from "sweetalert2";
import { createOrder } from "../services/api";

export default function CheckoutPage() {

  // 🔹 SAME STATIC DATA (just field rename for API)
  const cartItems = [
    {
      product_id: 1,
      product_name: "Premium Leather Jacket",
      unit_price: 3000,
      variation_size: "M",
      color_name: "Black",
      quantity: 1,
      image: "/images/Panjabi-3.png",
      size_id: 1,
      color_id: 1,
    },
    {
      product_id: 2,
      product_name: "Casual Sneakers",
      unit_price: 2500,
      variation_size: "M",
      color_name: "Black",
      quantity: 2,
      image: "/images/pants-2.jpg",
      size_id: 1,
      color_id: 1,
    }
  ];

  const [deliveryType, setDeliveryType] = useState("inside");
  const deliveryFee = deliveryType === "inside" ? 60 : 120;

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.quantity * item.unit_price,
    0
  );

  const total = subtotal + deliveryFee;

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    shipping_name: "",
    order_phone: "",
    shipping_address: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleOrderSubmit = async () => {

    if (loading) return;

    if (!formData.shipping_name || !formData.order_phone || !formData.shipping_address) {
      Swal.fire({
        icon: "warning",
        title: "Missing Information",
        text: "Please fill all fields",
      });
      return;
    }

    const phoneRegex = /^01[3-9]\d{8}$/;
    if (!phoneRegex.test(formData.order_phone)) {
      Swal.fire({
        icon: "error",
        title: "Invalid Phone",
      });
      return;
    }

    try {
      setLoading(true);

      Swal.fire({
        title: "Processing...",
        allowOutsideClick: false,
        didOpen: () => Swal.showLoading(),
      });

      const data = new FormData();

      data.append("shipping_name", formData.shipping_name);
      data.append("order_phone", formData.order_phone);
      data.append("shipping_address", formData.shipping_address);
      data.append("product_qty", cartItems.reduce((sum, item) => sum + item.quantity, 0));
      data.append("total_amount", total);
      data.append("shipping_cost", deliveryFee);
      data.append("shipping_method", deliveryType === "inside" ? 21 : 22);
      data.append("payment_method", 1);

      cartItems.forEach((product, index) => {
        data.append(`product_data[${index}][product_id]`, product.product_id);
        data.append(`product_data[${index}][unit_price]`, product.unit_price);
        data.append(`product_data[${index}][qty]`, product.quantity);
        data.append(`product_data[${index}][variation_color_id]`, product.color_name);
        data.append(`product_data[${index}][variation]`, product.variation_size);
        data.append(`product_data[${index}][size_id]`, product.size_id);
        data.append(`product_data[${index}][color_id]`, product.color_id);
        data.append(`product_data[${index}][product_image]`, product.image.split("/").pop());
        data.append(`product_data[${index}][product_name]`, product.product_name);
      });

      const result = await createOrder(data);

      if (result.success) {
        Swal.fire({
          icon: "success",
          title: "Order Placed 🎉",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Order Failed",
          text: result.msg || "Try again",
        });
      }

    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
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

              {/* Shipping */}
              <div className="bg-background p-4 sm:p-6 rounded-2xl border">
                <h2 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6">
                  Shipping Address
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  
                  <div className="sm:col-span-2 space-y-2">
                    <Label>Your Name</Label>
                    <Input
                      name="shipping_name"
                      value={formData.shipping_name}
                      onChange={handleChange}
                      className="h-11"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Your Phone</Label>
                    <Input
                      name="order_phone"
                      value={formData.order_phone}
                      onChange={handleChange}
                      className="h-11"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Your Address</Label>
                    <Input
                      name="shipping_address"
                      value={formData.shipping_address}
                      onChange={handleChange}
                      className="h-11"
                    />
                  </div>
                </div>
              </div>

              {/* Payment */}
              <div className="bg-background p-4 sm:p-6 rounded-2xl border">
                <h2 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6">
                  Payment Method
                </h2>

                <RadioGroup
                  value={deliveryType}
                  onValueChange={setDeliveryType}
                  className="flex flex-col gap-4"
                >
                  
                  <div className="flex items-center gap-3 rounded-xl border p-4 cursor-pointer">
                    <RadioGroupItem value="inside" />
                    <Label className="font-normal flex-1">
                      Inside Dhaka - 60Tk
                    </Label>
                  </div>

                  <div className="flex items-center gap-3 rounded-xl border p-4 cursor-pointer">
                    <RadioGroupItem value="outside" />
                    <Label className="font-normal flex-1">
                      Outside Dhaka - 120Tk
                    </Label>
                  </div>

                </RadioGroup>
              </div>

            </div>

            {/* RIGHT */}
            <div className="bg-[#F8FAFC] p-4 sm:p-6 rounded-2xl shadow-inner h-fit lg:sticky lg:top-24">

              <h2 className="text-lg sm:text-xl font-semibold mb-4">
                Order Summary
              </h2>

              <div className="flex flex-col gap-4 mb-4 max-h-[300px] overflow-y-auto pr-2">
                {cartItems.map((product) => (
                  <div key={product.product_id} className="flex items-start gap-3">
                    
                    <img
                      src={product.image}
                      className="w-14 h-14 sm:w-16 sm:h-16 object-cover rounded-lg"
                    />

                    <div className="flex-1">
                      <p className="font-medium text-sm sm:text-base">
                        {product.product_name}
                      </p>

                      <p className="text-gray-500 text-xs sm:text-sm">
                        Qty: {product.quantity}
                      </p>

                      <div className="text-xs sm:text-sm flex gap-2">
                        <span>Size: {product.variation_size}</span>
                        <span>Color: {product.color_name}</span>
                      </div>

                      <p className="text-red-500 font-semibold">
                        ৳{(product.quantity * product.unit_price).toFixed(2)}
                      </p>
                    </div>

                  </div>
                ))}
              </div>

              <div className="flex justify-between mb-2">
                <span>Delivery Fee</span>
                <span>৳{deliveryFee}</span>
              </div>

              <div className="flex justify-between font-bold text-base sm:text-lg mb-4 border-t pt-3">
                <span>Total:</span>
                <span>৳{total.toFixed(2)}</span>
              </div>

              <Button onClick={handleOrderSubmit} className="w-full h-11">
                {loading ? "Processing..." : "Proceed to Pay"}
              </Button>

            </div>

          </div>
        </div>
      </div>
    </div>
  );
}