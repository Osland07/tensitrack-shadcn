import React, { useState } from 'react';
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

export default function BmiCalculator() {
    const [gender, setGender] = useState('male');
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');
    const [bmiResult, setBmiResult] = useState<string | null>(null);
    const [bmiCategory, setBmiCategory] = useState<string | null>(null);

    const calculateBMI = () => {
        const h = parseFloat(height);
        const w = parseFloat(weight);

        if (isNaN(h) || isNaN(w) || h <= 0 || w <= 0) {
            setBmiResult("Invalid");
            setBmiCategory("Please enter valid data.");
            return;
        }

        const heightInMeters = h / 100;
        const bmi = (w / (heightInMeters * heightInMeters));

        let category = "";
        if (bmi < 18.5) {
            category = "Underweight";
        } else if (bmi >= 18.5 && bmi <= 24.9) {
            category = "Normal Weight";
        } else if (bmi >= 25 && bmi <= 29.9) {
            category = "Overweight";
        } else {
            category = "Obesity";
        }

        setBmiResult(bmi.toFixed(1));
        setBmiCategory(category);
    };

    // Define styles for dark card
    const cardStyles = "w-full shadow-2xl rounded-2xl bg-primary text-primary-foreground border-secondary/20";
    const inputStyles = "bg-primary-foreground/5 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/40 focus:border-secondary";
    const labelStyles = "text-secondary font-semibold";
    const radioLabelStyles = "flex flex-col items-center justify-between rounded-md border-2 border-primary-foreground/20 bg-transparent p-4 hover:bg-white/10 peer-data-[state=checked]:border-secondary [&:has([data-state=checked])]:border-secondary";

    return (
        <Card className={cardStyles}>
            <CardHeader className="text-center">
                <CardTitle className="text-2xl">BMI Calculator</CardTitle>
                <CardDescription className="text-primary-foreground/60">Your health journey starts here. Discover your Body Mass Index.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
                <RadioGroup defaultValue="male" onValueChange={setGender} className="grid grid-cols-2 gap-4">
                    <div>
                        <RadioGroupItem value="male" id="male" className="peer sr-only" />
                        <Label htmlFor="male" className={radioLabelStyles}>Male</Label>
                    </div>
                    <div>
                        <RadioGroupItem value="female" id="female" className="peer sr-only" />
                        <Label htmlFor="female" className={radioLabelStyles}>Female</Label>
                    </div>
                </RadioGroup>
                <div className="grid gap-2">
                    <Label htmlFor="height" className={labelStyles}>Height (cm)</Label>
                    <Input id="height" type="number" placeholder="e.g., 175" value={height} onChange={(e) => setHeight(e.target.value)} className={inputStyles} />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="weight" className={labelStyles}>Weight (kg)</Label>
                    <Input id="weight" type="number" placeholder="e.g., 70" value={weight} onChange={(e) => setWeight(e.target.value)} className={inputStyles} />
                </div>
            </CardContent>
            <CardFooter className="flex flex-col items-stretch gap-4 p-6">
                <Button onClick={calculateBMI} variant="secondary" size="lg" className="font-bold text-lg">
                    Calculate BMI
                </Button>
                {bmiResult && (
                    <div className={cn(
                        "text-center p-4 mt-4 rounded-lg transition-all duration-300",
                        bmiCategory === "Normal Weight" ? "bg-green-500/10 text-green-400" :
                        bmiCategory === "Underweight" || bmiCategory === "Overweight" ? "bg-yellow-500/10 text-yellow-400" :
                        "bg-red-500/10 text-red-400"
                    )}>
                        <p className="text-sm font-medium">Your BMI Result</p>
                        <p className="text-4xl font-extrabold tracking-tighter">{bmiResult}</p>
                        <p className="font-semibold">{bmiCategory}</p>
                    </div>
                )}
            </CardFooter>
        </Card>
    );
}
