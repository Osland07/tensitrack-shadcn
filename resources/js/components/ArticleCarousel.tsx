import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@/components/ui/carousel';
import { ChevronLeft, ChevronRight } from 'lucide-react'; // Keep for other uses if needed, or remove if not used elsewhere
import { Button } from '@/components/ui/button';

interface Article {
    imgSrc: string;
    imgAlt: string;
    title: string;
    description: string;
    href: string;
}

const articles: Article[] = [
    {
        imgSrc: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
        imgAlt: "Dokter Hipertensi",
        title: "Masalah Hipertensi di Indonesia, Mengapa Deteksi Dini Penting?",
        description: "Masalah hipertensi masih menjadi perhatian serius di Indonesia, seiring tingginya angka penderita yang belum terdiagnosis.",
        href: "https://voi.id/kesehatan/462260/masalah-hipertensi-di-indonesia-mengapa-deteksi-dini-dan-aturan-konsumsi-garam-itu-penting#google_vignette",
    },
    {
        imgSrc: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
        imgAlt: "Bahaya Hipertensi",
        title: "Bahaya Hipertensi, Upaya Pencegahan dan Pengendalian",
        description: "Hipertensi atau tekanan darah tinggi merupakan penyebab kematian nomor satu di dunia jika tidak segera ditangani.",
        href: "https://kemkes.go.id/id/bahaya-hipertensi-upaya-pencegahan-dan-pengendalian-hipertensi",
    },
    {
        imgSrc: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
        imgAlt: "Diet DASH",
        title: "Penerapan Dietary Approach to Stop Hypertension (DASH)",
        description: "Diet DASH merupakan pola makan sehat yang telah terbukti membantu menurunkan tekanan darah dan kolesterol.",
        href: "https://keslan.kemkes.go.id/view_artikel/2681/penerapan-dietary-approach-to-stop-hipertensi-dash",
    },
    {
        imgSrc: "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
        imgAlt: "Faktor Risiko",
        title: "9 Faktor Risiko Hipertensi yang Perlu Diwaspadai",
        description: "Kenali faktor risiko yang dapat memicu tekanan darah tinggi mulai dari gaya hidup hingga genetik.",
        href: "https://www.kompas.com/tren/read/2023/03/31/073000465/9-faktor-risiko-hipertensi-yang-perlu-diwaspadai",
    },
    {
        imgSrc: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
        imgAlt: "Olahraga Hipertensi",
        title: "Olahraga untuk Hipertensi: Panduan Lengkap & Aman",
        description: "Panduan lengkap olahraga yang aman dan efektif menurut WHO & Kemenkes RI untuk penderita hipertensi.",
        href: "https://www.indonesian-publichealth.com/olahraga-untuk-hipertensi-panduan-lengkap-menurut-who-kemenkes-ri-aman-efektif/",
    },
];

const ArticleCarousel = () => {
    return (
        <Carousel
            opts={{
                align: "start",
            }}
            className="w-full max-w-screen-md mx-auto"
        >
            <CarouselContent className="-ml-4">
                {articles.map((article, index) => (
                    <CarouselItem key={index} className="basis-1/3 pl-4"> {/* Adjusted to show 3 items */}
                        <div className="p-1">
                            <Card className="shadow-sm flex-shrink-0 article-card"
                                style={{ borderRadius: '12px' }}>
                                <CardContent className="flex flex-col text-center p-0">
                                    <div className="overflow-hidden"
                                        style={{ borderTopLeftRadius: '12px', borderTopRightRadius: '12px' }}>
                                        <img src={article.imgSrc}
                                            className="w-full h-48 object-cover transition-transform duration-300 rounded-t-xl" alt={article.imgAlt} />
                                    </div>
                                    <div className="card-body flex flex-col items-center text-center p-4">
                                        <h5 className="font-bold text-primary text-lg mb-3">
                                            {article.title}
                                        </h5>
                                        <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                                            {article.description}
                                        </p>
                                        <a href={article.href}
                                            target="_blank" className="mt-auto underline font-semibold text-primary">
                                            Baca selengkapnya
                                        </a>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full shadow-sm border-secondary z-20 flex items-center justify-center"
                style={{ backgroundColor: '#001B48', color: '#E3943B', border: '1px solid #E3943B' }} />
            <CarouselNext className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 rounded-full shadow-sm border-secondary z-20 flex items-center justify-center"
                style={{ backgroundColor: '#001B48', color: '#E3943B', border: '1px solid #E3943B' }} />
        </Carousel>
    );
};

export default ArticleCarousel;
