export default function StarRating({ category, activeRating, currentRating, onRatingChange }) {
    return (
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            className={`text-2xl ${star <= activeRating ? 'text-[#e39530]' : 'text-gray-300'}`}
            onClick={() => onRatingChange(category, star)}
            onMouseEnter={() => onRatingChange(category, star)}
            onMouseLeave={() => onRatingChange(category, currentRating)}
          >
            ★
          </button>
        ))}
        <span className="ml-2 text-sm text-gray-200">
          {activeRating}.0
        </span>
      </div>
    );
  }