import React from 'react';
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';

export default function RulesIndex() {
    return (
        <AppLayout breadcrumbs={[{ title: 'Rules' }]}>
            <Head title="Rules" />
            <div className="container-admin space-y-8">
                <div className="card p-6 md:p-8">
                    <h2 className="section-title">Halaman Rules</h2>
                    <p>Konten halaman rules akan ditampilkan di sini.</p>
                </div>
            </div>
        </AppLayout>
    );
}