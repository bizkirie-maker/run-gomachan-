/**
 * ごまちゃんタイピング — 試作品（ローカル保存のモード別トップ10）
 */

const DIFFICULTY = {
  beginner: { id: "beginner", label: "初級", phraseSec: 5, points: 1, sceneClass: "diff-beginner" },
  intermediate: { id: "intermediate", label: "中級", phraseSec: 4, points: 2, sceneClass: "diff-intermediate" },
  advanced: { id: "advanced", label: "上級", phraseSec: 3, points: 3, sceneClass: "diff-advanced" },
};

const LENGTH_MODE = {
  /** 下文 PHRASES の「読み（yomi）」のひらがなの長さでぶんるい（漢字画数ではない） */
  kabu: { id: "kabu", label: "かぶ", min: 2, max: 5, bonus: 0 },
  tanpopo: { id: "tanpopo", label: "たんぽぽ", min: 6, max: 10, bonus: 1 },
  ninjin: { id: "ninjin", label: "ニンジン", min: 11, max: 15, bonus: 2 },
};

/**
 * text = 画面（単語・複合語中心／小学生向け常用漢字）／yomi = 読みひらがな
 * 野菜モードの長さは yomi の文字（コードポイント）数。
 */
const PHRASES = [
  { text: "犬", yomi: "いぬ" },
  { text: "猫", yomi: "ねこ" },
  { text: "空", yomi: "そら" },
  { text: "海", yomi: "うみ" },
  { text: "川", yomi: "かわ" },
  { text: "山", yomi: "やま" },
  { text: "林", yomi: "はやし" },
  { text: "森", yomi: "もり" },
  { text: "池", yomi: "いけ" },
  { text: "石", yomi: "いし" },
  { text: "花", yomi: "はな" },
  { text: "草", yomi: "くさ" },
  { text: "木陰", yomi: "こかげ" },
  { text: "落葉", yomi: "おちば" },
  { text: "団栗", yomi: "どんぐり" },
  { text: "星", yomi: "ほし" },
  { text: "月", yomi: "つき" },
  { text: "太陽", yomi: "たいよう" },
  { text: "雲", yomi: "くも" },
  { text: "雨", yomi: "あめ" },
  { text: "雪", yomi: "ゆき" },
  { text: "氷", yomi: "こおり" },
  { text: "風", yomi: "かぜ" },
  { text: "花火", yomi: "はなび" },
  { text: "水", yomi: "みず" },
  { text: "土", yomi: "つち" },
  { text: "鳥", yomi: "とり" },
  { text: "魚", yomi: "さかな" },
  { text: "虫", yomi: "むし" },
  { text: "蝶", yomi: "ちょう" },
  { text: "蜂", yomi: "はち" },
  { text: "右手", yomi: "みぎて" },
  { text: "左手", yomi: "ひだりて" },
  { text: "足", yomi: "あし" },
  { text: "目玉", yomi: "めだま" },
  { text: "耳", yomi: "みみ" },
  { text: "口", yomi: "くち" },
  { text: "歯磨き", yomi: "はみがき" },
  { text: "頭", yomi: "あたま" },
  { text: "笠", yomi: "かさ" },
  { text: "傘", yomi: "かさ" },
  { text: "鼻", yomi: "はな" },
  { text: "卵", yomi: "たまご" },
  { text: "米", yomi: "こめ" },
  { text: "麦", yomi: "むぎ" },
  { text: "豆", yomi: "まめ" },
  { text: "茶", yomi: "ちゃ" },
  { text: "紙", yomi: "かみ" },
  { text: "本", yomi: "ほん" },
  { text: "文字", yomi: "もじ" },
  { text: "鉛筆", yomi: "えんぴつ" },
  { text: "消しゴム", yomi: "けしごむ" },
  { text: "教科書", yomi: "きょうかしょ" },
  { text: "宿題", yomi: "しゅくだい" },
  { text: "時間", yomi: "じかん" },
  { text: "教室", yomi: "きょうしつ" },
  { text: "廊下", yomi: "ろうか" },
  { text: "校門", yomi: "こうもん" },
  { text: "図書館", yomi: "としょかん" },
  { text: "体育館", yomi: "たいいくかん" },
  { text: "音楽室", yomi: "おんがくしつ" },
  { text: "理科室", yomi: "りかしつ" },
  { text: "社会科", yomi: "しゃかいか" },
  { text: "校長", yomi: "こうちょう" },
  { text: "先生", yomi: "せんせい" },
  { text: "友達", yomi: "ともだち" },
  { text: "学年", yomi: "がくねん" },
  { text: "組", yomi: "くみ" },
  { text: "番号", yomi: "ばんごう" },
  { text: "村", yomi: "むら" },
  { text: "町", yomi: "まち" },
  { text: "市", yomi: "いち" },
  { text: "水田", yomi: "すいでん" },
  { text: "野原", yomi: "のはら" },
  { text: "門", yomi: "もん" },
  { text: "橋", yomi: "はし" },
  { text: "道", yomi: "みち" },
  { text: "角", yomi: "かど" },
  { text: "丸", yomi: "まる" },
  { text: "天気", yomi: "てんき" },
  { text: "晴れ", yomi: "はれ" },
  { text: "曇り", yomi: "くもり" },
  { text: "虹", yomi: "にじ" },
  { text: "学校", yomi: "がっこう" },
  { text: "小学校", yomi: "しょうがっこう" },
  { text: "中学校", yomi: "ちゅうがっこう" },
  { text: "公園", yomi: "こうえん" },
  { text: "駅", yomi: "えき" },
  { text: "電車", yomi: "でんしゃ" },
  { text: "地下鉄", yomi: "ちかてつ" },
  { text: "地図", yomi: "ちず" },
  { text: "理科実験", yomi: "りかじっけん" },
  { text: "実験器具", yomi: "じっけんきぐ" },
  { text: "理科実験室", yomi: "りかじっけんしつ" },
  { text: "算数問題集", yomi: "さんすうもんだいしゅう" },
  { text: "国語辞典", yomi: "こくごじてん" },
  { text: "作文用紙", yomi: "さくぶんようし" },
  { text: "自由研究", yomi: "じゆうけんきゅう" },
  { text: "読書感想文", yomi: "どくしょかんそうぶん" },
  { text: "音読練習", yomi: "おんどくれんしゅう" },
  { text: "運動会練習", yomi: "うんどうかいれんしゅう" },
  { text: "避難訓練", yomi: "ひなんくんれん" },
  { text: "交通安全", yomi: "こうつうあんぜん" },
  { text: "給食当番", yomi: "きゅうしょくとうばん" },
  { text: "放送委員", yomi: "ほうそういいん" },
  { text: "学級閉鎖", yomi: "がっきゅうへいさ" },
  { text: "自動販売機", yomi: "じどうはんばいき" },
  { text: "電話番号", yomi: "でんわばんごう" },
  { text: "家族旅行", yomi: "かぞくりょこう" },
  { text: "卒業文集", yomi: "そつぎょうぶんしゅう" },
  { text: "茶道教室", yomi: "ちゃどうきょうしつ" },
  { text: "紙飛行機", yomi: "かみひこうき" },
  { text: "卵焼き", yomi: "たまごやき" },
  { text: "麦パン", yomi: "むぎぱん" },
  { text: "国立博物館", yomi: "こくりつはくぶつかん" },
  { text: "大阪城公園", yomi: "おおさかじょうこうえん" },
  { text: "京都清水寺", yomi: "きょうときよみずでら" },
  { text: "富士登山口", yomi: "ふじとざんぐち" },
  { text: "理科実験準備室", yomi: "りかじっけんじゅんびしつ" },
  { text: "図書館貸出期限", yomi: "としょかんかしだしきげん" },
  { text: "小学校生活記録", yomi: "しょうがっこうせいかつきろく" },
  { text: "小学校卒業式", yomi: "しょうがっこうそつぎょうしき" },
  { text: "社会科見学旅行", yomi: "しゃかいかけんがくりょこう" },
  { text: "体育大会開会式", yomi: "たいいくたいかいかいかいしき" },
  { text: "夏休み自由研究", yomi: "なつやすみじゆうけんきゅう" },
  { text: "冬休み読書感想文", yomi: "ふゆやすみどくしょかんそうぶん" },
  { text: "新学期始業式", yomi: "しんがっきしぎょうしき" },
  { text: "国立公園入口", yomi: "こくりつこうえんいりぐち" },
];

