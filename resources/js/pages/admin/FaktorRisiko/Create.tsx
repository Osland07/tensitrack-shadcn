import { Head, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AdminFaktorRisikoController from '@/actions/App/Http/Controllers/Admin/AdminFaktorRisikoController';
import { Form } from '@inertiajs/react'; // Ensure Form is imported

export default function RiskFactorsCreate() {
    const { data, setData, post, processing, errors, reset } = useForm({
        nama: '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(AdminFaktorRisikoController.store.url(), {
            onSuccess: () => reset({nama: ''}), // Reset form on successful submission
        });
    };

    return (
        <AppLayout breadcrumbs={[{ title: 'Faktor Risiko', href: AdminFaktorRisikoController.index.url() }, { title: 'Tambah Faktor Risiko' }]}>
            <Head title="Tambah Faktor Risiko" />
            <div className="container-admin space-y-8">
                <div className="card p-6 md:p-8">
                    <h2 className="section-title">Form Tambah Faktor Risiko</h2>
                    
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
                                Simpan
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