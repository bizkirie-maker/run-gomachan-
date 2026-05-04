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
 * text = 画面・入力する表記 / yomi = ぶんどり用の読み（ひらがな）。長さは yomi の文字数＝発音のイメージ（例: 遠足→えんそく＝4）
 * IME はいつもどおり text にそろえる
 */
const PHRASES = [
  { text: "犬", yomi: "いぬ" },
  { text: "猫", yomi: "ねこ" },
  { text: "空", yomi: "そら" },
  { text: "海", yomi: "うみ" },
  { text: "花", yomi: "はな" },
  { text: "林", yomi: "はやし" },
  { text: "魚", yomi: "さかな" },
  { text: "鳥", yomi: "とり" },
  { text: "今日", yomi: "きょう" },
  { text: "明日", yomi: "あした" },
  { text: "学校", yomi: "がっこう" },
  { text: "天気", yomi: "てんき" },
  { text: "遠足", yomi: "えんそく" },
  { text: "おはよう", yomi: "おはよう" },
  { text: "がんばれ", yomi: "がんばれ" },
  { text: "ありがとう", yomi: "ありがとう" },
  { text: "またね", yomi: "またね" },
  { text: "だいすき", yomi: "だいすき" },
  { text: "やったね", yomi: "やったね" },
  { text: "すごいね", yomi: "すごいね" },
  { text: "はやねよう", yomi: "はやねよう" },
  { text: "あそぼうよ", yomi: "あそぼうよ" },
  { text: "いってくる", yomi: "いってくる" },
  { text: "もどったよ", yomi: "もどったよ" },
  { text: "あついよ", yomi: "あついよ" },
  { text: "さむいね", yomi: "さむいね" },
  { text: "あめだね", yomi: "あめだね" },
  { text: "ゆきだね", yomi: "ゆきだね" },
  { text: "かぜつよい", yomi: "かぜつよい" },
  { text: "そらみよう", yomi: "そらみよう" },
  { text: "うみへいく", yomi: "うみへいく" },
  { text: "ねこすきだ", yomi: "ねこすきだ" },
  { text: "いぬすきだ", yomi: "いぬすきだ" },
  { text: "かおだよ", yomi: "かおだよ" },
  { text: "てあみだよ", yomi: "てあみだよ" },
  { text: "えんそくだ", yomi: "えんそくだ" },
  { text: "およぐよ", yomi: "およぐよ" },
  { text: "はしるよ", yomi: "はしるよ" },
  { text: "ねようね", yomi: "ねようね" },
  { text: "ともだちと", yomi: "ともだちと" },
  { text: "せんせいだ", yomi: "せんせいだ" },
  { text: "かぞくだよ", yomi: "かぞくだよ" },
  { text: "あさごはん", yomi: "あさごはん" },
  { text: "ばんごはん", yomi: "ばんごはん" },
  { text: "やすみだ", yomi: "やすみだ" },
  { text: "あしたは", yomi: "あしたは" },
  { text: "べんきょう", yomi: "べんきょう" },
  { text: "よむのすき", yomi: "よむのすき" },
  { text: "はながきれいだよ", yomi: "はながきれいだよ" },
  { text: "きょうはあついね", yomi: "きょうはあついね" },
  { text: "がっこうがたのしい", yomi: "がっこうがたのしい" },
  { text: "おべんとうおいしい", yomi: "おべんとうおいしい" },
  { text: "みんなであそんだよ", yomi: "みんなであそんだよ" },
  { text: "せんせいがやさしい", yomi: "せんせいがやさしい" },
  { text: "ともだちだいすきだ", yomi: "ともだちだいすきだ" },
  { text: "ねこがねてたよ", yomi: "ねこがねてたよ" },
  { text: "いぬがきたよ", yomi: "いぬがきたよ" },
  { text: "きょうははれたよ", yomi: "きょうははれたよ" },
  { text: "あさおきたよ", yomi: "あさおきたよ" },
  { text: "こうえんであそんだ", yomi: "こうえんであそんだ" },
  { text: "じてんしゃのったよ", yomi: "じてんしゃのったよ" },
  { text: "りんごたべたよ", yomi: "りんごたべたよ" },
  { text: "みずをのんだよ", yomi: "みずをのんだよ" },
  { text: "えんそくたのしかった", yomi: "えんそくたのしかった" },
  { text: "かばんもってきた", yomi: "かばんもってきた" },
  { text: "ちょうれいしたよ", yomi: "ちょうれいしたよ" },
  { text: "そうじをしたよ", yomi: "そうじをしたよ" },
  { text: "よむのがすきだよ", yomi: "よむのがすきだよ" },
  { text: "かぞくみんなげんき", yomi: "かぞくみんなげんき" },
  { text: "おじいちゃんきたよ", yomi: "おじいちゃんきたよ" },
  { text: "おばあちゃんだよ", yomi: "おばあちゃんだよ" },
  { text: "おとうさんだいすき", yomi: "おとうさんだいすき" },
  { text: "おかあさんだいすき", yomi: "おかあさんだいすき" },
  { text: "あおいそらだね", yomi: "あおいそらだね" },
  { text: "くもがういてるよ", yomi: "くもがういてるよ" },
  { text: "つきがみえたよ", yomi: "つきがみえたよ" },
  { text: "ほしがきらきらだ", yomi: "ほしがきらきらだ" },
  { text: "かえるのうたうたった", yomi: "かえるのうたうたった" },
  { text: "きょうはとてもいい天気だね", yomi: "きょうはとてもいいてんきだね" },
  { text: "はるのはながきれいだね", yomi: "はるのはながきれいだね" },
  { text: "がっこうでともだちとあそんだ", yomi: "がっこうでともだちとあそんだ" },
  { text: "せんせいがやさしくしてくれた", yomi: "せんせいがやさしくしてくれた" },
  { text: "えんそくのひはたのしかった", yomi: "えんそくのひはたのしかった" },
  { text: "おべんとうおいしかったよ", yomi: "おべんとうおいしかったよ" },
  { text: "きゅうしょくのカレーすきだ", yomi: "きゅうしょくのかれーすきだ" },
  { text: "うみではしゃいであそんだよ", yomi: "うみではしゃいであそんだよ" },
  { text: "やまのてんぼうだいにいった", yomi: "やまのてんぼうだいにいった" },
  { text: "そらがあおくてきれいだった", yomi: "そらがあおくてきれいだった" },
  { text: "よるほしがきらきらしていた", yomi: "よるほしがきらきらしていた" },
  { text: "うちのねこがあそんでいたよ", yomi: "うちのねこがあそんでいたよ" },
  { text: "こうえんでいぬをみたよ", yomi: "こうえんでいぬをみたよ" },
  { text: "なつのやすみはあつかったよ", yomi: "なつのやすみはあつかったよ" },
  { text: "はるやすみはあそびまくった", yomi: "はるやすみはあそびまくった" },
  { text: "ともだちといっしょにうたった", yomi: "ともだちといっしょにうたった" },
  { text: "おうちでかぞくとげんきだよ", yomi: "おうちでかぞくとげんきだよ" },
  { text: "あさおきてからがっこういった", yomi: "あさおきてからがっこういった" },
  { text: "ばんごはんはカレーだったよ", yomi: "ばんごはんはかれーだったよ" },
  { text: "すいえいのじゅぎょうすきだ", yomi: "すいえいのじゅぎょうすきだ" },
  { text: "じてんしゃでこうえんいったよ", yomi: "じてんしゃでこうえんいったよ" },
  { text: "おおきなきをみあげてみたよ", yomi: "おおきなきをみあげてみたよ" },
  { text: "みずうみのちかくをあるいた", yomi: "みずうみのちかくをあるいた" },
  { text: "おさかながみずのなかをおよいだ", yomi: "おさかながみずのなかをおよいだ" },
  { text: "やさいをたべてげんきになろう", yomi: "やさいをたべてげんきになろう" },
];

