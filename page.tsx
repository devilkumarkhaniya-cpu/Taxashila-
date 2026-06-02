
"use client"

import React from 'react'
import { Navbar } from '@/components/navigation/navbar'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { TrendingUp, Award, BookOpen, FileText, Globe, Zap, Target, BrainCircuit } from 'lucide-react'
import Link from 'next/link'

const categories = [
  {
    title: "Quantitative Aptitude",
    icon: TrendingUp,
    color: "bg-blue-100 text-blue-600",
    topics: ["Arithmetic", "Advanced Maths", "Data Interpretation", "Geometry", "Trigonometry"]
  },
  {
    title: "Reasoning Ability",
    icon: BrainCircuit,
    color: "bg-purple-100 text-purple-600",
    topics: ["Verbal Reasoning", "Non-Verbal", "Logical Deduction", "Puzzles", "Critical Reasoning"]
  },
  {
    title: "English Language",
    icon: BookOpen,
    color: "bg-green-100 text-green-600",
    topics: ["Grammar", "Vocabulary", "Comprehension", "Para-jumbles", "Cloze Test"]
  },
  {
    title: "General Knowledge",
    icon: Globe,
    color: "bg-orange-100 text-orange-600",
    topics: ["History", "Geography", "Polity", "Economics", "Static GK"]
  }
]

export default function SubjectsPage() {
  return (
    <div className="min-h-screen bg-secondary/10">
      <Navbar />
      <main className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <Badge className="bg-primary text-primary-foreground font-black uppercase mb-4 px-4 py-1">Course Catalog</Badge>
          <h1 className="text-4xl md:text-6xl font-black font-headline mb-6">Master Every <span className="text-primary">Subject</span></h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">Structured learning paths designed by top rankers for targeted results.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {categories.map((cat) => (
            <Card key={cat.title} className="border-none shadow-xl overflow-hidden group hover:scale-[1.02] transition-transform">
              <CardHeader className="flex flex-row items-start gap-4 p-8">
                <div className={`h-14 w-14 rounded-2xl flex items-center justify-center shrink-0 ${cat.color}`}>
                  <cat.icon className="h-7 w-7" />
                </div>
                <div>
                  <CardTitle className="text-2xl font-black font-headline mb-2">{cat.title}</CardTitle>
                  <CardDescription className="text-sm font-medium">100+ Hours of video & 5000+ Practice Questions</CardDescription>
                </div>
              </CardHeader>
              <CardContent className="px-8 pb-8">
                <div className="flex flex-wrap gap-2 mb-8">
                  {cat.topics.map(topic => (
                    <span key={topic} className="px-3 py-1 bg-secondary rounded-full text-xs font-bold text-muted-foreground">
                      {topic}
                    </span>
                  ))}
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <Button asChild className="bg-primary text-primary-foreground font-bold">
                    <Link href="/mock-tests">Practice MCQs</Link>
                  </Button>
                  <Button asChild variant="outline" className="border-2 font-bold hover:bg-foreground hover:text-background">
                    <Link href="/pdfs">Study Notes</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <section className="mt-24 bg-foreground text-background rounded-3xl p-12 relative overflow-hidden">
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="max-w-xl">
              <h2 className="text-3xl md:text-5xl font-black font-headline leading-tight mb-6">
                Not sure where to <span className="text-primary">start?</span>
              </h2>
              <p className="text-zinc-400 text-lg mb-8">
                Take our 10-minute diagnostic test to identify your strengths and weaknesses. Our AI will build a custom study plan for you.
              </p>
              <Button size="lg" className="bg-primary text-primary-foreground font-black px-10 h-14 text-lg">
                Start Diagnostic Test
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-6 bg-zinc-800 rounded-2xl text-center">
                <Target className="h-8 w-8 text-primary mx-auto mb-2" />
                <p className="text-2xl font-black">95%</p>
                <p className="text-[10px] font-bold uppercase text-zinc-500">Accuracy boost</p>
              </div>
              <div className="p-6 bg-zinc-800 rounded-2xl text-center">
                <Zap className="h-8 w-8 text-primary mx-auto mb-2" />
                <p className="text-2xl font-black">2x</p>
                <p className="text-[10px] font-bold uppercase text-zinc-500">Faster solving</p>
              </div>
            </div>
          </div>
          <div className="absolute top-0 right-0 h-full w-1/3 bg-primary/5 blur-3xl rounded-full" />
        </section>
      </main>
    </div>
  )
}
