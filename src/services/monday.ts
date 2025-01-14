// src/services/monday.ts
import mondaySdk from "monday-sdk-js";
 
export class MondayService {
  private monday;

  constructor(apiToken: string) {
    this.monday = mondaySdk();
    this.monday.setToken(apiToken);
  }

  async createTask(boardId: string, task: Task) {
    const query = `mutation createItem($boardId: Int!, $itemName: String!) {
      create_item (board_id: $boardId, item_name: $itemName) {
        id
      }
    }`;

    try {
      const response = await this.monday.api(query, {
        variables: {
          boardId: parseInt(boardId),
          itemName: task.title
        }
      });

      // Add task details as updates
      if (response.data.create_item.id) {
        await this.addTaskDetails(response.data.create_item.id, task);
      }

      return response.data;
    } catch (error) {
      console.error('Error creating task:', error);
      throw error;
    }
  }

  private async addTaskDetails(itemId: string, task: Task) {
    // Add task description as an update
    const updateQuery = `mutation ($itemId: Int!, $body: String!) {
      create_update (item_id: $itemId, body: $body) {
        id
      }
    }`;

    await this.monday.api(updateQuery, {
      variables: {
        itemId: parseInt(itemId),
        body: task.description
      }
    });
  }
}
