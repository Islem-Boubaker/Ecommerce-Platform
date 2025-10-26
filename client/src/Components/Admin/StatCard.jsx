const StatCard = ({ title, value, icon, change }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="mt-2 text-2xl font-semibold">{value}</p>
          {change && (
            <p className={`text-sm mt-1 ${change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
              {change} from last month
            </p>
          )}
        </div>
        <div className="p-3 bg-gray-100 rounded-full">
          {icon}
        </div>
      </div>
    </div>
  );
};

export default StatCard;
