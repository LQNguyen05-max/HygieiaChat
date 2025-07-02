import { useEffect, useState } from "react";

const careers4job = [
	{
		title: "Software Engineer",
		description: "Join our team to build innovative healthcare solutions.",
		location: "Remote",
		date: "2025-10-01",
	},
	{
		title: "Data Scientist",
		description: "Analyze healthcare data to improve patient outcomes.",
		location: "New York, NY",
		date: "2025-10-15",
	},
	{
		title: "Product Manager",
		description: "Lead product development for our healthcare platform.",
		location: "San Francisco, CA",
		date: "2025-11-01",
	},
	{
		title: "UX/UI Designer",
		description: "Design user-friendly interfaces for our applications.",
		location: "Remote",
		date: "2025-11-15",
	},

];



const Apply = () => {
  const [careers, setCareers] = useState([]);

  useEffect(() => {
    setCareers(careers4job);
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

export default Apply;

