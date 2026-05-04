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

/** 意味のある文（すべてひらがな・かんじなし）。かな入力で変換せずにそのまま打てる */
const PHRASES_KABU = [
  "あめ",
  "はれ",
  "そら",
  "ねこ",
  "いぬ",
  "かぜ",
  "はな",
  "みず",
  "くも",
  "つき",
  "やま",
  "かわ",
  "いま",
  "きょう",
  "あした",
  "あめだ",
  "はれた",
  "そらは",
  "みずを",
  "ねこが",
  "がんばれ",
  "おはよう",
  "おやすみ",
  "またね",
  "すきだよ",
  "ありがとう",
  "こんにちは",
  "いそがしい",
  "きもちいい",
  "きをつけて",
  "あしたは",
  "てんきいい",
];

const PHRASES_TANPOPO = [
  "はながさいた",
  "そらはあおい",
  "きょうははれる",
  "あさごはんたべた",
  "みんなであそぶ",
  "がっこういくよ",
  "おべんとうおいしい",
  "ともだちだいすき",
  "かわであそんだ",
  "もりをあるいた",
  "にんじんすきだ",
  "たんぽぽみたい",
  "かぶをすきだ",
  "はるのかぜだ",
  "あきはさんぽだ",
  "ねこがねてた",
  "いぬとあるいた",
  "えんそくたのしい",
  "すいえいしたよ",
  "こうえんであそぶ",
  "かぞくとでかけた",
  "せんせいがやさしい",
  "ともだちがきた",
  "まちをあるいた",
  "かばんもっていく",
  "おべんとうつくった",
  "なのはなきれいだ",
  "みどりがすきだ",
  "おさらをあらった",
  "はしをつかうよ",
];

const PHRASES_NINJIN = [
  "きょうはいいてんきだね",
  "はるのはながきれいだね",
  "おさんぽにいきたいなよ",
  "ともだちといっしょだよ",
  "がっこうでえんそくだよ",
  "かぞくみんなげんきだよ",
  "みどりのそらがきれいだ",
  "あさからばたばたしてた",
  "ひるごはんおいしかった",
  "ゆうがたさんぽしたよね",
  "ほしがきらきらしてたよ",
  "つきがきれいにみえたよ",
  "かわのおとがきこえたよ",
  "もりのなかはしずかだね",
  "とりがさえずってたよね",
  "ねこがごろごろしてたよ",
  "いぬがしっぽをふったよ",
  "はるやすみたのしかった",
  "なつやすみあつかったよ",
  "そらがどこまでもあおい",
  "えんそくでおべんとうだ",
  "せんせいにありがとうと",
  "ともだちとえがおでわらった",
  "かぞくとおまつりいった",
  "やさいをたくさんたべた",
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
  target: "",
  index: 0,
  raf: 0,
  bunnyX: 4,
  /** IME の変換中は keydown の誤判定を避ける */
  imeSession: false,
  /** 一文クリア後の「つぎのエサ」待ち（この間は文タイムアウトしない） */
  inPhraseBreak: false,
};

function randomInt(min, max) {
  return min + Math.floor(Math.random() * (max - min + 1));
}

function pickRandomPhrase() {
  const { min, max, id } = state.lenMode;
  const pool =
    id === "kabu" ? PHRASES_KABU : id === "tanpopo" ? PHRASES_TANPOPO : PHRASES_NINJIN;
  const candidates = pool.filter((p) => p.length >= min && p.length <= max);
  if (candidates.length > 0) {
    return candidates[randomInt(0, candidates.length - 1)];
  }
  const fallback = pool.filter((p) => p.length >= min);
  if (fallback.length > 0) return fallback[randomInt(0, fallback.length - 1)];
  return "あしたははれる";
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
  state.target = pickRandomPhrase();
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
  const t = state.target;
  const i = state.index;
  const done = t.slice(0, i);
  const rest = t.slice(i);
  $("targetLine").innerHTML = `<span class="done">${escapeHtml(done)}</span><span class="rest">${escapeHtml(rest)}</span>`;
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
  $("phraseTimer").textContent = state.inPhraseBreak ? "—" : Math.max(0, phraseRemain).toFixed(1);
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

function openPhraseBreakScreen(phrasePts) {
  state.inPhraseBreak = true;
  clearTypelineDisplay();
  $("phraseBreakPoints").textContent = String(phrasePts);
  $("bait").hidden = true;
  $("phraseBreakPanel").classList.remove("hidden");
  $("ghostInput").blur();
}

function continueToNextPhrase() {
  if (!state.playing || !state.inPhraseBreak) return;
  state.inPhraseBreak = false;
  $("phraseBreakPanel").classList.add("hidden");
  newPhrase();
  $("ghostInput").focus({ preventScroll: true });
}

function onSuccessPhrase() {
  const pts = phrasePoints();
  state.score += pts;
  state.baitStock += 1;
  bumpBunny();
  openPhraseBreakScreen(pts);
}

function onMistakeOrTimeout() {
  state.baitStock = Math.max(0, state.baitStock - 1);
  clearTypelineDisplay();
  newPhrase();
}

function endGame() {
  state.playing = false;
  state.imeSession = false;
  state.inPhraseBreak = false;
  document.body.classList.remove("is-playing");
  cancelAnimationFrame(state.raf);
  $("ghostInput").blur();
  $("bait").hidden = true;
  $("phraseBreakPanel").classList.add("hidden");
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
  if (!state.inPhraseBreak && phraseRemain <= 0) {
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
  state.inPhraseBreak = false;
  state.bunnyX = 4;
  $("phraseBreakPanel").classList.add("hidden");
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
  state.inPhraseBreak = false;
  document.body.classList.remove("is-playing");
  cancelAnimationFrame(state.raf);
  $("setupPanel").classList.remove("setup-hidden");
  $("stageWrap").classList.add("setup-hidden");
  $("resultPanel").classList.add("hidden");
  $("phraseBreakPanel").classList.add("hidden");
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
  if (state.inPhraseBreak) return;
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
  if (!state.playing || state.inPhraseBreak) return;
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
  if (!state.playing || state.inPhraseBreak) return;
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
  $("nextPhraseBtn").addEventListener("click", continueToNextPhrase);
  $("openRankingBtn").addEventListener("click", openRanking);
  $("closeRankBtn").addEventListener("click", closeRanking);

  $("ghostInput").addEventListener("keydown", onKeydown);
  $("ghostInput").addEventListener("compositionstart", onCompositionStart);
  $("ghostInput").addEventListener("compositionend", onCompositionEnd);

  $("ghostInput").addEventListener("input", (ev) => {
    if (!state.playing || state.inPhraseBreak) return;
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
