const dummyAvatar =
  "data:image/svg+xml;utf8," +
  "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'>" +
  "<rect width='200' height='200' fill='%23e5e7eb'/>" +
  "<circle cx='100' cy='80' r='40' fill='%239ca3af'/>" +
  "<path d='M40 190c10-50 50-70 60-70s50 20 60 70' fill='%239ca3af'/>" +
  "</svg>";

const profile = {
  name: "홍길동",
  bio: "한 줄 소개가 여기에 들어갑니다",
  image: dummyAvatar,
};

const links = [
  { title: "GitHub", url: "https://github.com/" },
  { title: "LinkedIn", url: "https://www.linkedin.com/" },
  { title: "Blog", url: "https://example.com/blog" },
];

export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-md flex-1 flex-col items-center gap-6 px-6 py-16">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={profile.image}
        alt={profile.name}
        className="h-36 w-36 rounded-full object-cover"
      />

      <div className="text-center">
        <h1 className="text-2xl font-bold">{profile.name}</h1>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">{profile.bio}</p>
      </div>

      <div className="flex w-full flex-col gap-5">
        {links.map((link) => (
          <a
            key={link.title}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full rounded-2xl border border-gray-200 px-4 py-3 text-center font-medium transition hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-gray-900"
          >
            {link.title}
          </a>
        ))}
      </div>
    </main>
  );
}
