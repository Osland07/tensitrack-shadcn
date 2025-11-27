
import AppLayout from "@/layouts/app-layout";
import { Head, useForm } from "@inertiajs/react";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import React, { useState } from "react";
import { Check, X } from "lucide-react";

interface RiskFactor {
    code: string;
    name: string;
}

interface ScreeningIndexProps {
    riskFactors: RiskFactor[];
}

type UserAnswers = {
    [factCode: string]: boolean;
};

interface BackendResult {
    risk_name: string;
    explanation: string;
    full_description: string;
    suggestion: string;
}

export default function ScreeningIndex({ riskFactors }: ScreeningIndexProps) {

    const [step, setStep] = useState<'initial' | 'screening' | 'results'>('initial');
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [userAnswersData, setUserAnswersData] = useState<UserAnswers>({});
    const [backendResults, setBackendResults] = useState<BackendResult[] | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleStart = () => {
        setStep('screening');
    };

    const handleAnswer = async (answer: boolean) => {
        const currentQuestion = riskFactors[currentQuestionIndex];

        const updatedUserAnswers = {
            ...userAnswersData,
            [currentQuestion.code]: answer,
        };
        setUserAnswersData(updatedUserAnswers);

        if (currentQuestionIndex < riskFactors.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
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
                console.error("Error submitting screening answers:", error);
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

    const progressValue = ((currentQuestionIndex + 1) / riskFactors.length) * 100;

    const renderContent = () => {
        switch (step) {
            case 'screening':
                return (
                    <Card className="w-full max-w-2xl">
                        <CardHeader>
                            <CardTitle className="text-center text-sm font-normal text-muted-foreground">
                                Pertanyaan {currentQuestionIndex + 1} dari {riskFactors.length}
                            </CardTitle>
                            <Progress value={progressValue} className="w-full h-2" />
                        </CardHeader>
                        <CardContent className="py-8">
                            <p className="text-center text-2xl font-bold text-primary min-h-[100px] flex items-center justify-center">
                                {riskFactors[currentQuestionIndex].name}
                            </p>
                        </CardContent>
                        <CardFooter className="grid grid-cols-2 gap-0 mt-auto">
                            <Button variant="default" size="lg" className="h-20 text-lg font-bold rounded-none rounded-bl-lg" onClick={() => handleAnswer(false)}>
                                <X className="mr-2 h-6 w-6" /> Tidak
                            </Button>
                            <Button variant="secondary" size="lg" className="h-20 text-lg font-bold rounded-none rounded-br-lg" onClick={() => handleAnswer(true)}>
                                <Check className="mr-2 h-6 w-6" /> Ya
                            </Button>
                        </CardFooter>
                    </Card>
                );
            case 'results':
                const primaryResult = backendResults?.[0];
                const detectedFacts = Object.entries(userAnswersData)
                                            .filter(([, answered]) => answered === true)
                                            .map(([code]) => {
                                                const question = riskFactors.find(q => q.code === code);
                                                return question ? question.name : `Fakta ${code}`;
                                            });

                const riskColorClasses = {
                    "Rendah": "bg-green-100 border-green-500 text-green-800",
                    "Sedang": "bg-yellow-100 border-yellow-500 text-yellow-800",
                    "Tinggi": "bg-red-100 border-red-500 text-red-800",
                };
                const riskColor = primaryResult ? riskColorClasses[primaryResult.risk_name] || "bg-gray-100" : "bg-gray-100";

                return (
                    <Card className="w-full max-w-4xl">
                        <CardHeader className="p-6 bg-gradient-to-r from-primary to-secondary text-center rounded-t-lg">
                            <CardTitle className="text-2xl text-white">Hasil Skrining Anda</CardTitle>
                        </CardHeader>
                        
                        <CardContent className="p-6 overflow-y-auto">
                            <h3 className="text-base font-bold mb-2 text-center text-primary">Tingkat Risiko Anda</h3>
                            <div className={`text-center p-4 rounded-xl border-2 ${riskColor} mb-6`}>
                                <p className={`text-3xl font-bold mt-1`}>{primaryResult?.risk_name || 'Tidak Diketahui'}</p>
                                <p className={`mt-2 text-sm`}>{primaryResult?.explanation || 'Tidak ada penjelasan.'}</p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                        </CardContent>

                        <CardFooter className="p-4 pt-4 flex-col sm:flex-col sm:space-x-0 gap-2 border-t">
                             <p className="text-xs text-muted-foreground text-center">Ini bukan diagnosis medis. Konsultasikan dengan dokter untuk informasi lebih lanjut.</p>
                            <Button onClick={restartScreening} size="lg" variant="outline">Ulangi Skrining</Button>
                        </CardFooter>
                    </Card>
                );
            case 'initial':
            default:
                return (
                    <Card className="w-full max-w-2xl text-center">
                        <CardHeader>
                            <CardTitle className="text-2xl font-bold">Mulai Skrining Risiko Hipertensi?</CardTitle>
                            <CardDescription>
                            Anda akan memulai proses skrining untuk mendeteksi risiko hipertensi.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                        <ul className="list-disc list-inside space-y-2 text-left">
                                    <li>Anda akan menjawab <strong>11 pertanyaan</strong> singkat terkait gaya hidup dan riwayat kesehatan.</li>
                                    <li>Jawablah setiap pertanyaan dengan <strong>jujur</strong> untuk hasil yang akurat.</li>
                                    <li>Hasil skrining ini <strong>bukanlah diagnosis medis</strong>, namun sebagai langkah awal deteksi dini.</li>
                                </ul>
                        </CardContent>
                        <CardFooter className="flex justify-end gap-2">
                            <Button variant="outline" >Batal</Button>
                            <Button onClick={handleStart}>Lanjutkan</Button>
                        </CardFooter>
                    </Card>
                );
        }
    }


    return (
        <AppLayout>
            <Head title="Skrining" />

            <div className="container py-12">
                <div className="flex justify-center">
                    {renderContent()}
                </div>
            </div>
        </AppLayout>
    );
}

