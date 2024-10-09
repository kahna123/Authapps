import React, { useState } from 'react';

const Progressindicator = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: '',
    address: '',
    phone: '',
    country: '',
    city: '',
    zipcode: '',
  });

  const [currentPage, setCurrentPage] = useState(0);

  const pages = [
    {
      title: 'Personal Information',
      fields: [
        { label: 'Name', name: 'name', type: 'text' },
        { label: 'Email', name: 'email', type: 'email' },
      ],
    },
    {
      title: 'Additional Information',
      fields: [
        { label: 'Age', name: 'age', type: 'number' },
        { label: 'Address', name: 'address', type: 'text' },
      ],
    },
    {
      title: 'Contact Information',
      fields: [
        { label: 'Phone', name: 'phone', type: 'tel' },
        { label: 'Country', name: 'country', type: 'text' },
        { label: 'City', name: 'city', type: 'text' },
        { label: 'Zipcode', name: 'zipcode', type: 'text' },
      ],
    },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (currentPage < pages.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Submitted:', formData);
    alert('Form submitted successfully!');
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-2xl">
        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-4">
            {pages.map((page, index) => (
              <div key={index} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white ${
                    index <= currentPage ? 'bg-blue-500' : 'bg-gray-300'
                  }`}
                >
                  {index + 1}
                </div>
                {index < pages.length - 1 && (
                  <div
                    className={`w-16 h-1 ${
                      index < currentPage ? 'bg-blue-500' : 'bg-gray-300'
                    }`}
                  ></div>
                )}
              </div>
            ))}
          </div>
        </div>

        <form
          onSubmit={currentPage === pages.length - 1 ? handleSubmit : handleNext}
        >
          <h2 className="text-lg font-bold mb-4">{pages[currentPage].title}</h2>

          {pages[currentPage].fields.map((field) => (
            <div key={field.name} className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                {field.label}
              </label>
              <input
                type={field.type}
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
          ))}

          <div className="flex justify-between mt-4">
            {currentPage > 0 && (
              <button
                type="button"
                onClick={() => setCurrentPage(currentPage - 1)}
                className="bg-gray-300 text-black py-2 px-4 rounded"
              >
                Back
              </button>
            )}
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded ml-auto"
            >
              {currentPage === pages.length - 1 ? 'Submit' : 'Next'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Progressindicator;
