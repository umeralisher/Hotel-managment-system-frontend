import React from "react";

const ClientReviews = () => {
  const reviews = [
    {
      name: "Mark Essien",
      location: "Lagos, Nigeria.",
      image:
        "https://themewagon.github.io/star-hotels/assets/img/customer1.webp",
      feedback:
        "Words can't explain the kind of treatment I received from the management of star hotels. They are the best in the country.",
    },
    {
      name: "Seyi Onifade",
      location: "London England",
      image:
        "https://themewagon.github.io/star-hotels/assets/img/customer2.webp",
      feedback:
        "Star hotels makes you feel the best room quality that makes you feel the comfort of a home.",
    },
    {
      name: "Fayemi David",
      location: "Sydney Australia",
      image:
        "https://themewagon.github.io/star-hotels/assets/img/customer3.webp",
      feedback:
        "My Family and I are very happy when we lodge into star hotels. They are by far the best in the universe.",
    },
  ];

  return (
    <div className="bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-2">
          Client Reviews
        </h2>
        <div className="w-16 h-1 bg-blue-100 mx-auto mb-4"></div>
        <p className="text-gray-600">
          We are very proud of the services we offer to our customers. Read
          every word from our happy customers.
        </p>
      </div>

      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {reviews.map((review, index) => (
          <div
            key={index}
            className="border rounded-lg p-6 text-center shadow-sm hover:shadow-md transition"
            data-aos="flip-left"
          >
            <img
              src={review.image}
              alt={review.name}
              className="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
            />
            <h3 className="text-xl font-bold text-gray-900">{review.name}</h3>
            <p className="text-sm font-semibold text-gray-700 mb-4">
              {review.location}
            </p>
            <p className="text-gray-600">{review.feedback}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClientReviews;
