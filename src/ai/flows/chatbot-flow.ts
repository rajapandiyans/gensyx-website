
'use server';
/**
 * @fileOverview Chatbot AI flow for GenSyx Solutions.
 *
 * - getChatbotResponse - Handles user queries about the company.
 * - ChatbotInput - The input type for the chatbot flow.
 * - ChatbotOutput - The return type for the chatbot flow.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';

// Define input schema
const ChatbotInputSchema = z.object({
  query: z.string().describe('The user\'s question about GenSyx Solutions.'),
});
export type ChatbotInput = z.infer<typeof ChatbotInputSchema>;

// Define output schema
const ChatbotOutputSchema = z.object({
  reply: z.string().describe('The chatbot\'s response to the user query.'),
});
export type ChatbotOutput = z.infer<typeof ChatbotOutputSchema>;

// Define the Genkit prompt
let prompt: any; // Define prompt variable outside try-catch
try {
   prompt = ai.definePrompt({
    name: 'chatbotPrompt',
    model: 'googleai/gemini-1.5-flash-latest', // Specify the model here
    input: {
      schema: ChatbotInputSchema,
    },
    output: {
      schema: ChatbotOutputSchema,
    },
    prompt: `You are a helpful and friendly chatbot assistant for GenSyx Solutions. Your purpose is to answer questions about the company, its services, projects, mission, vision, and contact information based ONLY on the context provided below. Be concise and helpful. If the question is outside the scope of the provided context or asks for opinions, politely decline to answer.

Context about GenSyx Solutions:
- **Mission:** To empower businesses with innovative and effective digital solutions that drive growth, enhance brand visibility, and create lasting connections with their audiences. We strive to be the catalyst for our clients' digital success stories.
- **Vision:** To be a leading digital services provider, recognized for our creativity, technical excellence, and commitment to client success. We envision a future where businesses of all sizes can leverage the power of digital technology to achieve their full potential.
- **Services:** Web Design & Development, SEO Strategy, Branding & Identity, Digital Marketing Strategy, Social Media Management, Google Business Profile Optimization.
- **Featured Projects:** GPT3 Integration (AI solutions), Travela Booking Platform (travel planning), Caterserv Event Planning (vendor booking), Modern E-Commerce Store (online retail). Project links are available on the website.
- **Contact:** gensyx6@gmail.com, 9361104465, Coimbatore, India.
- **About:** Founded on innovation and client-centricity. Grown into a comprehensive digital services agency focused on adapting to the digital landscape and delivering exceptional digital experiences through strong client partnerships. Expertise spans web development, SEO, branding, digital marketing, social media, etc.
- **Social Media:**
    - GitHub: https://github.com/Gensyx-Solutions
    - X/Twitter: https://x.com/GensyxSolutions
    - LinkedIn: https://www.linkedin.com/company/gensyx-solutions/
    - Instagram: https://www.instagram.com/gensyx_solutions?igsh=OTduZ3RibWI2Nm5m


User Query: {{{query}}}

Answer the user's query based *only* on the context above. Keep your reply concise and relevant.
If the user asks for social media links, provide the list of links from the context.
If you cannot answer based on the context, say "I do not have information about that based on the provided context."
`,
  });
} catch (error: any) {
    console.error("FATAL: Error defining chatbot prompt:", error.message, error.stack);
    // You might want to throw the error or handle it gracefully
    // For now, log it and let subsequent calls fail.
     prompt = null; // Set prompt to null to indicate failure
}


// Define the Genkit flow
let chatbotFlow: any; // Define flow variable outside try-catch
try {
   chatbotFlow = ai.defineFlow<
    typeof ChatbotInputSchema,
    typeof ChatbotOutputSchema
  >(
    {
      name: 'chatbotFlow',
      inputSchema: ChatbotInputSchema,
      outputSchema: ChatbotOutputSchema,
    },
    async (input) => {
       if (!prompt) { // Check if prompt definition failed
            console.error("Chatbot flow cannot execute because prompt definition failed.");
            throw new Error("Chatbot prompt is not available.");
       }
      try {
        // console.log("Executing chatbot prompt with input:", input);
        const llmResponse = await prompt(input);
        // console.log("LLM response received:", llmResponse);

        // Ensure output exists and has the 'reply' property before returning
        if (!llmResponse?.output?.reply) {
            // Log more details about the missing output
            console.error("Chatbot flow received invalid or missing output from LLM for query:", input.query, "Response object:", llmResponse);
             // Check if there was an error in the response structure itself
             if (llmResponse && 'error' in llmResponse) {
               throw new Error(`Chatbot flow failed: LLM returned an error - ${llmResponse.error}`);
             }
            // Attempt to get more details if available
            const responseText = llmResponse ? JSON.stringify(llmResponse) : 'undefined';
            throw new Error(`Chatbot flow failed: Invalid or missing output structure received from LLM. Received: ${responseText}`);
        }
        return llmResponse.output;
      } catch (error: any) {
        // Log the specific error during prompt execution
        console.error("Error executing chatbot prompt for query:", input.query, "Error:", error.message, "Stack:", error.stack);
        // Check if it's an API key issue
         if (error.message && (error.message.includes('API key not valid') || error.message.includes('API_KEY_INVALID'))) {
           throw new Error(`Chatbot flow failed: Invalid API Key. Please check your GOOGLE_GENAI_API_KEY.`);
         }
        // Rethrow a more specific error, preserving original message if possible
         throw new Error(`Chatbot flow failed during prompt execution: ${error.message || 'Unknown error.'}`);
      }
    }
  );
 } catch (error: any) {
     console.error("FATAL: Error defining chatbot flow:", error.message, error.stack);
     chatbotFlow = null; // Set flow to null to indicate failure
 }


// Wrapper function to call the flow - adding more detailed logging
export async function getChatbotResponse(input: ChatbotInput): Promise<ChatbotOutput> {
    if (!chatbotFlow) { // Check if flow definition failed
        console.error("Cannot get chatbot response because the chatbot flow definition failed.");
        throw new Error("Chatbot flow is not available due to an initialization error.");
    }
   console.log("Calling chatbotFlow with input:", JSON.stringify(input));
   try {
     const result = await chatbotFlow(input);
     console.log("Chatbot flow returned result:", JSON.stringify(result));
     return result;
   } catch (error: any) {
       // Log the error from calling the flow itself
       console.error("Error calling chatbotFlow:", error.message, "Stack:", error.stack);
       // Rethrow the error with a clear indication of failure point
       // Include the original error message for context
       throw new Error(`Failed to get chatbot response from flow: ${error.message || 'Unknown error during flow execution'}`);
   }
}