function yomiCharCount(yomi) {
  return [...yomi].length;
}

/** 同じ yomi の別表記を集める（読み一致で別漢字も正解） */
/** カタカナ1文字 → ひらがな（比較用） */
function katakanaToHiraganaChar(ch) {
  const c = ch.codePointAt(0);
  if (c >= 0x30a1 && c <= 0x30f6) return String.fromCodePoint(c - 0x60);
  return ch;
}

function normalizeKanaCompareChar(ch) {
  return katakanaToHiraganaChar(ch);
}

const KANA_TO_ROMAJI = {
  あ: "a", い: "i", う: "u", え: "e", お: "o",
  か: "ka", き: "ki", く: "ku", け: "ke", こ: "ko",
  さ: "sa", し: "shi", す: "su", せ: "se", そ: "so",
  た: "ta", ち: "chi", つ: "tsu", て: "te", と: "to",
  な: "na", に: "ni", ぬ: "nu", ね: "ne", の: "no",
  は: "ha", ひ: "hi", ふ: "fu", へ: "he", ほ: "ho",
  ま: "ma", み: "mi", む: "mu", め: "me", も: "mo",
  や: "ya", ゆ: "yu", よ: "yo",
  ら: "ra", り: "ri", る: "ru", れ: "re", ろ: "ro",
  わ: "wa", を: "o", ん: "n",
  が: "ga", ぎ: "gi", ぐ: "gu", げ: "ge", ご: "go",
  ざ: "za", じ: "ji", ず: "zu", ぜ: "ze", ぞ: "zo",
  だ: "da", ぢ: "ji", づ: "zu", で: "de", ど: "do",
  ば: "ba", び: "bi", ぶ: "bu", べ: "be", ぼ: "bo",
  ぱ: "pa", ぴ: "pi", ぷ: "pu", ぺ: "pe", ぽ: "po",
  ぁ: "a", ぃ: "i", ぅ: "u", ぇ: "e", ぉ: "o",
};

