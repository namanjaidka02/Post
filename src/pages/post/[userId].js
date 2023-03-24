import { useRouter } from "next/router";

export default function UserId() {
  const router = useRouter();
  const userId = router.query.userId;
  return <div>Post {userId}</div>;
}
