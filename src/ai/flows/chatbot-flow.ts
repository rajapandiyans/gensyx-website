
'use server';
/**
 * @fileOverview Chatbot AI flow for GenSyx Solutions.
 *
 * - getChatbotResponse - Handles user queries about the company.
 * - ChatbotInput - The input type for the chatbot flow.
 * - ChatbotOutput - The return type for the chatbot flow.
 */

import {ai, isAiConfigured} from '@/ai/ai-instance'; // Import ai instance and configuration check
import {z} from 'genkit';

// Define input schema
const ChatbotInputSchema = z.object({
  query: z.string().describe("The user's question about GenSyx Solutions."),
});
export type ChatbotInput = z.infer<typeof ChatbotInputSchema>;

// Define output schema
const ChatbotOutputSchema = z.object({
  reply: z.string().describe("The chatbot's response to the user query."),
});
export type ChatbotOutput = z.infer<typeof ChatbotOutputSchema>;

// Define the Genkit prompt - Using a stable Gemini model
let prompt: any; // Define prompt variable outside try-catch
try {
  prompt = ai.definePrompt({
    name: 'chatbotPrompt',
    model: 'googleai/gemini-1.5-flash', // Use a known stable model like gemini-1.5-flash
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
  // Setting prompt to null indicates a failure in definition, which will be checked before execution.
  prompt = null;
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
      // Check if the prompt definition failed earlier
      if (!prompt) {
        console.error("Chatbot flow cannot execute because the prompt definition failed during initialization.");
        throw new Error("Chatbot prompt is not available due to an initialization error.");
      }

      // Check if AI is configured with a valid API key *before* making the call
      if (!isAiConfigured()) {
          console.error("Chatbot flow cannot execute because AI is not configured. Missing GOOGLE_GENAI_API_KEY.");
          // Throw a specific error indicating configuration issue
          throw new Error("AI Service Unconfigured: Missing API Key. Please check server configuration.");
      }


      try {
        // console.log("Executing chatbot prompt with input:", input);
        const llmResponse = await prompt(input);
        // console.log("LLM response received:", llmResponse);

        // Ensure output exists and has the 'reply' property before returning
        if (!llmResponse?.output?.reply) {
          console.error("Chatbot flow received invalid or missing output from LLM for query:", input.query, "Response object:", JSON.stringify(llmResponse));
          // Check for explicit errors in the response structure
          if (llmResponse && 'error' in llmResponse) {
            // Rethrow the error from the LLM response itself
             throw new Error(`Chatbot flow failed: LLM returned an error - ${llmResponse.error}`);
          }
          throw new Error(`Chatbot flow failed: Invalid or missing 'reply' in LLM output structure. Received: ${JSON.stringify(llmResponse)}`);
        }
        return llmResponse.output;
      } catch (error: any) {
        // Log the specific error during prompt execution
        console.error("Error executing chatbot prompt for query:", input.query, "Error:", error.message, "Stack:", error.stack);

         // Explicitly check for API key related errors (common causes)
         // This pattern matching might need adjustment based on exact error messages from Google AI
        const errorMsgLower = error.message?.toLowerCase() || '';
        if (
          errorMsgLower.includes('api key') ||
          errorMsgLower.includes('invalid key') ||
          errorMsgLower.includes('permission denied') ||
          errorMsgLower.includes('authentication failed') ||
          error.status === 'UNAUTHENTICATED' || // Check gRPC status if available
          (error.cause && (error.cause as any).message?.toLowerCase().includes('api key')) // Check nested cause
        ) {
           console.error("API Key Error detected during chatbot flow execution.");
           // Throw a very specific error for the frontend to potentially catch
           throw new Error(`API Key Error: Chatbot failed due to an invalid or missing API Key. Please verify the GOOGLE_GENAI_API_KEY environment variable.`);
        }

        // Handle model not found errors
         if (errorMsgLower.includes('model') && errorMsgLower.includes('not found')) {
             throw new Error(`Chatbot flow failed: The specified AI model was not found. Please check the model name in the flow definition.`);
         }

         // Handle resource exhausted (e.g., quota limits)
         if (error.status === 'RESOURCE_EXHAUSTED' || errorMsgLower.includes('quota')) {
             throw new Error(`Chatbot flow failed: API quota exceeded or resource limits reached. Please check your Google AI project quotas.`);
         }


        // Rethrow a generic error for other issues, including the original message
        throw new Error(`Chatbot flow failed during prompt execution: ${error.message || 'An unknown error occurred.'}`);
      }
    }
  );
} catch (error: any) {
  console.error("FATAL: Error defining chatbot flow:", error.message, error.stack);
  // Setting flow to null indicates a failure in definition.
  chatbotFlow = null;
}


// Wrapper function to call the flow - adding more detailed logging and pre-checks
export async function getChatbotResponse(input: ChatbotInput): Promise<ChatbotOutput> {
  // Check if the flow definition itself failed during initialization
  if (!chatbotFlow) {
    console.error("Cannot get chatbot response because the chatbot flow definition failed.");
    throw new Error("Chatbot flow is not available due to an initialization error.");
  }

   // Check AI configuration status again before invoking the flow
   if (!isAiConfigured()) {
        console.error("Attempted to call chatbot response, but AI is not configured. Missing GOOGLE_GENAI_API_KEY.");
        throw new Error("AI Service Unconfigured: Missing API Key. Cannot process request.");
   }


  console.log("Calling chatbotFlow with input:", JSON.stringify(input));
  try {
    const result = await chatbotFlow(input);
    console.log("Chatbot flow returned result:", JSON.stringify(result));
    return result;
  } catch (error: any) {
    // Log the error from *calling* the flow itself
    console.error("Error invoking chatbotFlow:", error.message, "Stack:", error.stack);
    // Rethrow the error to the caller (e.g., the React component)
    // Ensure the specific error message (like the API Key error) is propagated
    throw new Error(`Failed to get chatbot response: ${error.message || 'Unknown error during flow execution'}`);
  }
}
