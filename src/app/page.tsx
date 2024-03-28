import Image from "next/image";

import { IconBrandLinkedin } from "@tabler/icons-react";

const ghToken = process.env.GH_API_TOKEN;

type SocialAccount = {
  provider: string;
  url: string;
};

type User = {
  name: string;
  bio: string;
  avatar_url: string;
  location: string;
  company: string;
  social_accounts: SocialAccount[];
};

async function fetchGithubData(): Promise<User> {
  const headers = {
    Authorization: "Bearer " + ghToken,
  };

  const data = await fetch("https://api.github.com/users/dantewebmaster", {
    headers,
  });

  const socialAccounts = await fetch(
    "https://api.github.com/users/dantewebmaster/social_accounts",
    {
      headers,
    }
  );

  const userData = await data.json();
  const socialData = await socialAccounts.json();

  return {
    ...userData,
    social_accounts: socialData,
  };
}

const socialIconsMap: any = {
  linkedin: <IconBrandLinkedin stroke={1} size={40} />,
};

export default async function Home() {
  const userData = await fetchGithubData();

  return (
    <main className="flex min-h-screen flex-col items-center py-24 px-6">
      <Image
        src={userData.avatar_url}
        width={200}
        height={200}
        alt={userData.name}
        className="rounded-full mb-4"
      />
      <h1 className="font-thin text-4xl mb-4">
        {userData.name} - <span>@ {userData.company}</span>
      </h1>
      <hr />
      <p>{userData.location}</p>
      <h3 className="border rounded-lg p-8 mt-4 max-w-screen-sm text-center">
        {userData.bio}
      </h3>
      <ul className="mt-4">
        {userData.social_accounts.map((social) => (
          <li key={social.provider}>
            <a
              href={social.url}
              target="_blank"
              className="flex items-center gap-1"
              rel="noopener noreferrer"
            >
              {socialIconsMap[social.provider]} {social.provider}
            </a>
          </li>
        ))}
      </ul>
    </main>
  );
}
