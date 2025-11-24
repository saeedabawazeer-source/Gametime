export interface AdBlock {
  id: number;
  title: string;
  progress: number; // 0 to 100
  buttonText: string;
  adsCount: number;
  rewardMinutes: number;
}

export interface NavLink {
  label: string;
  href: string;
  active?: boolean;
}
