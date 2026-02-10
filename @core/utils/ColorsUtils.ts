export class ColorsUtils {
  static getLuminance(hexColor: string): number {
    const hex = hexColor.replace('#', '')
    const r = parseInt(hex.substring(0, 2), 16) / 255
    const g = parseInt(hex.substring(2, 4), 16) / 255
    const b = parseInt(hex.substring(4, 6), 16) / 255

    const toLinear = (c: number) =>
      c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)

    const rLinear = toLinear(r)
    const gLinear = toLinear(g)
    const bLinear = toLinear(b)

    return 0.2126 * rLinear + 0.7152 * gLinear + 0.0722 * bLinear
  }

  static getContrastColor(
    backgroundColor: string,
    lightColor = '#FFFFFF',
    darkColor?: string
  ): string {
    const luminance = this.getLuminance(backgroundColor)
    const darkTextColor = darkColor || '#2D2F31'
    return luminance > 0.5 ? darkTextColor : lightColor
  }
}
