import { useState } from "react";

export default function SubscriptionPage() {
  const [chosenPlan, setChosenPlan] = useState(null);
  const features = [
    "Access basic features",
    "Limited support",
    "Priority support",
    "Early access to tools",
    "Become a rizzler sigma",
  ];

  const plans = {
    Free: [true, true, false, false, false],
    Pro: [true, false, true, true, true],
  };

  const handlePlan = (plan) =>{
    setChosenPlan(plan);
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-5xl">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Compare Plans</h2>

        <div className="overflow-x-auto">
          <table className="w-full text-center table-fixed border-collapse">
            <thead>
              <tr>
                <th className="border-b-2 p-4 text-lg text-left w-1/3">Features</th>
                {Object.keys(plans).map((plan) => (
                  <th key={plan} className="border-b-2 p-4 text-lg">{plan}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {features.map((feature, idx) => (
                <tr key={idx} className="border-b">
                  <td className="text-left p-4 font-medium text-gray-700">{feature}</td>
                  {Object.keys(plans).map((plan) => (
                    <td key={plan} className="p-4">
                      {plans[plan][idx] ? "✅" : "❌"}
                    </td>
                  ))}
                </tr>
              ))}
              <tr>
                <td></td>
                {Object.keys(plans).map((plan) => (
                  <td key={plan} className="p-4">
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-r" onClick={() => handlePlan(plan)}>
  Select {plan}
</button>

                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div>
        Congratulations on choosing the <strong>{chosenPlan}</strong> plan!
      </div>
    </main>
  );
}
