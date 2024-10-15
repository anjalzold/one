'use client';


import { useAuthStore } from '@/store/authStore';

// const checkoutSchema = z.object({
//   street: z.string().min(1, 'Street is required'),
//   city: z.string().min(1, 'City is required'),
//   state: z.string().min(1, 'State is required'),
//   country: z.string().min(1, 'Country is required'),
//   zipCode: z.string().min(1, 'Zip Code is required'),
// });

// type CheckoutFormData = z.infer<typeof checkoutSchema>;

export default function CheckoutForm() {


  const {accessTkn} = useAuthStore();

  const handleonSubmit = async (e) => {
    e.preventDefault();

    try {
  
      console.log('Access token:', accessTkn);

      const response = await fetch('http://localhost:4000/api/orders/initiate', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessTkn}`
        },
        body: JSON.stringify({
          amount: 1000
        })
      });

      const res = await response.json();

      const { payment_url } = res;

      console.log('Response:', payment_url);


      window.location.href = payment_url;
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again.');
    } finally {
    }
  };

  return (
    <div className="">
     
      
<form  onSubmit={handleonSubmit}>
  <button type='submit'>Pay with Khalti</button>
</form>
    </div>
 
);
}