function yomiCharCount(yomi) {
  return [...yomi].length;
}

const $ = (id) => document.getElementById(id);

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
  /** お題を Unicode の文字（コードポイント）単位に分割した配列（寿司打と同様に先頭から順に一致） */
  targetChars: [],
  index: 0,
  raf: 0,
  bunnyX: 4,
  /** IME の変換中は keydown の誤判定を避ける */
  imeSession: false,
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
    return candidates[randomInt(0, candidates.length - 1)].text;
  }
  const fallback = PHRASES.filter((p) => yomiCharCount(p.yomi) >= min);
  if (fallback.length > 0) return fallback[randomInt(0, fallback.length - 1)].text;
  return PHRASES[0].text;
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
  state.target = pickRandomPhrase();
  state.targetChars = [...state.target];
  state.index = 0;
  state.imeSession = false;
  state.phraseEndAt = performance.now() + state.diff.phraseSec * 1000;
  applyBaitVegetableClass();
  $("baitText").textContent = state.target;
  $("bait").style.setProperty("--bait-x", `${randomInt(44, 86)}%`);
  $("bait").hidden = false;
  $("bait").style.animation = "none";
  void $("bait").offsetHeight;
  $("bait").style.animation = "";
  renderTypeline();
  $("ghostInput").value = "";
}

