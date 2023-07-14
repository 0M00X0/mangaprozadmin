import { useRouter } from "next/router";
import { useEffect, useState } from "react";
 

export default function DeleteuserComponent() {
    const router = useRouter();
    const { id } = router.query;

    const [user, setuser] = useState<any>(null);

    useEffect(() => {
        fetch("/api/users/getuser/" + id)
            .then((res) => res.json())
            .then(({ data }) => {
                if (data && data.length > 0) {
                    setuser(data[0]); // الوصول إلى السلسلة الأولى في المصفوفة
                }
            });
    }, [id]);

    return (
        <div>
            <h1>Delete user</h1>
            {user && (
                <>
                    <p>Are you sure you want to delete {user.name}?</p>
                    <button onClick={() => router.push("/users")}>No</button>
                    <button
                        onClick={() => {
                            fetch("/api/users/delete/" + id, {
                                method: "DELETE",
                            })
                                .then((res) => res.json())
                                .then(() => router.push("/users"));
                        }}
                    >
                        Yes
                    </button>
                </>
            )}
        </div>
    );
}
