"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
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
      setTasks(data.tasks);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unexpected error occurred"
      );
      console.error("Error processing prompt:", err);
    } finally {
      setLoading(false);
    }
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
            <Label className="text-white" htmlFor="boardId">Monday.com Board ID</Label>
            <Input
              id="boardId"
              value={boardId}
              onChange={(e) => setBoardId(e.target.value)}
              placeholder="Enter your board ID"
              
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
                  className="h-32"
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
          <Button className=" bg-accent shadow-md w-full text-white" type="submit"  disabled={loading}>
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
          <h3 className="text-lg font-semibold mb-4">Extracted Tasks:</h3>
          <div className="space-y-4">
            {tasks.map((task, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle>{task.title}</CardTitle>
                  {task.assignee && (
                    <CardDescription>Assignee: {task.assignee}</CardDescription>
                  )}
                </CardHeader>
                <CardContent>
                  <p>{task.description}</p>
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
            ))}
          </div>
        </CardContent>
      )}
    </Card>
  );
}
