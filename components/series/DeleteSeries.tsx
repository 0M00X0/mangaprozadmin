import { useRouter } from "next/router";
import { useEffect, useState } from "react";


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
    );
}
