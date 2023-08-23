"use client";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

export function Control() {
    const router = useRouter();
    const params = useParams();
    const id = params.id;
    return (
        <ul>
            <li>
                <Link href="/create">create</Link>
            </li>
            {id ? (
                <>
                    <li>
                        <Link href={`/update/${id}`}>update</Link>
                    </li>
                    <li>
                        <button onClick={async () => {
                            const resp = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/topics/${id}`, {
                                method: 'DELETE',
                            });
                            await resp.json();
                            router.push('/');
                            router.refresh();
                        }}>delete
                        </button>
                    </li>
                </>
            ) : null}
        </ul>
    );
}
// server component 내에서는 현재 동적 라우팅의 값([id])을 layout 안에서는 알 수 없음.
// useParams를 사용해야 하는데 useParams는 client component에서 사용 가능.
// app/layout.js 전체를 client component로 전환하는 것은 server component의 이점을 포기해야 함.
// client component의 기능이 필요한 부분만 별도의 컴포넌트로 분리.