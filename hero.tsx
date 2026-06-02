
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, CheckCircle2, Star, Users, Award, BookOpen, PlayCircle } from 'lucide-react'
import Image from 'next/image'

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-16 pb-20 lg:pt-24 lg:pb-32 bg-gradient-to-br from-background to-primary/5">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="max-w-2xl animate-in fade-in slide-in-from-left duration-1000">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary-foreground border border-primary/20 mb-8 shadow-sm">
              <Star className="h-4 w-4 fill-primary text-primary" />
              <span className="text-xs font-black uppercase tracking-widest">Welcome to Takshashila</span>
            </div>
            <h1 className="text-6xl lg:text-8xl font-black tracking-tighter leading-[1] mb-8 font-headline text-foreground">
              Learn Today, <br />
              <span className="text-primary">Lead Tomorrow</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-10 leading-relaxed max-w-lg font-medium">
              Discover quality courses, learn new skills and achieve your goals with the best online competitive exam platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-6">
              <Button asChild size="lg" className="h-14 px-10 text-xl font-black bg-primary text-primary-foreground hover:bg-primary/90 shadow-2xl shadow-primary/20 rounded-2xl group">
                <Link href="/pdfs" className="flex items-center">
                  Explore Courses <ArrowRight className="ml-2 h-6 w-6 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="h-14 px-10 text-xl font-black border-2 rounded-2xl hover:bg-background group">
                <Link href="/mock-tests" className="flex items-center">
                  <PlayCircle className="mr-2 h-6 w-6 text-primary group-hover:scale-110 transition-transform" />
                  Start Mock Test
                </Link>
              </Button>
            </div>
            <div className="mt-12 flex items-center gap-6 p-4 bg-background/50 backdrop-blur rounded-[2rem] border w-fit">
               <div className="flex -space-x-4">
                 {[1,2,3,4].map(i => (
                   <div key={i} className="h-12 w-12 rounded-full border-4 border-background overflow-hidden">
                     <Image src={`https://picsum.photos/seed/${i+10}/100/100`} alt="user" width={100} height={100} />
                   </div>
                 ))}
                 <div className="h-12 w-12 rounded-full border-4 border-background bg-primary flex items-center justify-center text-primary-foreground font-black text-xs">+</div>
               </div>
               <div>
                 <p className="text-sm font-black">Join 50,000+ learners</p>
                 <p className="text-xs text-muted-foreground font-bold uppercase tracking-tighter">growing their skills</p>
               </div>
            </div>
          </div>
          <div className="relative animate-in fade-in slide-in-from-right duration-1000">
            <div className="relative z-10 rounded-[4rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] border-[12px] border-white dark:border-zinc-800 transform hover:rotate-1 transition-transform duration-700">
              <Image 
                src="https://picsum.photos/seed/takshashila-main/1200/900" 
                alt="Student studying with Takshashila" 
                width={1200} 
                height={900}
                className="object-cover"
                data-ai-hint="student study"
                priority
              />
            </div>
            
            <div className="absolute top-10 -left-10 z-20 bg-white dark:bg-zinc-900 p-5 rounded-3xl shadow-2xl border border-primary/10 animate-bounce-slow">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-2xl bg-blue-100 flex items-center justify-center">
                  <BookOpen className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-lg font-black leading-none">1000+</p>
                  <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Courses</p>
                </div>
              </div>
            </div>

            <div className="absolute bottom-20 -right-10 z-20 bg-white dark:bg-zinc-900 p-5 rounded-3xl shadow-2xl border border-primary/10">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-2xl bg-yellow-100 flex items-center justify-center">
                  <Star className="h-6 w-6 text-yellow-600" />
                </div>
                <div>
                  <p className="text-lg font-black leading-none">4.8/5</p>
                  <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Student Rating</p>
                </div>
              </div>
            </div>

            <div className="absolute top-1/2 -right-8 transform -translate-y-1/2 z-20 bg-white dark:bg-zinc-900 p-5 rounded-3xl shadow-2xl border border-primary/10">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-2xl bg-green-100 flex items-center justify-center">
                  <Users className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-lg font-black leading-none">Expert</p>
                  <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Instructors</p>
                </div>
              </div>
            </div>

            <div className="absolute -top-20 -right-20 h-64 w-64 bg-primary/20 blur-[100px] rounded-full -z-10"></div>
            <div className="absolute -bottom-20 -left-20 h-64 w-64 bg-blue-500/10 blur-[100px] rounded-full -z-10"></div>
          </div>
        </div>

        <div className="mt-32 grid grid-cols-2 md:grid-cols-4 gap-8 p-8 bg-background border shadow-2xl rounded-[3rem]">
          {[
            { icon: BookOpen, title: "Diverse Courses", desc: "Choose from 100+ topics", color: "text-blue-500", bg: "bg-blue-50" },
            { icon: Users, title: "Expert Teachers", desc: "Learn from top rankers", color: "text-green-500", bg: "bg-green-50" },
            { icon: Award, title: "Learn Anywhere", desc: "Study at your own pace", color: "text-purple-500", bg: "bg-purple-50" },
            { icon: CheckCircle2, title: "Certificates", desc: "Boost your credentials", color: "text-orange-500", bg: "bg-orange-50" }
          ].map((f, i) => (
            <div key={i} className="flex items-center gap-4 group">
              <div className={`h-12 w-12 rounded-2xl ${f.bg} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform`}>
                <f.icon className={`h-6 w-6 ${f.color}`} />
              </div>
              <div>
                <p className="text-sm font-black">{f.title}</p>
                <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-tight">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
