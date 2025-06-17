import type { MessageTextContent } from "@azure/ai-agents";
import { AgentsClient, isOutputOfType } from "@azure/ai-agents";
import { DefaultAzureCredential } from "@azure/identity";

import "dotenv/config";
import { AgentId, getAgentId } from "../types/agents";

const projectEndpoint = process.env.AZURE_AI_FOUNDRY_ENDPOINT || "";

if (!projectEndpoint) {
  throw new Error("AZURE_AI_FOUNDRY_ENDPOINT environment variable is not set.");
}

export async function callAgent(agentId: AgentId, userString: string): Promise<string> {
  // Create an Azure AI Client
  const azureAgentId = getAgentId(agentId);
  const client = new AgentsClient(projectEndpoint, new DefaultAzureCredential());

  // Create a thread
  const thread = await client.threads.create();
  console.log(`Created thread, thread ID: ${thread.id}`);

  // Create a message
  const message = await client.messages.create(thread.id, "user", userString);
  console.log(`Created message, message ID: ${message.id}`);

  // Create and execute a run
  const streamEventMessages = await client.runs.create(thread.id, azureAgentId).stream();

  // for await (const eventMessage of streamEventMessages) {
  //   switch (eventMessage.event) {
  //     case RunStreamEvent.ThreadRunCreated:
  //       console.log(`ThreadRun status: ${(eventMessage.data as ThreadRun).status}`);
  //       break;
  //     case MessageStreamEvent.ThreadMessageDelta:
  //       {
  //         const messageDelta = eventMessage.data as MessageDeltaChunk;
  //         messageDelta.delta.content.forEach((contentPart) => {
  //           if (contentPart.type === "text") {
  //             const textContent = contentPart as MessageDeltaTextContent;
  //             const textValue = textContent.text?.value || "No text";
  //             console.log(`Text delta received:: ${textValue}`);
  //           }
  //         });
  //       }
  //       break;

  //     case RunStreamEvent.ThreadRunCompleted:
  //       console.log("Thread Run Completed");
  //       break;
  //     case ErrorEvent.Error:
  //       console.log(`An error occurred. Data ${eventMessage.data}`);
  //       break;
  //     case DoneEvent.Done:
  //       console.log("Stream completed.");
  //       break;
  //   }
  // }

  const messagesIterator = client.messages.list(thread.id);
  const messagesArray = [];
  for await (const m of messagesIterator) {
    messagesArray.push(m);
  }
  console.log("Messages:", messagesArray);

  // Iterate through messages and print details for each annotation
  let response = "";

  console.log(`File Paths:`);
  console.log(`Message Details:`);
  messagesArray.forEach((m) => {
    console.log(`Type: ${m.content[0].type}`);
    if (isOutputOfType<MessageTextContent>(m.content[0], "text")) {
      const textContent = m.content[0] as MessageTextContent;
      // console.log(`Text: ${textContent.text.value}`);
      response += textContent.text.value;
    }
    // console.log(`File ID: ${m.id}`);
    // firstId and lastId are properties of the paginator, not the messages array
    // Removing these references as they don't exist in this context
  });

  return response;
}
