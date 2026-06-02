
'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { useFirestore } from '@/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';
import { Mail, Sparkles, Loader2, Send } from 'lucide-react';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';

export function Newsletter() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const db = useFirestore();
  const { toast } = useToast();

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!db || !email) return;

    setLoading(true);
    const subscriberData = {
      email,
      subscribedAt: serverTimestamp(),
    };

    try {
      await addDoc(collection(db, 'subscribers'), subscriberData);
      toast({
        title: "તમે જોડાઈ ગયા છો! 🎉",
        description: "અમે તમને પરીક્ષાની મહત્વની અપડેટ મોકલતા રહીશું.",
      });
      setEmail('');
    } catch (err: any) {
      const permissionError = new FirestorePermissionError({
        path: 'subscribers',
        operation: 'create',
        requestResourceData: subscriberData,
      });
      errorEmitter.emit('permission-error', permissionError);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-24 bg-primary/5">
      <div className="container mx-auto px-4">
        <Card className="max-w-4xl mx-auto border-none shadow-2xl rounded-[3rem] overflow-hidden bg-foreground text-background relative">
          <div className="absolute top-0 right-0 p-8 opacity-5">
            <Mail className="h-64 w-64 text-primary" />
          </div>
          <CardContent className="p-12 md:p-20 relative z-10 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary border border-primary/20 mb-8">
              <Sparkles className="h-4 w-4" />
              <span className="text-[10px] font-black uppercase tracking-widest">Study Circle Updates</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-black font-headline mb-6 tracking-tighter uppercase leading-none">
              નવી અપડેટ સીધી તમારા <span className="text-primary">ઇમેઇલ પર!</span>
            </h2>
            <p className="text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto mb-12 font-medium">
              મટીરીયલ, પરીક્ષાની જાહેરાત અને ફ્રી મોક ટેસ્ટની માહિતી મેળવવા માટે અત્યારે જ સબ્સ્ક્રાઇબ કરો.
            </p>
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
              <Input 
                type="email" 
                placeholder="તમારો ઇમેઇલ નાખો" 
                className="h-16 rounded-2xl border-2 bg-zinc-900 border-zinc-800 text-white px-6 font-bold"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Button 
                type="submit" 
                disabled={loading}
                className="h-16 px-10 bg-primary text-primary-foreground font-black text-xl rounded-2xl shadow-xl shadow-primary/20 hover:scale-105 transition-all shrink-0"
              >
                {loading ? <Loader2 className="animate-spin" /> : <><Send className="mr-2 h-5 w-5" /> JOIN</>}
              </Button>
            </form>
            <p className="mt-8 text-[10px] text-zinc-500 font-bold uppercase tracking-widest">
              અમે ક્યારેય સ્પામ નથી મોકલતા. ગમે ત્યારે અનસબ્સ્ક્રાઇબ કરી શકાય છે.
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
