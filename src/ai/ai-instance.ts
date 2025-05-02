
import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';

// Retrieve the API key from environment variables
const googleApiKey = process.env.GOOGLE_GENAI_API_KEY;

// Define a flag to track if the API key is validly configured
let isApiKeyConfigured = false;

// Check if the API key is present and log accordingly
if (!googleApiKey) {
  console.error(
    'FATAL: GOOGLE_GENAI_API_KEY environment variable is not set. Genkit will be initialized with a dummy key, and AI features WILL FAIL. Please set the environment variable.'
  );
  // No need to throw here, let initialization proceed with a dummy key, but log the failure clearly.
} else if (googleApiKey === 'MISSING_API_KEY' || googleApiKey.trim() === '') {
   console.error(
    'FATAL: GOOGLE_GENAI_API_KEY environment variable is set but appears to be invalid (empty or placeholder). Genkit will use this potentially invalid key, and AI features WILL LIKELY FAIL. Please provide a valid API key.'
  );
   // Proceed with the potentially invalid key, but warn user.
}
else {
  console.log('GOOGLE_GENAI_API_KEY found. Initializing Genkit with the provided key.');
  isApiKeyConfigured = true; // Mark as configured
}

// Initialize Genkit with the Google AI plugin
// Use the actual key if available, otherwise provide a placeholder to prevent immediate crashes during initialization.
// The placeholder allows the app to build/run but API calls will fail later if the key was missing.
export const ai = genkit({
  plugins: [
    googleAI({
      apiKey: googleApiKey || 'MISSING_API_KEY',
    }),
  ],
  logLevel: 'debug', // Enable debug logging for more details
  enableTracing: true, // Recommended for debugging flows
});

// Post-initialization check and warning
if (!isApiKeyConfigured) {
   console.warn("Genkit initialized WITHOUT a valid GOOGLE_GENAI_API_KEY. All AI-related calls are expected to fail until a valid key is provided in the environment variables.");
} else {
   console.log("Genkit initialized successfully with the provided Google AI API key.");
}

// Export a helper function to check configuration status if needed elsewhere
export const isAiConfigured = () => isApiKeyConfigured;
