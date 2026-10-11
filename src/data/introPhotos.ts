export interface IntroPhoto {
  id: number;
  src: string;
  alt: string;
  label: string;
  subtitle: string;
}

export const INTRO_PHOTOS: IntroPhoto[] = [
  {
    id: 1,
    src: "/images/intro/Photo-1.jpeg",
    alt: "Caleb as a baby",
    label: "CHAPTER 01",
    subtitle: "The Journey Begins",
  },
  {
    id: 2,
    src: "/images/intro/Photo-2.jpeg",
    alt: "Young Caleb wearing a blue beanie",
    label: "CHAPTER 02",
    subtitle: "Unstoppable Drive",
  },
  {
    id: 3,
    src: "/images/intro/Photo-3.jpeg",
    alt: "Caleb as a child in the garden",
    label: "CHAPTER 03",
    subtitle: "Golden Memories",
  },
  {
    id: 4,
    src: "/images/intro/Photo-4.jpeg",
    alt: "Caleb parasailing over the water",
    label: "CHAPTER 04",
    subtitle: "True Comradeship",
  },
  {
    id: 5,
    src: "/images/intro/Photo-5.jpeg",
    alt: "Caleb posing with his black dog",
    label: "CHAPTER 05",
    subtitle: "Vision \u0026 Tenacity",
  },
  {
    id: 6,
    src: "/images/intro/Photo-6.jpeg",
    alt: "Caleb taking a selfie in an orange shirt",
    label: "CHAPTER 06",
    subtitle: "Endless Laughter",
  },
  {
    id: 7,
    src: "/images/intro/Photo-7.jpeg",
    alt: "Caleb performing at a keyboard",
    label: "CHAPTER 07",
    subtitle: "Another Year of Greatness",
  },
];
