import RiskFactorController from '@/actions/App/Http/Controllers/Admin/RiskFactorController';
import { router, Head, Link, usePage, usePoll } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import React from 'react';


// Define a basic Paginator type, adjust if a more specific one exists
type Paginator<T> = {
    data: T[];
    links: { url: string | null; label: string; active: boolean }[];
    current_page: number;
    last_page: number;
    from: number | null;
    to: number | null;
    total: number;
};

type RiskFactor = {
    id: number;
    code: string;
    name: string;
    description: string | null;
    suggestion: string | null;
};

// Update props type to include paginated data and filters
export default function RiskFactors({ riskFactors, filters }: { riskFactors: Paginator<RiskFactor>, filters: { search?: string } }) {
    usePoll(2000);
    // Add local state for search input
    const [search, setSearch] = React.useState(filters.search || '');

    // Function to handle search submission
    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        RiskFactorController.index.get({ query: { search } }); // Use Wayfinder for GET request with search query
    };

    return (
        <AppLayout breadcrumbs={[{ title: 'Faktor Risiko', href: RiskFactorController.index.url() }]}>        
            <Head title="Faktor Risiko" />

            <div className="container-admin space-y-8">
                <div className="card p-6 md:p-8 flex items-center justify-between">
                    <h2 className="section-title">Faktor Risiko</h2>
                </div>

                <div className="flex justify-between items-center">
                    <div className="flex gap-2">
                        <Button asChild className="btn-modern bg-primary text-primary-foreground hover:bg-secondary hover:text-secondary-foreground">
                            <Link href={RiskFactorController.create.url()}>Tambah</Link>
                        </Button>
                        <Button type="button" className="btn-modern bg-secondary text-secondary-foreground hover:bg-secondary/90 hover:text-white">
                            Cetak
                        </Button>
                    </div>
                </div>

                <div className="card p-6 md:p-8 space-y-6 min-h-[60vh]">
                    <div className="flex justify-between items-center">
                        <h2 className="section-title">Daftar Faktor Risiko</h2>
                        {/* Search Input */}
                        <form onSubmit={handleSearch} className="flex gap-2">
                            <Input
                                type="text"
                                placeholder="Cari..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="input-modern"
                            />
                            <Button type="submit" className="btn-modern bg-primary text-primary-foreground hover:bg-secondary hover:text-secondary-foreground">
                                Cari
                            </Button>
                        </form>
                    </div>

                    <div className="rounded-md border overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead className="bg-muted">
                                <tr>
                                    <th className="p-3 text-center">Kode</th>
                                    <th className="p-3 text-center">Nama</th>
                                    <th className="p-3 text-center">Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {riskFactors.data.map((riskFactor) => (
                                    <tr key={riskFactor.id} className="border-t">
                                        <td className="p-3 font-medium text-center">{riskFactor.code}</td>
                                        <td className="p-3 text-center">{riskFactor.name}</td>
                                                                            <td className="p-3 text-center">
                                                                                <div className="flex items-center justify-center gap-2">                                                <Button asChild size="sm" className="btn-modern bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground">
                                                    <Link href={RiskFactorController.edit.url(riskFactor.id)}>Edit</Link>
                                                </Button>
                                                <AlertDialog>
                                                    <AlertDialogTrigger asChild>
                                                        <Button size="sm" variant="destructive" className="btn-modern">
                                                            Hapus
                                                        </Button>
                                                    </AlertDialogTrigger>
                                                    <AlertDialogContent>
                                                        <AlertDialogHeader>
                                                            <AlertDialogTitle>Anda yakin?</AlertDialogTitle>
                                                            <AlertDialogDescription>
                                                                Data yang dihapus tidak dapat dikembalikan!
                                                            </AlertDialogDescription>
                                                        </AlertDialogHeader>
                                                        <AlertDialogFooter>
                                                            <AlertDialogCancel>Batal</AlertDialogCancel>
                                                            <AlertDialogAction
                                                                onClick={() => {
                                                                    router.delete(RiskFactorController.destroy.url(riskFactor.id), {
                                                                        preserveScroll: true,
                                                                    });
                                                                }}
                                                            >
                                                                Ya, hapus!
                                                            </AlertDialogAction>
                                                        </AlertDialogFooter>
                                                    </AlertDialogContent>
                                                </AlertDialog>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {riskFactors.data.length === 0 && (
                                    <tr>
                                        <td colSpan={3} className="p-3 text-center">
                                            No risk factors found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination Links */}
                    {riskFactors.links && riskFactors.links.length > 3 && (
                        <div className="flex justify-center mt-4 space-x-2">
                            {riskFactors.links.map((link, index) => (
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
            </div>
        </AppLayout>
    );
}