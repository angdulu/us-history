import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronRight, 
  ChevronLeft, 
  History, 
  Sparkles,
  BookOpen,
  ArrowRight,
  CheckCircle2,
  XCircle,
  FileText,
  Clock,
  Target,
  GraduationCap
} from 'lucide-react';
import initialQuestions from './data/questions.json';
import { Question } from './types';

export default function App() {
  const [questions] = useState<Question[]>(initialQuestions as Question[]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedChoiceId, setSelectedChoiceId] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);

  const currentQuestion = questions[currentIndex];

  const handleChoiceSelect = (id: string) => {
    if (showExplanation) return;
    setSelectedChoiceId(id);
    setShowExplanation(true);
  };

  const nextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedChoiceId(null);
      setShowExplanation(false);
    }
  };

  const prevQuestion = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setSelectedChoiceId(null);
      setShowExplanation(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] dark:bg-[#0A0A0B] text-[#1D1D1F] dark:text-[#F5F5F7] font-sans selection:bg-blue-100 dark:selection:bg-blue-900/30">
      {/* Background patterns */}
      <div className="fixed inset-0 pointer-events-none opacity-20 dark:opacity-10">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-400 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-400 blur-[120px] rounded-full" />
      </div>

      <header className="sticky top-0 z-50 bg-white/70 dark:bg-[#0A0A0B]/70 backdrop-blur-xl border-b border-neutral-200 dark:border-neutral-800">
        <div className="max-w-5xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
              <History className="text-white" size={20} />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight">APUSH QUEST</h1>
              <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Stimulus-based Practice</p>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="hidden md:flex items-center gap-3 px-4 py-2 bg-neutral-100 dark:bg-neutral-900 rounded-full border border-neutral-200 dark:border-neutral-800">
               <span className="text-xs font-bold text-neutral-500">{currentIndex + 1} / {questions.length} Questions</span>
            </div>
            <button className="p-2.5 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 rounded-xl shadow-xl hover:scale-105 active:scale-95 transition-all">
              <Sparkles size={18} />
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-12 relative z-10">
        <AnimatePresence mode="wait">
          {!currentQuestion ? (
            <motion.div 
              key="empty"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              className="aspect-video flex flex-col items-center justify-center border-2 border-dashed border-neutral-200 dark:border-neutral-800 rounded-[40px] bg-white dark:bg-neutral-900 shadow-sm"
            >
              <BookOpen size={64} className="text-neutral-200 dark:text-neutral-800 mb-6" />
              <h2 className="text-xl font-bold mb-2">Ready to start?</h2>
              <p className="text-neutral-500 text-center max-w-sm px-8">Generate difficult stimulus-based questions for your AP US History exam prep.</p>
            </motion.div>
          ) : (
            <motion.div 
              key={currentQuestion.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-10"
            >
              {/* Stimulus Section */}
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 px-3 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-lg border border-blue-100 dark:border-blue-800/50">
                    <FileText size={14} />
                    <span className="text-[10px] font-black uppercase tracking-widest">Document</span>
                  </div>
                  <div className="text-[10px] font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-widest flex items-center gap-2">
                    <Clock size={12} />
                    {currentQuestion.period}
                  </div>
                </div>

                <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-[32px] p-8 shadow-sm">
                  <header className="mb-6 pb-6 border-b border-neutral-100 dark:border-neutral-800">
                    <h3 className="text-lg font-bold leading-tight mb-1">{currentQuestion.stimulus.sourceTitle}</h3>
                    <p className="text-xs text-neutral-500">{currentQuestion.stimulus.attribution}</p>
                  </header>
                  <div className="prose dark:prose-invert max-w-none">
                    <p className="text-[15px] leading-relaxed text-neutral-700 dark:text-neutral-300 italic whitespace-pre-wrap">
                      {currentQuestion.stimulus.content}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                   <div className="flex-1 px-4 py-3 bg-neutral-100 dark:bg-neutral-900 rounded-2xl flex items-center gap-3">
                      <Target size={16} className="text-neutral-400" />
                      <span className="text-[11px] font-bold text-neutral-500">{currentQuestion.historicalThinkingSkill}</span>
                   </div>
                </div>
              </div>

              {/* Question Section */}
              <div className="space-y-6">
                <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-[32px] p-8 shadow-sm flex flex-col h-full">
                  <div className="mb-8">
                    <div className="flex items-center gap-2 text-rose-500 dark:text-rose-400 mb-3">
                      <GraduationCap size={16} />
                      <span className="text-[11px] font-black uppercase tracking-widest">Question</span>
                    </div>
                    <h2 className="text-xl font-bold leading-snug">
                       {currentQuestion.questionText}
                    </h2>
                  </div>

                  <div className="space-y-3 mb-8">
                    {currentQuestion.choices.map((choice: any) => (
                      <button
                        key={choice.id}
                        onClick={() => handleChoiceSelect(choice.id)}
                        disabled={showExplanation}
                        className={`w-full p-5 rounded-2xl border-2 text-left transition-all relative flex items-center justify-between ${
                          selectedChoiceId === choice.id 
                            ? choice.isCorrect 
                              ? 'bg-emerald-50 dark:bg-emerald-950/20 border-emerald-500 text-emerald-700 dark:text-emerald-400' 
                              : 'bg-rose-50 dark:bg-rose-950/20 border-rose-500 text-rose-700 dark:text-rose-400'
                            : showExplanation && choice.isCorrect
                              ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/20 text-emerald-700 dark:text-emerald-400'
                              : 'bg-neutral-50 dark:bg-neutral-800/50 border-transparent hover:border-neutral-300 dark:hover:border-neutral-700'
                        }`}
                      >
                        <span className="font-medium text-[15px]">{choice.text}</span>
                        {showExplanation && choice.isCorrect && <CheckCircle2 size={18} className="text-emerald-500 shrink-0 ml-3" />}
                        {showExplanation && selectedChoiceId === choice.id && !choice.isCorrect && <XCircle size={18} className="text-rose-500 shrink-0 ml-3" />}
                      </button>
                    ))}
                  </div>

                  <AnimatePresence>
                    {showExplanation && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-6 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 rounded-2xl mb-8"
                      >
                         <h4 className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest mb-3 opacity-60">
                           <FileText size={12} />
                           Explanation
                         </h4>
                         <p className="text-[13px] leading-relaxed font-medium">
                           {currentQuestion.choices.find((c: any) => c.id === selectedChoiceId)?.explanation || "Review the stimulus and options carefully."}
                         </p>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="mt-auto pt-6 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={prevQuestion}
                        disabled={currentIndex === 0}
                        className="p-3 bg-neutral-100 dark:bg-neutral-800 rounded-xl disabled:opacity-30 disabled:cursor-not-allowed hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
                      >
                        <ChevronLeft size={20} />
                      </button>
                      <button 
                        onClick={nextQuestion}
                        disabled={currentIndex === questions.length - 1}
                        className="p-3 bg-neutral-100 dark:bg-neutral-800 rounded-xl disabled:opacity-30 disabled:cursor-not-allowed hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
                      >
                        <ChevronRight size={20} />
                      </button>
                    </div>

                    <button 
                      onClick={nextQuestion}
                      disabled={!showExplanation || currentIndex === questions.length - 1}
                      className="px-6 py-3 bg-blue-600 dark:bg-blue-500 text-white rounded-xl font-bold flex items-center gap-2 disabled:opacity-50 disabled:grayscale transition-all shadow-lg shadow-blue-500/25"
                    >
                      Next Question
                      <ArrowRight size={18} />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
