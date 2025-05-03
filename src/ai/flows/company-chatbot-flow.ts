
'use server';
/**
 * @fileOverview Genkit flow for the company assistant chatbot.
 * - getChatbotResponse - Handles chat interactions, providing company info, services, and contact details.
 * - ChatbotInput - Input schema for the chatbot flow.
 * - ChatbotOutput - Output schema for the chatbot flow.
 * - ChatbotMessage - Message schema used for conversation history.
 */

import { ai } from '@/ai/ai-instance';
import { generate } from 'genkit/ai';
import { AIMessage, HumanMessage } from 'genkit/model';
import { z } from 'zod';
import type { MessageData } from 'genkit/model'; // Use type import

// Define company information directly in the prompt context for simplicity
const companyInfo = {
  name: 'GenSyx Solutions',
  description: 'GenSyx Solutions empowers businesses with innovative and effective digital solutions that drive growth, enhance brand visibility, and create lasting connections with their audiences. We specialize in web development, SEO, branding, digital marketing, social media management, and Google Business Profile optimization.',
  services: [
    { title: "Website Design & Development", description: "Building responsive, high-performance websites.", link: "/services/website-design" },
    { title: "SEO Strategy", description: "Boosting visibility on search engines.", link: "/services/seo" },
    { title: "Branding & Identity", description: "Crafting memorable logos and brand identities.", link: "/services/branding" },
    { title: "Digital Marketing", description: "Data-driven strategies for lead generation.", link: "/services/digital-marketing" },
    { title: "Social Media Management", description: "Engaging content and community growth.", link: "/services/social-media" },
    { title: "Google Business Profile", description: "Optimizing your Google profile for local visibility.", link: "/services/google-profile" },
  ],
  contact: {
    email: 'gensyx6@gmail.com',
    phone: '9361104465',
    location: 'Coimbatore, India',
    page: '/contact',
  },
  socialMedia: [
    { name: 'GitHub', link: 'https://github.com/Gensyx-Solutions' },
    { name: 'X (Twitter)', link: 'https://x.com/i/flow/login?redirect_after_login=%2FGensyxSolutions' },
    { name: 'LinkedIn', link: 'https://www.linkedin.com/company/gensyx-solutions/' },
    { name: 'Instagram', link: 'https://www.instagram.com/gensyx_solutions?igsh=OTduZ3RibWI2Nm5m' },
  ],
};

// Helper function to format context information for the prompt
const formatContext = (info: typeof companyInfo) => {
  const servicesList = info.services.map(s => `- ${s.title}: ${s.description} (Learn more: ${s.link})`).join('\n');
  const socialLinks = info.socialMedia.map(s => `- ${s.name}: ${s.link}`).join('\n');
  return `
## Company Information: GenSyx Solutions

**Name:** ${info.name}
**Description:** ${info.description}

**Services Offered:**
${servicesList}

**Contact Information:**
- Email: ${info.email}
- Phone: ${info.phone}
- Location: ${info.location}
- Contact Page: ${info.contact.page}

**Social Media Links:**
${socialLinks}
  `.trim();
};

const companyContext = formatContext(companyInfo);

// Define Zod Schemas
// ChatbotMessageSchema represents the structure expected by the frontend
const ChatbotMessageSchema = z.object({
  role: z.enum(['user', 'model']), // Simplified roles for frontend state
  content: z.array(z.object({ text: z.string() })), // Ensure content is an array of text objects
});
export type ChatbotMessage = z.infer<typeof ChatbotMessageSchema>;

const ChatbotInputSchema = z.object({
  message: z.string().describe('The latest message from the user.'),
  // History uses the ChatbotMessageSchema structure
  history: z.array(ChatbotMessageSchema).optional().describe('The history of the conversation.'),
});
export type ChatbotInput = z.infer<typeof ChatbotInputSchema>;

const ChatbotOutputSchema = z.object({
  response: z.string().describe('The chatbot\'s response to the user.'),
});
export type ChatbotOutput = z.infer<typeof ChatbotOutputSchema>;


