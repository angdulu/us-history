import { useState, useMemo, useEffect } from 'react';
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
  GraduationCap,
  Bookmark,
  BookmarkCheck,
  Grid3X3,
  X,
  Search
} from 'lucide-react';
import initialQuestions from './data/questions.json';
import { Question } from './types';

export default function App() {
  const [questions] = useState<Question[]>(initialQuestions as Question[]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedChoiceId, setSelectedChoiceId] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [bookmarks, setBookmarks] = useState<string[]>(() => {
    const saved = localStorage.getItem('apush_bookmarks');
    return saved ? JSON.parse(saved) : [];
  });
  const [isJumpMenuOpen, setIsJumpMenuOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('apush_bookmarks', JSON.stringify(bookmarks));
  }, [bookmarks]);

  const currentQuestion = questions[currentIndex];

  const handleChoiceSelect = (id: string) => {
    if (showExplanation) return;
    setSelectedChoiceId(id);
    setShowExplanation(true);
  };

  const nextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      goToQuestion(currentIndex + 1);
    }
  };

  const prevQuestion = () => {
    if (currentIndex > 0) {
      goToQuestion(currentIndex - 1);
    }
  };

  const goToQuestion = (index: number) => {
    setCurrentIndex(index);
    setSelectedChoiceId(null);
    setShowExplanation(false);
    setIsJumpMenuOpen(false);
  };

  const toggleBookmark = (id: string) => {
    setBookmarks(prev => 
      prev.includes(id) ? prev.filter(bid => bid !== id) : [...prev, id]
    );
  };

  const isBookmarked = (id: string) => bookmarks.includes(id);

  const [showBookmarksOnly, setShowBookmarksOnly] = useState(false);

  const filteredQuestions = useMemo(() => {
    return questions
      .map((q, idx) => ({ ...q, originalIdx: idx }))
      .filter(q => !showBookmarksOnly || isBookmarked(q.id));
  }, [questions, showBookmarksOnly, bookmarks]);

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

          <div className="flex items-center gap-4 md:gap-6">
            <button 
              onClick={() => setIsJumpMenuOpen(true)}
              className="flex items-center gap-2 px-4 py-2 bg-neutral-100 dark:bg-neutral-900 rounded-full border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors"
            >
               <Grid3X3 size={14} className="text-neutral-500" />
               <span className="text-xs font-bold text-neutral-500">{currentIndex + 1} / {questions.length}</span>
            </button>
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
                  <header className="mb-6 pb-6 border-b border-neutral-100 dark:border-neutral-800 flex justify-between items-start gap-4">
                    <div>
                      <h3 className="text-lg font-bold leading-tight mb-1">{currentQuestion.stimulus.sourceTitle}</h3>
                      <p className="text-xs text-neutral-500">{currentQuestion.stimulus.attribution}</p>
                    </div>
                    <button 
                      onClick={() => toggleBookmark(currentQuestion.id)}
                      className={`p-2 rounded-xl transition-all ${
                        isBookmarked(currentQuestion.id) 
                          ? 'bg-amber-100 text-amber-600 dark:bg-amber-900/40 dark:text-amber-400 shadow-sm' 
                          : 'bg-neutral-50 text-neutral-400 dark:bg-neutral-800/50 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                      }`}
                    >
                      {isBookmarked(currentQuestion.id) ? <BookmarkCheck size={20} /> : <Bookmark size={20} />}
                    </button>
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

      {/* Jump Menu Overlay */}
      <AnimatePresence>
        {isJumpMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsJumpMenuOpen(false)}
              className="fixed inset-0 bg-neutral-950/40 backdrop-blur-sm z-[100]"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl bg-white dark:bg-neutral-900 rounded-[40px] shadow-2xl z-[101] overflow-hidden"
            >
              <div className="p-8 border-b border-neutral-100 dark:border-neutral-800 flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold tracking-tight">Jump to Question</h2>
                  <p className="text-xs text-neutral-500 font-medium">Quickly navigate through all stimulus-based questions</p>
                </div>
                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => setShowBookmarksOnly(!showBookmarksOnly)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl border transition-all ${
                      showBookmarksOnly 
                        ? 'bg-amber-50 border-amber-200 text-amber-600 dark:bg-amber-900/40 dark:border-amber-800/50 dark:text-amber-400 font-bold' 
                        : 'bg-neutral-50 border-neutral-200 text-neutral-500 dark:bg-neutral-800/50 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                    }`}
                  >
                    <BookmarkCheck size={14} />
                    <span className="text-xs">Bookmarks Only</span>
                  </button>
                  <button 
                    onClick={() => setIsJumpMenuOpen(false)}
                    className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-xl transition-colors"
                  >
                    <X size={24} />
                  </button>
                </div>
              </div>

              <div className="p-8 max-h-[60vh] overflow-y-auto scrollbar-hide">
                {filteredQuestions.length === 0 ? (
                  <div className="py-12 flex flex-col items-center justify-center text-neutral-400 dark:text-neutral-600">
                    <Bookmark size={40} className="mb-4 opacity-20" />
                    <p className="text-sm font-medium">No bookmarked questions yet</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-5 md:grid-cols-8 gap-3">
                    {filteredQuestions.map((q) => (
                      <button
                        key={q.id}
                        onClick={() => goToQuestion(q.originalIdx)}
                        className={`aspect-square rounded-2xl flex flex-col items-center justify-center transition-all relative ${
                          currentIndex === q.originalIdx
                            ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20'
                            : isBookmarked(q.id)
                              ? 'bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 border border-amber-100 dark:border-amber-800/50'
                              : 'bg-neutral-50 dark:bg-neutral-800/50 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-600 dark:text-neutral-400 border border-transparent'
                        }`}
                      >
                        <span className="text-sm font-bold">{q.originalIdx + 1}</span>
                        {isBookmarked(q.id) && (
                          <div className="absolute top-1 right-1">
                            <BookmarkCheck size={10} className={currentIndex === q.originalIdx ? 'text-blue-100' : 'text-amber-500'} />
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="p-8 bg-neutral-50 dark:bg-neutral-800/50 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between">
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-blue-600" />
                    <span className="text-[10px] font-bold text-neutral-500 uppercase">Current</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-amber-400" />
                    <span className="text-[10px] font-bold text-neutral-500 uppercase">Bookmarked</span>
                  </div>
                </div>
                <button 
                  onClick={() => {
                    const firstBookmarked = questions.findIndex(q => isBookmarked(q.id));
                    if (firstBookmarked !== -1) goToQuestion(firstBookmarked);
                  }}
                  disabled={bookmarks.length === 0}
                  className="flex items-center gap-2 text-xs font-bold text-blue-600 dark:text-blue-400 disabled:opacity-30"
                >
                  Go to first bookmark
                  <ArrowRight size={14} />
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
