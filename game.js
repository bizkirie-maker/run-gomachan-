/**
 * ごまちゃんタイピング — 試作品（ローカル保存のモード別トップ10）
 */

const DIFFICULTY = {
  beginner: { id: "beginner", label: "初級", phraseSec: 5, points: 1, sceneClass: "diff-beginner" },
  intermediate: { id: "intermediate", label: "中級", phraseSec: 4, points: 2, sceneClass: "diff-intermediate" },
  advanced: { id: "advanced", label: "上級", phraseSec: 3, points: 3, sceneClass: "diff-advanced" },
};

const LENGTH_MODE = {
  kabu: { id: "kabu", label: "かぶ", min: 2, max: 5, bonus: 0 },
  tanpopo: { id: "tanpopo", label: "たんぽぽ", min: 6, max: 10, bonus: 1 },
  ninjin: { id: "ninjin", label: "ニンジン", min: 11, max: 15, bonus: 2 },
};

/** エサ＝漢字まじりの文 / 判定＝読み（ひらがな）。打った読みがお題と一致すれば正解（かんじへんかんは不要） */
const PHRASE_PAIRS_KABU = [
  { surface: "今日", reading: "きょう" },
  { surface: "明日", reading: "あした" },
  { surface: "天気", reading: "てんき" },
  { surface: "学校", reading: "がっこう" },
  { surface: "春です", reading: "はるです" },
  { surface: "花咲く", reading: "はなさく" },
  { surface: "猫好き", reading: "ねこすき" },
  { surface: "犬好き", reading: "いぬすき" },
  { surface: "水飲む", reading: "みずのむ" },
  { surface: "風強い", reading: "かぜつよい" },
  { surface: "雲多い", reading: "くもおおい" },
  { surface: "山登る", reading: "やまのぼる" },
  { surface: "川遊び", reading: "かわあそび" },
  { surface: "空青い", reading: "そらあおい" },
  { surface: "今から", reading: "いまから" },
  { surface: "行こう", reading: "いこう" },
  { surface: "帰るよ", reading: "かえるよ" },
  { surface: "元気", reading: "げんき" },
  { surface: "感謝", reading: "かんしゃ" },
  { surface: "了解", reading: "りょうかい" },
  { surface: "注意", reading: "ちゅうい" },
  { surface: "急いで", reading: "いそいで" },
  { surface: "大好き", reading: "だいすき" },
  { surface: "仲良し", reading: "なかよし" },
  { surface: "楽しい", reading: "たのしい" },
  { surface: "早寝る", reading: "はやねる" },
  { surface: "朝だよ", reading: "あさだよ" },
  { surface: "夜だね", reading: "よるだね" },
  { surface: "雨降る", reading: "あめふる" },
  { surface: "雪だね", reading: "ゆきだね" },
  { surface: "読書", reading: "どくしょ" },
  { surface: "散歩", reading: "さんぽ" },
  { surface: "友達", reading: "ともだち" },
  { surface: "学校行く", reading: "がっこういく" },
  { surface: "明日会う", reading: "あしたあう" },
  { surface: "猫可愛い", reading: "ねこかわいい" },
  { surface: "今日は晴れ", reading: "きょうははれ" },
  { surface: "明日は休み", reading: "あしたはやすみ" },
  { surface: "有難うね", reading: "ありがとうね" },
  { surface: "待ってて", reading: "まってて" },
];

