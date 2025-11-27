import { Head, usePage, Link } from '@inertiajs/react';
import React, { PropsWithChildren, useState } from 'react';
import { type SharedData } from '@/types';
import PublicLayout from '@/layouts/public-layout';
import { Star, Cpu, Lock, ShieldCheck, CheckCircle, FileText, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import BmiCalculator from '@/components/BmiCalculator';
import RiskGauge from '@/components/RiskGauge';
import FaqSection from '@/components/FaqSection';
import ScreeningModal from '@/components/ScreeningModal';
import ScrollToTopButton from '@/components/ScrollToTopButton';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@/components/ui/carousel';

// Define a type for RiskFactor as received from the backend
interface RiskFactor {
    code: string;
    name: string;
}

interface WelcomeProps {
    canRegister?: boolean;
    riskFactors: RiskFactor[]; // New prop for dynamic questions
}

export default function Welcome({ canRegister = true, riskFactors }: WelcomeProps) {
    const { auth } = usePage<SharedData>().props;
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <Head title="Selamat Datang" />

            {/* Modal */}
            <ScreeningModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} riskFactors={riskFactors} />

            <main className="flex-1">
                <section id="beranda" className="scroll-mt-20 pt-16 md:pt-0 pb-4 md:pb-8 lg:pb-12">
                    <div className="container mx-auto px-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center md:min-h-[calc(100vh-5rem)]">

                            {/* Image */}
                            <div className="order-last flex justify-center h-full">
                                <img className="h-full w-full object-cover rounded-lg" src="/sipakar-home.png" alt="Gambar Home" />
                            </div>

                            {/* Text */}
                            <div className="flex flex-col justify-center text-center md:text-start">
                                <span className="inline-block rounded-full px-3 py-1 text-sm font-semibold mb-3 mx-auto md:mx-0" style={{ backgroundColor: 'rgba(0, 27, 72, 0.1)', color: '#001B48' }}>
                                    <Star className="inline-block h-4 w-4 mr-1" /> Sistem Cerdas Deteksi Dini
                                </span>
                                <h1 className="font-bold text-3xl sm:text-4xl md:text-5xl mb-3 text-primary">
                                    Ketahui Risiko Hipertensi <br />
                                    <span className="text-secondary">Sebelum Terlambat</span>
                                </h1>
                                <p className="lead text-muted-foreground mb-4 leading-relaxed max-w-xl mx-auto md:mx-0">
                                    Hipertensi sering datang tanpa gejala.
                                    <b className="font-bold">TensiTrack</b> membantu Anda memprediksi potensi risiko di masa depan
                                    berdasarkan gaya hidup Anda saat ini.
                                </p>
                                <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                                    {/* Changed Button to trigger modal */}
                                    <Button size="lg" onClick={() => setIsModalOpen(true)}>
                                        Mulai Skrining Gratis
                                    </Button>
                                    <Button asChild variant="outline" size="lg">
                                        <Link href="#kalkulator-bmi">Kalkulator Berat Badan Ideal</Link>
                                    </Button>
                                </div>
                            </div>

                        </div>
                    </div>
                </section>

                <section id="alur-interaksi" className="scroll-mt-20 pt-16 pb-8 md:pb-16 lg:pb-24">
                    <div className="container mx-auto px-4">
                        <div className="text-center">
                            <h2 className="text-center font-bold text-primary text-3xl md:text-4xl mb-2">Alur Interaksi Pengguna</h2>
                            <p className="text-muted-foreground mb-8">Ikuti langkah sederhana berikut untuk mulai menggunakan TensiTrack</p>
                            <img className="max-w-full h-auto mx-auto" src="/assets/img/Alur Kerja/alur-kerja.png" alt="Alur Interaksi Pengguna" />
                        </div>
                    </div>
                </section>

                <section id="kalkulator-bmi" className="scroll-mt-20 py-12 bg-[#F4F7FB]">
                    <div className="container mx-auto px-4">
                        {/* Section Title */}
                        <div className="flex justify-center text-center mb-12">
                            <div className="w-full lg:w-8/12">
                                <h2 className="font-bold text-3xl md:text-4xl mb-2 text-primary">Kalkulator Berat Badan Ideal</h2>
                                <p className="text-muted-foreground">
                                    Obesitas adalah salah satu faktor risiko utama Hipertensi. Cek apakah berat badan Anda sudah ideal?
                                </p>
                            </div>
                        </div>

                        {/* Main Content */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                            {/* Kolom Kiri */}
                            <div className="col-span-1 lg:col-span-1 text-center lg:text-start">
                                <h4 className="font-bold text-secondary mb-3">Apa itu BMI?</h4>
                                <p className="text-muted-foreground mb-4">
                                    Body Mass Index (BMI) adalah cara menghitung berat badan ideal berdasarkan tinggi dan berat badan. BMI
                                    juga dapat dibedakan berdasarkan usia.
                                </p>
                                <h4 className="font-bold text-secondary mb-3">Apa itu kalkulator BMI?</h4>
                                <p className="text-muted-foreground mb-4">
                                    Kalkulator BMI adalah alat untuk mengidentifikasi apakah berat badan kamu termasuk dalam kategori
                                    ideal atau tidak. Kalkulator ini dapat digunakan oleh seseorang yang berusia 20 tahun ke atas.
                                </p>
                                <div className="mt-4 flex justify-center">
                                    <img src="https://img.freepik.com/premium-vector/weight-loss-bmi-man-woman-before-after-diet-fitness-fat-thin-man-woman_162329-342.jpg"
                                        alt="Ilustrasi BMI" className="max-w-full h-auto rounded shadow-sm" style={{ maxHeight: '300px', objectFit: 'contain' }} />
                                </div>
                            </div>

                            {/* Kolom Kanan: Kalkulator */}
                            <div className="col-span-1 lg:col-span-1">
                                <BmiCalculator auth={auth} />
                            </div>
                        </div>
                    </div>
                </section>

                <section id="diagnosis" className="scroll-mt-20 py-16 sm:py-24">
                    <div className="container mx-auto px-4">
                        <div className="relative isolate overflow-hidden bg-primary shadow-2xl rounded-3xl">
                            {/* Background Glow Effect */}
                            <div className="absolute -top-40 -right-40 w-[50rem] h-[50rem] bg-secondary/20 rounded-full blur-[12rem]"></div>
                            
                            <div className="relative z-10 max-w-2xl mx-auto text-center p-8 sm:p-12 lg:p-20">
                                <div
                                    className="inline-block px-4 py-1.5 rounded-full bg-secondary/10 text-secondary font-bold text-sm mb-4 border border-secondary/20">
                                    <ShieldCheck className="inline h-4 w-4 mr-1.5" /> PENCEGAHAN DINI
                                </div>
                                <h2 className="font-bold text-3xl text-white sm:text-4xl">
                                    Jangan Tunggu Sakit, Deteksi Dini Sekarang.
                                </h2>
                                <p className="mt-6 text-lg leading-8 text-white/70">
                                    Hipertensi dijuluki <i>"The Silent Killer"</i> karena sering muncul tanpa gejala. Sistem pakar <b>TensiTrack</b> membantu Anda mengenali sinyal bahaya sebelum terlambat.
                                </p>
                                <div className="mt-10 flex items-center justify-center gap-x-6">
                                    {/* Changed Button to trigger modal */}
                                    <Button variant="secondary" size="lg" className="text-lg font-bold shadow-lg shadow-secondary/20 hover:scale-105 transition-transform duration-300" onClick={() => setIsModalOpen(true)}>
                                        Mulai Skrining
                                        <ArrowRight className="inline h-5 w-5 ml-2" />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section id="artikel" className="scroll-mt-20 py-16 sm:py-24 bg-gray-50">
                    <div className="container mx-auto px-4">
                        <div className="text-center mb-12">
                            <h2 className="font-bold text-primary text-3xl md:text-4xl">Artikel & Wawasan Terbaru</h2>
                            <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
                                Dapatkan informasi terbaru seputar kesehatan, nutrisi, dan gaya hidup untuk mengelola hipertensi.
                            </p>
                        </div>
                        <Carousel
                            opts={{
                                align: "start",
                                loop: true,
                            }}
                            className="w-full max-w-xs sm:max-w-xl md:max-w-3xl lg:max-w-5xl mx-auto"
                        >
                            <CarouselContent>
                                {[
                                    {
                                        category: 'Wawasan',
                                        title: 'Masalah Hipertensi di Indonesia, Mengapa Deteksi Dini dan Aturan Konsumsi Garam Itu Penting?',
                                        description: 'Mengupas pentingnya deteksi dini dan regulasi asupan garam dalam menanggulangi masalah hipertensi yang meluas di Indonesia.',
                                        imageUrl: 'https://images.pexels.com/photos/5945763/pexels-photo-5945763.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
                                        url: 'https://voi.id/kesehatan/462260/masalah-hipertensi-di-indonesia-mengapa-deteksi-dini-dan-aturan-konsumsi-garam-itu-penting#google_vignette',
                                    },
                                    {
                                        category: 'Pencegahan',
                                        title: 'Bahaya Hipertensi, Upaya Pencegahan dan Pengendalian Hipertensi',
                                        description: 'Artikel resmi dari Kemenkes yang menjelaskan bahaya, serta langkah-langkah pencegahan dan pengendalian hipertensi.',
                                        imageUrl: 'https://images.pexels.com/photos/4031818/pexels-photo-4031818.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
                                        url: 'https://kemkes.go.id/id/bahaya-hipertensi-upaya-pencegahan-dan-pengendalian-hipertensi',
                                    },
                                    {
                                        category: 'Nutrisi',
                                        title: 'Penerapan Dietary Approach to Stop Hypertension (DASH)',
                                        description: 'Panduan praktis dari Kemenkes mengenai penerapan diet DASH sebagai salah satu cara efektif untuk melawan hipertensi.',
                                        imageUrl: 'https://images.pexels.com/photos/1152994/pexels-photo-1152994.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
                                        url: 'https://keslan.kemkes.go.id/view_artikel/2681/penerapan-dietary-approach-to-stop-hypertension-dash',
                                    },
                                    {
                                        category: 'Faktor Risiko',
                                        title: '9 Faktor Risiko Hipertensi yang Perlu Diwaspadai',
                                        description: 'Kenali 9 faktor risiko utama yang dapat memicu hipertensi agar Anda dapat mengambil langkah antisipasi sejak dini.',
                                        imageUrl: 'https://images.pexels.com/photos/7108339/pexels-photo-7108339.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
                                        url: 'https://www.kompas.com/tren/read/2023/03/31/073000465/9-faktor-risiko-hipertensi-yang-perlu-diwaspadai',
                                    },
                                    {
                                        category: 'Olahraga',
                                        title: 'Olahraga untuk Hipertensi: Panduan Lengkap Menurut WHO & Kemenkes RI',
                                        description: 'Panduan lengkap dan aman untuk melakukan olahraga bagi penderita hipertensi, sesuai rekomendasi WHO dan Kemenkes.',
                                        imageUrl: 'https://images.pexels.com/photos/2294361/pexels-photo-2294361.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
                                        url: 'https://www.indonesian-publichealth.com/olahraga-untuk-hipertensi-panduan-lengkap-menurut-who-kemenkes-ri-aman-efektif/',
                                    },
                                ].map((article, index) => (
                                    <CarouselItem key={index} className="sm:basis-1/2 lg:basis-1/3">
                                        <div className="p-1 h-full">
                                            <div className="bg-white border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col h-full">
                                                <a href={article.url} target="_blank" rel="noopener noreferrer" className="block">
                                                    <img src={article.imageUrl} alt={article.title} className="w-full h-48 object-cover" />
                                                </a>
                                                <div className="p-6 flex flex-col flex-grow">
                                                    <p className="text-sm font-semibold text-secondary mb-2">{article.category}</p>
                                                    <h3 className="text-xl font-bold text-primary mb-3 leading-snug flex-grow">{article.title}</h3>
                                                    <p className="text-muted-foreground text-sm mb-4">{article.description}</p>
                                                    <a href={article.url} target="_blank" rel="noopener noreferrer" className="font-semibold text-primary hover:text-secondary transition-colors duration-300 self-start mt-auto">
                                                        Baca Selengkapnya &rarr;
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                            <CarouselPrevious />
                            <CarouselNext />
                        </Carousel>
                    </div>
                </section>

                <section id="faq" className="scroll-mt-20 pt-12 bg-white relative overflow-hidden">
                    <div className="container mx-auto pt-8 px-4">
                        <div className="text-center mb-12">
                            <h2 className="font-bold text-primary text-3xl md:text-4xl">Pertanyaan Umum</h2>
                            <p className="text-muted-foreground">Temukan jawaban untuk pertanyaan yang sering diajukan</p>
                        </div>
                        <FaqSection />
                    </div>
                </section>
            </main>
            <ScrollToTopButton />
        </>
    );
}

// Assign the layout
Welcome.layout = (page: React.ReactElement<PropsWithChildren<{ title?: string, canRegister?: boolean, riskFactors?: RiskFactor[] }>>) => {
    const { title, canRegister, riskFactors } = page.props; // Destructure riskFactors
    return <PublicLayout title={title} canRegister={canRegister} riskFactors={riskFactors} children={page} />;
};