const DIGRAPH_TO_ROMAJI = {
  きゃ: "kya", きゅ: "kyu", きょ: "kyo",
  しゃ: "sha", しゅ: "shu", しょ: "sho",
  ちゃ: "cha", ちゅ: "chu", ちょ: "cho",
  にゃ: "nya", にゅ: "nyu", にょ: "nyo",
  ひゃ: "hya", ひゅ: "hyu", ひょ: "hyo",
  みゃ: "mya", みゅ: "myu", みょ: "myo",
  りゃ: "rya", りゅ: "ryu", りょ: "ryo",
  ぎゃ: "gya", ぎゅ: "gyu", ぎょ: "gyo",
  じゃ: "ja", じゅ: "ju", じょ: "jo",
  びゃ: "bya", びゅ: "byu", びょ: "byo",
  ぴゃ: "pya", ぴゅ: "pyu", ぴょ: "pyo",
};

function yomiToRomaji(yomi) {
  const kana = [...yomi].map((ch) => normalizeKanaCompareChar(ch)).join("");
  let out = "";
  let i = 0;
  while (i < kana.length) {
    const ch = kana[i];
    if (ch === "っ") {
      const pair = kana.slice(i + 1, i + 3);
      const nextRoma = DIGRAPH_TO_ROMAJI[pair] || KANA_TO_ROMAJI[kana[i + 1]] || "";
      if (nextRoma) out += nextRoma[0];
      i += 1;
      continue;
    }
    if (ch === "ー") {
      const m = out.match(/[aeiou]$/);
      if (m) out += m[0];
      i += 1;
      continue;
    }
    const pair = kana.slice(i, i + 2);
    if (DIGRAPH_TO_ROMAJI[pair]) {
      out += DIGRAPH_TO_ROMAJI[pair];
      i += 2;
      continue;
    }
    out += KANA_TO_ROMAJI[ch] || ch;
    i += 1;
  }
  return out;
}

