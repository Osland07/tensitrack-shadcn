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

// --- Fake Data ---
const screeningQuestions = [
    { id: 1, text: "Apakah Anda memiliki riwayat keluarga dengan penyakit hipertensi?" },
    { id: 2, text: "Apakah Anda sering mengonsumsi makanan asin atau tinggi garam?" },
    { id: 3, text: "Apakah Anda jarang mengonsumsi buah dan sayuran?" },
    { id: 4, text: "Apakah Anda sering mengonsumsi makanan olahan atau cepat saji?" },
    { id: 5, text: "Apakah Anda memiliki kebiasaan merokok?" },
    { id: 6, text: "Apakah Anda sering mengonsumsi minuman beralkohol?" },
    { id: 7, text: "Apakah Anda jarang berolahraga (kurang dari 3 kali seminggu)?" },
    { id: 8, text: "Apakah Anda memiliki berat badan berlebih (obesitas)?" },
    { id: 9, text: "Apakah Anda sering merasa stres atau cemas berlebihan?" },
    { id: 10, text: "Apakah Anda berusia di atas 40 tahun?" },
    { id: 11, text: "Apakah Anda kurang tidur (kurang dari 6 jam setiap malam)?" },
];

type Answer = {
    questionId: number;
    questionText: string;
    answer: boolean; // true for "Ya", false for "Tidak"
};

interface ScreeningModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function ScreeningModal({ isOpen, onClose }: ScreeningModalProps) {
    const [step, setStep] = useState<'initial' | 'screening' | 'results'>('initial');
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState<Answer[]>([]);

    const handleStart = () => {
        setStep('screening');
    };

    const handleAnswer = (answer: boolean) => {
        const newAnswer = {
            questionId: screeningQuestions[currentQuestionIndex].id,
            questionText: screeningQuestions[currentQuestionIndex].text,
            answer: answer,
        };
        const newAnswers = [...answers, newAnswer];
        setAnswers(newAnswers);

        if (currentQuestionIndex < screeningQuestions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            setStep('results');
        }
    };

    const restartScreening = () => {
        setCurrentQuestionIndex(0);
        setAnswers([]);
        setStep('initial');
    };

    const handleClose = () => {
        restartScreening(); // Reset state when closing
        onClose();
    };

    const progressValue = ((currentQuestionIndex + 1) / screeningQuestions.length) * 100;

    const renderContent = () => {
        switch (step) {
            case 'screening':
                return (
                    <>
                        <DialogHeader className="p-6">
                            <DialogTitle className="text-center text-sm font-normal text-muted-foreground">
                                Pertanyaan {currentQuestionIndex + 1} dari {screeningQuestions.length}
                            </DialogTitle>
                            <Progress value={progressValue} className="w-full h-2" />
                        </DialogHeader>
                        <div className="px-6 py-8">
                            <p className="text-center text-2xl font-bold text-primary min-h-[100px] flex items-center justify-center">
                                {screeningQuestions[currentQuestionIndex].text}
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
                // Fake data for the results view
                const riskLevel = "Risiko Rendah";
                const riskDescription = "Berdasarkan jawaban Anda, risiko Anda tergolong rendah.";
                const suggestions = [
                    "Lanjutkan pola makan seimbang.",
                    "Pertahankan rutinitas olahraga.",
                    "Lakukan pemeriksaan berkala.",
                    "Kelola stres dengan baik.",
                ];

                // Determine color based on risk level
                const riskColorClasses = {
                    "Risiko Rendah": "bg-green-100 border-green-500 text-green-800",
                    "Risiko Sedang": "bg-yellow-100 border-yellow-500 text-yellow-800",
                    "Risiko Tinggi": "bg-red-100 border-red-500 text-red-800",
                };
                const riskColor = riskColorClasses[riskLevel] || "bg-gray-100";

                return (
                    <>
                        <DialogHeader className="p-6 bg-gradient-to-r from-primary to-secondary text-center rounded-t-lg">
                            <DialogTitle className="text-2xl text-white">Hasil Skrining Anda</DialogTitle>
                        </DialogHeader>

                        <div className="p-6 overflow-y-auto max-h-[75vh]">
                            {/* --- Risk Level Section (Top) --- */}
                            <div className={`text-center p-4 rounded-xl border-2 ${riskColor} mb-6`}>
                                <h3 className="text-base font-bold text-center text-primary">Tingkat Risiko Anda</h3>
                                <p className={`text-3xl font-bold mt-1`}>{riskLevel}</p>
                                <p className={`mt-2 text-sm`}>{riskDescription}</p>
                            </div>

                            {/* --- 2-Column Grid for Details --- */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* --- Left Column: Answers --- */}
                                <div className="p-4 rounded-lg bg-muted">
                                    <h3 className="text-lg font-bold mb-4 text-center">Faktor Risiko Terdeteksi</h3>
                                    <ul className="space-y-2">
                                        {answers
                                            .filter((ans) => ans.answer === true)
                                            .map((ans, index) => (
                                                <li key={ans.questionId} className="flex items-start text-sm">
                                                    <span className="flex items-center justify-center font-bold text-primary bg-primary/10 rounded-full h-5 w-5 text-xs flex-shrink-0 mr-3">
                                                        {index + 1}
                                                    </span>
                                                    <span>{ans.questionText}</span>
                                                </li>
                                            ))}
                                    </ul>
                                </div>

                                {/* --- Right Column: Suggestions --- */}
                                <div className="p-4 rounded-lg bg-muted">
                                    <h3 className="text-lg font-bold mb-4 text-center">Saran Penatalaksanaan</h3>
                                    <ul className="space-y-2">
                                        {suggestions.map((suggestion, index) => (
                                            <li key={index} className="flex items-start text-sm">
                                                <Check className="h-5 w-5 text-primary mt-0.5 mr-3 flex-shrink-0" />
                                                <span>{suggestion}</span>
                                            </li>
                                        ))}
                                    </ul>
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
                                Anda akan memulai proses skrining untuk mendeteksi risiko hipertensi. Proses ini terdiri dari beberapa langkah:
                            </DialogDescription>
                            <div className="list-disc list-inside space-y-2 mt-4 text-muted-foreground text-base">
                                <span>Anda akan menjawab <strong>11 pertanyaan</strong> singkat terkait gaya hidup dan riwayat kesehatan.</span><br/>
                                <span>Jawablah setiap pertanyaan dengan <strong>jujur</strong> untuk hasil yang akurat.</span><br/>
                                <span>Hasil skrining ini <strong>bukanlah diagnosis medis</strong>, namun sebagai langkah awal deteksi dini.</span>
                            </div>
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
        initial: "max-w-[calc(100%-40%)]",
        screening: "max-w-[calc(100%-40%)]",
        results: "max-w-[calc(100%-40%)]",
    }[step];

    return (
        <Dialog open={isOpen} onOpenChange={handleClose}>
            <DialogContent 
                className={cn("p-0", dialogWidthClass)} 
                onInteractOutside={(e) => { e.preventDefault(); }}
            >
                {renderContent()}
            </DialogContent>
        </Dialog>
    );
}