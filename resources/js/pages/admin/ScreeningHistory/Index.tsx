import { Head, Link, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout'; // Changed from PublicLayout
import { Button } from '@/components/ui/button';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { format } from 'date-fns';

import { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'; // Added for modal content

// --- Interfaces for Detailed Screening Data ---
interface User {
    name: string;
    email: string;
}

interface RiskFactor {
    code: string;
    name: string;
    pivot: {
        value: string;
    };
}

interface RiskLevel {
    name: string;
    description: string;
}

interface DetailedScreening {
    id: number;
    user: User;
    result: string;
    score: number;
    created_at: string;
    risk_factors: RiskFactor[];
    risk_levels: RiskLevel[];
}
// --- End Interfaces ---

interface Screening {
    id: number;
    user: {
        name: string;
    };
    result: string;
    created_at: string; // Assuming created_at is the screening date
}

interface ScreeningHistoryProps {
    screenings: {
        data: Screening[];
        links: {
            url: string | null;
            label: string;
            active: boolean;
        }[];
        current_page: number;
        // ... other pagination properties
    };
}


export default function Index({ screenings }: ScreeningHistoryProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedScreeningId, setSelectedScreeningId] = useState<number | null>(null);
    const [selectedScreeningData, setSelectedScreeningData] = useState<DetailedScreening | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleViewDetails = (screeningId: number) => {
        setSelectedScreeningId(screeningId);
        setIsModalOpen(true);
    };

    useEffect(() => {
        if (selectedScreeningId && isModalOpen) {
            setIsLoading(true);
            setError(null);
            axios.get(`/admin/screenings/${selectedScreeningId}`)
                .then(response => {
                    setSelectedScreeningData(response.data);
                })
                .catch(err => {
                    console.error("Error fetching screening details:", err);
                    setError("Gagal memuat detail skrining.");
                })
                .finally(() => {
                    setIsLoading(false);
                });
        }
    }, [selectedScreeningId, isModalOpen]);

    const ViewDetailsModal = () => {
        if (!selectedScreeningData && !isLoading && !error) return null;

                return (

                    <DialogContent className="max-w-2xl p-0">

                        <DialogHeader className="bg-primary text-primary-foreground p-6 rounded-t-lg">

                            <DialogTitle>Detail Skrining #{selectedScreeningData?.id}</DialogTitle>

                            <DialogDescription className="text-primary-foreground/80">

                                Informasi lengkap mengenai skrining ini.

                            </DialogDescription>

                        </DialogHeader>                {isLoading ? (
                    <div className="text-center py-8">Memuat detail...</div>
                ) : error ? (
                    <div className="text-center py-8 text-red-500">{error}</div>
                ) : selectedScreeningData ? (
                    <div className="grid gap-4 p-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Informasi Pengguna</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p><strong>Nama:</strong> {selectedScreeningData.user?.name || 'N/A'}</p>
                                <p><strong>Email:</strong> {selectedScreeningData.user?.email || 'N/A'}</p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Hasil Skrining</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p><strong>Hasil:</strong> {selectedScreeningData.result}</p>
                                <p><strong>Skor:</strong> {selectedScreeningData.score}</p>
                                <p><strong>Tanggal:</strong> {format(new Date(selectedScreeningData.created_at), 'dd MMMM yyyy HH:mm')}</p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Tingkat Risiko</CardTitle>
                            </CardHeader>
                            <CardContent>
                                {selectedScreeningData.risk_levels.length > 0 ? (
                                    <ul className="list-disc pl-5">
                                        {selectedScreeningData.risk_levels.map((level, index) => (
                                            <li key={index}>
                                                <strong>{level.name}:</strong> {level.description}
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p>Tidak ada tingkat risiko yang terdeteksi.</p>
                                )}
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Faktor Risiko Terpilih</CardTitle>
                            </CardHeader>
                            <CardContent>
                                {selectedScreeningData.risk_factors.length > 0 ? (
                                    <ul className="list-disc pl-5 grid gap-2 md:grid-cols-2">
                                        {selectedScreeningData.risk_factors.map((factor, index) => (
                                            <li key={index}>
                                                <strong>{factor.name} ({factor.code}):</strong> {factor.pivot.value}
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p>Tidak ada faktor risiko yang terpilih.</p>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                ) : null}
                <DialogFooter className="px-6 pb-6">
                    <Button onClick={() => setIsModalOpen(false)}>Tutup</Button>
                </DialogFooter>
            </DialogContent>
        );
    };


    return (
        <AppLayout breadcrumbs={[{ title: 'Riwayat Skrining', href: '/admin/screenings' }]}>
            <Head title="Riwayat Skrining" />

            <div className="container-admin space-y-8">
                <div className="card p-6 md:p-8 flex items-center justify-between">
                    <h1 className="section-title">Riwayat Skrining Pengguna</h1>
                </div>

                <div className="flex justify-between items-center">
                    <div className="flex gap-2">
                        <Button
                            onClick={() => window.print()}
                            type="button"
                            className="btn-modern bg-secondary text-secondary-foreground hover:bg-secondary/90 hover:text-white"
                        >
                            Cetak
                        </Button>
                    </div>
                </div>

                {screenings.data.length > 0 ? (
                    <div className="rounded-md border overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="text-center">No</TableHead>
                                    <TableHead className="text-center">Nama Pengguna</TableHead>
                                    <TableHead className="text-center">Hasil Skrining</TableHead>
                                    <TableHead className="text-center">Tanggal Skrining</TableHead>
                                    <TableHead className="text-center">Aksi</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {screenings.data.map((screening, index) => (
                                    <TableRow key={screening.id}>
                                        <TableCell className="text-center">{(screenings.current_page - 1) * 10 + index + 1}</TableCell>
                                        <TableCell className="text-center">{screening.user?.name || 'N/A'}</TableCell>
                                        <TableCell className="text-center">{screening.result}</TableCell>
                                        <TableCell className="text-center">{format(new Date(screening.created_at), 'dd MMMM yyyy HH:mm')}</TableCell>
                                        <TableCell className="text-center">
                                            <Button
                                                variant="secondary"
                                                size="sm"
                                                onClick={() => handleViewDetails(screening.id)}
                                            >
                                                Lihat Detail
                                                <ArrowRight className="ml-2 h-4 w-4" />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                ) : (
                    <p className="text-muted-foreground">Belum ada riwayat skrining yang tersedia.</p>
                )}

                {/* Pagination */}
                {screenings.links.length > 3 && (
                    <div className="flex justify-center mt-4 space-x-2">
                        {screenings.links.map((link, index) => (
                            <Link
                                key={index}
                                href={link.url || '#'}
                                className={`px-3 py-1 border rounded-md ${link.active ? 'bg-primary text-primary-foreground' : 'bg-background hover:bg-muted'}`}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                            />
                        ))}
                    </div>
                )}
            </div>
            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <ViewDetailsModal />
            </Dialog>
        </AppLayout>
    );
}
