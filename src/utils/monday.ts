// src/utils/monday.ts

export async function createMondayTasks(tasks: TranscriptTask[], boardId: string) {
    const mutation = `
      mutation($boardId: ID!, $itemName: String!, $columnValues: JSON!) {
        create_item(
          board_id: $boardId,
          item_name: $itemName,
          column_values: $columnValues
        ) {
          id
        }
      }
    `;
  
    for (const task of tasks) {
      const columnValues = JSON.stringify({
        text: task.description,
        person: task.assignee,
        date: task.dueDate,
        status: "Not Started"
      });
  
      await fetch("https://api.monday.com/v2", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: process.env.NEXT_PUBLIC_MONDAY_API_TOKEN || ""
        },
        body: JSON.stringify({
          query: mutation,
          variables: {
            boardId,
            itemName: task.title,
            columnValues
          }
        })
      });
    }
  }
  