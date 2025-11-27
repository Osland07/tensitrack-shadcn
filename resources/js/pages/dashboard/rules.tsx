import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';
import React from 'react'; // Import React for useState
import { cn } from '@/lib/utils'; // Import cn utility for conditional classes

interface RulesProps {
    riskFactors: Record<string, string>;
}

export default function Rules({ riskFactors }: RulesProps) {
    const getFactorName = (code: string): string => riskFactors[code] || code;
    const otherRiskFactors = Object.entries(riskFactors).filter(([code]) => code !== 'E01');

    // State to track the hovered rule for interactive highlighting
    const [hoveredRule, setHoveredRule] = React.useState<string | null>(null);

    return (
        <AppLayout>
            <Head title="Aturan Sistem" />
            <div className="container-admin h-full">
                {/* Page Header */}
                <div className="text-center mb-6">
                    <h1 className="text-2xl font-bold tracking-tight">Peta Aturan Sistem</h1>
                    <p className="text-muted-foreground mt-1 text-sm">
                        Arahkan mouse ke salah satu baris aturan untuk melihat hubungannya.
                    </p>
                </div>

                {/* Main 2-Column Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-start">
                    {/* --- Left Column: STEP 1 + Logic --- */}
                    <div className="space-y-3">
                        {/* Step 1 Title */}
                        <div className="flex items-center gap-3">
                            <div className="flex items-center justify-center h-10 w-10 rounded-full bg-primary text-primary-foreground font-bold text-lg">
                                1
                            </div>
                            <div className="flex-1">
                                <h2 className="text-lg font-semibold">Pengecekan Riwayat Keluarga</h2>
                                <p className="text-xs text-muted-foreground">
                                    Pengecekan gejala <span className="font-semibold">"{getFactorName('E01')}"</span>.
                                </p>
                            </div>
                        </div>
                        {/* Branch Cards */}
                        <Card className="shadow-sm">
                            <CardHeader className="pb-3">
                                <CardTitle className="text-base">Jika <span className="text-primary font-bold">ADA</span> Riwayat Keluarga</CardTitle>
                            </CardHeader>
                            <CardContent className="text-sm space-y-1">
                                <div
                                    onMouseEnter={() => setHoveredRule('ada-high')}
                                    onMouseLeave={() => setHoveredRule(null)}
                                    className="flex items-center gap-2 p-2 rounded-md transition-colors hover:bg-primary/10"
                                >
                                    <span className="w-40">3 atau lebih gejala lain</span>
                                    <ArrowRight className="h-4 w-4 text-muted-foreground" />
                                    <span className={cn('font-bold text-lg text-destructive transition-transform', { 'scale-110': hoveredRule === 'ada-high' })}>
                                        Risiko Tinggi
                                    </span>
                                </div>
                                <div
                                    onMouseEnter={() => setHoveredRule('ada-medium')}
                                    onMouseLeave={() => setHoveredRule(null)}
                                    className="flex items-center gap-2 p-2 rounded-md transition-colors hover:bg-primary/10"
                                >
                                    <span className="w-40">0-2 gejala lain</span>
                                    <ArrowRight className="h-4 w-4 text-muted-foreground" />
                                    <span className={cn('font-bold text-lg text-orange-500 transition-transform', { 'scale-110': hoveredRule === 'ada-medium' })}>
                                        Risiko Sedang
                                    </span>
                                </div>
                            </CardContent>
                        </Card>
                        <Card className="shadow-sm">
                            <CardHeader className="pb-3">
                                <CardTitle className="text-base">Jika <span className="text-primary font-bold">TIDAK ADA</span> Riwayat Keluarga</CardTitle>
                            </CardHeader>
                            <CardContent className="text-sm space-y-1">
                                <div
                                    onMouseEnter={() => setHoveredRule('tiada-high')}
                                    onMouseLeave={() => setHoveredRule(null)}
                                    className="flex items-center gap-2 p-2 rounded-md transition-colors hover:bg-primary/10"
                                >
                                    <span className="w-40">5 atau lebih gejala lain</span>
                                    <ArrowRight className="h-4 w-4 text-muted-foreground" />
                                    <span className={cn('font-bold text-lg text-destructive transition-transform', { 'scale-110': hoveredRule === 'tiada-high' })}>
                                        Risiko Tinggi
                                    </span>
                                </div>
                                <div
                                    onMouseEnter={() => setHoveredRule('tiada-medium')}
                                    onMouseLeave={() => setHoveredRule(null)}
                                    className="flex items-center gap-2 p-2 rounded-md transition-colors hover:bg-primary/10"
                                >
                                    <span className="w-40">3-4 gejala lain</span>
                                    <ArrowRight className="h-4 w-4 text-muted-foreground" />
                                    <span className={cn('font-bold text-lg text-orange-500 transition-transform', { 'scale-110': hoveredRule === 'tiada-medium' })}>
                                        Risiko Sedang
                                    </span>
                                </div>
                                <div
                                    onMouseEnter={() => setHoveredRule('tiada-low')}
                                    onMouseLeave={() => setHoveredRule(null)}
                                    className="flex items-center gap-2 p-2 rounded-md transition-colors hover:bg-primary/10"
                                >
                                    <span className="w-40">0-2 gejala lain</span>
                                    <ArrowRight className="h-4 w-4 text-muted-foreground" />
                                    <span className={cn('font-bold text-lg text-green-600 transition-transform', { 'scale-110': hoveredRule === 'tiada-low' })}>
                                        Risiko Rendah
                                    </span>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* --- Right Column: STEP 2 + Reference --- */}
                    <div className="space-y-3">
                        {/* Step 2 Title */}
                        <div className="flex items-center gap-3">
                            <div className="flex items-center justify-center h-10 w-10 rounded-full bg-primary text-primary-foreground font-bold text-lg">
                                2
                            </div>
                            <div className="flex-1">
                                <h2 className="text-lg font-semibold">Penjelasan "Gejala Lain"</h2>
                                <p className="text-xs text-muted-foreground">Faktor risiko selain riwayat keluarga.</p>
                            </div>
                        </div>
                        {/* Reference Card */}
                        <Card className="shadow-sm">
                            <CardHeader>
                                <CardTitle className="text-base">Daftar Gejala Lain</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ul className="text-sm list-decimal list-inside columns-1 sm:columns-2 gap-x-6">
                                    {otherRiskFactors.map(([code, name]) => (
                                        <li key={code} className="mb-1">{name}</li>
                                    ))}
                                </ul>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
