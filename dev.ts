import { config } from 'dotenv';
config();

import '@/ai/flows/current-affairs-summarizer.ts';
import '@/ai/flows/ai-mcq-generation.ts';
import '@/ai/flows/personalized-study-recommendations.ts';
import '@/ai/flows/content-converter.ts';
