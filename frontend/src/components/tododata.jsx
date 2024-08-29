import React from 'react';

function Tododata(props) {
  const { title, description, onDelete, onEdit, onComplete, timestamp, status } = props;
  const [isEditing, setIsEditing] = React.useState(false);
  const [newTitle, setNewTitle] = React.useState(title);
  const [newDescription, setNewDescription] = React.useState(description);

  return (
    <div className=" min-w-96 mx-auto border-2 shadow-lg rounded-md p-4 mt-10 bg-white flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 transition-transform transform hover:scale-105">
      <div className="flex-1">
        {isEditing ? (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              onEdit(newTitle, newDescription);
              setIsEditing(false);
            }}
            className="space-y-2"
          >
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
              required
              placeholder="Enter title"
            />
            <textarea
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
              required
              placeholder="Enter description"
            />
            <div className="flex justify-center space-x-2">
              <button
                type="submit"
                className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Save
              </button>
              <button
                onClick={() => {
                  setIsEditing(false);
                  setNewTitle(title);
                  setNewDescription(description);
                }}
                className="p-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <div>
            <h1 className="text-lg font-semibold max-w-60 mb-1 break-words">{title}</h1>
            <p className="text-gray-700 mb-2 max-w-52 break-words">{description}</p>
          </div>
        )}
        {timestamp && (
          <p className="text-gray-500 text-sm truncate">
            {new Date(timestamp).toLocaleDateString()}
          </p>
        )}
        <p className={`text-sm ${status ? 'text-green-500' : 'text-red-500'}`}>
          {status ? 'Completed' : 'Yet to be completed'}
        </p>
      </div>
      {!isEditing && (
        <div className="flex mx-5 space-x-24 sm:space-x-2">
          {!status && (
            <button
              onClick={onComplete}
              aria-label="Mark as Completed"
              className="p-2 rounded-md hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6 text-green-500"
              >
                <title>Mark as Completed</title>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </button>
          )}
          <button
            onClick={() => setIsEditing(true)}
            aria-label="Edit"
            className="p-2 rounded-md hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6 text-blue-500"
            >
              <title>Edit To-Do</title>
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
            className="p-2 rounded-md hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6 text-red-500"
            >
              <title>Delete To-Do</title>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
              />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}

export default Tododata;
