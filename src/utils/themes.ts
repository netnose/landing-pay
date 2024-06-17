export const availableEmojis = [ '😎', '🤩', '😍', '🥳', '💀', '👻', '👀', '💩', '🦄', '👍', '🫶', '🤌', '🤙', '🎉', '🔥', '❤️', '🟡', '🔵', '🔴', '🟣', '🌈', '🍔', '🍕', '🎩', '⬆️', '🎱', '🎲', '🎰', '🚀', '🔋', '💰', '🔫', '📦' ];

const availableThemes: {
  [key: string]: string
} = {
    yellow: 'rgb(251, 203, 7)',
    based: 'rgb(14, 118, 253)',
    green: 'rgb(60, 136, 39)',
    purple: 'rgb(139, 92, 246)',
    red: 'rgb(255, 4, 32)',
    rainbow: 'linear-gradient(to top right, #f00 0%, #ff8000 20%, #ff0 40%, #0f0 60%, #0080ff 80%, #f0f 100%)'
};

export function getThemes(): string[] {
    let array = [];
    for (const key in availableThemes) {
      array.push(key);
    }
    return array;
}

export function getTheme(theme?: string): string {
    if (!theme || !(theme in availableThemes)) {
      theme = 'based';
    }
    return availableThemes[theme];
}
