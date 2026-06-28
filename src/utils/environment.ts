// ─── Environment Types ───────────────────────────────────────
export interface Environment {
  weather: string;           // 'clear' | 'cloudy' | 'rain' | 'drizzle' | 'thunderstorm' | 'fog' | 'haze' | 'mist' | 'snow' | 'drifting-snow'
  timeOfDay: 'day' | 'night' | 'sunset';
  season: 'spring' | 'summer' | 'autumn' | 'winter';
  hour: number;
  month: number;
}

// Open-Meteo weather codes
type WmoCode = number;
const WEATHER_MAP: Record<number, string> = {
  0: 'clear',
  1: 'clear',
  2: 'cloudy',
  3: 'cloudy',
  45: 'fog',
  48: 'fog',
  51: 'drizzle',
  53: 'drizzle',
  55: 'drizzle',
  56: 'drizzle',
  57: 'drizzle',
  61: 'rain',
  63: 'rain',
  65: 'rain',
  66: 'rain',
  67: 'rain',
  71: 'snow',
  73: 'snow',
  75: 'snow',
  77: 'snow',
  80: 'rain',
  81: 'rain',
  82: 'rain',
  85: 'snow',
  86: 'snow',
  95: 'thunderstorm',
  96: 'thunderstorm',
  99: 'thunderstorm',
};

function getSeason(month: number): Environment['season'] {
  if (month >= 3 && month <= 5) return 'spring';
  if (month >= 6 && month <= 8) return 'summer';
  if (month >= 9 && month <= 11) return 'autumn';
  return 'winter';
}

function getTimeOfDay(hour: number, isDay: number): Environment['timeOfDay'] {
  if (isDay === 0) return 'night';
  if (hour >= 17 && hour <= 19) return 'sunset';
  return 'day';
}

/**
 * 获取用户位置的实时环境信息。
 * 优先使用浏览器 Geolocation API 获取坐标，
 * 降级到 IP 定位（后端处理）。
 */
export async function fetchEnvironment(): Promise<Environment> {
  try {
    // 尝试获取经纬度
    const coords = await getCurrentPosition();
    const url = `/api/weather?lat=${coords.latitude}&lon=${coords.longitude}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error('Weather API error');
    const data = await res.json();
    return {
      weather: data.weather,
      timeOfDay: data.timeOfDay,
      season: data.season,
      hour: data.hour,
      month: data.month,
    };
  } catch {
    // 降级：使用后端默认位置
    try {
      const res = await fetch('/api/weather');
      if (!res.ok) throw new Error('Fallback API error');
      const data = await res.json();
      return {
        weather: data.weather,
        timeOfDay: data.timeOfDay,
        season: data.season,
        hour: data.hour,
        month: data.month,
      };
    } catch {
      // 最终降级：纯客户端估算
      return getFallbackEnvironment();
    }
  }
}

/**
 * 最终降级方案：纯客户端估算，不发请求
 */
export function getFallbackEnvironment(): Environment {
  const now = new Date();
  const hour = now.getHours();
  const month = now.getMonth() + 1;

  return {
    weather: 'clear' as const,
    timeOfDay: hour >= 20 || hour <= 5 ? 'night' as const : (hour >= 17 && hour <= 19 ? 'sunset' as const : 'day' as const),
    season: getSeason(month),
    hour,
    month,
  };
}

/** 浏览器定位 Promise 封装 */
function getCurrentPosition(): Promise<GeolocationCoordinates> {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation not supported'));
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => resolve(pos.coords),
      (err) => reject(err),
      { timeout: 5000, enableHighAccuracy: false }
    );
  });
}

interface GeolocationCoordinates {
  latitude: number;
  longitude: number;
}

/** 判断给定卡片条件是否匹配当前环境 */
export function conditionMatches(
  condition: string | undefined,
  env: Environment
): boolean {
  if (!condition) return true; // 普卡/稀有无条件

  switch (condition) {
    case 'rain':
      return ['rain', 'drizzle', 'thunderstorm'].includes(env.weather);
    case 'fog':
      return ['fog', 'haze', 'mist'].includes(env.weather);
    case 'snow':
      return ['snow', 'drifting-snow'].includes(env.weather);
    case 'night':
      return env.timeOfDay === 'night';
    case 'sunset':
      return env.timeOfDay === 'sunset';
    case 'spring':
      return env.season === 'spring';
    case 'summer':
      return env.season === 'summer';
    case 'autumn':
      return env.season === 'autumn';
    case 'winter':
      return env.season === 'winter';
    default:
      return false;
  }
}

/** Open-Meteo weather code 转字符串 */
export function wmoCodeToString(code: WmoCode): string {
  return WEATHER_MAP[code] || 'clear';
}

/** 天气代码转中文天气标签 */
export function getWeatherLabel(weather: string): string {
  const labels: Record<string, string> = {
    clear: '晴天',
    cloudy: '多云',
    rain: '雨天',
    drizzle: '小雨',
    thunderstorm: '雷雨',
    fog: '有雾',
    haze: '霾',
    mist: '薄雾',
    snow: '下雪',
    'drifting-snow': '飘雪',
  };
  return labels[weather] || '晴天';
}