const ROMAJI_VARIANT_RULES = [
  ["shi", "si"],
  ["chi", "ti"],
  ["tsu", "tu"],
  ["fu", "hu"],
  ["ji", "zi"],
  ["sha", "sya"],
  ["shu", "syu"],
  ["sho", "syo"],
  ["cha", "tya"],
  ["chu", "tyu"],
  ["cho", "tyo"],
  ["ja", "jya"],
  ["ju", "jyu"],
  ["jo", "jyo"],
];

function replaceOneOccurrenceAll(str, from, to) {
  const out = [];
  let idx = str.indexOf(from);
  while (idx !== -1) {
    out.push(str.slice(0, idx) + to + str.slice(idx + from.length));
    idx = str.indexOf(from, idx + 1);
  }
  return out;
}

function buildRomajiVariants(base, maxVariants = 160) {
  const expansions = ROMAJI_VARIANT_RULES.flatMap(([from, to]) => [
    [from, to],
    [to, from],
  ]);
  const seen = new Set([base]);
  const queue = [base];
  while (queue.length > 0 && seen.size < maxVariants) {
    const cur = queue.shift();
    for (const [from, to] of expansions) {
      const nextList = replaceOneOccurrenceAll(cur, from, to);
      for (const next of nextList) {
        if (seen.has(next)) continue;
        seen.add(next);
        queue.push(next);
        if (seen.size >= maxVariants) break;
      }
      if (seen.size >= maxVariants) break;
    }
  }
  return [...seen].sort((a, b) => {
    if (a === base) return -1;
    if (b === base) return 1;
    return a.length - b.length || a.localeCompare(b);
  });
}

const $ = (id) => document.getElementById(id);

/** `:root` の `--goma-char-scale` と必ず同じ値（CSS とずれると一時的に倍率が崩れる） */
const GOMA_CHAR_SCALE = 1.5;

/** 一文を正しく打ち終えてから次の文へ切り替えるまでの待ち（ミリ秒） */
const PHRASE_SUCCESS_GAP_MS = 620;

const state = {
  playing: false,
  gameEndAt: 0,
  phraseEndAt: 0,
  diff: DIFFICULTY.beginner,
  lenMode: LENGTH_MODE.kabu,
  score: 0,
  baitStock: 0,
  target: "",
  /** 現在の一文 { text, yomi } */
  currentPhrase: null,
  /** ヘボン寄せのベースローマ字 */
  targetChars: [],
  /** 複数ローマ字許容のための候補（入力のたびに prefix で絞り込む） */
  romajiCandidates: [],
  typedRomaji: "",
  index: 0,
  raf: 0,
  bunnyX: 4,
  /** 一文クリア直後〜次の文が始まるまで（この間は文タイムアウトしない・入力も無視） */
  awaitingNextPhrase: false,
};

function randomInt(min, max) {
  return min + Math.floor(Math.random() * (max - min + 1));
}

function pickRandomPhrase() {
  const { min, max } = state.lenMode;
  const candidates = PHRASES.filter((p) => {
    const n = yomiCharCount(p.yomi);
    return n >= min && n <= max;
  });
  if (candidates.length > 0) {
    return candidates[randomInt(0, candidates.length - 1)];
  }
  const fallback = PHRASES.filter((p) => yomiCharCount(p.yomi) >= min);
  if (fallback.length > 0) return fallback[randomInt(0, fallback.length - 1)];
  return PHRASES[0];
}

function rankStorageKey() {
  return `gomaTop10:${state.diff.id}:${state.lenMode.id}`;
}

