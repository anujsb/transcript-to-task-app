// import { useState } from 'react';
// import { Upload } from 'lucide-react';

// const TranscriptUploader = () => {
//   const [loading, setLoading] = useState(false);
//   const [tasks, setTasks] = useState([]);
//   const [boardId, setBoardId] = useState('');

//   const handleTranscriptUpload = async (event) => {
//     const file = event.target.files[0];
//     if (!file || !boardId) return;

//     setLoading(true);
//     try {
//       const text = await file.text();
//       const response = await fetch('/api/process-transcript', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           transcript: text,
//           boardId
//         }),
//       });

//       const data = await response.json();
//       if (data.success) {
//         setTasks(data.tasks);
//       }
//     } catch (error) {
//       console.error('Error processing transcript:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-4xl mx-auto p-6">
//       <div className="mb-6">
//         <label className="block text-sm font-medium mb-2">
//           Monday.com Board ID
//         </label>
//         <input
//           type="text"
//           value={boardId}
//           onChange={(e) => setBoardId(e.target.value)}
//           className="w-full p-2 border rounded"
//           placeholder="Enter your board ID"
//         />
//       </div>

//       <div className="border-2 border-dashed rounded-lg p-8 text-center">
//         <label className="cursor-pointer">
//           <input
//             type="file"
//             accept=".txt,.doc,.docx"
//             onChange={handleTranscriptUpload}
//             className="hidden"
//           />
//           <Upload className="mx-auto h-12 w-12 text-gray-400" />
//           <p className="mt-2">Upload meeting transcript</p>
//         </label>
//       </div>

//       {loading && (
//         <div className="mt-4 text-center">
//           Processing transcript...
//         </div>
//       )}

//       {tasks.length > 0 && (
//         <div className="mt-6">
//           <h3 className="text-lg font-semibold mb-4">Extracted Tasks:</h3>
//           <div className="space-y-4">
//             {tasks.map((task, index) => (
//               <div key={index} className="p-4 border rounded">
//                 <h4 className="font-medium">{task.title}</h4>
//                 <p className="text-gray-600">{task.description}</p>
//                 {task.assignee && (
//                   <p className="text-sm">Assignee: {task.assignee}</p>
//                 )}
//                 {task.dueDate && (
//                   <p className="text-sm">Due: {task.dueDate}</p>
//                 )}
//               </div>
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default TranscriptUploader;

import { useState } from 'react';
import { Upload } from 'lucide-react';

// Define the structure for each task
interface Task {
  title: string;
  description: string;
  assignee?: string; // Optional property
  dueDate?: string;  // Optional property
}

const TranscriptUploader = () => {
  const [loading, setLoading] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [boardId, setBoardId] = useState('');

  // Handle the file upload and process the transcript
  const handleTranscriptUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]; // Optional chaining to handle if no file is selected
    if (!file || !boardId) return;

    setLoading(true);
    try {
      const text = await file.text(); // Read the content of the file
      const response = await fetch('/api/process-transcript', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          transcript: text,
          boardId
        }),
      });

      const data = await response.json();
      if (data.success) {
        setTasks(data.tasks); // Set tasks data from the response
      }
    } catch (error) {
      console.error('Error processing transcript:', error); // Log errors if any
    } finally {
      setLoading(false); // Stop loading once processing is complete
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Input for the Monday.com Board ID */}
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">
          Monday.com Board ID
        </label>
        <input
          type="text"
          value={boardId}
          onChange={(e) => setBoardId(e.target.value)} // Update state when input changes
          className="w-full p-2 border rounded"
          placeholder="Enter your board ID"
        />
      </div>

      {/* File upload section */}
      <div className="border-2 border-dashed rounded-lg p-8 text-center">
        <label className="cursor-pointer">
          <input
            type="file"
            accept=".txt,.doc,.docx" // Accepts text and document files
            onChange={handleTranscriptUpload} // Call handleTranscriptUpload when file changes
            className="hidden" // Hide the file input
          />
          <Upload className="mx-auto h-12 w-12 text-gray-400" /> {/* Icon for file upload */}
          <p className="mt-2">Upload meeting transcript</p>
        </label>
      </div>

      {/* Show loading indicator while processing */}
      {loading && (
        <div className="mt-4 text-center">
          Processing transcript...
        </div>
      )}

      {/* Display tasks if any are extracted */}
      {tasks.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-4">Extracted Tasks:</h3>
          <div className="space-y-4">
            {tasks.map((task, index) => (
              <div key={index} className="p-4 border rounded">
                <h4 className="font-medium">{task.title}</h4>
                <p className="text-gray-600">{task.description}</p>
                {task.assignee && (
                  <p className="text-sm">Assignee: {task.assignee}</p>
                )}
                {task.dueDate && (
                  <p className="text-sm">Due: {task.dueDate}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TranscriptUploader;