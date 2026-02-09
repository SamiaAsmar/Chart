import { getLuminance } from './Luminance'

export class ColorsUtils {
  static getContrastColor(
    backgroundColor: string,
    lightColor = 'FFFFFF',
    darkColor?: string
  ): string {
    const luminance = getLuminance(backgroundColor)
    const darkTextColor = darkColor || '2D2F31'
    return luminance > 0.5 ? darkTextColor : lightColor
  }

}