// Define the Prompt using ai.definePrompt for structure and potential reuse
// Note: We are not using the prompt template feature here as generate() handles history better.
// The system message and context will be passed directly to the generate call.
const chatbotSystemPrompt = `
You are a friendly and helpful AI assistant for GenSyx Solutions.
Your goal is to answer user questions about the company, its services, and how to contact them based *only* on the provided context.
Be concise and informative.
Use the provided context below to answer questions accurately.
If asked about services, briefly describe them and provide the link for more details.
If asked for contact information or social media, provide the details clearly, including the links.
Do not answer questions unrelated to GenSyx Solutions or its services. Politely decline off-topic requests.
Do not make up information not present in the context. If you don't know the answer based on the context, say so politely (e.g., "I don't have that specific information based on my current context.").

CONTEXT:
---
${companyContext}
---
`;


// Define the Flow
const companyChatbotFlow = ai.defineFlow(
  {
    name: 'companyChatbotFlow',
    inputSchema: ChatbotInputSchema,
    outputSchema: ChatbotOutputSchema,
  },
  async (input) => {
     // Map input history (using ChatbotMessageSchema) to MessageData[] expected by generate()
    const historyForGenerate: MessageData[] = (input.history ?? []).map(msg => {
        // Assuming each message content array has exactly one text part
        const messageText = msg.content[0]?.text ?? '';
        if (msg.role === 'user') {
            return new HumanMessage(messageText);
        } else { // msg.role === 'model'
            return new AIMessage(messageText);
        }
    });

    // Add the latest user message to the history for the generate call
    historyForGenerate.push(new HumanMessage(input.message));

    try {
        // Use generate directly for chat-like interactions with history
        const result = await generate({
          // Use a known stable model like gemini-1.5-flash
          model: 'googleai/gemini-1.5-flash',
          prompt: chatbotSystemPrompt, // Provide the system prompt here
          history: historyForGenerate, // Provide the full history including the latest user message
          config: { temperature: 0.5 }, // Adjust temperature for creativity vs factualness
          output: {
              format: 'text', // Expect plain text output
          }
        });

        const textResponse = result.text; // Access text directly in Genkit 1.x

        if (!textResponse) {
          console.error("Chatbot flow received no text response from the model.");
          // Return a structured error or default response
          return { response: "I'm sorry, I couldn't generate a response right now. Please try again." };
        }
        return { response: textResponse };

    } catch (error: any) {
        console.error("Error during generate call in companyChatbotFlow:", error);
        // Propagate a more specific error message if possible
        let errorMessage = "Chatbot flow failed during prompt execution";
        if (error instanceof Error) {
            errorMessage += `: ${error.message}`;
        }
         // Important: Rethrow or handle the error appropriately.
         // Here we throw a new error to be caught by the calling function.
        throw new Error(errorMessage);
    }
  }
);


// Exported async wrapper function - This is what the frontend calls
export async function getChatbotResponse(input: ChatbotInput): Promise<ChatbotOutput> {
  console.log("Calling companyChatbotFlow with input:", JSON.stringify(input));
  try {
    // Execute the flow
    const result = await companyChatbotFlow(input);

    // Validate the result structure (basic check)
     if (!result || typeof result.response !== 'string') {
       console.error("Chatbot flow returned invalid data structure:", result);
       throw new Error("Chatbot flow returned invalid data.");
     }

    console.log("Received response from companyChatbotFlow:", JSON.stringify(result));
    return result;

  } catch (error: any) {
    console.error("Error in getChatbotResponse calling companyChatbotFlow:", error);

    // Construct a user-friendly error message, including the specific cause if available
    let detailedErrorMessage = "Failed to get chatbot response";
    if (error instanceof Error) {
      detailedErrorMessage += `: ${error.message}`; // Append the specific error from the flow
    } else {
      detailedErrorMessage += ": Unknown error during flow execution.";
    }

    // Check for common specific errors like API key issues
    if (error.message?.includes('API key not valid') || error.message?.includes('Invalid API Key')) {
      detailedErrorMessage = "Chatbot flow failed: Invalid API Key. Please check your GOOGLE_GENAI_API_KEY.";
    } else if (error.message?.includes('Model not found')) {
       detailedErrorMessage = `Chatbot flow failed: ${error.message}. The configured model might be unavailable.`;
    }

    // Log the detailed error for debugging
     console.error("Detailed Error for Frontend:", detailedErrorMessage);

    // Rethrow a new error with the potentially enhanced message for the frontend to catch
    throw new Error(detailedErrorMessage);
  }
}

    