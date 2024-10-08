import { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import OrderStepper from '../Cart/OrderStepper';
import MedicineCartService from '../../Service/MedicineCart/MedicineCart';
import MedicineOrderService from '../../Service/MedicineOrder/MedicineOrder';
import 'react-toastify/dist/ReactToastify.css';

export default function Payment() {
  const location = useLocation();
  const navigate = useNavigate();
  const { medicineCart, selectedAddressId } = location.state;
  const [isPaymentSucess, setIsPaymentSuccess] = useState(false);
  const [paymentObject, setPaymentObject] = useState(null);
  
  const discountedPrice = useMemo(() => medicineCart.medicineCart.discountedCartPrice, [medicineCart.medicineCart.discountedCartPrice]);

  useEffect(() => {
    const loadRazorpay = async () => {
      const scriptLoaded = await loadScript('https://checkout.razorpay.com/v1/checkout.js');
      if (!scriptLoaded) {
        alert('Failed to load Razorpay script');
        return;
      }

      // Initialize payment options
      const options = {
        key: 'rzp_test_YNrvezC4YR0qwI',
        currency: 'INR',
        amount: Math.round(discountedPrice * 100),
        name: 'Arogya Mandi',
        description: 'Thanks for ordering',
        image: 'https://images.fastcompany.net/image/upload/w_596,c_limit,q_auto:best,f_auto/fc/3034007-inline-i-applelogo.jpg',
        modal: {
          ondismiss: () => {
            toast.error('Payment Cancelled');
            navigate('/cart');
          },
        },
        prefill: {
          contact: '8767585885',
        },
        notes: {
          address: 'arogyamandi.pvt.ltd',
        },
        theme: {
          color: '#3399cc',
        },
        handler: async (response) => {
          const paymentId = response.razorpay_payment_id;
          const payload = {
            cartId: medicineCart.medicineCart.cartId,
            transactionId: paymentId || '',
            deliveryAddressId: selectedAddressId
          };

          // Update cart if promo applied
          if (medicineCart.medicineCart.promocodeApplied) {
            try {
              await MedicineCartService.updateWholeCart(medicineCart.medicineCart);
              toast.success("Medicine cart updated successfully");
            } catch (error) {
              console.log(error);
              toast.error("Failed to update medicine cart");
            }
          }

          // Place order
          try {
            await MedicineOrderService.placeOrderCart(payload);
            toast.success("Order placed successfully");
            setIsPaymentSuccess(true);
            setTimeout(() => {
              navigate("/orders");
            }, 1000);
          } catch (error) {
            console.log(error);
            toast.error("Failed to place order");
            setIsPaymentSuccess(true);
          }
        }
      };

      const razorpayInstance = new window.Razorpay(options);
      setPaymentObject(razorpayInstance); // Set the payment object in state
      razorpayInstance.open(); // Open the payment modal
    };

    loadRazorpay();
  }, [discountedPrice, medicineCart.medicineCart]); // Dependencies for useEffect

  const loadScript = (src) => {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = src;
      script.onload = resolve;
      script.onerror = reject;
      document.body.appendChild(script);
    });
  };

  // Close the payment modal if payment is successful
  useEffect(() => {
    if (isPaymentSucess && paymentObject) {
      paymentObject.close(); // Close the payment modal on success
      console.log("Payment modal closed");
    }
  }, [isPaymentSucess, paymentObject]); // Close modal when payment success state changes

  return (
    <div>
      <OrderStepper currentStep={2} />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}
