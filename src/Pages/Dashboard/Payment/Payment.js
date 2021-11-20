import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import CheckoutForm from './CheckoutForm'



const stripePromise = loadStripe('pk_test_51JvxRNJqybLKBRzKfb3u05f9uxyf4Ln98d8h7sAr6CdxnwZtTndtGDiFCrZ4X2AitqKFdmImpDIX64B5Mvst6YNe00KeW1Fm2h')


const Payment = () => {
  const { appointmentId } = useParams();
  const [appointment, setAppointment] = useState({});
  console.log(appointmentId)
  useEffect(() => {
    fetch(`http://localhost:5000/appointments/${appointmentId}`)
      .then(res => res.json())
      .then(data => setAppointment(data));
  }, [appointmentId])

  return (
    <div>
      <h2>This is payment page</h2>
      <h2>please pay for:{appointmentId} </h2>
      <h2>Please Pay for: {appointment.patientName} for {appointment.serviceName}</h2>
      <h4>Pay: ${appointment.price}</h4>

   { appointment?.price &&  <Elements stripe={stripePromise}>
        <CheckoutForm
          appointment={appointment}
        />

      </Elements>}


    </div>
  );
};

export default Payment;


/*
below steps are following for payment system
1. install stripe and stripe-react
2. set publishable key
3. Elements
4. Checkout Form
-----
5. Create payment method
6. server: create payment Intent api
7. Load client secret
8. ConfirmCard payment
9. handle user error
*/