import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { cn } from '@/lib/utils';
import { useForm } from '@inertiajs/react';
import { type SharedData } from '@/types';
import profile from '@/routes/profile';

interface BmiCalculatorProps {
    auth: SharedData['auth'];
}

export default function BmiCalculator({ auth }: BmiCalculatorProps) {
    const [gender, setGender] = useState('male');
    const [bmiResult, setBmiResult] = useState<string | null>(null);
    const [bmiCategory, setBmiCategory] = useState<string | null>(null);
    
    // Use Inertia's useForm hook
    const { data, setData, patch, errors, wasSuccessful, recentlySuccessful } = useForm({
        height: auth.user?.height?.toString() || '',
        weight: auth.user?.weight?.toString() || '',
    });

    const calculateBmiResult = (h: number, w: number) => {
        if (isNaN(h) || isNaN(w) || h <= 0 || w <= 0) {
            return { bmi: "Invalid", category: "Please enter valid data." };
        }
    
        const heightInMeters = h / 100;
        const bmi = (w / (heightInMeters * heightInMeters));
        let category = "";
        if (bmi < 18.5) category = "Underweight";
        else if (bmi < 25) category = "Normal Weight";
        else if (bmi < 30) category = "Overweight";
        else category = "Obesity";
    
        return { bmi: bmi.toFixed(1), category: category };
    };

    useEffect(() => {
        if (auth.user && data.height && data.weight) {
            const h = parseFloat(data.height);
            const w = parseFloat(data.weight);
            const { bmi, category } = calculateBmiResult(h, w);
            setBmiResult(bmi);
            setBmiCategory(category);
        }
    }, []);

    const calculateBMI = (e: React.FormEvent) => {
        e.preventDefault();
        const h = parseFloat(data.height);
        const w = parseFloat(data.weight);

        const { bmi, category } = calculateBmiResult(h, w);
        setBmiResult(bmi);
        setBmiCategory(category);

        // --- Backend data submission IF user is logged in ---
        if (auth.user) {
            patch(profile.bmi.update().url, {
                preserveScroll: true,
                onSuccess: () => {
                    // Optional: Show a success toast/message
                    console.log('BMI data saved!');
                }
            });
        }
    };
    
    // Define styles for dark card
    const cardStyles = "w-full shadow-2xl rounded-2xl bg-primary text-primary-foreground border-secondary/20";
    const inputStyles = "bg-primary-foreground/5 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/40 focus:border-secondary";
    const labelStyles = "text-secondary font-semibold";
    const radioLabelStyles = "flex flex-col items-center justify-between rounded-md border-2 border-primary-foreground/20 bg-transparent p-4 hover:bg-white/10 peer-data-[state=checked]:border-secondary [&:has([data-state=checked])]:border-secondary";

    return (
        <Card className={cardStyles}>
            <form onSubmit={calculateBMI}>
                <CardHeader className="text-center">
                    <CardTitle className="text-2xl">Kalkulator BMI</CardTitle>
                    <CardDescription className="text-primary-foreground/60">
                        {auth.user ? `Hai ${auth.user.name}, data ini akan tersimpan di profil Anda.` : 'Cek indeks massa tubuh Anda.'}
                    </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-6">
                    <RadioGroup defaultValue="male" onValueChange={setGender} className="grid grid-cols-2 gap-4">
                        <div>
                            <RadioGroupItem value="male" id="male" className="peer sr-only" />
                            <Label htmlFor="male" className={radioLabelStyles}>Laki-laki</Label>
                        </div>
                        <div>
                            <RadioGroupItem value="female" id="female" className="peer sr-only" />
                            <Label htmlFor="female" className={radioLabelStyles}>Perempuan</Label>
                        </div>
                    </RadioGroup>
                    <div className="grid gap-2">
                        <Label htmlFor="height" className={labelStyles}>Tinggi Badan (cm)</Label>
                        <Input id="height" type="number" placeholder="e.g., 175" value={data.height} onChange={(e) => setData('height', e.target.value)} className={inputStyles} />
                        {errors.height && <p className="text-sm text-red-400 mt-1">{errors.height}</p>}
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="weight" className={labelStyles}>Berat Badan (kg)</Label>
                        <Input id="weight" type="number" placeholder="e.g., 70" value={data.weight} onChange={(e) => setData('weight', e.target.value)} className={inputStyles} />
                        {errors.weight && <p className="text-sm text-red-400 mt-1">{errors.weight}</p>}
                    </div>
                </CardContent>
                <CardFooter className="flex flex-col items-stretch gap-4 p-6">
                    <Button type="submit" variant="secondary" size="lg" className="font-bold text-lg">
                        Hitung BMI & Simpan
                    </Button>
                    {recentlySuccessful && (
                        <p className="text-center text-sm text-green-400">Profil Anda telah diperbarui!</p>
                    )}
                    {bmiResult && (
                        <div className={cn(
                            "text-center p-4 mt-4 rounded-lg transition-all duration-300",
                            bmiCategory === "Normal Weight" ? "bg-green-500/10 text-green-400" :
                            bmiCategory === "Underweight" || bmiCategory === "Overweight" ? "bg-yellow-500/10 text-yellow-400" :
                            "bg-red-500/10 text-red-400"
                        )}>
                            <p className="text-sm font-medium">Hasil BMI Anda</p>
                            <p className="text-4xl font-extrabold tracking-tighter">{bmiResult}</p>
                            <p className="font-semibold">{bmiCategory}</p>
                        </div>
                    )}
                </CardFooter>
            </form>
        </Card>
    );
}