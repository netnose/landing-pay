import { Theme } from "@/types/Theme";

export const availableEmojis = [ '😎', '🤩', '😍', '🥳', '💀', '👻', '👀', '💩', '🦄', '👍', '🫶', '🤌', '🤙', '🎉', '🔥', '❤️', '🟡', '🔵', '🔴', '🟣', '🌈', '🍔', '🍕', '🎩', '⬆️', '🎱', '🎲', '🎰', '🚀', '🔋', '💰', '🔫', '📦' ];

const availableThemes: {
  [key: string]: Theme
} = {
  yellow: {
    name: 'Yellow',
    backgroundColor: 'rgb(251, 203, 7)',
    textColor: 'rgb(0, 0, 0)',
    forcedContrast: false
  },
  based: {
    name: 'based',
    backgroundColor: 'rgb(14, 118, 253)',
    textColor: 'rgb(255, 255, 255)',
    forcedContrast: false
  },
  green: {
    name: 'Green',
    backgroundColor: 'rgb(60, 136, 39)',
    textColor: 'rgb(255, 255, 255)',
    forcedContrast: false
  },
  purple: {
    name: 'Purple',
    backgroundColor: 'rgb(139, 92, 246)',
    textColor: 'rgb(255, 255, 255)',
    forcedContrast: false
  },
  red: {
    name: 'Red',
    backgroundColor: 'rgb(255, 4, 32)',
    textColor: 'rgb(255, 255, 255)',
    forcedContrast: false
  },
  rainbow: {
    name: 'Rainbow',
    backgroundColor: 'linear-gradient(to top right, #f00 0%, #ff8000 20%, #ff0 40%, #0f0 60%, #0080ff 80%, #f0f 100%)',
    textColor: 'rgb(255, 255, 255)',
    forcedContrast: true
  }
};

export function getThemes(): string[] {
  let array = [];
  for (const key in availableThemes) {
    array.push(key);
  }
  return array;
}

export function getTheme(theme?: string): Theme {
  if (!theme || !(theme in availableThemes)) {
    theme = 'based';
  }
  return availableThemes[theme];
}
