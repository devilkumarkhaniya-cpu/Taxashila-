
/**
 * @fileOverview Static syllabus data for the Study Material library. 
 * Focuses only on main subjects for a dynamic link-based system.
 */

import { 
  BrainCircuit, 
  BookOpen, 
  ScrollText, 
  Globe, 
  FileSearch,
} from 'lucide-react';

export const textbookContent: Record<string, string> = {};

export const masterSyllabus = [
  {
    id: "reasoning",
    title: "Reasoning & Data Interpretation",
    icon: BrainCircuit,
    color: "bg-purple-100 text-purple-700",
    topics: [] // Removed static sub-topics
  },
  {
    id: "aptitude",
    title: "Quantitative Aptitude",
    icon: BookOpen,
    color: "bg-blue-100 text-blue-700",
    topics: [] 
  },
  {
    id: "constitution",
    title: "Constitution of India",
    icon: ScrollText,
    color: "bg-orange-100 text-orange-700",
    topics: []
  },
  {
    id: "current-affairs",
    title: "Current Affairs",
    icon: Globe,
    color: "bg-emerald-100 text-emerald-700",
    topics: []
  },
  {
    id: "comprehension",
    title: "Comprehension (Gujarati)",
    icon: FileSearch,
    color: "bg-red-100 text-red-700",
    topics: []
  }
];
