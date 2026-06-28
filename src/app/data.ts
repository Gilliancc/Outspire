import { conditionMatches } from '../utils/environment';
import type { Environment } from '../utils/environment';

export type Rarity = 'normal' | 'rare' | 'limited';
export type Condition = 'rain' | 'night' | 'sunset' | 'spring' | 'summer' | 'autumn' | 'winter' | 'fog' | 'snow';

export interface InspirationCard {
  id: string;
  title: string;
  description: string;
  rarity: Rarity;
  condition?: Condition;
  icon: string;
}

// ─── 卡片池 ──────────────────────────────────────────────

export const MOCK_CARDS: InspirationCard[] = [
  // ========== 普通款 (37 张) ==========
  // -- 原有 7 张 --
  { id: 'n1', title: '无目的公交车', description: '随便上一辆公交车，在第5站下车，去探索周围的街道吧。', rarity: 'normal', icon: 'bus' },
  { id: 'n2', title: '转角花店', description: '去最近的一家花店，不买花，只停留3分钟闻闻味道。', rarity: 'normal', icon: 'flower' },
  { id: 'n3', title: '便利店寻宝', description: '去便利店买一瓶以前从来没喝过的饮料。', rarity: 'normal', icon: 'coffee' },
  { id: 'n4', title: '观察路人', description: '坐在长椅上，观察并默默为经过的三个路人编一个小故事。', rarity: 'normal', icon: 'users' },
  { id: 'n5', title: '抬头看树', description: '找一棵足够大的树，在树下站一分钟，观察树叶的纹理。', rarity: 'normal', icon: 'tree-deciduous' },
  { id: 'n6', title: '无声散步', description: '摘下耳机，沿着街区走15分钟，只听城市的声音。', rarity: 'normal', icon: 'footprints' },
  { id: 'n7', title: '偶遇菜市场', description: '去附近的菜市场逛一圈，感受一下生机勃勃的烟火气。', rarity: 'normal', icon: 'shopping-basket' },
  // -- 城市漫步类 --
  { id: 'n8', title: '跟着一只猫走', description: '如果路上遇到一只猫，跟着它走一小段路，看看它会带你去哪里。', rarity: 'normal', icon: 'cat' },
  { id: 'n9', title: '下一个路口右转', description: '每到一个路口就右转，看看最终会走到哪里。', rarity: 'normal', icon: 'arrow-right' },
  { id: 'n10', title: '地下街漫游', description: '钻进地下街或地下通道，沿着它走完全程。', rarity: 'normal', icon: 'subway' },
  { id: 'n11', title: '桥上看风景', description: '找一座桥，在桥上停留5分钟看看桥下的水或车流。', rarity: 'normal', icon: 'bridge' },
  { id: 'n12', title: '某一站的终点', description: '上地铁或公交坐到终点站，下车看看终点站有什么不一样。', rarity: 'normal', icon: 'train' },
  { id: 'n13', title: '城市漂流', description: '站在一个路口，选择你第一眼看到的颜色来决定方向。', rarity: 'normal', icon: 'compass' },
  { id: 'n14', title: '随机停下的站点', description: '选一条不熟悉的公交线，随机一站下车。', rarity: 'normal', icon: 'bus' },
  // -- 自然与绿意类 --
  { id: 'n15', title: '公园十分钟', description: '就近找一个公园或绿地，坐在长椅上什么也不做，待够十分钟。', rarity: 'normal', icon: 'park' },
  { id: 'n16', title: '捡一片叶子', description: '在路上找到一片你觉得好看的叶子，带回家做书签。', rarity: 'normal', icon: 'leaf' },
  { id: 'n17', title: '听鸟鸣五分钟', description: '找一个有树的安静角落，闭上眼睛听五分钟鸟叫。', rarity: 'normal', icon: 'music' },
  { id: 'n18', title: '与一棵树打招呼', description: '挑一棵合眼缘的树，用手掌贴住树干，感受它的温度。', rarity: 'normal', icon: 'tree-pine' },
  { id: 'n19', title: '看一朵云的变化', description: '躺下来或仰头，盯着最近的一朵云看三分钟，看它怎么变化。', rarity: 'normal', icon: 'cloud' },
  { id: 'n20', title: '踩落叶的声音', description: '找一条有落叶的路，专门去踩那些干透的叶子听声音。', rarity: 'normal', icon: 'leaf' },
  // -- 食物与味蕾类 --
  { id: 'n21', title: '第一次喝的饮料', description: '去便利店买一瓶你从没喝过的饮料，好不好喝都喝完。', rarity: 'normal', icon: 'beverage' },
  { id: 'n22', title: '街边小吃盲选', description: '在一条小吃街上闭眼转三圈，睁开眼指向哪家吃哪家。', rarity: 'normal', icon: 'cooking-pot' },
  { id: 'n23', title: '陌生水果挑战', description: '去水果店买一个你叫不出名字的水果。', rarity: 'normal', icon: 'apple' },
  { id: 'n24', title: '老街豆浆店', description: '找一家看起来开了很久的早餐店，坐下来喝一杯豆浆。', rarity: 'normal', icon: 'coffee' },
  { id: 'n25', title: '冰淇淋盲选', description: '去一家冰淇淋店，让店员推荐一个你没吃过的口味。', rarity: 'normal', icon: 'ice-cream' },
  // -- 观察与感知类 --
  { id: 'n26', title: '寻找三把椅子', description: '在步行15分钟范围内，找到三把可以坐下休息的椅子或台阶。', rarity: 'normal', icon: 'sofa' },
  { id: 'n27', title: '记住一个陌生人', description: '在地铁或公车上，在备忘录里画下坐在你对面的那个人。', rarity: 'normal', icon: 'eye' },
  { id: 'n28', title: '城市的味道', description: '深吸一口气，定义今天城市的味道。', rarity: 'normal', icon: 'wind' },
  { id: 'n29', title: '赤脚踩踩草地', description: '找一片安全的草地，脱下鞋站10秒钟，感受草地的触感。', rarity: 'normal', icon: 'footprints' },
  { id: 'n30', title: '找一个刻字', description: '在路边的长椅、墙壁或栏杆上，找到一句别人留下的刻字或涂鸦。', rarity: 'normal', icon: 'pen' },
  { id: 'n31', title: '收集三个相同颜色', description: '在路上找到三件颜色完全相同的颜色，记在心里。', rarity: 'normal', icon: 'palette' },
  // -- 随性与小冒险类 --
  { id: 'n32', title: '找一扇蓝色的门', description: '在附近街区找到一扇漆成蓝色的门，停下来看看它的细节。', rarity: 'normal', icon: 'door-open' },
  { id: 'n33', title: '爬一座天桥', description: '找一座人行天桥，从最高点看看这个平视看不到的城市。', rarity: 'normal', icon: 'staircase' },
  { id: 'n34', title: '走一条没走过的路', description: '在你最熟悉的路线中，故意绕到旁边那条你从没走过的小路。', rarity: 'normal', icon: 'route' },
  { id: 'n35', title: '小区探险', description: '随便走进一个住宅小区，看看里面的生活气息。', rarity: 'normal', icon: 'home' },
  { id: 'n36', title: '问路一次', description: '明知道怎么走，也找一个路人问路，听听他如何描述方向。', rarity: 'normal', icon: 'speech' },
  { id: 'n37', title: '日落前的散步', description: '在太阳完全落下之前，出门走一小段路，感受天色渐暗的过程。', rarity: 'normal', icon: 'sunset' },

  // ========== 稀有款 (13 张) ==========
  // -- 原有 3 张 --
  { id: 'r1', title: '老巷寻踪', description: '钻进一条没走过的老巷子，试着找到一只正在打盹的野猫。', rarity: 'rare', icon: 'cat' },
  { id: 'r2', title: '天台风光', description: '找一个可以上去的建筑顶层或天台，俯瞰这座你每天经过的城市。', rarity: 'rare', icon: 'building' },
  { id: 'r3', title: '独立书店角落', description: '去一家独立书店，找到最角落的一个书架，翻开第三排的第一本书。', rarity: 'rare', icon: 'book-open' },
  // -- 扩充 10 张 --
  { id: 'r4', title: '清晨第一个客人', description: '找一个清晨六点开门的小店，做今天第一个客人。', rarity: 'rare', icon: 'sunrise' },
  { id: 'r5', title: '城市最高点', description: '找到你所在片区最高且可以到达的地方，俯瞰全景。', rarity: 'rare', icon: 'mountain' },
  { id: 'r6', title: '无人的电影院', description: '买一张冷门电影的票，体验包场的感觉。', rarity: 'rare', icon: 'film' },
  { id: 'r7', title: '隐秘的茶馆', description: '找一家藏在巷子深处、没有招牌的茶馆或咖啡馆。', rarity: 'rare', icon: 'coffee' },
  { id: 'r8', title: '通宵便利店1点', description: '半夜1点去一趟附近的便利店，看看深夜的城市切片。', rarity: 'rare', icon: 'clock' },
  { id: 'r9', title: '老街手艺铺', description: '找到一家还在经营的老手艺铺子，看师傅工作五分钟。', rarity: 'rare', icon: 'wrench' },
  { id: 'r10', title: '菜场里的花摊', description: '在菜市场里找到一个卖鲜花的小摊，买一小束给自己。', rarity: 'rare', icon: 'flower' },
  { id: 'r11', title: '城市里的秘密花园', description: '找到一座老建筑的屋顶露台或天井花园，发现城市中藏起来的绿意。', rarity: 'rare', icon: 'garden' },
  { id: 'r12', title: '阁楼书店', description: '去找一家藏在二楼或商场里的书店。', rarity: 'rare', icon: 'book-heart' },
  { id: 'r13', title: '夜班巴士的最后一排', description: '坐一趟末班公交，坐在最后一排，看城市的灯光渐次后退。', rarity: 'rare', icon: 'bus' },

  // ========== 限定款 (8 张) ==========
  // -- 原有 3 张 --
  { id: 'l1', title: '雨滴交响曲', description: '找个屋檐或咖啡馆的窗边，安静地看10分钟雨景。', rarity: 'limited', condition: 'rain', icon: 'cloud-rain' },
  { id: 'l2', title: '夜游者', description: '在无人的街道上漫步，感受路灯下属于自己的影子。', rarity: 'limited', condition: 'night', icon: 'moon' },
  { id: 'l3', title: '日落收集', description: '找个视野开阔的地方，记录下今天太阳消失前的最后五分钟。', rarity: 'limited', condition: 'sunset', icon: 'sunset' },
  // -- 扩充 5 张 --
  { id: 'l4', title: '雾中漫步', description: '在起雾的早晨出门，看雾气如何把城市变得陌生又温柔。', rarity: 'limited', condition: 'fog', icon: 'cloud-fog' },
  { id: 'l5', title: '春日赏花路', description: '找一条正在开花的街道或公园小道，慢慢走完它。', rarity: 'limited', condition: 'spring', icon: 'flower' },
  { id: 'l6', title: '秋日扫街路', description: '在一地金黄的秋日街道上慢慢走，听叶子在脚下沙沙作响。', rarity: 'limited', condition: 'autumn', icon: 'leaf' },
  { id: 'l7', title: '夏日蝉鸣角落', description: '循着蝉鸣最响的方向，找到那棵藏了最多夏天的树。', rarity: 'limited', condition: 'summer', icon: 'music' },
  { id: 'l8', title: '冬日暖阳长椅', description: '找一个能晒到太阳的长椅或台阶，在冬日的暖阳下发呆十分钟。', rarity: 'limited', condition: 'winter', icon: 'sun' },
];

