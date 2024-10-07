import { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import OrderStepper from '../Cart/OrderStepper';
import axios from 'axios';
import MedicineCartService from '../../Service/MedicineCart/MedicineCart';

export default function Payment() {
  const location = useLocation();
  const navigate = useNavigate();
  const { medicineCart, payload } = location.state;
  const [loadRazorpay, setLoadRazorpay] = useState(true);

  // Memoize the price to avoid re-triggering the useEffect unnecessarily
  const discountedPrice = useMemo(() => medicineCart.medicineCart.discountedCartPrice, [medicineCart.medicineCart.discountedCartPrice]);

  useEffect(() => {
    const loadRazorpay = async () => {
      const scriptLoaded = await loadScript('https://checkout.razorpay.com/v1/checkout.js');
      if (!scriptLoaded) {
        alert('Failed to load Razorpay script');
        return;
      }
      // Call RazorPay only once the script is loaded and price is ready
      setLoadRazorpay(false);
      displayRazorPay(discountedPrice);
    };

    if (loadRazorpay) {
      loadRazorpay();
    }
  }, [loadRazorpay]); // Only re-run when discountedPrice changes

  const loadScript = (src) => {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = src;
      script.onload = resolve;
      script.onerror = reject;
      document.body.appendChild(script);
    });
  };

  const displayRazorPay = async (amount) => {
    if (!window.Razorpay) {
      console.error('Razorpay SDK is not loaded yet.');
      return;
    }

    const options = {
      key: 'rzp_test_YNrvezC4YR0qwI',
      currency: 'INR',
      amount: Math.round(amount * 100),
      name: 'Arogya Mandi',
      description: 'Thanks for ordering',
      image: 'https://images.fastcompany.net/image/upload/w_596,c_limit,q_auto:best,f_auto/fc/3034007-inline-i-applelogo.jpg',
      modal: {
        ondismiss: () => {
          toast.error('Payment Cancelled');
          navigate('/orders');
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
        if (response.razorpay_payment_id) {
          const paymentId = response.razorpay_payment_id;
          toast.success("Payment done Successfully!");
          console.log("Payment ID", paymentId);
          try {
            if (medicineCart.promocodeApplied === true) {
              // Update cart if promocode is applied
              const updateResponse = await axios.put(
                `http://192.168.10.214/8080/api/medCarts/updateCart/${medicineCart.cartId}`,
                medicineCart
              );
              if (updateResponse.status === 200) {
                await MedicineCartService.placeOrderCart(payload);
                toast.success('Order placed successfully');
              } else {
                console.error('Failed to update cart:', updateResponse.data);
                toast.error('Failed to update cart. Please try again.');
              }
            } else {
              await MedicineCartService.placeOrderCart(payload);
              toast.success('Order placed successfully');
            }
          } catch (error) {
            console.error('Error placing order:', error);
          }
        }
      }
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

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
};
