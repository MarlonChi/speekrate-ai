import { interviewCovers, mappings } from "@/constants";

const techIconBaseURL = "https://cdn.jsdelivr.net/gh/devicons/devicon/icons";

export const getTechLogos = async (techArray: string[]) => {
  const logoURLs = techArray.map((tech) => {
    const normalized = normalizeTechName(tech);

    return {
      tech,
      url: `${techIconBaseURL}/${normalized}/${normalized}-original.svg`,
    };
  });

  const results = await Promise.all(
    logoURLs.map(async ({ tech, url }) => ({
      tech,
      url: (await checkIconExists(url)) ? url : "/tech.svg",
    })),
  );

  return results;
};

const checkIconExists = async (url: string) => {
  try {
    const response = await fetch(url, { method: "HEAD" });

    // Returns true if the icon exists
    return response.ok;
  } catch {
    return false;
  }
};

const normalizeTechName = (tech: string) => {
  const key = tech.toLowerCase().replace(/\.js$/, "").replace(/\s+/g, "");

  return mappings[key as keyof typeof mappings];
};

export const getRandomInterviewCover = () => {
  const randomIndex = Math.floor(Math.random() * interviewCovers.length);

  return `/covers${interviewCovers[randomIndex]}`;
};
