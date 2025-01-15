// // "use client";
// // import { useState } from "react";
// // import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

// // const TranscriptProcessor = () => {
// //   const [transcript, setTranscript] = useState("");
// //   const [boardId, setBoardId] = useState("");
// //   const [loading, setLoading] = useState(false);
// //   const [result, setResult] = useState(null);

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     setLoading(true);
// //     setResult(null);

// //     try {
// //       const response = await fetch("/api/process-transcript", {
// //         method: "POST",
// //         headers: {
// //           "Content-Type": "application/json",
// //         },
// //         body: JSON.stringify({ transcript, boardId }),
// //       });

// //       if (!response.ok) {
// //         throw new Error(`Error: ${response.statusText}`);
// //       }

// //       const data = await response.json();
// //       setResult(data);
// //     } catch (error) {
// //       console.error("Error:", error);
// //       setResult({ error: "Failed to process transcript. Please try again later." });
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <Card className="w-full max-w-2xl mx-auto mt-8">
// //       <CardHeader>
// //         <CardTitle>Meeting Transcript to Tasks</CardTitle>
// //       </CardHeader>
// //       <CardContent>
// //         <form onSubmit={handleSubmit} className="space-y-4">
// //           <div>
// //             <label className="block text-sm font-medium mb-2">
// //               Monday.com Board ID
// //             </label>
// //             <input
// //               type="text"
// //               value={boardId}
// //               onChange={(e) => setBoardId(e.target.value)}
// //               className="w-full p-2 border rounded"
// //               required
// //             />
// //           </div>
// //           <div>
// //             <label className="block text-sm font-medium mb-2">
// //               Meeting Transcript
// //             </label>
// //             <textarea
// //               value={transcript}
// //               onChange={(e) => setTranscript(e.target.value)}
// //               className="w-full p-2 border rounded h-48"
// //               required
// //             />
// //           </div>
// //           <button
// //             type="submit"
// //             disabled={loading}
// //             className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
// //           >
// //             {loading ? "Processing..." : "Create Tasks"}
// //           </button>
// //         </form>

// //         {result && (
// //           <div className="mt-4">
// //             {result.error ? (
// //               <div className="text-red-600">
// //                 <strong>Error:</strong> {result.error}
// //               </div>
// //             ) : (
// //               <div>
// //                 <h3 className="font-medium">Created Tasks:</h3>
// //                 <pre className="mt-2 p-4 bg-gray-100 rounded overflow-auto">
// //                   {JSON.stringify(result, null, 2)}
// //                 </pre>
// //               </div>
// //             )}
// //           </div>
// //         )}
// //       </CardContent>
// //     </Card>
// //   );
// // };

// // export default TranscriptProcessor;
// "use client"
// import { useState } from 'react';
// import { Upload } from 'lucide-react';

// interface Task {
//   title: string;
//   description: string;
//   assignee?: string;
//   dueDate?: string;
//   priority?: string;
// }

// export default function TranscriptProcessor() {
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [tasks, setTasks] = useState<Task[]>([]);
//   const [boardId, setBoardId] = useState('');

//   const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     setLoading(true);
//     setError(null);

//     const formData = new FormData(event.currentTarget);
//     const file = formData.get('transcript') as File;

//     if (!file || !boardId) {
//       setError('Please provide both a transcript file and board ID');
//       setLoading(false);
//       return;
//     }

//     try {
//       const text = await file.text();
//       const response = await fetch('/api/process-transcript', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           transcript: text,
//           boardId,
//         }),
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.error || 'Failed to process transcript');
//       }

//       const data = await response.json();
//       setTasks(data.tasks);
//     } catch (err) {
//       setError(err instanceof Error ? err.message : 'An unexpected error occurred');
//       console.error('Error processing transcript:', err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-4xl mx-auto p-6">
//       <form onSubmit={handleSubmit} className="space-y-6">
//         <div>
//           <label htmlFor="boardId" className="block text-sm font-medium mb-2">
//             Monday.com Board ID
//           </label>
//           <input
//             id="boardId"
//             type="text"
//             value={boardId}
//             onChange={(e) => setBoardId(e.target.value)}
//             className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
//             placeholder="Enter your board ID"
//           />
//         </div>