function loadRank() {
  try {
    const raw = localStorage.getItem(rankStorageKey());
    if (!raw) return [];
    const arr = JSON.parse(raw);
    return Array.isArray(arr) ? arr : [];
  } catch {
    return [];
  }
}

function saveRank(list) {
  localStorage.setItem(rankStorageKey(), JSON.stringify(list));
}

function insertRankEntry(name, score) {
  const list = loadRank()
    .filter((e) => e && typeof e.score === "number")
    .concat([{ name: name || "ななし", score, at: Date.now() }])
    .sort((a, b) => b.score - a.score)
    .slice(0, 10);
  saveRank(list);
  return list;
}

function renderRankList() {
  const list = loadRank();
  const ol = $("rankList");
  ol.innerHTML = "";
  if (list.length === 0) {
    const li = document.createElement("li");
    li.textContent = "まだきろくがありません。";
    ol.appendChild(li);
    return;
  }
  list.forEach((e, i) => {
    const li = document.createElement("li");
    li.textContent = `${i + 1}. ${e.name} — ${e.score} pt`;
    ol.appendChild(li);
  });
}

function openRanking() {
  state.diff = DIFFICULTY[$("difficulty").value];
  state.lenMode = LENGTH_MODE[$("lengthMode").value];
  $("rankContext").textContent = `${state.diff.label} × ${state.lenMode.label}モード（1プレイのスコア）`;
  renderRankList();
  $("rankPanel").classList.remove("hidden");
  $("rankPanel").classList.add("rank-overlay");
}

function closeRanking() {
  $("rankPanel").classList.add("hidden");
  $("rankPanel").classList.remove("rank-overlay");
}

function phrasePoints() {
  return state.diff.points + state.lenMode.bonus;
}

function setSceneDifficultyClass() {
  const scene = $("scene");
  scene.classList.remove("diff-beginner", "diff-intermediate", "diff-advanced");
  scene.classList.add(state.diff.sceneClass);
}

/** 野菜モードに合わせてエサの見た目（かぶ／たんぽぽ／ニンジン）を切り替え */
function applyBaitVegetableClass() {
  const el = $("bait");
  if (!el) return;
  el.classList.remove("bait--kabu", "bait--tanpopo", "bait--ninjin");
  el.classList.add(`bait--${state.lenMode.id}`);
}

function newPhrase() {
  state.awaitingNextPhrase = false;
  state.currentPhrase = pickRandomPhrase();
  state.target = state.currentPhrase.text;
  const baseRomaji = yomiToRomaji(state.currentPhrase.yomi);
  state.targetChars = [...baseRomaji];
  state.romajiCandidates = buildRomajiVariants(baseRomaji);
  state.typedRomaji = "";
  state.index = 0;
  state.phraseEndAt = performance.now() + state.diff.phraseSec * 1000;
  applyBaitVegetableClass();
  const baitKanji = $("baitText");
  if (baitKanji)
    baitKanji.innerHTML = phraseRubyHtml(state.currentPhrase.text, state.currentPhrase.yomi);
  const scene = $("scene");
  const bait = $("bait");
  if (scene) scene.style.setProperty("--bait-cross-sec", `${state.diff.phraseSec}s`);
  bait.hidden = false;
  bait.classList.remove("bait--crossing");
  void bait.offsetHeight;
  bait.classList.add("bait--crossing");
  renderTypeline();
  $("ghostInput").value = "";
}

function renderTypeline() {
  const guide = state.romajiCandidates.find((s) => s.startsWith(state.typedRomaji)) || state.targetChars.join("");
  const rest = guide.slice(state.typedRomaji.length);
  /** 寿司打風：打ち終わった文字は表示せず、ローマ字の残りだけ見せる */
  $("targetLine").innerHTML = `<span class="rest">${escapeHtml(rest)}</span>`;
  const caret = $("caret");
  if (caret) caret.classList.remove("caret--hide");
}

/** 文が終わったあと、さっき打った表示を消す */
function clearTypelineDisplay() {
  $("targetLine").innerHTML = "";
  const caret = $("caret");
  if (caret) caret.classList.add("caret--hide");
}

