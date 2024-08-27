import React from 'react';

function Tododata(props) {
  const { title, description, onDelete, onEdit, timestamp } = props;

  return (
    <div className="max-w-md mx-auto border-2 shadow-md rounded-md p-4 bg-white flex items-center space-x-4">
      <div className="flex-1">
        <h1 className="text-lg font-semibold mb-1 truncate">{title}</h1>
        <p className="text-gray-700 mb-2 truncate">{description}</p>
        {timestamp && (
          <p className="text-gray-500 text-sm truncate">
            {new Date(timestamp).toLocaleDateString()}
          </p>
        )}
      </div>

      <div className="flex space-x-2">
        <button
          onClick={onEdit}
          aria-label="Edit"
          className="p-2 rounded-md hover:bg-gray-200 transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6 text-blue-500"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.5 4l4 4-10 10H5v-4L15.5 4z"
            />
          </svg>
        </button>

        <button
          onClick={onDelete}
          aria-label="Delete"
          className="p-2 rounded-md hover:bg-gray-200 transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6 text-red-500"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default Tododata;