const PHRASE_PAIRS_TANPOPO = [
  { surface: "花が咲いたよ", reading: "はながさいたよ" },
  { surface: "空はとても青いよ", reading: "そらはとてもあおいよ" },
  { surface: "今日はきっと晴れる", reading: "きょうはきっとはれる" },
  { surface: "朝ご飯たくさん食べた", reading: "あさごはんたくさんたべた" },
  { surface: "みんなで公園遊ぶ", reading: "みんなでこうえんあそぶ" },
  { surface: "学校へ行くの楽しい", reading: "がっこうへいくのたのしい" },
  { surface: "お弁当とても美味しい", reading: "おべんとうとてもおいしい" },
  { surface: "友達みんな大好き", reading: "ともだちみんなだいすき" },
  { surface: "川ではしゃいで遊んだ", reading: "かわではしゃいであそんだ" },
  { surface: "森の小道を歩いた", reading: "もりのこみちをあるいた" },
  { surface: "人参も嫌いじゃない", reading: "にんじんもきらいじゃない" },
  { surface: "蒲公英を見つけたよ", reading: "たんぽぽをみつけたよ" },
  { surface: "かぶのサラダ食べた", reading: "かぶのさらだたべた" },
  { surface: "春の風が気持ちいい", reading: "はるのかぜがきもちいい" },
  { surface: "秋の夕方散歩した", reading: "あきのゆうがたさんぽした" },
  { surface: "猫が日向で寝てた", reading: "ねこがひなたでねてた" },
  { surface: "犬と公園を歩いた", reading: "いぬとこうえんをあるいた" },
  { surface: "遠足は本当に楽しい", reading: "えんそくはほんとうにたのしい" },
  { surface: "プールで水泳したよ", reading: "ぷーるですいえいしたよ" },
  { surface: "公園の砂場で遊ぶ", reading: "こうえんのすなばであそぶ" },
  { surface: "家族みんなで出かけた", reading: "かぞくみんなででかけた" },
  { surface: "先生はいつも優しい", reading: "せんせいはいつもやさしい" },
  { surface: "友達の家に遊び行く", reading: "ともだちのいえにあそびいく" },
  { surface: "街の本屋さん歩いた", reading: "まちのほんやさんあるいた" },
  { surface: "鞄を持って学校行く", reading: "かばんをもってがっこういく" },
  { surface: "朝からお弁当の準備", reading: "あさからおべんとうのじゅんび" },
  { surface: "菜の花畑が綺麗だ", reading: "なのはなばたけがきれいだ" },
  { surface: "新緑の季節が好き", reading: "しんりょくのきせつがすき" },
  { surface: "食後にお皿洗ったよ", reading: "しょくごにおさらあらったよ" },
  { surface: "正しく箸を使うよ", reading: "ただしくはしをつかうよ" },
];

const PHRASE_PAIRS_NINJIN = [
  { surface: "今日はとても良い天気だね", reading: "きょうはとてもよいてんきだね" },
  { surface: "春の公園の花が綺麗だね", reading: "はるのこうえんのはながきれいだね" },
  { surface: "午後の散歩に行きたいな", reading: "ごごのさんぽにいきたいな" },
  { surface: "放課後友達と一緒に帰る", reading: "ほうかごともだちといっしょにかえる" },
  { surface: "学校の遠足は本当に楽しかった", reading: "がっこうのえんそくはほんとうにたのしかった" },
  { surface: "家族みんな元気に過ごしてる", reading: "かぞくみんなげんきにすごしてる" },
  { surface: "野原の空がとても綺麗だ", reading: "のはらのそらがとてもきれいだ" },
  { surface: "朝から忙しくバタバタしてた", reading: "あさからいそがしくばたばたしてた" },
  { surface: "昼休みの給食が美味しかった", reading: "ひるやすみのきゅうしょくがおいしかった" },
  { surface: "夕焼け見ながら散歩したよ", reading: "ゆうやけみながらさんぽしたよ" },
  { surface: "夜空の星がキラキラ光ってた", reading: "よぞらのほしがきらきらひかってた" },
  { surface: "山の上から月が見えたよ", reading: "やまのうえからつきがみえたよ" },
  { surface: "窓の外で川の音が聞こえた", reading: "まどのそとでかわのおとがきこえた" },
  { surface: "深い森の中は静かで寒い", reading: "ふかいもりのなかはしずかでさむい" },
  { surface: "小鳥が木の上で囀ってた", reading: "ことりがきのうえでさえずってた" },
  { surface: "うちの庭で猫が遊んでたよ", reading: "うちのにわでねこがあそんでたよ" },
  { surface: "公園で犬が尻尾を振ってた", reading: "こうえんでいぬがしっぽをふってた" },
  { surface: "春休みは毎日が楽しかった", reading: "はるやすみはまいにちがたのしかった" },
  { surface: "夏休みの海はとても暑かった", reading: "なつやすみのうみはとてもあつかった" },
  { surface: "雲一つない空が青く続く", reading: "くもひとつないそらがあおくつづく" },
  { surface: "遠足の日のお弁当が最高", reading: "えんそくのひのおべんとうがさいこう" },
  { surface: "先生にちゃんと御礼を言った", reading: "せんせいにちゃんとおれいをいった" },
  { surface: "友達と笑顔で写真を撮った", reading: "ともだちとえがおでしゃしんをとった" },
  { surface: "地元の夏祭りに行ったよ", reading: "じもとのなつまつりにいったよ" },
  { surface: "畑の野菜をたくさん食べた", reading: "はたけのやさいをたくさんたべた" },
];

