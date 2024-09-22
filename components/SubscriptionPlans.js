import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

const plans = [
  { name: 'Basic', priceId: 'price_basic_id', price: '$9.99/month' },
  { name: 'Pro', priceId: 'price_pro_id', price: '$19.99/month' },
  { name: 'Enterprise', priceId: 'price_enterprise_id', price: '$49.99/month' },
];

export default function SubscriptionPlans() {
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (priceId) => {
    setLoading(true);
    const stripe = await stripePromise;

    const response = await fetch('/api/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ priceId }),
    });

    const { sessionId } = await response.json();

    const result = await stripe.redirectToCheckout({
      sessionId,
    });

    if (result.error) {
      console.error(result.error.message);
    }

    setLoading(false);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {plans.map((plan) => (
        <div key={plan.priceId} className="border p-4 rounded-lg">
          <h3 className="text-xl font-bold">{plan.name}</h3>
          <p className="text-lg">{plan.price}</p>
          <button
            onClick={() => handleSubscribe(plan.priceId)}
            disabled={loading}
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
          >
            {loading ? 'Processing...' : 'Subscribe'}
          </button>
        </div>
      ))}
    </div>
  );
}