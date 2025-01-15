// src/services/monday.ts
import mondaySDK from "monday-sdk-js";
import fetch from 'node-fetch';

// Add fetch to global scope for Monday SDK
if (!global.fetch) {
  (global as any).fetch = fetch;
}

export class MondayService {
  private monday: any;

  constructor(apiToken: string) {
    this.monday = mondaySDK();
    this.monday.setToken(apiToken);
  }

  async createTask(boardId: string, task: Task) {
    const query = `mutation createItem($boardId: Int!, $itemName: String!, $columnValues: JSON!) {
      create_item (board_id: $boardId, item_name: $itemName, column_values: $columnValues) {
        id
      }
    }`;

    try {
      // Prepare column values in Monday.com format
      const columnValues = {
        status: { label: "To Do" },
        priority: { label: task.priority.charAt(0).toUpperCase() + task.priority.slice(1) },
        date: task.dueDate,
        person: { personsAndTeams: [{ id: 0, kind: "person" }] }
      };

      const response = await this.monday.api(query, {
        variables: {
          boardId: parseInt(boardId),
          itemName: task.title,
          columnValues: JSON.stringify(columnValues)
        }
      });

      // Add task description as updates
      if (response.data?.create_item?.id) {
        await this.addTaskDetails(response.data.create_item.id, task);
      }

      return response.data;
    } catch (error) {
      console.error('Error creating task:', error);
      throw error;
    }
  }

  private async addTaskDetails(itemId: string, task: Task) {
    const updateQuery = `mutation ($itemId: Int!, $body: String!) {
      create_update (item_id: $itemId, body: $body) {
        id
      }
    }`;

    const body = `${task.description}\n\n${task.assignee ? `Assignee: ${task.assignee}` : ''}`;

    await this.monday.api(updateQuery, {
      variables: {
        itemId: parseInt(itemId),
        body: body.trim()
      }
    });
  }
}

// Types (if not imported from a separate file)
interface Task {
  title: string;
  description: string;
  assignee: string | null;
  priority: 'high' | 'medium' | 'low';
  dueDate: string | null;
}