import { Hono } from 'hono';
import db from '../db';

export const thoughtsRouter = new Hono();

// POST /api/thoughts — 创建匿名碎碎念
thoughtsRouter.post('/', async (c) => {
  try {
    const { cardId, content } = await c.req.json<{ cardId: string; content: string }>();

    if (!cardId || !content) {
      return c.json({ error: 'cardId 和 content 不能为空' }, 400);
    }

    if (content.length > 200) {
      return c.json({ error: '碎碎念不能超过200字' }, 400);
    }

    if (content.trim().length === 0) {
      return c.json({ error: '内容不能为空' }, 400);
    }

    const stmt = db.prepare('INSERT INTO thoughts (card_id, content) VALUES (?, ?)');
    const result = stmt.run(cardId, content.trim());

    return c.json({
      id: result.lastInsertRowid,
      cardId,
      content: content.trim(),
    }, 201);
  } catch (e) {
    return c.json({ error: '请求格式错误' }, 400);
  }
});

// GET /api/thoughts/:cardId — 随机获取最多10条碎碎念
thoughtsRouter.get('/:cardId', (c) => {
  const { cardId } = c.req.param();

  // 随机抽取，不按时间排序
  const stmt = db.prepare(`
    SELECT id, content FROM thoughts
    WHERE card_id = ?
    ORDER BY RANDOM()
    LIMIT 10
  `);
  const rows = stmt.all(cardId);

  return c.json({
    cardId,
    thoughts: rows,
  });
});
