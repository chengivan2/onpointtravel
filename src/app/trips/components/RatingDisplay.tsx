// components/RatingDisplay.tsx
export function RatingDisplay({ rating }: { rating: number }) {
  const getRatingWord = (rating: number) => {
    if (rating >= 4.8) return "Excellent";
    if (rating >= 4.5) return "Very Good";
    if (rating >= 4.0) return "Good";
    return "Good";
  };

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <span
            key={i}
            className={`text-xl ${
              i < Math.floor(rating)
                ? "text-green-500"
                : "text-green-200 dark:text-green-700"
            }`}
          >
            ★
          </span>
        ))}
      </div>
      <span className="text-green-600 dark:text-green-300 font-medium">
        {getRatingWord(rating)} ({rating.toFixed(1)})
      </span>
    </div>
  );
}