function escapeHtml(s) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

/** お題に読み（ひらがな）のふりがなを付ける（HTML の ruby） */
function phraseRubyHtml(text, yomi) {
  return `<ruby class="phrase-ruby">${escapeHtml(text)}<rt class="phrase-ruby-yomi">${escapeHtml(yomi)}</rt></ruby>`;
}

function updateHud(gameRemain, phraseRemain) {
  $("gameTimer").textContent = gameRemain.toFixed(1);
  $("phraseTimer").textContent = state.awaitingNextPhrase ? "—" : Math.max(0, phraseRemain).toFixed(1);
  $("score").textContent = String(state.score);
  $("stockCount").textContent = String(state.baitStock);
}

function updateBunnyMotion() {
  const scene = $("scene");
  const bunny = $("bunny");
  const bait = $("bait");
  if (!scene || !bunny || !bait || bait.hidden) return;

  const sceneRect = scene.getBoundingClientRect();
  const baitRect = bait.getBoundingClientRect();
  const baitPercent = ((baitRect.left + baitRect.width / 2 - sceneRect.left) / sceneRect.width) * 100;
  const target = Math.max(3, Math.min(72, baitPercent - 16));
  state.bunnyX += (target - state.bunnyX) * 0.06;
  bunny.style.left = `${state.bunnyX.toFixed(2)}%`;
}

function bumpBunny() {
  const b = $("bunny");
  if (!b) return;
  b.style.transform = `translate(${randomInt(-5, 8)}px, ${randomInt(-4, 2)}px) scaleX(-1) scale(${GOMA_CHAR_SCALE})`;
  window.setTimeout(() => {
    b.style.transform = "";
  }, 180);
}

function onSuccessPhrase() {
  const pts = phrasePoints();
  state.score += pts;
  state.baitStock += 1;
  bumpBunny();
  state.awaitingNextPhrase = true;
  /** blur しない：フォーカスが外れると次の文まで IME が効かず Enter／クリックが必要になるため */
  window.setTimeout(() => {
    if (!state.playing) return;
    newPhrase();
    $("ghostInput").focus({ preventScroll: true });
  }, PHRASE_SUCCESS_GAP_MS);
}

function onMistakeOrTimeout() {
  state.baitStock = Math.max(0, state.baitStock - 1);
  clearTypelineDisplay();
  const bait = $("bait");
  if (bait) bait.classList.remove("bait--crossing");
  newPhrase();
}

function endGame() {
  state.playing = false;
  detachPlayKeyCapture();
  state.awaitingNextPhrase = false;
  document.body.classList.remove("is-playing");
  cancelAnimationFrame(state.raf);
  $("ghostInput").blur();
  $("bait").hidden = true;
  $("resultPanel").classList.remove("hidden");
  $("finalScore").textContent = String(state.score);
  const name = ($("playerName").value || "").trim() || "ななし";
  const before = loadRank();
  const minTop = before.length < 10 ? 0 : before[before.length - 1].score;
  const qualifies = state.score > 0 && (before.length < 10 || state.score > minTop);
  if (qualifies) {
    insertRankEntry(name, state.score);
    $("rankMessage").textContent = "トップ10にきろくしました！（このブラウザだけに保存されます）";
  } else if (state.score <= 0) {
    $("rankMessage").textContent = "スコアが0だとランキングにはのりません。つぎはがんばって！";
  } else {
    $("rankMessage").textContent = "トップ10にはいりませんでした。またチャレンジしてね。";
  }
}

function gameLoop(now) {
  if (!state.playing) return;
  const gameRemain = Math.max(0, (state.gameEndAt - now) / 1000);
  const phraseRemain = (state.phraseEndAt - now) / 1000;
  updateHud(gameRemain, phraseRemain);
  updateBunnyMotion();

  if (gameRemain <= 0) {
    endGame();
    return;
  }
  if (!state.awaitingNextPhrase && phraseRemain <= 0) {
    onMistakeOrTimeout();
  }
  state.raf = requestAnimationFrame(gameLoop);
}

