const FeaturedIn = () => {
    const publications = [
        "Architectural Digest",
        "Elle Decor",
        "Vogue Living",
        "The Economic Times",
        "The Hindu",
        "YourStory"
    ];

    return (
        <section className="py-12 bg-white border-y border-stone-100">
            <div className="container mx-auto px-6">
                <p className="text-center text-[10px] uppercase tracking-[0.4em] text-muted-foreground mb-8">
                    Featured In & Recognized By
                </p>
                <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-40 hover:opacity-100 transition-opacity duration-500 grayscale hover:grayscale-0">
                    {publications.map((news) => (
                        <div key={news} className="text-lg md:text-2xl font-serif text-charcoal font-bold tracking-tighter">
                            {news}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturedIn;
