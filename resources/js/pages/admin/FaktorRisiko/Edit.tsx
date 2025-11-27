import { Head, useForm, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AdminFaktorRisikoController from '@/actions/App/Http/Controllers/Admin/AdminFaktorRisikoController';

// Define the type for a single RiskFactor
type FaktorRisiko = {
    id: number;
    kode: string;
    nama: string;
};

// The props for the component now include the riskFactor to edit
export default function RiskFactorsEdit({ faktorRisiko }: { faktorRisiko: FaktorRisiko }) {
    // Initialize the form with the existing risk factor data
    const { data, setData, patch, processing, errors } = useForm({
        nama: faktorRisiko.nama,
    });

    // Handle form submission
    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        // Use PATCH for updating
        patch(AdminFaktorRisikoController.update.url(faktorRisiko.id), {
            // Only send nama, keterangan, etc.
            preserveState: true,
            preserveScroll: true,
        });
    };

    return (
        <AppLayout breadcrumbs={[{ title: 'Faktor Risiko', href: AdminFaktorRisikoController.index.url() }, { title: 'Edit Faktor Risiko' }]}>
            <Head title="Edit Faktor Risiko" />
            <div className="container-admin space-y-8">
                <div className="card p-6 md:p-8">
                    <h2 className="section-title">Form Edit Faktor Risiko</h2>
                    
                    <form onSubmit={submit} className="mt-6 space-y-6">
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

                        <div className="flex items-center gap-4">
                            <Button type="submit" disabled={processing} className="btn-modern bg-primary text-primary-foreground hover:bg-secondary hover:text-secondary-foreground">
                                Simpan Perubahan
                            </Button>
                            <Button type="button" variant="outline" className="btn-modern" asChild>
                                <Link href={AdminFaktorRisikoController.index.url()}>
                                    Kembali
                                </Link>
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}