function startGame() {
  state.diff = DIFFICULTY[$("difficulty").value];
  state.lenMode = LENGTH_MODE[$("lengthMode").value];
  setSceneDifficultyClass();
  state.score = 0;
  state.baitStock = 0;
  state.playing = true;
  state.bunnyX = 4;
  document.body.classList.add("is-playing");
  const now = performance.now();
  state.gameEndAt = now + 60_000;
  $("resultPanel").classList.add("hidden");
  $("setupPanel").classList.add("setup-hidden");
  $("stageWrap").classList.remove("setup-hidden");
  attachPlayKeyCapture();
  newPhrase();
  $("ghostInput").focus({ preventScroll: true });
  cancelAnimationFrame(state.raf);
  state.raf = requestAnimationFrame(gameLoop);
}

function resetToSetup() {
  state.playing = false;
  detachPlayKeyCapture();
  state.awaitingNextPhrase = false;
  document.body.classList.remove("is-playing");
  cancelAnimationFrame(state.raf);
  $("setupPanel").classList.remove("setup-hidden");
  $("stageWrap").classList.add("setup-hidden");
  $("resultPanel").classList.add("hidden");
  $("bait").hidden = true;
}

function processTypedChar(ch) {
  if (state.awaitingNextPhrase) return;

  const nextPrefix = `${state.typedRomaji}${ch}`;
  const narrowed = state.romajiCandidates.filter((romaji) => romaji.startsWith(nextPrefix));
  if (narrowed.length === 0) {
    onMistakeOrTimeout();
    return;
  }
  state.romajiCandidates = narrowed;
  state.typedRomaji = nextPrefix;
  state.index = state.typedRomaji.length;
  renderTypeline();

  const done = narrowed.length === 1 && narrowed[0] === state.typedRomaji;
  if (done) onSuccessPhrase();
}

function onPlayKeydown(ev) {
  if (!state.playing || state.awaitingNextPhrase) return;
  if (ev.metaKey || ev.ctrlKey || ev.altKey) return;
  if (ev.isComposing) return;

  /** 寿司打：ひらがな・漢字の変換確定ではなく、ローマ字のみ */
  if (ev.key === "Enter") {
    ev.preventDefault();
    return;
  }
  if (ev.key === "Backspace") {
    ev.preventDefault();
    return;
  }
  if (ev.key === " " || ev.key === "　") {
    ev.preventDefault();
    return;
  }

  if (!/^[a-zA-Z]$/.test(ev.key)) return;

  ev.preventDefault();
  ev.stopPropagation();
  processTypedChar(ev.key.toLowerCase());
}

function attachPlayKeyCapture() {
  detachPlayKeyCapture();
  window.addEventListener("keydown", onPlayKeydown, true);
}

function detachPlayKeyCapture() {
  window.removeEventListener("keydown", onPlayKeydown, true);
}

function init() {
  $("stageWrap").classList.add("setup-hidden");
  $("setupPanel").classList.remove("setup-hidden");

  $("startBtn").addEventListener("click", startGame);
  $("againBtn").addEventListener("click", startGame);
  $("backBtn").addEventListener("click", resetToSetup);
  $("openRankingBtn").addEventListener("click", openRanking);
  $("closeRankBtn").addEventListener("click", closeRanking);

  $("ghostInput").addEventListener("input", (ev) => {
    if (!state.playing || state.awaitingNextPhrase) return;
    ev.target.value = "";
  });

  $("ghostInput").addEventListener("paste", (ev) => {
    if (state.playing) ev.preventDefault();
  });

  const refocus = () => {
    if (state.playing) $("ghostInput").focus({ preventScroll: true });
  };
  $("scene").addEventListener("click", refocus);
  $("difficulty").addEventListener("change", () => {
    if (!state.playing) {
      state.diff = DIFFICULTY[$("difficulty").value];
      setSceneDifficultyClass();
    }
  });

  setSceneDifficultyClass();
}

init();
