import { Hono } from 'hono';

export const weatherRouter = new Hono();

// GET /api/weather — 获取用户实时天气和环境信息
// 使用 Open-Meteo API（免费、无需 API Key）
// 通过用户的 IP 或传入的经纬度来获取位置
weatherRouter.get('/', async (c) => {
  try {
    const lat = c.req.query('lat');
    const lon = c.req.query('lon');

    let latitude: number;
    let longitude: number;

    if (lat && lon) {
      latitude = parseFloat(lat);
      longitude = parseFloat(lon);
    } else {
      // 默认北京（如果无法获取用户位置）
      latitude = 39.9042;
      longitude = 116.4074;
    }

    // 调用 Open-Meteo API
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=weather_code,is_day&timezone=auto`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Open-Meteo API responded with ${response.status}`);
    }

    const data = await response.json();
    const current = data.current;

    // 获取当前小时以判断时段
    const now = new Date();
    const hour = now.getHours();
    const month = now.getMonth() + 1; // getMonth() 返回 0-11

    // 解析天气代码（WMO Weather interpretation codes）
    // https://open-meteo.com/en/docs#weathervariables
    const weatherCode = current.weather_code;
    const weather = interpretWeatherCode(weatherCode);

    // 判断时段
    let timeOfDay: 'day' | 'night' | 'sunset';
    if (current.is_day === 0) {
      timeOfDay = 'night';
    } else if (hour >= 16 && hour <= 19) {
      timeOfDay = 'sunset';
    } else {
      timeOfDay = 'day';
    }

    // 判断季节
    let season: 'spring' | 'summer' | 'autumn' | 'winter';
    if (month >= 3 && month <= 5) season = 'spring';
    else if (month >= 6 && month <= 8) season = 'summer';
    else if (month >= 9 && month <= 11) season = 'autumn';
    else season = 'winter';

    return c.json({
      weather,
      timeOfDay,
      season,
      hour,
      month,
      location: { latitude, longitude },
    });
  } catch (e) {
    // 降级：返回默认晴好天气
    const now = new Date();
    const hour = now.getHours();
    const month = now.getMonth() + 1;

    let timeOfDay: 'day' | 'night' | 'sunset';
    if (hour >= 20 || hour <= 5) timeOfDay = 'night';
    else if (hour >= 16 && hour <= 19) timeOfDay = 'sunset';
    else timeOfDay = 'day';

    let season: 'spring' | 'summer' | 'autumn' | 'winter';
    if (month >= 3 && month <= 5) season = 'spring';
    else if (month >= 6 && month <= 8) season = 'summer';
    else if (month >= 9 && month <= 11) season = 'autumn';
    else season = 'winter';

    return c.json({
      weather: 'clear',
      timeOfDay,
      season,
      hour,
      month,
      location: null,
      note: '位置获取失败，使用默认值',
    });
  }
});

function interpretWeatherCode(code: number): string {
  if (code === 0) return 'clear';
  if (code >= 1 && code <= 3) return 'cloudy';
  if (code >= 45 && code <= 48) return 'fog';
  if (code >= 51 && code <= 55) return 'drizzle';
  if (code >= 56 && code <= 57) return 'drizzle';
  if (code >= 61 && code <= 65) return 'rain';
  if (code >= 66 && code <= 67) return 'rain';
  if (code >= 71 && code <= 77) return 'snow';
  if (code >= 80 && code <= 82) return 'rain';
  if (code >= 85 && code <= 86) return 'snow';
  if (code >= 95 && code <= 99) return 'thunderstorm';
  return 'clear';
}
