
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
    model: 'googleai/gemini-1.5-flash', // Use gemini-1.5-flash (stable and generally available)
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
  console.log("Chatbot prompt defined successfully.");
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
      // Check 1: Was the prompt definition successful during initialization?
      if (!prompt) {
        const initErrorMsg = "Chatbot flow cannot execute because the prompt definition failed during server initialization. Check server logs for 'FATAL: Error defining chatbot prompt'.";
        console.error(initErrorMsg);
        // Propagate a clear error indicating initialization failure
        throw new Error("Chatbot Service Error: Initialization failed (Prompt definition). Please check server logs.");
      }

      // Check 2: Is the AI (specifically the API key) configured correctly?
      if (!isAiConfigured()) {
          const configErrorMsg = "Chatbot flow cannot execute because AI is not configured. This usually means the GOOGLE_GENAI_API_KEY environment variable is missing or invalid. Check server startup logs.";
          console.error(configErrorMsg);
          // Throw a specific error indicating the configuration issue - this is caught by the frontend
          throw new Error("Chatbot flow failed: Invalid API Key. Please check your GOOGLE_GENAI_API_KEY.");
      }

      // If checks pass, attempt to execute the prompt
      try {
        // console.log("Executing chatbot prompt with input:", input);
        const llmResponse = await prompt(input);
        // console.log("LLM response received:", llmResponse);

        // Ensure output exists and has the 'reply' property before returning
        if (!llmResponse?.output?.reply) {
          console.error("Chatbot flow received invalid or missing output from LLM for query:", input.query, "Response object:", JSON.stringify(llmResponse));
          // Check for explicit errors in the response structure
          if (llmResponse && 'error' in llmResponse) {
             throw new Error(`Chatbot flow failed: LLM returned an error - ${llmResponse.error}`);
          }
          throw new Error(`Chatbot flow failed: Invalid or missing 'reply' in LLM output structure. Received: ${JSON.stringify(llmResponse)}`);
        }
        return llmResponse.output;

      } catch (error: any) {
        // Log the specific error during prompt execution
        console.error("Error executing chatbot prompt for query:", input.query, "Error:", error.message, "Stack:", error.stack);

        const errorMsgLower = error.message?.toLowerCase() || '';
        // Explicitly check for API key related errors from Google AI (most likely cause if isAiConfigured was true but call fails)
        if (
          errorMsgLower.includes('api key') ||
          errorMsgLower.includes('invalid key') ||
          errorMsgLower.includes('permission denied') ||
          errorMsgLower.includes('authentication failed') ||
          error.status === 'UNAUTHENTICATED' || // Check gRPC status if available
          (error.cause && (error.cause as any).message?.toLowerCase().includes('api key')) // Check nested cause
        ) {
           const apiKeyErrorMsg = "API Key Error detected during chatbot flow execution. The GOOGLE_GENAI_API_KEY provided is likely invalid or lacks permissions.";
           console.error(apiKeyErrorMsg);
           // Throw the specific error message caught by the frontend
           throw new Error(`Chatbot flow failed: Invalid API Key. Please check your GOOGLE_GENAI_API_KEY.`);
        }

        // Handle model not found errors
         if (errorMsgLower.includes('model') && (errorMsgLower.includes('not found') || errorMsgLower.includes('does not exist'))) {
             const modelNotFoundMsg = `Chatbot flow failed: The specified AI model ('${prompt.config?.model || 'unknown'}') was not found or is unavailable in your region.`;
             console.error(modelNotFoundMsg);
             throw new Error(modelNotFoundMsg);
         }

         // Handle resource exhausted (e.g., quota limits)
         if (error.status === 'RESOURCE_EXHAUSTED' || errorMsgLower.includes('quota')) {
             const quotaErrorMsg = `Chatbot flow failed: API quota exceeded or resource limits reached. Please check your Google AI project quotas.`;
             console.error(quotaErrorMsg);
             throw new Error(quotaErrorMsg);
         }

        // Rethrow a generic error for other issues, including the original message
        throw new Error(`Chatbot flow failed during prompt execution: ${error.message || 'An unknown error occurred.'}`);
      }
    }
  );
  console.log("Chatbot flow defined successfully.");
} catch (error: any) {
  console.error("FATAL: Error defining chatbot flow:", error.message, error.stack);
  // Setting flow to null indicates a failure in definition.
  chatbotFlow = null;
}


// Wrapper function to call the flow - adding more detailed logging and pre-checks
export async function getChatbotResponse(input: ChatbotInput): Promise<ChatbotOutput> {
  // Check 1: Was the flow definition successful during initialization?
  if (!chatbotFlow) {
    const initErrorMsg = "Cannot get chatbot response because the chatbot flow definition failed during server initialization. Check server logs for 'FATAL: Error defining chatbot flow'.";
    console.error(initErrorMsg);
    // Propagate a clear error indicating initialization failure
    throw new Error("Chatbot Service Error: Initialization failed (Flow definition). Please check server logs.");
  }

   // Check 2: Is the AI (specifically the API key) configured correctly? (Redundant check, but safe)
   if (!isAiConfigured()) {
        const configErrorMsg = "Attempted to call chatbot response, but AI is not configured. This usually means the GOOGLE_GENAI_API_KEY environment variable is missing or invalid. Check server startup logs.";
        console.error(configErrorMsg);
        // Throw the specific error caught by the frontend
        throw new Error("Chatbot flow failed: Invalid API Key. Please check your GOOGLE_GENAI_API_KEY.");
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
    throw new Error(`Failed to get chatbot response from flow: ${error.message || 'Unknown error during flow execution'}`);
  }
}
