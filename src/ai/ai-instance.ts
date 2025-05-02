
import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';

// Retrieve the API key from environment variables
const googleApiKey = process.env.GOOGLE_GENAI_API_KEY;

// Define a flag to track if the API key is validly configured
let isApiKeyConfigured = false;
let apiKeyStatusMessage = '';

// Check if the API key is present and log accordingly with enhanced instructions
if (!googleApiKey) {
  apiKeyStatusMessage = 'FATAL: GOOGLE_GENAI_API_KEY environment variable is not set.';
  console.error('==================== AI CONFIGURATION ERROR ====================');
  console.error(apiKeyStatusMessage);
  console.error('Genkit will be initialized with a placeholder key, and AI features WILL FAIL.');
  console.error('ACTION REQUIRED: Set the GOOGLE_GENAI_API_KEY in your .env file (or environment variables).');
  console.error('Example .env file content:');
  console.error('GOOGLE_GENAI_API_KEY=YOUR_ACTUAL_API_KEY_HERE');
  console.error('You can get a key from Google AI Studio: https://aistudio.google.com/app/apikey');
  console.error('================================================================');
} else if (googleApiKey === 'MISSING_API_KEY' || googleApiKey.trim() === '') {
   apiKeyStatusMessage = 'FATAL: GOOGLE_GENAI_API_KEY environment variable is set but appears to be invalid (empty or placeholder value "MISSING_API_KEY").';
   console.error('==================== AI CONFIGURATION ERROR ====================');
   console.error(apiKeyStatusMessage);
   console.error('Genkit will use this potentially invalid key, and AI features WILL LIKELY FAIL.');
   console.error('ACTION REQUIRED: Replace the placeholder value in your .env file (or environment variables) with a valid Google AI API key.');
     console.error('Example .env file content:');
   console.error('GOOGLE_GENAI_API_KEY=YOUR_ACTUAL_API_KEY_HERE');
   console.error('You can get a key from Google AI Studio: https://aistudio.google.com/app/apikey');
   console.error('================================================================');
} else {
  apiKeyStatusMessage = 'GOOGLE_GENAI_API_KEY found and appears valid.';
  console.log('AI Configuration: ' + apiKeyStatusMessage + ' Initializing Genkit with the provided key.');
  isApiKeyConfigured = true; // Mark as configured
}

// Initialize Genkit with the Google AI plugin
// Use the actual key if available, otherwise provide a placeholder to prevent immediate crashes during initialization.
// The placeholder allows the app to build/run but API calls will fail later if the key was missing.
console.log(`Initializing Genkit using key status: ${apiKeyStatusMessage}`);
export const ai = genkit({
  plugins: [
    googleAI({
      // Ensure a value is always passed, even if it's the placeholder
      apiKey: googleApiKey || 'MISSING_API_KEY',
    }),
  ],
  logLevel: 'debug', // Enable debug logging for more details
  enableTracing: true, // Recommended for debugging flows
});

// Post-initialization check and warning
if (!isApiKeyConfigured) {
   console.warn("==================== AI INITIALIZATION WARNING ====================");
   console.warn("Genkit initialized WITHOUT a valid GOOGLE_GENAI_API_KEY.");
   console.warn("All AI-related calls (like the chatbot) are expected to fail until a valid key is provided.");
   console.warn("See previous FATAL error messages for instructions on how to configure the API key.");
   console.warn("=================================================================");

} else {
   console.log("Genkit initialized successfully with the provided Google AI API key. AI features should be operational.");
}

// Export a helper function to check configuration status if needed elsewhere
export const isAiConfigured = () => isApiKeyConfigured;