// ─── 抽卡逻辑 ──────────────────────────────────────────────

/**
 * 抽卡主逻辑
 * 概率分布：普通 70% / 稀有 25% / 限定 5%
 * 限定卡只在匹配当前环境条件时才进入候选池
 */
export function drawCard(env: Environment): InspirationCard {
  const rand = Math.random(); // 0.0 到 1.0

  // 1. 确定目标稀有度（按概率分层）
  let targetRarity: Rarity;
  if (rand < 0.70) {
    targetRarity = 'normal';
  } else if (rand < 0.95) {
    targetRarity = 'rare';
  } else {
    targetRarity = 'limited';
  }

  // 2. 获取候选池（限定卡需要环境匹配）
  let pool = MOCK_CARDS.filter(c => c.rarity === targetRarity);

  if (targetRarity === 'limited') {
    // 限定卡：只保留匹配当前环境的
    pool = pool.filter(c => conditionMatches(c.condition, env));
  }

  // 3. 如果限定卡候选池为空，降级到稀有 + 普通混合池
  if (pool.length === 0) {
    pool = MOCK_CARDS.filter(c => c.rarity === 'rare' || c.rarity === 'normal');
  }

  // 4. 随机抽取一张
  const selected = pool[Math.floor(Math.random() * pool.length)];
  return selected;
}

/**
 * 检查当前环境下有哪些限定卡可用
 * 用于调试/预览
 */
export function getAvailableLimitedCards(env: Environment): InspirationCard[] {
  return MOCK_CARDS.filter(c => c.rarity === 'limited' && conditionMatches(c.condition, env));
}
