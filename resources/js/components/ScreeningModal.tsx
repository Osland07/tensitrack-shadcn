import React, { useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Check, X } from 'lucide-react';
import { cn } from "@/lib/utils";

// Define a type for RiskFactor as received from the backend
interface FaktorRisiko {
    kode: string;
    nama: string; // The backend passes 'name' as the question text
}

type UserAnswers = {
    [factCode: string]: boolean; // e.g., { 'E01': true, 'E02': false }
};

interface BackendResult {
    risk_name: string;
    explanation: string;
    full_description: string;
    suggestion: string;
}

interface ScreeningModalProps {
    isOpen: boolean;
    onClose: () => void;
    faktorRisiko: FaktorRisiko[]; // New prop
}

export default function ScreeningModal({ isOpen, onClose, faktorRisiko }: ScreeningModalProps) {
    const [step, setStep] = useState<'initial' | 'screening' | 'results'>('initial');
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [userAnswersData, setUserAnswersData] = useState<UserAnswers>({}); // Changed to store factCode => boolean
    const [backendResults, setBackendResults] = useState<BackendResult[] | null>(null); // To store results from backend
    const [isLoading, setIsLoading] = useState(false);

    const handleStart = () => {
        setStep('screening');
    };

    const handleAnswer = async (answer: boolean) => {
        const currentQuestion = faktorRisiko[currentQuestionIndex];
        
        // Store answer in userAnswersData
        const updatedUserAnswers = {
            ...userAnswersData,
            [currentQuestion.kode]: answer,
        };
        setUserAnswersData(updatedUserAnswers);

        if (currentQuestionIndex < faktorRisiko.length - 1) { // Use faktorRisiko.length
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            // Last question answered, submit to backend
            setIsLoading(true);
            try {
                const csrfToken = (document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement)?.content;

                const response = await fetch('/screening/submit', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRF-TOKEN': csrfToken,
                    },
                    body: JSON.stringify({ answers: updatedUserAnswers }),
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                
                if (data.success && data.results) {
                    setBackendResults(data.results);
                    setStep('results');
                } else {
                    throw new Error('Invalid data structure from server');
                }
            } catch (error) {
                console.error("Error submitting screening answers:", error); // Debug log
                setBackendResults([{
                    risk_name: "Error",
                    explanation: "Terjadi kesalahan saat mengirim jawaban.",
                    full_description: "Pastikan Anda terhubung ke internet.",
                    suggestion: "Coba ulangi skrining."
                }]);
                setStep('results');
            } finally {
                setIsLoading(false);
            }
        }
    };

    const restartScreening = () => {
        setCurrentQuestionIndex(0);
        setUserAnswersData({});
        setBackendResults(null);
        setStep('initial');
    };

    const handleClose = () => {
        restartScreening(); // Reset state when closing
        onClose();
    };

    const progressValue = ((currentQuestionIndex + 1) / faktorRisiko.length) * 100; // Use faktorRisiko.length

    const renderContent = () => {
        switch (step) {
            case 'screening':
                return (
                    <>
                        <DialogHeader className="p-6">
                            <DialogTitle className="text-center text-sm font-normal text-muted-foreground">
                                Pertanyaan {currentQuestionIndex + 1} dari {faktorRisiko.length}
                            </DialogTitle>
                            <Progress value={progressValue} className="w-full h-2" />
                        </DialogHeader>
                        <div className="px-6 py-8">
                            <p className="text-center text-2xl font-bold text-primary min-h-[100px] flex items-center justify-center">
                                {faktorRisiko[currentQuestionIndex].name} {/* Use name for text */}
                            </p>
                        </div>
                        <DialogFooter className="grid grid-cols-2 gap-0 mt-auto">
                            <Button variant="default" size="lg" className="h-20 text-lg font-bold rounded-none rounded-bl-lg" onClick={() => handleAnswer(false)}>
                                <X className="mr-2 h-6 w-6" /> Tidak
                            </Button>
                            <Button variant="secondary" size="lg" className="h-20 text-lg font-bold rounded-none rounded-br-lg" onClick={() => handleAnswer(true)}>
                                <Check className="mr-2 h-6 w-6" /> Ya
                            </Button>
                        </DialogFooter>
                    </>
                );
            case 'results':
                // Use backendResults instead of fake data
                const primaryResult = backendResults?.[0]; // Get the first result or null
                
                // Process detected facts from userAnswersData
                const detectedFacts = Object.entries(userAnswersData)
                                            .filter(([, answered]) => answered === true) // Filter by true answers
                                            .map(([code]) => {
                                                const question = faktorRisiko.find(q => q.code === code); // Find question from faktorRisiko
                                                return question ? question.name : `Fakta ${code}`; // Use name for text
                                            });

                // Determine color based on risk level from backendResults
                const riskColorClasses = {
                    "Rendah": "bg-green-100 border-green-500 text-green-800",
                    "Sedang": "bg-yellow-100 border-yellow-500 text-yellow-800",
                    "Tinggi": "bg-red-100 border-red-500 text-red-800",
                };
                const riskColor = primaryResult ? riskColorClasses[primaryResult.risk_name] || "bg-gray-100" : "bg-gray-100";


                return (
                    <>
                        <DialogHeader className="p-6 bg-gradient-to-r from-primary to-secondary text-center rounded-t-lg">
                            <DialogTitle className="text-2xl text-white">Hasil Skrining Anda</DialogTitle>
                        </DialogHeader>
                        
                        <div className="p-6 overflow-y-auto max-h-[60vh]">
                            {/* --- 1. Risk Level Section (Top) --- */}
                            <h3 className="text-base font-bold mb-2 text-center text-primary">Tingkat Risiko Anda</h3>
                            <div className={`text-center p-4 rounded-xl border-2 ${riskColor} mb-6`}>
                                <p className={`text-3xl font-bold mt-1`}>{primaryResult?.risk_name || 'Tidak Diketahui'}</p>
                                <p className={`mt-2 text-sm`}>{primaryResult?.explanation || 'Tidak ada penjelasan.'}</p>
                            </div>

                            {/* --- 2-Column Grid for Details --- */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* --- Left Column: Detected Facts --- */}
                                <div className="p-4 rounded-lg bg-muted">
                                    <h3 className="text-lg font-bold mb-4 text-center">Faktor Risiko Terdeteksi</h3>
                                    {detectedFacts.length > 0 ? (
                                        <ul className="space-y-2">
                                            {detectedFacts.map((factText, index) => (
                                                <li key={index} className="flex items-start text-sm">
                                                    <span className="flex items-center justify-center font-bold text-primary bg-primary/10 rounded-full h-5 w-5 text-xs flex-shrink-0 mr-3">
                                                        {index + 1}
                                                    </span>
                                                    <span>{factText}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <p className="text-center text-muted-foreground text-sm">Tidak ada faktor risiko terdeteksi berdasarkan jawaban Anda.</p>
                                    )}
                                </div>

                                {/* --- Right Column: Suggestions --- */}
                                <div className="p-4 rounded-lg bg-muted">
                                    <h3 className="text-lg font-bold mb-4 text-center">Saran Penatalaksanaan</h3>
                                    {primaryResult?.suggestion ? (
                                        <ul className="space-y-2">
                                            {primaryResult.suggestion.split('.').filter(s => s.trim() !== '').map((sug, index) => (
                                                <li key={index} className="flex items-start text-sm">
                                                    <Check className="h-4 w-4 text-primary mt-0.5 mr-2 flex-shrink-0" />
                                                    <span>{sug.trim()}.</span>
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <p className="text-center text-muted-foreground text-sm">Tidak ada saran khusus saat ini.</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        <DialogFooter className="p-4 pt-4 flex-col sm:flex-col sm:space-x-0 gap-2 border-t">
                             <p className="text-xs text-muted-foreground text-center">Ini bukan diagnosis medis. Konsultasikan dengan dokter untuk informasi lebih lanjut.</p>
                        </DialogFooter>
                    </>
                );
            case 'initial':
            default:
                return (
                    <>
                        <DialogHeader className="p-6 bg-gradient-to-r from-primary to-secondary rounded-t-lg text-left">
                            <DialogTitle className="text-2xl font-bold text-white">Mulai Skrining Risiko Hipertensi?</DialogTitle>
                        </DialogHeader>
                        <div className="p-6">
                            <DialogDescription className="text-base text-muted-foreground">
                                <p className="mb-4">Anda akan memulai proses skrining untuk mendeteksi risiko hipertensi. Proses ini terdiri dari beberapa langkah:</p>
                                <ul className="list-disc list-inside space-y-2">
                                    <li>Anda akan menjawab <strong>11 pertanyaan</strong> singkat terkait gaya hidup dan riwayat kesehatan.</li>
                                    <li>Jawablah setiap pertanyaan dengan <strong>jujur</strong> untuk hasil yang akurat.</li>
                                    <li>Hasil skrining ini <strong>bukanlah diagnosis medis</strong>, namun sebagai langkah awal deteksi dini.</li>
                                </ul>
                            </DialogDescription>
                        </div>
                        <DialogFooter className="p-6 pt-0">
                            <Button variant="outline" onClick={handleClose}>Batal</Button>
                            <Button onClick={handleStart}>Lanjutkan</Button>
                        </DialogFooter>
                    </>
                );
        }
    };
    
    // --- Dynamic Class for Modal Width ---
    const dialogWidthClass = {
        initial: "sm:max-w-lg",
        screening: "sm:max-w-lg",
        results: "sm:max-w-4xl",
    }[step];

    return (
        <Dialog open={isOpen} onOpenChange={handleClose}>
            <DialogContent 
                className={cn("p-0 mt-8", dialogWidthClass)} 
                onInteractOutside={(e) => { e.preventDefault(); }}
            >
                {renderContent()}
            </DialogContent>
        </Dialog>
    );
}