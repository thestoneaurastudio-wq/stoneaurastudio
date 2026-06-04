import { Helmet } from "react-helmet-async";

const SchemaMarkup = () => {
    const schema = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "Organization",
                "name": "Stone Aura Studio",
                "url": "http://localhost:8081",
                "logo": "https://lovable.dev/opengraph-image-p98pqg.png",
                "sameAs": [
                    "https://facebook.com/stoneaurastudio",
                    "https://instagram.com/stoneaurastudio"
                ]
            },
            {
                "@type": "LocalBusiness",
                "name": "Stone Aura Studio",
                "image": "https://lovable.dev/opengraph-image-p98pqg.png",
                "@id": "http://localhost:8081",
                "url": "http://localhost:8081",
                "telephone": "+91 98765 43210",
                "address": {
                    "@type": "PostalAddress",
                    "streetAddress": "Industrial Area",
                    "addressLocality": "Kishangarh",
                    "addressRegion": "Rajasthan",
                    "postalCode": "305801",
                    "addressCountry": "IN"
                },
                "geo": {
                    "@type": "GeoCoordinates",
                    "latitude": 26.5746,
                    "longitude": 74.8659
                },
                "openingHoursSpecification": {
                    "@type": "OpeningHoursSpecification",
                    "dayOfWeek": [
                        "Monday",
                        "Tuesday",
                        "Wednesday",
                        "Thursday",
                        "Friday",
                        "Saturday"
                    ],
                    "opens": "09:00",
                    "closes": "18:30"
                },
                "priceRange": "$$$$"
            }
        ]
    };

    return (
        <Helmet>
            <script type="application/ld+json">
                {JSON.stringify(schema)}
            </script>
        </Helmet>
    );
};

export default SchemaMarkup;
