import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import OrderStepper from '../Cart/OrderStepper';

export default function Payment() {
  const location = useLocation();
  const navigate = useNavigate();
//   const { cartData, transactionId } = location.state; // Access transactionId from location state
  const amount = 200;

  useEffect(() => {
    const loadRazorpay = async () => {
      const scriptLoaded = await loadScript('https://checkout.razorpay.com/v1/checkout.js');
      if (!scriptLoaded) {
        alert('Failed to load Razorpay script');
        return;
      }
      displayRazorPay(amount);
    };

    loadRazorpay();
  }, [amount]);

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
          navigate('/dashboard/labcart');
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
      handler: (response) => {
        if (response.razorpay_payment_id) {
          const paymentId = response.razorpay_payment_id;
          toast.success("Payment done Successfully!");
          console.log("Payment ID",paymentId)
          navigate('/dashboard/labcart', { state: { paymentId } });
        }
      }
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  }

  return (
    <>
     <OrderStepper currentStep={2} />
    <div>
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
    </>
  );
};




// import { useEffect } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import { ToastContainer, toast } from 'react-toastify';

// export default function MenuCheckout() {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { cartData } = location.state;
//   const amount = cartData.discountedCartPrice;
//   const currentDate = new Date();
//   const userId = localStorage.getItem('userId');
//   const year = currentDate.getFullYear();
//   const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Adding 1 to the month since it is 0-indexed
//   const day = String(currentDate.getDate()).padStart(2, '0');

//   const formattedDate = `${year}-${month}-${day}`;

//   useEffect(() => {
//     const loadRazorpay = async () => {
//       const scriptLoaded = await loadScript('https://checkout.razorpay.com/v1/checkout.js');
//       if (!scriptLoaded) {
//         alert('Failed to load Razorpay script');
//         return;
//       }
//       displayRazorPay(amount);
//     };

//     loadRazorpay();
//   }, [amount]);

//   const loadScript = (src) => {
//     return new Promise((resolve, reject) => {
//       const script = document.createElement('script');
//       script.src = src;
//       script.onload = resolve;
//       script.onerror = reject;
//       document.body.appendChild(script);
//     });
//   };

//   const displayRazorPay = async (amount) => {
//     console.log(amount);
//     const options = {
//       key: 'rzp_test_YNrvezC4YR0qwI',
//       currency: 'INR',
//       amount: Math.round(amount * 100),
//       name: 'Arogya Mandi',
//       description: 'Thanks for ordering',
//       image: 'https://images.fastcompany.net/image/upload/w_596,c_limit,q_auto:best,f_auto/fc/3034007-inline-i-applelogo.jpg',
//       modal: {
//         ondismiss: () => {
//           toast.error('Payment Cancelled');
//           navigate('/dashboard/labcart');
//         },
//       },
//       prefill: {
//         contact: '8767585885',
//       },
//       notes: {
//         address: 'arogyamandi.pvt.ltd',
//       },
//       theme: {
//         color: '#3399cc',
//       },
//       handler: (response) => {
//         if (response.razorpay_payment_id) {
//             const paymentId =response.razorpay_payment_id;
//         toast.success("Payment done Successfully!");
//         navigate('/dashboard/labcart',{state :{paymentId}});
//         }
//         }
//       }
//       const paymentObject = new window.Razorpay(options);
//       paymentObject.open();
//     }
  

//   return (
//     <div>
//       <ToastContainer
//         position="top-right"
//         autoClose={5000}
//         hideProgressBar={false}
//         newestOnTop
//         closeOnClick
//         rtl={false}
//         pauseOnFocusLoss
//         draggable
//         pauseOnHover
//       />
//     </div>
//   );
// };