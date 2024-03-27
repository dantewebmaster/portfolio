import Image from "next/image";

const ghToken = process.env.GH_API_TOKEN;

type User = {
  name: string
  bio: string
  avatar_url: string
  location: string
  company: string
}

async function fetchGithubData(): Promise<User> {
  const data = await fetch('https://api.github.com/users/dantewebmaster', {
    headers: {
      Authorization: 'Bearer ' + ghToken,
    },
  });

  return data.json()
}

export default async function Home() {
  const userData = await fetchGithubData();

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <Image
        src={userData.avatar_url}
        width={200}
        height={200}
        alt={userData.name}
        className="rounded-full mb-4"
      />
      <h1 className="font-thin text-4xl mb-4">{userData.name} - <span>@ {userData.company}</span></h1>
      <hr />
      <p>{userData.location}</p>
      <h3 className="border rounded-lg p-8 mt-4 max-w-screen-sm text-center">{userData.bio}</h3>
    </main>
  );
}
