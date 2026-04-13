const CategoryFilter = ({ categories, selectedCategories, onToggle, onClear }) => {
    return (
      <div className="flex flex-wrap gap-3 pb-1">
        <button
          onClick={onClear}
          className={`px-3 py-1 rounded-xl text-xs font-medium transition-all ${
            selectedCategories.length === 0
              ? 'bg-violet-800 text-white'
              : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
          }`}
        >
          All
        </button>
        {categories.map((cat) => {
          const isActive = selectedCategories.includes(cat);
          return (
            <button
              key={cat}
              onClick={() => onToggle(cat)}
              className={`px-3 py-1 rounded-xl text-xs font-medium capitalize transition-all ${
                isActive
                  ? 'bg-violet-800 text-white'
                  : 'bg-violet-100 hover:bg-gray-200 text-gray-700'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>
    );
  };
  
  export default CategoryFilter;