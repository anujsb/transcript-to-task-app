import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2, Edit2, Check, X } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { FileUpload } from "./ui/file-upload";

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
  const [boardId, setBoardId] = useState("");
  const [prompt, setPrompt] = useState("");
  const [editingTask, setEditingTask] = useState<number | null>(null);
  const [editedTask, setEditedTask] = useState<Task | null>(null);

  // In your TranscriptProcessor component, let's update just the handleSubmit function:
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    if (!prompt || !boardId) {
      setError("Please provide both a prompt and board ID");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/process-transcript", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          transcript: prompt,
          boardId,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to process prompt");
      }

      const data = await response.json();
      // Make sure we're setting the tasks from data.tasks
      if (!data.tasks) {
        throw new Error("No tasks were found in the transcript");
      }
      setTasks(data.tasks);
    } catch (err) {
      console.error("Error processing prompt:", err);
      setError(
        err instanceof Error ? err.message : "An unexpected error occurred"
      );
    } finally {
      setLoading(false);
    }
  };
  const startEditing = (index: number) => {
    setEditingTask(index);
    setEditedTask({ ...tasks[index] });
  };

  const saveEdit = (index: number) => {
    if (editedTask) {
      const newTasks = [...tasks];
      newTasks[index] = editedTask;
      setTasks(newTasks);
      setEditingTask(null);
      setEditedTask(null);
    }
  };

  const cancelEdit = () => {
    setEditingTask(null);
    setEditedTask(null);
  };

  const renderTaskCard = (task: Task, index: number) => {
    const isEditing = editingTask === index;

    if (isEditing && editedTask) {
      return (
        <Card key={index} className="border-2 border-primary">
          <CardHeader className="space-y-2">
            <Input
              value={editedTask.title}
              onChange={(e) =>
                setEditedTask({ ...editedTask, title: e.target.value })
              }
              className="font-semibold text-white"
            />
            <Input
              value={editedTask.assignee || ""}
              onChange={(e) =>
                setEditedTask({ ...editedTask, assignee: e.target.value })
              }
              placeholder="Assignee"
              className="text-white"
            />
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              value={editedTask.description}
              onChange={(e) =>
                setEditedTask({ ...editedTask, description: e.target.value })
              }
              className="text-white"
            />
            <div className="grid grid-cols-2 gap-2">
              <Input
                type="date"
                value={editedTask.dueDate || ""}
                onChange={(e) =>
                  setEditedTask({ ...editedTask, dueDate: e.target.value })
                }
                className="text-white"
              />
              <Select
                value={editedTask.priority || ""}
                onValueChange={(value) =>
                  setEditedTask({ ...editedTask, priority: value })
                }
              >
                <SelectTrigger className="w-full text-white">
                  <SelectValue placeholder="Select Priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="flex justify-end space-x-2">
              <Button size="sm" variant="destructive" onClick={cancelEdit}>
                <X className="h-4 w-4 mr-1" />
                Cancel
              </Button>
              <Button
              variant="default"
                className="text-white bg-accent"
                size="sm"
                onClick={() => saveEdit(index)}
              >
                <Check className="h-4 w-4 mr-1 text-white" />
                Save
              </Button>
            </div>
          </CardContent>
        </Card>
      );
    }

    return (
      <Card key={index}>
        <CardHeader>
          <div className="flex items-end justify-end">
            <Button
              size="sm"
              variant="ghost"
              onClick={() => startEditing(index)}
            >
              <Edit2 className="h-4 w-4 text-white" />
            </Button>
          </div>
          {/* <div className="flex justify-between items-center text-center"> */}
          <div>
            <CardTitle>{task.title}</CardTitle>
            {task.assignee && (
              <CardDescription>Assignee: {task.assignee}</CardDescription>
            )}
          </div>
          {/* </div> */}
        </CardHeader>
        <CardContent>
          <p className="text-white">{task.description}</p>
          {task.dueDate && (
            <p className="text-sm text-muted-foreground mt-2">
              Due: {task.dueDate}
            </p>
          )}
          {task.priority && (
            <p className="text-sm text-muted-foreground">
              Priority: {task.priority}
            </p>
          )}
        </CardContent>
      </Card>
    );
  };

  return (
    <Card className="w-full max-w-2xl mx-auto mt-8">
      <CardHeader>
        <CardTitle>Meeting Summary to Tasks</CardTitle>
        <CardDescription>
          Enter your meeting summary and we'll extract tasks for your Monday.com
          board.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label className="text-white" htmlFor="boardId">
              Monday.com Board ID
            </Label>
            <Input
              id="boardId"
              value={boardId}
              onChange={(e) => setBoardId(e.target.value)}
              placeholder="Enter your board ID"
              className="text-white"
            />
          </div>

          <Tabs defaultValue="text" className="space-y-2">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="text">Enter Meeting Summary</TabsTrigger>
              <TabsTrigger value="file">Upload File</TabsTrigger>
            </TabsList>
            <TabsContent value="text">
              <div className="space-y-2">
                <Label htmlFor="prompt">Meeting Summary</Label>
                <Textarea
                  id="prompt"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Summarize your meeting here..."
                  className="h-32 text-white"
                />
              </div>
            </TabsContent>
            <TabsContent value="file">
              <FileUpload />
            </TabsContent>
          </Tabs>

          {error && (
            <div className="p-3 text-sm bg-destructive/15 text-destructive rounded">
              {error}
            </div>
          )}
          <Button
            className="bg-accent shadow-md w-full text-white"
            type="submit"
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing
              </>
            ) : (
              "Extract Tasks"
            )}
          </Button>
        </form>
      </CardContent>
      {tasks.length > 0 && (
        <CardContent className="mt-6 border-t pt-6">
          <h3 className="text-lg font-semibold mb-4 text-white">
            Extracted Tasks:
          </h3>
          <div className="space-y-4">
            {tasks.map((task, index) => renderTaskCard(task, index))}
          </div>
        </CardContent>
      )}
    </Card>
  );
}