const $ = (id) => document.getElementById(id);

const state = {
  playing: false,
  gameEndAt: 0,
  phraseEndAt: 0,
  diff: DIFFICULTY.beginner,
  lenMode: LENGTH_MODE.kabu,
  score: 0,
  baitStock: 0,
  /** 判定に使う読み（ひらがな） */
  target: "",
  /** エサに出す表記（漢字まじり） */
  surfaceText: "",
  index: 0,
  raf: 0,
  bunnyX: 4,
  /** IME の変換中は keydown の誤判定を避ける */
  imeSession: false,
};

function randomInt(min, max) {
  return min + Math.floor(Math.random() * (max - min + 1));
}

function pickRandomPhrasePair() {
  const { min, max, id } = state.lenMode;
  const pool =
    id === "kabu"
      ? PHRASE_PAIRS_KABU
      : id === "tanpopo"
        ? PHRASE_PAIRS_TANPOPO
        : PHRASE_PAIRS_NINJIN;
  const candidates = pool.filter((p) => p.surface.length >= min && p.surface.length <= max);
  if (candidates.length > 0) {
    return candidates[randomInt(0, candidates.length - 1)];
  }
  const fallback = pool.filter((p) => p.surface.length >= min);
  if (fallback.length > 0) return fallback[randomInt(0, fallback.length - 1)];
  return PHRASE_PAIRS_KABU[0];
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
  const pair = pickRandomPhrasePair();
  state.surfaceText = pair.surface;
  state.target = pair.reading;
  state.index = 0;
  state.imeSession = false;
  state.phraseEndAt = performance.now() + state.diff.phraseSec * 1000;
  applyBaitVegetableClass();
  $("baitText").textContent = state.surfaceText;
  $("bait").style.setProperty("--bait-x", `${randomInt(44, 86)}%`);
  $("bait").hidden = false;
  $("bait").style.animation = "none";
  void $("bait").offsetHeight;
  $("bait").style.animation = "";
  renderTypeline();
  $("ghostInput").value = "";
}