function renderTypeline() {
  const rest = state.targetChars.slice(state.index).join("");
  /** 寿司打風：打ち終わった文字は表示せず、残りだけ見せる */
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
  state.awaitingNextPhrase = true;
  $("ghostInput").blur();
  window.setTimeout(() => {
    if (!state.playing) return;
    newPhrase();
    $("ghostInput").focus({ preventScroll: true });
  }, PHRASE_SUCCESS_GAP_MS);
}

function onMistakeOrTimeout() {
  state.baitStock = Math.max(0, state.baitStock - 1);
  clearTypelineDisplay();
  newPhrase();
}

function endGame() {
  state.playing = false;
  state.imeSession = false;
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
  newPhrase();
  $("ghostInput").focus();
  cancelAnimationFrame(state.raf);
  state.raf = requestAnimationFrame(gameLoop);
}

function resetToSetup() {
  state.playing = false;
  state.awaitingNextPhrase = false;
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

/** お題が「日本語の文字」（かな・漢字など）か：ローマ字1キーではミスにしないための判定 */
function isJapaneseScriptChar(ch) {
  if (!ch) return false;
  if (isKanaChar(ch)) return true;
  const c = ch.codePointAt(0);
  if (c >= 0x4e00 && c <= 0x9fff) return true;
  if (c >= 0x3400 && c <= 0x4dbf) return true;
  if (c >= 0xf900 && c <= 0xfaff) return true;
  if (c === 0x3005) return true;
  return false;
}

function processTypedChar(ch) {
  if (state.awaitingNextPhrase) return;
  const expected = state.targetChars[state.index];
  if (!expected) return;

  /** IME の読み入力途中のローマ字がそのまま届いた場合は無視（ミス扱いにしない） */
  if (expected && /^[a-zA-Z]$/.test(ch) && isJapaneseScriptChar(expected)) {
    return;
  }

  if (ch === expected) {
    state.index += 1;
    renderTypeline();
    if (state.index >= state.targetChars.length) {
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
  if (!state.playing || state.awaitingNextPhrase) return;
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
  if (!state.playing || state.awaitingNextPhrase) return;
  if (ev.metaKey || ev.ctrlKey || ev.altKey) return;
  // IME 変換中・セッション中はローマ字等の keydown を無視（誤答で次の文へ進むのを防ぐ）
  if (ev.isComposing || state.imeSession) return;

  /** 寿司打風：エンターで確定・改行させず、次の文は自動で出る */
  if (ev.key === "Enter") {
    ev.preventDefault();
    return;
  }

  /** 寿司打風：打ち直しは不可。IME の変換中のバックスペースはそのまま通す */
  if (ev.key === "Backspace") {
    if (ev.isComposing || state.imeSession) return;
    ev.preventDefault();
    return;
  }

  if (ev.key.length !== 1) return;

  const expected = state.targetChars[state.index];
  /** 寿司打：漢字お題は IME で変換確定するまで待つ。ローマ字1キーではミスにしない */
  if (expected && /^[a-zA-Z]$/.test(ev.key) && isJapaneseScriptChar(expected)) {
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
    if (!state.playing || state.awaitingNextPhrase) return;
    // IME 確定前に value を空にすると変換が壊れたり、1文字でおかしくなる
    if (ev.isComposing) return;
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