//         <div className="border-2 border-dashed rounded-lg p-8 text-center">
//           <label className="cursor-pointer block">
//             <input
//               type="file"
//               name="transcript"
//               accept=".txt,.doc,.docx,.pdf"
//               className="hidden"
//               onChange={() => setError(null)}
//             />
//             <Upload className="mx-auto h-12 w-12 text-gray-400" />
//             <p className="mt-2">Upload meeting transcript</p>
//           </label>
//         </div>

//         {error && (
//           <div className="p-4 bg-red-50 text-red-600 rounded-md">
//             {error}
//           </div>
//         )}

//         <button
//           type="submit"
//           disabled={loading}
//           className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
//         >
//           {loading ? 'Processing...' : 'Process Transcript'}
//         </button>
//       </form>

//       {tasks.length > 0 && (
//         <div className="mt-6">
//           <h3 className="text-lg font-semibold mb-4">Extracted Tasks:</h3>
//           <div className="space-y-4">
//             {tasks.map((task, index) => (
//               <div key={index} className="p-4 border rounded bg-white shadow-sm">
//                 <h4 className="font-medium">{task.title}</h4>
//                 <p className="text-gray-600 mt-1">{task.description}</p>
//                 {task.assignee && (
//                   <p className="text-sm text-gray-500 mt-2">
//                     Assignee: {task.assignee}
//                   </p>
//                 )}
//                 {task.dueDate && (
//                   <p className="text-sm text-gray-500">
//                     Due: {task.dueDate}
//                   </p>
//                 )}
//                 {task.priority && (
//                   <p className="text-sm text-gray-500">
//                     Priority: {task.priority}
//                   </p>
//                 )}
//               </div>
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

"use client"
import { useState } from 'react';

interface Task {
  title: string;
  description: string;
  assignee?: string;
  dueDate?: string;
  priority?: string;
}

export default function TranscriptProcessor() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [boardId, setBoardId] = useState('');
  const [transcript, setTranscript] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    if (!transcript || !boardId) {
      setError('Please provide both transcript text and board ID');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/process-transcript', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          transcript,
          boardId,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to process transcript');
      }

      const data = await response.json();
      setTasks(data.tasks);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
      console.error('Error processing transcript:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="boardId" className="block text-sm font-medium mb-2">
            Monday.com Board ID
          </label>
          <input
            id="boardId"
            type="text"
            value={boardId}
            onChange={(e) => setBoardId(e.target.value)}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your board ID"
          />
        </div>

        <div>
          <label htmlFor="transcript" className="block text-sm font-medium mb-2">
            Meeting Transcript
          </label>
          <textarea
            id="transcript"
            value={transcript}
            onChange={(e) => setTranscript(e.target.value)}
            className="w-full h-48 p-2 border rounded focus:ring-2 focus:ring-blue-500"
            placeholder="Paste your meeting transcript here..."
          />
        </div>

        {error && (
          <div className="p-4 bg-red-50 text-red-600 rounded-md">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? 'Processing...' : 'Process Transcript'}
        </button>
      </form>

      {tasks.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-4">Extracted Tasks:</h3>
          <div className="space-y-4">
            {tasks.map((task, index) => (
              <div key={index} className="p-4 border rounded bg-white shadow-sm">
                <h4 className="font-medium">{task.title}</h4>
                <p className="text-gray-600 mt-1">{task.description}</p>
                {task.assignee && (
                  <p className="text-sm text-gray-500 mt-2">
                    Assignee: {task.assignee}
                  </p>
                )}
                {task.dueDate && (
                  <p className="text-sm text-gray-500">
                    Due: {task.dueDate}
                  </p>
                )}
                {task.priority && (
                  <p className="text-sm text-gray-500">
                    Priority: {task.priority}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}