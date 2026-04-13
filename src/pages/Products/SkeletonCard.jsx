const SkeletonCard = () => (
    <div className="bg-white rounded-3xl shadow overflow-hidden flex flex-col h-full animate-pulse">
      <div className="h-52 bg-gray-200" />
      <div className="p-5 flex-1 flex flex-col space-y-3">
        <div className="h-5 w-24 bg-gray-200 rounded-full" />
        <div className="h-5 bg-gray-200 rounded-xl w-5/6" />
        <div className="h-5 bg-gray-200 rounded-xl w-4/6" />
        <div className="mt-auto h-8 w-28 bg-gray-200 rounded-2xl" />
      </div>
    </div>
  );
  
  export default SkeletonCard;