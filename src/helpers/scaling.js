import { useScaleText } from 'react-native-text';

export const scaleText = (fontValue) => {
    const { fontSize, lineHeight } = useScaleText({ fontSize: fontValue });
    return { fontSize, lineHeight };
}