function renderTypeline() {
  const rest = state.target.slice(state.index);
  const caret = $("caret");
  if (!rest) {
    $("targetLine").innerHTML = "";
    if (caret) caret.classList.add("caret--hide");
    return;
  }
  $("targetLine").innerHTML = `<span class="rest">${escapeHtml(rest)}</span>`;
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

function updateHud(gameRemain, phraseRemain) {
  $("gameTimer").textContent = gameRemain.toFixed(1);
  $("phraseTimer").textContent = Math.max(0, phraseRemain).toFixed(1);
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
  b.style.transform = `translate(${randomInt(-5, 8)}px, ${randomInt(-4, 2)}px) scaleX(-1)`;
  setTimeout(() => {
    b.style.transform = "scaleX(-1)";
  }, 180);
}

function onSuccessPhrase() {
  const pts = phrasePoints();
  state.score += pts;
  state.baitStock += 1;
  bumpBunny();
  newPhrase();
  $("ghostInput").focus({ preventScroll: true });
}

function onMistakeOrTimeout() {
  state.baitStock = Math.max(0, state.baitStock - 1);
  clearTypelineDisplay();
  newPhrase();
}

function endGame() {
  state.playing = false;
  state.imeSession = false;
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
  if (phraseRemain <= 0) {
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
  newPhrase();
  $("ghostInput").focus();
  cancelAnimationFrame(state.raf);
  state.raf = requestAnimationFrame(gameLoop);
}

function resetToSetup() {
  state.playing = false;
  document.body.classList.remove("is-playing");
  cancelAnimationFrame(state.raf);
  $("setupPanel").classList.remove("setup-hidden");
  $("stageWrap").classList.add("setup-hidden");
  $("resultPanel").classList.add("hidden");
  $("bait").hidden = true;
}

function isKanaChar(ch) {
  if (!ch) return false;
  const c = ch.codePointAt(0);
  return (
    (c >= 0x3040 && c <= 0x309f) ||
    (c >= 0x30a0 && c <= 0x30ff) ||
    (c >= 0xff66 && c <= 0xff9f)
  );
}

function processTypedChar(ch) {
  const expected = state.target[state.index];
  if (!expected) return;

  if (ch === expected) {
    state.index += 1;
    renderTypeline();
    if (state.index >= state.target.length) {
      onSuccessPhrase();
    }
  } else {
    onMistakeOrTimeout();
  }
}

function onCompositionStart() {
  state.imeSession = true;
}

function onCompositionEnd(ev) {
  state.imeSession = false;
  if (!state.playing) return;
  const data = ev.data;
  if (!data) {
    ev.target.value = "";
    return;
  }
  ev.target.value = "";
  for (const ch of data) {
    processTypedChar(ch);
    if (!state.playing) return;
  }
}

function onKeydown(ev) {
  if (!state.playing) return;
  if (ev.metaKey || ev.ctrlKey || ev.altKey) return;
  // IME 変換中・セッション中はローマ字等の keydown を無視（誤答で次の文へ進むのを防ぐ）
  if (ev.isComposing || state.imeSession) return;

  if (ev.key === "Backspace") {
    if (state.imeSession || ev.isComposing) return;
    ev.preventDefault();
    state.index = Math.max(0, state.index - 1);
    renderTypeline();
    return;
  }

  if (ev.key === "Enter") {
    if (!ev.isComposing && !state.imeSession) ev.preventDefault();
    return;
  }

  if (ev.key.length !== 1) return;

  const expected = state.target[state.index];
  // compositionstart より前のローマ字1キーが「ミス」になるのを防ぐ（ひらがな待ちは IME 確定まで無視）
  if (expected && isKanaChar(expected) && /^[a-zA-Z]$/.test(ev.key)) {
    ev.preventDefault();
    return;
  }

  ev.preventDefault();
  processTypedChar(ev.key);
}

function init() {
  $("stageWrap").classList.add("setup-hidden");
  $("setupPanel").classList.remove("setup-hidden");

  $("startBtn").addEventListener("click", startGame);
  $("againBtn").addEventListener("click", startGame);
  $("backBtn").addEventListener("click", resetToSetup);
  $("openRankingBtn").addEventListener("click", openRanking);
  $("closeRankBtn").addEventListener("click", closeRanking);

  $("ghostInput").addEventListener("keydown", onKeydown);
  $("ghostInput").addEventListener("compositionstart", onCompositionStart);
  $("ghostInput").addEventListener("compositionend", onCompositionEnd);

  $("ghostInput").addEventListener("input", (ev) => {
    if (!state.playing) return;
    // IME 確定前に value を空にすると変換が壊れたり、1文字でおかしくなる
    if (ev.isComposing) return;
    ev.target.value = "";
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
