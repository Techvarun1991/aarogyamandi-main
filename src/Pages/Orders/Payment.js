import { useEffect, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import OrderStepper from '../Cart/OrderStepper';
import axios from 'axios';
import MedicineCartService from '../../Service/MedicineCart/MedicineCart';
import MedicineOrderService from '../../Service/MedicineOrder/MedicineOrder';
import MedicineOrders from '../PatientDashboard/MedicineOrders';
import 'react-toastify/dist/ReactToastify.css'; // Ensure you import the CSS for proper styling

export default function Payment() {
  const location = useLocation();
  const navigate = useNavigate();
  const { medicineCart, selectedAddressId } = location.state;
  console.log(selectedAddressId);
  console.log(medicineCart.medicineCart, '-----------medinceine cart');
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
      displayRazorPay(discountedPrice);
    };

    // if (discountedPrice) {
    loadRazorpay();
    // }
  }, [medicineCart.medicineCart]); // Only re-run when discountedPrice changes

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
        const paymentId = response.razorpay_payment_id;
        const payload = {
          cartId: medicineCart.medicineCart.cartId,
          transactionId: paymentId || '',
          deliveryAddressId: selectedAddressId
        };
        if (medicineCart.medicineCart.promocodeApplied == true) {
          MedicineCartService.updateWholeCart(medicineCart.medicineCart).then((response) => {
            toast.success("Medicine cart updated successfully");
          }).catch((error) => {
            console.log(error);
          });

          if (paymentId) {
            MedicineOrderService.placeOrderCart(payload).then((response) => {
              setTimeout(() => {
                navigate("/")
              }, 2000)
              toast.success("order placed successfully")

            }).catch((err) => {
              console.log(err);
              setTimeout(() => {
                navigate("/cart")
              }, 2000)
              toast.success("failed to place order")
            });

          }

        }
        else {
          MedicineOrderService.placeOrderCart(payload).then((response) => {
            setTimeout(() => {
              navigate("/")
            }, 2000)
            toast.success("order placed successfully")

          }).catch((err) => {
            console.log(err);
            setTimeout(() => {
              navigate("/cart")
            }, 2000)
            toast.success("failed to place order")
          });
        }
      }

    }


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
