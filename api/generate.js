export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { theme, target, goal, notes, slideCount } = req.body;

  const missing = [];
  if (!theme?.trim()) missing.push('テーマ');
  if (!target?.trim()) missing.push('ターゲット');
  if (!goal?.trim()) missing.push('目的・ゴール');
  if (!notes?.trim()) missing.push('伝えたい要点・メモ');
  if (!slideCount?.trim()) missing.push('スライド枚数');

  if (missing.length > 0) {
    return res.status(400).json({ error: `入力が不足しています：${missing.join('、')}` });
  }

  const validCounts = ['5〜8枚', '10〜12枚', '15〜20枚'];
  if (!validCounts.includes(slideCount)) {
    return res.status(400).json({ error: 'スライド枚数の値が不正です' });
  }

  if (!process.env.ANTHROPIC_API_KEY) {
    return res.status(500).json({ error: 'APIキーが設定されていません。管理者に連絡してください。' });
  }

  const systemPrompt = `あなたはプレゼン資料構成の専門家です。
ユーザーの入力をもとに、最適なスライド構成案をMarkdown形式で生成してください。

【出力ルール】
- Markdownのみを出力する。前置き・説明文・コメントは一切不要
- 各スライドは「---」で区切る
- 最初のスライドは「# タイトル」形式
- 各スライドの見出しは「## 見出し」形式
- 箇条書きは「- 」を使用
- 図解が効果的な箇所には「> 💡 [図解提案: ○○の図]」を挿入
- 指定された枚数目安に必ず従う
- タイトルスライド・まとめスライドも枚数に含める`;

  const userPrompt = `以下の情報をもとに、スライド構成案を生成してください。

【テーマ】${theme}
【ターゲット】${target}
【目的・ゴール】${goal}
【伝えたい要点・メモ】
${notes}
【スライド枚数の目安】${slideCount}`;

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-5',
        max_tokens: 2000,
        system: systemPrompt,
        messages: [{ role: 'user', content: userPrompt }]
      })
    });

    const data = await response.json();

    if (!response.ok) {
      if (response.status === 401) {
        return res.status(500).json({ error: 'APIキーが無効です。管理者に連絡してください。' });
      }
      if (response.status === 429) {
        return res.status(429).json({ error: 'APIの利用上限に達しました。しばらく待ってから再試行してください。' });
      }
      return res.status(500).json({ error: data.error?.message || 'API呼び出しに失敗しました' });
    }

    const markdown = data.content
      .filter(b => b.type === 'text')
      .map(b => b.text)
      .join('');

    return res.status(200).json({ result: markdown });

  } catch (err) {
    return res.status(500).json({ error: 'サーバーエラーが発生しました: ' + err.message });
  }
}
