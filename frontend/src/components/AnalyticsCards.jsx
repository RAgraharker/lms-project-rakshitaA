export default function AnalyticsCards({ courses }) {
  const total = courses.length;
  

  return (
    <div className="grid grid-cols-3 gap-4 mb-6">

      <div className="bg-white p-4 rounded shadow">
        <p className="text-sm text-gray-500">Total Courses</p>
        <h2 className="text-xl font-bold">{total}</h2>
      </div>

      
    </div>
  );
}