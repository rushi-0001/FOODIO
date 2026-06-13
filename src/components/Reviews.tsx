import React from 'react';
import { Star } from 'lucide-react';

const Reviews: React.FC = () => {
  const reviews = [
    {
      id: 1,
      name: 'Rajesh Kumar',
      location: 'Pune',
      rating: 5,
      comment: 'Amazing quality and super fast delivery. Best food I\'ve ordered online!',
      avatar: '👨',
    },
    {
      id: 2,
      name: 'Priya Sharma',
      location: 'Mumbai',
      rating: 5,
      comment: 'Foodio has the best panipuri in town. Highly recommended!',
      avatar: '👩',
    },
    {
      id: 3,
      name: 'Amit Desai',
      location: 'Pune',
      rating: 4,
      comment: 'Great taste and reasonable prices. Will definitely order again!',
      avatar: '👨',
    },
  ];

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-dark mb-4">⭐ Customer Reviews</h2>
          <p className="text-gray-600 text-lg">See what our happy customers are saying</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((review) => (
            <div key={review.id} className="card">
              <div className="flex items-center gap-3 mb-3">
                <div className="text-3xl">{review.avatar}</div>
                <div>
                  <p className="font-bold text-dark">{review.name}</p>
                  <p className="text-sm text-gray-600">{review.location}</p>
                </div>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className={i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
                  />
                ))}
                <span className="text-sm text-gray-600 ml-2">{review.rating}.0</span>
              </div>

              <p className="text-gray-700 italic">"{review.comment}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Reviews;
