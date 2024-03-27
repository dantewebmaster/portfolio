import Image from "next/image";

async function fetchGithubData() {
  const data = await fetch('https://api.github.com/users/dantewebmaster');

  return data.json()
}

export default async function Home() {
  const userData = await fetchGithubData()

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <Image
        src={userData.avatar_url}
        width={200}
        height={200}
        alt={userData.name}
      />
      <h1 className="font-thin text-4xl mb-4">{userData.name}</h1>
      <p>{userData.bio}</p>
    </main>
  );
}
