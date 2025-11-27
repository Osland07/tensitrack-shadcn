import React from 'react';
import { Head, useForm, usePage } from '@inertiajs/react';
import PublicLayout from '@/layouts/public-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { type SharedData, type User } from '@/types';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { update } from '@/routes/profile-user';

interface Screening {
    id: number;
    created_at: string;
    risk_level: {
        name: string;
    }
}

interface ProfileUserEditProps {
    auth: SharedData['auth'];
    screenings: Screening[];
}

export default function ProfileUserEdit() {
    const { auth, screenings } = usePage<ProfileUserEditProps>().props;

    const { data, setData, patch, errors, processing, recentlySuccessful } = useForm({
        name: auth.user.name || '',
        age: auth.user.age || '',
        gender: auth.user.gender || 'male',
        systolic: auth.user.systolic || '',
        diastolic: auth.user.diastolic || '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        patch(update().url);
    };

    return (
        <>
            <Head title="Profil Pengguna" />

            <div className="container mx-auto py-8">
                <h1 className="text-3xl font-bold mb-6">Profil Pengguna</h1>

                <div className="grid gap-8 md:grid-cols-3">
                    <div className="md:col-span-2">
                        <Card>
                            <CardHeader>
                                <CardTitle>Informasi Pribadi</CardTitle>
                                <CardDescription>Perbarui informasi pribadi dan data kesehatan Anda.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div className="grid gap-2">
                                            <Label htmlFor="name">Nama</Label>
                                            <Input id="name" value={data.name} onChange={(e) => setData('name', e.target.value)} />
                                            {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name}</p>}
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor="age">Usia</Label>
                                            <Input id="age" type="number" value={data.age} onChange={(e) => setData('age', e.target.value)} />
                                            {errors.age && <p className="text-sm text-red-500 mt-1">{errors.age}</p>}
                                        </div>
                                    </div>
                                    <div className="grid gap-2">
                                        <Label>Jenis Kelamin</Label>
                                        <RadioGroup value={data.gender} onValueChange={(value) => setData('gender', value)} className="flex gap-4">
                                            <div className="flex items-center space-x-2">
                                                <RadioGroupItem value="male" id="genderMale" />
                                                <Label htmlFor="genderMale">Laki-laki</Label>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <RadioGroupItem value="female" id="genderFemale" />
                                                <Label htmlFor="genderFemale">Perempuan</Label>
                                            </div>
                                        </RadioGroup>
                                        {errors.gender && <p className="text-sm text-red-500 mt-1">{errors.gender}</p>}
                                    </div>
                                    
                                    <Separator />

                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div className="grid gap-2">
                                            <Label htmlFor="systolic">Tensi Sistolik Terakhir</Label>
                                            <Input id="systolic" type="number" value={data.systolic} onChange={(e) => setData('systolic', e.target.value)} />
                                            {errors.systolic && <p className="text-sm text-red-500 mt-1">{errors.systolic}</p>}
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor="diastolic">Tensi Diastolik Terakhir</Label>
                                            <Input id="diastolic" type="number" value={data.diastolic} onChange={(e) => setData('diastolic', e.target.value)} />
                                            {errors.diastolic && <p className="text-sm text-red-500 mt-1">{errors.diastolic}</p>}
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-center gap-4">
                                        <Button 
                                            type="submit" 
                                            className="w-full md:w-auto transition-all duration-300 ease-in-out hover:scale-105 active:scale-100" 
                                            disabled={processing}
                                        >
                                            {processing ? 'Menyimpan...' : 'Simpan Perubahan'}
                                        </Button>
                                        {recentlySuccessful && (
                                            <p className="text-sm text-green-600">Berhasil disimpan!</p>
                                        )}
                                    </div>
                                </form>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="md:col-span-1">
                        <Card>
                            <CardHeader>
                                <CardTitle>Riwayat Skrining</CardTitle>
                                <CardDescription>Berikut adalah riwayat skrining yang pernah Anda lakukan.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Tanggal</TableHead>
                                            <TableHead className="text-right">Hasil</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {screenings.length > 0 ? (
                                            screenings.map((item) => (
                                                <TableRow key={item.id}>
                                                    <TableCell>{new Date(item.created_at).toLocaleDateString()}</TableCell>
                                                    <TableCell className="text-right font-medium">{item.risk_level.name}</TableCell>
                                                </TableRow>
                                            ))
                                        ) : (
                                            <TableRow>
                                                <TableCell colSpan={2} className="text-center">
                                                    Belum ada riwayat skrining.
                                                </TableCell>
                                            </TableRow>
                                        )}
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </>
    );
}

ProfileUserEdit.layout = (page: React.ReactElement) => {
    return <PublicLayout title="Profil Pengguna" hideFooter={true} children={page} />;
};