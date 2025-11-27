import { Head, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AdminTingkatRisikoController from '@/actions/App/Http/Controllers/Admin/AdminTingkatRisikoController';

// Define the type for a single TingkatRisiko
type TingkatRisiko = {
    id: number;
    kode: string;
    nama: string;
    keterangan: string | null;
    saran: string | null;
};

// The props for the component now include the tingkatRisiko to edit
export default function RiskLevelsEdit({ tingkatRisiko }: { tingkatRisiko: TingkatRisiko }) {
    // Initialize the form with the existing tingkat risiko data
    const { data, setData, patch, processing, errors } = useForm({
        kode: tingkatRisiko.kode,
        nama: tingkatRisiko.nama,
        keterangan: tingkatRisiko.keterangan ?? '',
        saran: tingkatRisiko.saran ?? '',
    });

    // Handle form submission
    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        // Use PATCH for updating
        patch(AdminTingkatRisikoController.update.url(tingkatRisiko.id));
    };

    return (
        <AppLayout breadcrumbs={[{ title: 'Tingkat Risiko', href: AdminTingkatRisikoController.index.url() }, { title: 'Edit Tingkat Risiko' }]}>
            <Head title="Edit Tingkat Risiko" />
            <div className="container-admin space-y-8">
                <div className="card p-6 md:p-8">
                    <h2 className="section-title">Form Edit Tingkat Risiko</h2>
                    
                    <form onSubmit={submit} className="mt-6 space-y-6">
                        <div>
                            <Label htmlFor="kode">Kode</Label>
                            <Input
                                id="kode"
                                name="kode"
                                value={data.kode}
                                onChange={(e) => setData('kode', e.target.value)}
                                className="mt-1 block w-full input-modern"
                            />
                            {errors.kode && <p className="text-sm text-red-600">{errors.kode}</p>}
                        </div>

                        <div>
                            <Label htmlFor="nama">Nama</Label>
                            <Input
                                id="nama"
                                name="nama"
                                value={data.nama}
                                onChange={(e) => setData('nama', e.target.value)}
                                className="mt-1 block w-full input-modern"
                            />
                            {errors.nama && <p className="text-sm text-red-600">{errors.nama}</p>}
                        </div>

                        <div>
                            <Label htmlFor="keterangan">Keterangan</Label>
                            <Input
                                id="keterangan"
                                name="keterangan"
                                value={data.keterangan}
                                onChange={(e) => setData('keterangan', e.target.value)}
                                className="mt-1 block w-full input-modern"
                            />
                            {errors.keterangan && <p className="text-sm text-red-600">{errors.keterangan}</p>}
                        </div>

                        <div>
                            <Label htmlFor="saran">Saran</Label>
                            <Input
                                id="saran"
                                name="saran"
                                value={data.saran}
                                onChange={(e) => setData('saran', e.target.value)}
                                className="mt-1 block w-full input-modern"
                            />
                            {errors.saran && <p className="text-sm text-red-600">{errors.saran}</p>}
                        </div>

                        <div className="flex items-center gap-4">
                            <Button type="submit" disabled={processing} className="btn-modern bg-primary text-primary-foreground hover:bg-secondary hover:text-secondary-foreground">
                                Simpan Perubahan
                            </Button>
                            <Button type="button" variant="outline" className="btn-modern" onClick={() => window.history.back()}>
                                Kembali
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}
