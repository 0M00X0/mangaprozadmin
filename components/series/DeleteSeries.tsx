import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Head from "next/head";

export default function DeleteSeriesComponent() {
    const router = useRouter();
    const { id } = router.query;

    const [series, setSeries] = useState<any>(null);

    useEffect(() => {
        fetch("/api/series/getseries/" + id)
            .then((res) => res.json())
            .then(({ data }) => {
                if (data && data.length > 0) {
                    setSeries(data[0]); // الوصول إلى السلسلة الأولى في المصفوفة
                }
            });
    }, [id]);

    return (
        <>

            <Head>
                <title>Delete Series - {series && series.seriesname}</title>
                <meta name="description" content="Delete Series" />
                <link rel="icon" href="/favicon.ico" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta property="og:url" content={`${process.env.NEXT_PUBLIC_SITE_URL}/series/delete/${id}`} />
                <meta property="og:type" content="website" />
                <meta property="og:title" content={`Delete Series - ${series && series.seriesname}`} />
                <meta property="og:description" content="Delete Series" />
                <meta property="og:image" content={`${process.env.NEXT_PUBLIC_SITE_URL}/logo.png`} />
                <meta property="og:image:alt" content="Delete Series" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta property="twitter:domain" content={`${process.env.NEXT_PUBLIC_SITE_URL}/series/delete/${id}`} />
                <meta property="twitter:url" content={`${process.env.NEXT_PUBLIC_SITE_URL}/series/delete/${id}`} />
                <meta name="twitter:title" content={`Delete Series - ${series && series.seriesname}`} />
                <meta name="twitter:description" content="Delete Series" />
                <meta name="twitter:image" content={`${process.env.NEXT_PUBLIC_SITE_URL}/logo.png`} />
                <meta name="twitter:image:alt" content="Delete Series" />
            </Head>
            <div>
                <h1>Delete Series</h1>
                {series && (
                    <>
                        <p>Are you sure you want to delete {series.seriesname}?</p>
                        <button onClick={() => router.push("/series")}>No</button>
                        <button
                            onClick={() => {
                                fetch("/api/series/delete/" + id, {
                                    method: "DELETE",
                                })
                                    .then((res) => res.json())
                                    .then(() => router.push("/series"));
                            }}
                        >
                            Yes
                        </button>
                    </>
                )}

            </div>
        </>
    );
}
