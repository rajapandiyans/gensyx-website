
import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';

// Retrieve the API key from environment variables
const googleApiKey = process.env.GOOGLE_GENAI_API_KEY;

// Define a flag to track if the API key is validly configured
let isApiKeyConfigured = false;
let apiKeyStatusMessage = '';

// Check if the API key is present and log accordingly
if (!googleApiKey) {
  apiKeyStatusMessage = 'FATAL: GOOGLE_GENAI_API_KEY environment variable is not set.';
  console.error(apiKeyStatusMessage + ' Genkit will be initialized with a placeholder key, and AI features WILL FAIL.');
} else if (googleApiKey === 'MISSING_API_KEY' || googleApiKey.trim() === '') {
   apiKeyStatusMessage = 'FATAL: GOOGLE_GENAI_API_KEY environment variable is set but appears to be invalid (empty or placeholder).';
   console.error(apiKeyStatusMessage + ' Genkit will use this potentially invalid key, and AI features WILL LIKELY FAIL.');
} else {
  apiKeyStatusMessage = 'GOOGLE_GENAI_API_KEY found and appears valid.';
  console.log(apiKeyStatusMessage + ' Initializing Genkit with the provided key.');
  isApiKeyConfigured = true; // Mark as configured
}

// Initialize Genkit with the Google AI plugin
// Use the actual key if available, otherwise provide a placeholder to prevent immediate crashes during initialization.
// The placeholder allows the app to build/run but API calls will fail later if the key was missing.
console.log(`Initializing Genkit using key status: ${apiKeyStatusMessage}`);
export const ai = genkit({
  plugins: [
    googleAI({
      apiKey: googleApiKey || 'MISSING_API_KEY', // Use placeholder if key is missing/invalid
    }),
  ],
  logLevel: 'debug', // Enable debug logging for more details
  enableTracing: true, // Recommended for debugging flows
});

// Post-initialization check and warning
if (!isApiKeyConfigured) {
   console.warn("Genkit initialized WITHOUT a valid GOOGLE_GENAI_API_KEY. All AI-related calls are expected to fail until a valid key is provided in the environment variables and the server is restarted.");
} else {
   console.log("Genkit initialized successfully with the provided Google AI API key.");
}

// Export a helper function to check configuration status if needed elsewhere
export const isAiConfigured = () => isApiKeyConfigured;
