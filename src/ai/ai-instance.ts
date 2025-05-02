
import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';

const googleApiKey = process.env.GOOGLE_GENAI_API_KEY;

if (!googleApiKey) {
  console.error(
    'FATAL: GOOGLE_GENAI_API_KEY environment variable is not set. AI features will not work.'
  );
  // Throwing an error here would break the build if the key isn't set during build time.
  // Let's proceed, but AI calls will fail later.
}

// Initialize Genkit with the Google AI plugin
export const ai = genkit({
  plugins: [
    googleAI({
      apiKey: googleApiKey || 'MISSING_API_KEY', // Provide a dummy key if missing to prevent immediate crash
    }),
  ],
  logLevel: 'debug', // Enable debug logging for more details
  enableTracing: true,
});

// Add a check after initialization (though this might not catch all init errors)
if (!googleApiKey) {
   console.warn("Genkit initialized with a dummy API key due to missing GOOGLE_GENAI_API_KEY. AI calls will fail.");
}

