import React from 'react';

function Tododata(props) {
  const { title, description, onDelete, onEdit, onComplete, timestamp, status } = props;
  const [isEditing, setIsEditing] = React.useState(false);
  const [newTitle, setNewTitle] = React.useState(title);
  const [newDescription, setNewDescription] = React.useState(description);

  return (
    <div className={`group relative bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-l-4 ${
      status ? 'border-l-green-500' : 'border-l-blue-500'
    }`}>
      {/* Status Badge */}
      <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold ${
        status 
          ? 'bg-green-100 text-green-700' 
          : 'bg-blue-100 text-blue-700'
      }`}>
        {status ? '✓ Completed' : '⏳ Pending'}
      </div>

      <div className="p-6">
        {isEditing ? (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              onEdit(newTitle, newDescription);
              setIsEditing(false);
            }}
            className="space-y-4"
          >
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Title</label>
              <input
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="w-full p-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-300"
                required
                placeholder="Enter title"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
              <textarea
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
                className="w-full p-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-300 resize-none"
                required
                placeholder="Enter description"
                rows="3"
              />
            </div>
            <div className="flex justify-center space-x-3 pt-2">
              <button
                type="submit"
                className="px-6 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 font-medium"
              >
                Save Changes
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsEditing(false);
                  setNewTitle(title);
                  setNewDescription(description);
                }}
                className="px-6 py-2 bg-gradient-to-r from-gray-500 to-gray-600 text-white rounded-xl hover:from-gray-600 hover:to-gray-700 transition-all duration-300 transform hover:scale-105 font-medium"
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <div className="space-y-4">
            {/* Task Content */}
            <div>
              <h3 className={`text-xl font-bold mb-3 ${
                status ? 'text-gray-500 line-through' : 'text-gray-800'
              }`}>
                {title}
              </h3>
              <p className={`text-gray-600 leading-relaxed ${
                status ? 'line-through opacity-75' : ''
              }`}>
                {description}
              </p>
            </div>

            {/* Task Metadata */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              {timestamp && (
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                  </svg>
                  <span>{new Date(timestamp).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'short', 
                    day: 'numeric' 
                  })}</span>
                </div>
              )}
              
              <div className="flex items-center space-x-2">
                {!status && (
                  <button
                    onClick={onComplete}
                    aria-label="Mark as Completed"
                    className="p-2 rounded-xl hover:bg-green-50 transition-all duration-300 group/complete"
                    title="Mark as completed"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                      stroke="currentColor"
                      className="w-5 h-5 text-green-500 group-hover/complete:scale-110 transition-transform duration-200"
                    >
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
                  className="p-2 rounded-xl hover:bg-blue-50 transition-all duration-300 group/edit"
                  title="Edit task"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    className="w-5 h-5 text-blue-500 group-hover/edit:scale-110 transition-transform duration-200"
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
                  className="p-2 rounded-xl hover:bg-red-50 transition-all duration-300 group/delete"
                  title="Delete task"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    className="w-5 h-5 text-red-500 group-hover/delete:scale-110 transition-transform duration-200"
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
          </div>
        )}
      </div>
    </div>
  );
}

export default Tododata;
