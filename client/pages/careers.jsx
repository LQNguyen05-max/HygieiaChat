import { useEffect, useState } from "react";

const Careers = () => {
  const [careers, setCareers] = useState(0);

  useEffect(() => {
    const getCareers = async () => {
      try {
        const data = await fetch("./util/careers.js");
        if (!data.ok) {
          throw new Error("Network response was not ok");
        }
        const careersData = await data.json();
        return careersData;
      }
      catch (error) {
        console.error("Failed to fetch careers data:", error);
      }
    };

    getCareers().then((careersData) => {
      if (careersData) setCareers(careersData);
    });
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Careers</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {careers.map((career, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <h2 className="text-xl font-semibold mb-2">{career.title}</h2>
            <p className="text-gray-700 mb-4">{career.description}</p>
            <p className="text-gray-500 mb-2">Location: {career.location}</p>
            <p className="text-gray-500">Posted on: {new Date(career.date).toLocaleDateString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
 

}

export default Careers;

