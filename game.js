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

/** タイプミス・タイムアウト時にストックを減らすか（ランキングもモード別） */
const MISTAKE_MODE = {
  relaxed: { id: "relaxed", label: "やさしい", penalty: false },
  strict: { id: "strict", label: "しっかり", penalty: true },
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

/** ごまちゃんの「待機」横位置（％）。まだ正しく打っていないとき・ミス後はここへ戻す */
const BUNNY_HOME_X = 4;

/** 文正解後はすぐ次のお題へ（待ちなし） */

/** 累計の正解打鍵で全体秒ボーナス（15→+1秒、20→+2秒、25→+3秒、その後25刻みで繰り返し） */
const TIME_BONUS_WAVE_STEP = 25;
const TIME_BONUS_MILESTONES = [
  { off: 15, sec: 1 },
  { off: 20, sec: 2 },
  { off: 25, sec: 3 },
];

/** 称号：60秒1プレイの最高スコアがこの値ごとに次の段階（50, 100, …） */
const TITLE_FROM_BEST_PER = 50;

/** 装備解放：累計ポイントがこの間隔で次のアイテム（2000, 4000, …） */
const EQUIP_UNLOCK_STEP = 2000;

/** この称号を装っているときは装備ビジュアルを「光速」テーマに */
const SPEED_TITLE_NAME = "光速もふターボ";

const LS_CAREER_ROMAJI = "gomaCareerRomaji";
const LS_CAREER_POINTS = "gomaCareerPoints";
const LS_BEST_SINGLE_PLAY = "gomaBestSinglePlayScore";
const LS_EQUIPPED_IDS = "gomaEquippedIds";

/** 同時に身につけられる装備の最大数 */
const MAX_EQUIPPED = 3;

/**
 * 体に付ける装備カタログ（冠・衣・剣・靴・指輪など）。
 * unlockPts = 累計ポイント（2000pt 刻みで解放）。
 */
const EQUIP_CATALOG = [
  { id: "ribbon_crown", name: "にんじんリボン冠", kind: "冠", unlockPts: 0, mulPerLevel: 0.07, secPerLevel: 0.05 },
  { id: "clover_cape", name: "よつばもふマント", kind: "衣", unlockPts: 2000, mulPerLevel: 0.055, secPerLevel: 0.055 },
  { id: "carrot_blade", name: "にんじん細剣", kind: "剣", unlockPts: 4000, mulPerLevel: 0.12, secPerLevel: 0.03 },
  { id: "field_boots", name: "花畑ふかふかブーツ", kind: "靴", unlockPts: 6000, mulPerLevel: 0.045, secPerLevel: 0.06 },
  {
    id: "rainbow_tiara",
    name: "にじ玉ティアラ",
    kind: "冠",
    unlockPts: 8000,
    mulPerLevel: 0.07,
    secPerLevel: 0.04,
    startStock: 1,
  },
  {
    id: "star_mantle",
    name: "ほしぞらローブ",
    kind: "衣",
    unlockPts: 10000,
    mulPerLevel: 0.06,
    secPerLevel: 0.06,
    startBonusMs: 2500,
  },
  {
    id: "gomadango_rod",
    name: "ごまだんごのししょう棒",
    kind: "剣",
    unlockPts: 12000,
    mulPerLevel: 0.1,
    secPerLevel: 0.05,
    startBonusMs: 2500,
  },
  { id: "clover_ring", name: "よつばリング", kind: "指輪", unlockPts: 14000, mulPerLevel: 0.05, secPerLevel: 0.07 },
];

const EQUIP_BY_ID = Object.fromEntries(EQUIP_CATALOG.map((d) => [d.id, d]));

/** ウサギっぽい称号（60秒プレイの自己ベストが 50pt ごとに次の段階） */
const RABBIT_TITLES = [
  "初めの一飛び",
  "うさぎゃるっ♪",
  "にんじん★レイド",
  "ピョン宙ドライブ",
  "花ばなフルパワー",
  "耳フワーティアラ",
  "ましゅまろ跳び箱",
  "キャロット・メテオ",
  "跳ねうしろ脚ゾーン",
  "しっぽグルーヴ",
  "白もふハイカー",
  "しあわせ三段跳び",
  "ごま団子マスター",
  "月下のうさッター",
  "もくもく牧場レジェンド",
  "宇宙うさぎ級",
  "伝説のモフり手",
  "にじの向こうピョン",
  "はねっ返りキング",
  "もふ神ご対面",
  "とび箱ブレイカー",
  "キャベツ畑の英雄",
  "風を切る耳線",
  "地球まるごと跳躍",
  "ごまちゃんの守護者",
  "モフり∞インフィニ",
  "星屑キャノン",
  "うさ耳ハリケーン",
  "伝説の三跳び",
  "光速もふターボ",
];

/** 話モード：章数（試作品） */
const STORY_CHAPTER_COUNT = 200;

const STORY_ENEMY_SPRITES = ["bug", "nut", "carrot", "dandelion"];
const STORY_ENEMY_NAMES = [
  "まるむし",
  "はなどんぐり",
  "にんじんナイト",
  "たんぽぽ魔人",
  "くもぐも",
  "石ころゴーレム",
  "風の精霊",
  "菜の花の精",
  "ごま団子ゴブリン",
  "耳とらの番人",
];
const STORY_LOCATIONS = [
  "菜の花畑",
  "にんじん畑",
  "たんぽぽ草原",
  "ごま団子坂",
  "耳とらの森",
  "風の丘",
  "池のほとり",
  "学校裏庭",
  "図書館前",
  "星見台",
];

function buildStoryChapters(count) {
  const chapters = [];
  for (let i = 0; i < count; i += 1) {
    const n = i + 1;
    const loc = STORY_LOCATIONS[i % STORY_LOCATIONS.length];
    const enemyCount = 1 + (i % 3);
    const enemies = [];
    for (let e = 0; e < enemyCount; e += 1) {
      const name = STORY_ENEMY_NAMES[(i + e) % STORY_ENEMY_NAMES.length];
      const sprite = STORY_ENEMY_SPRITES[(i + e) % STORY_ENEMY_SPRITES.length];
      enemies.push({
        name: enemyCount > 1 ? `${name}${e + 1}` : name,
        sprite,
        hp: 24 + Math.floor(i * 1.15) + e * 10,
        phraseSec: Math.max(3, 6 - Math.floor(i / 50)),
      });
    }
    chapters.push({
      id: `ch${n}`,
      title: `第${n}章　${loc}`,
      intro: `ごまちゃんは「${loc}」へ向かいました。${enemies[0].name}が 道を ふさいでいます。`,
      enemies,
      outro: `第${n}章を クリア！ ごまちゃんは ${loc}を 越え、つぎの ぼうけんへ 進みます。`,
    });
  }
  return chapters;
}

const STORY_CHAPTERS = buildStoryChapters(STORY_CHAPTER_COUNT);

const LS_STORY_PROGRESS = "gomaStoryChapterClear";

const storyState = {
  active: false,
  chapterIdx: 0,
  enemyIdx: 0,
  enemyHp: 0,
  enemyMaxHp: 0,
  playerHp: 100,
  playerMaxHp: 100,
  phraseEndAt: 0,
  phraseStartedAt: 0,
  currentPhrase: null,
  targetChars: [],
  romajiCandidates: [],
  typedRomaji: "",
  phraseSec: 5,
  raf: 0,
  typosThisPhrase: 0,
  phraseBusy: false,
};

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
  bunnyX: BUNNY_HOME_X,
  mistakeMode: MISTAKE_MODE.relaxed,
  /** 一文クリア直後〜次の文が始まるまで（この間は文タイムアウトしない・入力も無視） */
  awaitingNextPhrase: false,
  /** 1プレイ中に「正しく打って進んだ」ローマ字の文字数（結果画面用） */
  correctKeyCount: 0,
  /** practice | story */
  gameMode: "practice",
};

const MAIN_SCREENS = [
  "homePanel",
  "practicePanel",
  "equipHubPanel",
  "storyMenuPanel",
  "stageWrap",
  "storyStageWrap",
  "resultPanel",
  "storyResultPanel",
];

function hideAllMainScreens() {
  MAIN_SCREENS.forEach((id) => {
    const el = $(id);
    if (el) el.classList.add("hidden");
  });
}

function loadStoryProgress() {
  const n = Number.parseInt(localStorage.getItem(LS_STORY_PROGRESS) || "0", 10);
  return Number.isFinite(n) && n >= 0 ? n : 0;
}

function saveStoryProgress(clearedCount) {
  localStorage.setItem(LS_STORY_PROGRESS, String(Math.max(0, clearedCount)));
}

function refreshHomeCareer() {
  const p = loadCareerPoints();
  const best = loadBestSinglePlayScore();
  const hp = $("homeCareerPoints");
  const hb = $("homeCareerBest");
  const ht = $("homeCareerTitle");
  if (hp) hp.textContent = String(p);
  if (hb) hb.textContent = String(best);
  if (ht) ht.textContent = currentTitleName(best);
}

function showHome() {
  state.playing = false;
  storyState.active = false;
  stopGomaBgm();
  detachPlayKeyCapture();
  detachStoryKeyCapture();
  document.body.classList.remove("is-playing", "is-story");
  cancelAnimationFrame(state.raf);
  cancelAnimationFrame(storyState.raf);
  hideAllMainScreens();
  $("homePanel")?.classList.remove("hidden");
  refreshHomeCareer();
  refreshCareerHud();
}

function showPracticePanel() {
  state.playing = false;
  storyState.active = false;
  stopGomaBgm();
  detachPlayKeyCapture();
  detachStoryKeyCapture();
  document.body.classList.remove("is-playing", "is-story");
  cancelAnimationFrame(state.raf);
  hideAllMainScreens();
  $("practicePanel")?.classList.remove("hidden");
  refreshCareerHud();
}

function showEquipHub() {
  state.playing = false;
  storyState.active = false;
  stopGomaBgm();
  detachPlayKeyCapture();
  detachStoryKeyCapture();
  document.body.classList.remove("is-playing", "is-story");
  hideAllMainScreens();
  $("equipHubPanel")?.classList.remove("hidden");
  equipModalDraft = [...getEquippedIds()];
  renderEquipPicker("equipHubBody", "equipHubHint", true);
  const p = loadCareerPoints();
  const ep = $("equipHubPoints");
  const ec = $("equipHubCount");
  if (ep) ep.textContent = String(p);
  if (ec) ec.textContent = String(getEquippedIds().length);
}

function showStoryMenu() {
  state.playing = false;
  storyState.active = false;
  stopGomaBgm();
  detachStoryKeyCapture();
  document.body.classList.remove("is-playing", "is-story");
  hideAllMainScreens();
  $("storyMenuPanel")?.classList.remove("hidden");
  renderStoryChapterList();
}

function loadCareerRomaji() {
  const n = Number.parseInt(localStorage.getItem(LS_CAREER_ROMAJI) || "0", 10);
  return Number.isFinite(n) && n >= 0 ? n : 0;
}

function loadCareerPoints() {
  const n = Number.parseInt(localStorage.getItem(LS_CAREER_POINTS) || "0", 10);
  return Number.isFinite(n) && n >= 0 ? n : 0;
}

function saveCareerRomaji(n) {
  localStorage.setItem(LS_CAREER_ROMAJI, String(Math.max(0, n)));
}

function saveCareerPoints(n) {
  localStorage.setItem(LS_CAREER_POINTS, String(Math.max(0, n)));
}

/** 60秒1プレイの最高スコア（称号の解放はこれを 50pt ごとに見る） */
function loadBestSinglePlayScore() {
  const n = Number.parseInt(localStorage.getItem(LS_BEST_SINGLE_PLAY) || "0", 10);
  return Number.isFinite(n) && n >= 0 ? n : 0;
}

function saveBestSinglePlayScore(n) {
  localStorage.setItem(LS_BEST_SINGLE_PLAY, String(Math.max(0, n)));
}

/** 初回だけ：装備の保存キーが無いとき、解放済みを最大3つまで自動で装着 */
function migrateEquippedStorageIfNeeded() {
  if (localStorage.getItem(LS_EQUIPPED_IDS) !== null) return;
  const p = loadCareerPoints();
  const picks = EQUIP_CATALOG.filter((d) => p >= d.unlockPts)
    .slice(0, MAX_EQUIPPED)
    .map((d) => d.id);
  localStorage.setItem(LS_EQUIPPED_IDS, JSON.stringify(picks));
}

function getEquippedIds() {
  try {
    const raw = localStorage.getItem(LS_EQUIPPED_IDS);
    if (!raw) return [];
    const arr = JSON.parse(raw);
    if (!Array.isArray(arr)) return [];
    const p = loadCareerPoints();
    const out = [];
    const seen = new Set();
    for (const id of arr) {
      if (typeof id !== "string" || seen.has(id)) continue;
      const d = EQUIP_BY_ID[id];
      if (!d || p < d.unlockPts) continue;
      seen.add(id);
      out.push(id);
      if (out.length >= MAX_EQUIPPED) break;
    }
    return out;
  } catch {
    return [];
  }
}

function saveEquippedIds(ids) {
  const p = loadCareerPoints();
  const uniq = [];
  const seen = new Set();
  for (const id of ids) {
    if (typeof id !== "string" || seen.has(id)) continue;
    const d = EQUIP_BY_ID[id];
    if (!d || p < d.unlockPts) continue;
    seen.add(id);
    uniq.push(id);
    if (uniq.length >= MAX_EQUIPPED) break;
  }
  localStorage.setItem(LS_EQUIPPED_IDS, JSON.stringify(uniq));
}

/** 累計ptで育つ装備レベル（解放後のみ。最大20） */
function getEquipLevel(id, careerPts) {
  const d = EQUIP_BY_ID[id];
  if (!d || careerPts < d.unlockPts) return 0;
  return Math.min(20, 1 + Math.floor((careerPts - d.unlockPts) / 500));
}

function aggregateEquipBonus(careerPts) {
  const ids = getEquippedIds();
  let phraseSecAdd = 0;
  let mulAdd = 0;
  let startStock = 0;
  let startBonusMs = 0;
  for (const id of ids) {
    const d = EQUIP_BY_ID[id];
    if (!d) continue;
    const lv = getEquipLevel(id, careerPts);
    phraseSecAdd += (d.secPerLevel || 0) * lv;
    mulAdd += (d.mulPerLevel || 0) * lv;
    startStock += d.startStock || 0;
    startBonusMs += d.startBonusMs || 0;
  }
  return {
    phraseSecAdd: Math.min(2.5, phraseSecAdd),
    scoreMult: Math.min(2.35, 1 + mulAdd),
    startStock,
    startBonusMs: Math.min(5000, startBonusMs),
  };
}

/** 称号の段階数（0＝未獲得）。60秒プレイの自己ベストが TITLE_FROM_BEST_PER ごと */
function unlockedTitleCount(best = loadBestSinglePlayScore()) {
  if (best < TITLE_FROM_BEST_PER) return 0;
  return Math.min(RABBIT_TITLES.length, Math.floor(best / TITLE_FROM_BEST_PER));
}

function currentTitleName(best = loadBestSinglePlayScore()) {
  const n = unlockedTitleCount(best);
  if (n === 0) return "（まだなし）";
  return RABBIT_TITLES[n - 1];
}

function nextTitlePointsRemaining(best = loadBestSinglePlayScore()) {
  const n = unlockedTitleCount(best);
  if (n >= RABBIT_TITLES.length) return 0;
  const nextAt = TITLE_FROM_BEST_PER * (n + 1);
  return Math.max(0, nextAt - best);
}

function effectivePhraseSec() {
  let s = state.diff.phraseSec;
  const { phraseSecAdd } = aggregateEquipBonus(loadCareerPoints());
  s += phraseSecAdd;
  return Math.max(2, s);
}

function refreshBunnyEquipVisual() {
  const ids = getEquippedIds();
  const speedTheme = currentTitleName() === SPEED_TITLE_NAME;
  for (const bunnyId of ["bunny", "storyBunny"]) {
    const bunny = $(bunnyId);
    const gear = bunnyId === "bunny" ? $("bunnyGear") : $("storyBunnyGear");
    if (!bunny) continue;
    for (let i = 0; i <= 16; i += 1) bunny.classList.remove(`equip-tier-${i}`);
    bunny.classList.toggle("bunny--equip-theme-speed", speedTheme);
    if (gear) {
      gear.innerHTML = "";
      ids.forEach((id, idx) => {
        const sp = document.createElement("span");
        sp.className = `gear-slot gear-slot--i${idx} gear--${id}`;
        sp.setAttribute("aria-hidden", "true");
        gear.appendChild(sp);
      });
    }
  }
  const badge = $("bunnyTitleBadge");
  if (badge) {
    badge.textContent = "";
    badge.hidden = true;
  }
}

function refreshCareerHud() {
  migrateEquippedStorageIfNeeded();
  const r = loadCareerRomaji();
  const p = loadCareerPoints();
  const best = loadBestSinglePlayScore();
  const elR = $("careerRomaji");
  const elP = $("careerPoints");
  const elBest = $("careerBestPlay");
  const elT = $("careerTitle");
  const elN = $("careerNextTitle");
  if (elR) elR.textContent = String(r);
  if (elP) elP.textContent = String(p);
  if (elBest) elBest.textContent = String(best);
  if (elT) elT.textContent = currentTitleName(best);
  if (elN) {
    const left = nextTitlePointsRemaining(best);
    if (unlockedTitleCount(best) >= RABBIT_TITLES.length) elN.textContent = "称号はいちばんの段までたっせい！";
    else elN.textContent = `60秒プレイのベストをあと ${left} pt あげると つぎの称号`;
  }
}

function showTimeBonusFlash(sec) {
  let el = $("timeBonusOverlay");
  if (!el) return;
  const inner = el.querySelector(".time-bonus-overlay__text");
  if (inner) inner.textContent = `＋${sec}秒！`;
  el.classList.add("time-bonus-overlay--show");
  window.clearTimeout(showTimeBonusFlash._t);
  showTimeBonusFlash._t = window.setTimeout(() => {
    el.classList.remove("time-bonus-overlay--show");
  }, 1100);
}

function showTitleToast(name) {
  const el = $("toastPanel");
  if (!el) return;
  el.textContent = `新しい称号：「${name}」`;
  el.classList.add("toast-panel--show");
  window.clearTimeout(showTitleToast._t);
  showTitleToast._t = window.setTimeout(() => el.classList.remove("toast-panel--show"), 2200);
}

function timeBonusSecAtKeyCount(c) {
  for (let wave = 0; wave < 80; wave += 1) {
    for (const m of TIME_BONUS_MILESTONES) {
      const thresh = wave * TIME_BONUS_WAVE_STEP + m.off;
      if (c === thresh) return m.sec;
    }
  }
  return 0;
}

function nextTimeBonusMilestoneAfter(c) {
  for (let wave = 0; wave < 80; wave += 1) {
    for (const m of TIME_BONUS_MILESTONES) {
      const thresh = wave * TIME_BONUS_WAVE_STEP + m.off;
      if (thresh > c) return { threshold: thresh, bonusSec: m.sec };
    }
  }
  return null;
}

function keysUntilNextTimeBonus() {
  const c = state.correctKeyCount;
  const next = nextTimeBonusMilestoneAfter(c);
  if (!next) return 999;
  return next.threshold - c;
}

function nextTimeBonusSecondsPreview() {
  const c = state.correctKeyCount;
  const next = nextTimeBonusMilestoneAfter(c);
  return next ? next.bonusSec : 1;
}

function updateBonusKeyHint() {
  const el = $("bonusKeyHint");
  if (!el || !state.playing) return;
  const need = keysUntilNextTimeBonus();
  const sec = nextTimeBonusSecondsPreview();
  el.textContent = `あと ${need} もじで 全体 ＋${sec}秒`;
}

function randomInt(min, max) {
  return min + Math.floor(Math.random() * (max - min + 1));
}

function pickStoryPhrase() {
  const candidates = PHRASES.filter((p) => {
    const n = yomiCharCount(p.yomi);
    return n >= 2 && n <= 10;
  });
  if (candidates.length > 0) return candidates[randomInt(0, candidates.length - 1)];
  return PHRASES[randomInt(0, PHRASES.length - 1)];
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
  return `gomaTop10:${state.diff.id}:${state.lenMode.id}:${state.mistakeMode.id}`;
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
  state.mistakeMode = MISTAKE_MODE[$("mistakeMode").value];
  $("rankContext").textContent = `${state.diff.label} × ${state.lenMode.label} × ${state.mistakeMode.label}（1プレイのスコア）`;
  renderRankList();
  $("rankPanel").classList.remove("hidden");
  $("rankPanel").classList.add("rank-overlay");
}

function closeRanking() {
  $("rankPanel").classList.add("hidden");
  $("rankPanel").classList.remove("rank-overlay");
}

function phrasePoints() {
  const base = state.diff.points + state.lenMode.bonus;
  const { scoreMult } = aggregateEquipBonus(loadCareerPoints());
  return Math.floor(base * scoreMult);
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
  const sec = effectivePhraseSec();
  state.phraseEndAt = performance.now() + sec * 1000;
  applyBaitVegetableClass();
  const baitKanji = $("baitText");
  if (baitKanji)
    baitKanji.innerHTML = phraseRubyHtml(state.currentPhrase.text, state.currentPhrase.yomi);
  const scene = $("scene");
  const bait = $("bait");
  if (scene) scene.style.setProperty("--bait-cross-sec", `${sec}s`);
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

/**
 * ブラウザ内の簡易BGM・効果音（著作物の転載ではなく、草原っぽい和音のオリジナル生成）。
 * 商用サイトの特定楽曲（例：OtoLogic の作品番号）のコピーではありません。
 */
let gomaAudioCtx = null;
let gomaMasterGain = null;
let gomaBgmInterval = 0;

function ensureGomaAudio() {
  if (gomaAudioCtx) return gomaAudioCtx;
  const AC = window.AudioContext || window.webkitAudioContext;
  if (!AC) return null;
  gomaAudioCtx = new AC();
  gomaMasterGain = gomaAudioCtx.createGain();
  gomaMasterGain.gain.value = 0.12;
  gomaMasterGain.connect(gomaAudioCtx.destination);
  return gomaAudioCtx;
}

async function resumeGomaAudio() {
  const ctx = ensureGomaAudio();
  if (ctx && ctx.state === "suspended") await ctx.resume();
}

function stopGomaBgm() {
  if (gomaBgmInterval) {
    window.clearInterval(gomaBgmInterval);
    gomaBgmInterval = 0;
  }
}

function playPastoralChord(when) {
  const ctx = gomaAudioCtx;
  const master = gomaMasterGain;
  if (!ctx || !master || (!state.playing && !storyState.active)) return;
  const freqs = [392, 493.88, 587.33, 659.25, 783.99];
  freqs.forEach((f, i) => {
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.type = i % 2 === 0 ? "triangle" : "sine";
    o.frequency.value = f;
    const peak = 0.045 - i * 0.004;
    g.gain.setValueAtTime(0.0001, when);
    g.gain.linearRampToValueAtTime(Math.max(0.008, peak), when + 0.18 + i * 0.02);
    g.gain.exponentialRampToValueAtTime(0.0001, when + 2.5);
    o.connect(g);
    g.connect(master);
    o.start(when);
    o.stop(when + 2.55);
  });
}

function tickGomaFieldBgm() {
  if (!state.playing && !storyState.active) return;
  const ctx = ensureGomaAudio();
  if (!ctx) return;
  playPastoralChord(ctx.currentTime + 0.02);
}

function startGomaFieldBgm() {
  stopGomaBgm();
  if (!ensureGomaAudio()) return;
  tickGomaFieldBgm();
  gomaBgmInterval = window.setInterval(tickGomaFieldBgm, 2800);
}

function playGomaTimeBonusSting() {
  const ctx = gomaAudioCtx;
  const master = gomaMasterGain;
  if (!ctx || !master) return;
  let t = ctx.currentTime + 0.002;
  const notes = [523.25, 659.25, 880, 1046.5];
  notes.forEach((f) => {
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.type = "square";
    o.frequency.value = f;
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(0.1, t + 0.012);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.11);
    o.connect(g);
    g.connect(master);
    o.start(t);
    o.stop(t + 0.12);
    t += 0.05;
  });
}

/** 累計の正解打鍵が 15→+1秒、20→+2秒、25→+3秒（以降 25 打鍵ごとに同じパターンで繰り返し） */
function maybeGrantTimeBonus() {
  if (!state.playing) return;
  const bonusSec = timeBonusSecAtKeyCount(state.correctKeyCount);
  if (!bonusSec) return;
  state.gameEndAt += bonusSec * 1000;
  showTimeBonusFlash(bonusSec);
  void resumeGomaAudio();
  playGomaTimeBonusSting();
  const wrap = $("centerTimers");
  const totalBox = wrap && wrap.querySelector(".center-timer--total");
  if (totalBox) {
    totalBox.classList.remove("center-timer--bonus-flash");
    void totalBox.offsetWidth;
    totalBox.classList.add("center-timer--bonus-flash");
  }
}

function phraseRubyHtml(text, yomi) {
  return `<ruby class="phrase-ruby">${escapeHtml(text)}<rt class="phrase-ruby-yomi">${escapeHtml(yomi)}</rt></ruby>`;
}

function updateHud(gameRemain, phraseRemain) {
  const gStr = gameRemain.toFixed(1);
  const pStr = state.awaitingNextPhrase ? "—" : Math.max(0, phraseRemain).toFixed(1);
  $("gameTimer").textContent = gStr;
  $("phraseTimer").textContent = pStr;
  const cg = $("centerGameTimer");
  const cp = $("centerPhraseTimer");
  if (cg) cg.textContent = gStr;
  if (cp) cp.textContent = pStr;
  $("score").textContent = String(state.score);
  $("stockCount").textContent = String(state.baitStock);
  updateBonusKeyHint();
}

/** 打ち始めたあとエサに追従するときだけ歩行アニメ（座り→跳びの切り替え） */
function syncBunnyRunningClass() {
  const bunny = $("bunny");
  const bait = $("bait");
  if (!bunny) return;
  const chasing =
    state.playing &&
    !state.awaitingNextPhrase &&
    !!state.typedRomaji &&
    state.typedRomaji.length > 0 &&
    bait &&
    !bait.hidden;
  bunny.classList.toggle("bunny--running", chasing);
}

function updateBunnyMotion() {
  const scene = $("scene");
  const bunny = $("bunny");
  const bait = $("bait");
  if (!scene || !bunny || !bait || bait.hidden) return;
  if (state.awaitingNextPhrase) return;

  /** 一文で一度も正しく打っていない間はエサに追従しない（左で待つ） */
  if (!state.typedRomaji || state.typedRomaji.length === 0) {
    state.bunnyX += (BUNNY_HOME_X - state.bunnyX) * 0.08;
    bunny.style.left = `${state.bunnyX.toFixed(2)}%`;
    return;
  }

  const sceneRect = scene.getBoundingClientRect();
  const baitRect = bait.getBoundingClientRect();
  const baitPercent = ((baitRect.left + baitRect.width / 2 - sceneRect.left) / sceneRect.width) * 100;
  const target = Math.max(3, Math.min(72, baitPercent - 16));
  state.bunnyX += (target - state.bunnyX) * 0.06;
  bunny.style.left = `${state.bunnyX.toFixed(2)}%`;
}

/** ミス・タイムアウト時：打てずについてこれなかったので左へ */
function resetBunnyBehind() {
  state.bunnyX = BUNNY_HOME_X;
  const bunny = $("bunny");
  if (bunny) bunny.style.left = `${BUNNY_HOME_X}%`;
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
  const oldP = loadCareerPoints();
  state.score += pts;
  saveCareerPoints(oldP + pts);

  state.baitStock += 1;
  bumpBunny();
  refreshCareerHud();
  queueMicrotask(() => {
    if (!state.playing) return;
    newPhrase();
    refreshBunnyEquipVisual();
    updateBonusKeyHint();
    $("ghostInput").focus({ preventScroll: true });
  });
}

/** 打ち間違い：しっかり＝ペナルティ、やさしい＝そのキーは無視（画面も入力もそのまま） */
function handleTypo() {
  if (!state.mistakeMode.penalty) {
    return;
  }
  onMistakeOrTimeout();
}

/** タイムアウト：どちらのミスモードでもエサが逃げてペナルティ（打ち間違いだけやさしいモードで緩和） */
function handleTimeout() {
  onMistakeOrTimeout();
}

function onMistakeOrTimeout() {
  state.baitStock = Math.max(0, state.baitStock - 1);
  clearTypelineDisplay();
  resetBunnyBehind();
  const bait = $("bait");
  if (bait) bait.classList.remove("bait--crossing");
  newPhrase();
}

function endGame() {
  state.playing = false;
  stopGomaBgm();
  detachPlayKeyCapture();
  state.awaitingNextPhrase = false;
  document.body.classList.remove("is-playing");
  cancelAnimationFrame(state.raf);
  $("ghostInput").blur();
  $("bait").hidden = true;
  hideAllMainScreens();
  $("resultPanel")?.classList.remove("hidden");
  $("finalScore").textContent = String(state.score);
  const fk = $("finalKeyCount");
  if (fk) fk.textContent = String(state.correctKeyCount);

  const oldBest = loadBestSinglePlayScore();
  const oldTitles = unlockedTitleCount(oldBest);
  if (state.score > oldBest) {
    saveBestSinglePlayScore(state.score);
  }
  const newBest = loadBestSinglePlayScore();
  const newTitles = unlockedTitleCount(newBest);
  if (newTitles > oldTitles) {
    showTitleToast(currentTitleName(newBest));
  }

  const cs = $("careerSummary");
  if (cs) {
    const r = loadCareerRomaji();
    const p = loadCareerPoints();
    const best = loadBestSinglePlayScore();
    cs.textContent = `これまでのローマ字（累計）：${r} もじ　／　これまでのポイント（累計）：${p} pt　／　60秒ベスト：${best} pt　／　いまの称号：${currentTitleName(best)}`;
  }
  refreshCareerHud();
  refreshBunnyEquipVisual();

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
  syncBunnyRunningClass();
  updateBunnyMotion();

  if (gameRemain <= 0) {
    endGame();
    return;
  }
  if (!state.awaitingNextPhrase && phraseRemain <= 0) {
    handleTimeout();
  }
  state.raf = requestAnimationFrame(gameLoop);
}

function updateStockHudLabel() {
  const el = $("stockLabel");
  if (!el) return;
  el.textContent =
    state.mistakeMode.penalty === true
      ? "エサストック（ミス・タイムアウトで1つなくなる）"
      : "エサストック（やさしい：打ち間違いは無視・時間切れだけストックが減ります）";
}

function startGame() {
  state.gameMode = "practice";
  state.diff = DIFFICULTY[$("difficulty").value];
  state.lenMode = LENGTH_MODE[$("lengthMode").value];
  state.mistakeMode = MISTAKE_MODE[$("mistakeMode").value];
  setSceneDifficultyClass();
  updateStockHudLabel();
  migrateEquippedStorageIfNeeded();
  state.score = 0;
  const b = aggregateEquipBonus(loadCareerPoints());
  state.baitStock = b.startStock;
  state.correctKeyCount = 0;
  state.playing = true;
  state.bunnyX = BUNNY_HOME_X;
  document.body.classList.add("is-playing");
  const bunnyEl = $("bunny");
  if (bunnyEl) bunnyEl.classList.remove("bunny--running");
  const now = performance.now();
  state.gameEndAt = now + 60_000 + b.startBonusMs;
  hideAllMainScreens();
  $("stageWrap")?.classList.remove("hidden");
  $("resultPanel")?.classList.add("hidden");
  attachPlayKeyCapture();
  void resumeGomaAudio();
  startGomaFieldBgm();
  newPhrase();
  refreshBunnyEquipVisual();
  updateBonusKeyHint();
  $("ghostInput").focus({ preventScroll: true });
  cancelAnimationFrame(state.raf);
  state.raf = requestAnimationFrame(gameLoop);
}

function resetToSetup() {
  showPracticePanel();
  $("bait").hidden = true;
}

function processTypedChar(ch) {
  if (state.awaitingNextPhrase) return;

  const nextPrefix = `${state.typedRomaji}${ch}`;
  const narrowed = state.romajiCandidates.filter((romaji) => romaji.startsWith(nextPrefix));
  if (narrowed.length === 0) {
    handleTypo();
    return;
  }
  state.romajiCandidates = narrowed;
  state.typedRomaji = nextPrefix;
  state.index = state.typedRomaji.length;
  state.correctKeyCount += 1;
  saveCareerRomaji(loadCareerRomaji() + 1);
  maybeGrantTimeBonus();
  updateBonusKeyHint();
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

/** 装備モーダル内の一時選択（開いたときに保存内容で初期化） */
let equipModalDraft = null;
let storyResultVictory = false;

function closeTitlesModal() {
  const m = $("titlesModal");
  if (m) m.classList.add("hidden");
}

function closeEquipsModal() {
  equipModalDraft = null;
  const m = $("equipsModal");
  if (m) m.classList.add("hidden");
}

function openTitlesModal() {
  const m = $("titlesModal");
  const list = $("titlesModalList");
  const hint = $("titlesModalHint");
  if (!m || !list || !hint) return;
  const best = loadBestSinglePlayScore();
  const n = unlockedTitleCount(best);
  hint.textContent = `60秒プレイのベスト ${best} pt。称号は ${n}／${RABBIT_TITLES.length} こ（ベストが ${TITLE_FROM_BEST_PER} pt ごと）。`;
  list.innerHTML = "";
  RABBIT_TITLES.forEach((name, i) => {
    const need = TITLE_FROM_BEST_PER * (i + 1);
    const got = n > i;
    const li = document.createElement("li");
    if (!got) li.classList.add("is-locked");
    if (got && n > 0 && i === n - 1) li.classList.add("is-current");
    li.textContent = `${got ? "【ひらいた】" : "【まだ】"} 60秒で ${need} pt 以上　「${name}」`;
    list.appendChild(li);
  });
  m.classList.remove("hidden");
}

function showEquipLimitToast() {
  const el = $("toastPanel");
  if (!el) return;
  el.textContent = `装備は${MAX_EQUIPPED}つまでです。ほかをオフにしてからにしてください。`;
  el.classList.add("toast-panel--show");
  window.clearTimeout(showEquipLimitToast._t);
  showEquipLimitToast._t = window.setTimeout(() => el.classList.remove("toast-panel--show"), 2200);
}

function renderEquipPicker(bodyId, hintId, isHub = false) {
  const body = $(bodyId);
  const hint = hintId ? $(hintId) : null;
  if (!body) return;
  const p = loadCareerPoints();
  const sel = equipModalDraft ?? getEquippedIds();
  const unlockedCount = EQUIP_CATALOG.filter((d) => p >= d.unlockPts).length;
  if (hint) {
    hint.textContent = isHub
      ? `累計 ${p} pt。解放済み ${unlockedCount} 種類。ボタンを押すと装着 ON/OFF（最大 ${MAX_EQUIPPED} つ）。`
      : `累計 ${p} pt（装備は ${EQUIP_UNLOCK_STEP} pt ごとに解放）／ 同時 ${MAX_EQUIPPED} スロット`;
  }
  body.innerHTML = "";
  EQUIP_CATALOG.forEach((def) => {
    const unlocked = p >= def.unlockPts;
    const checked = sel.includes(def.id);
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = `ff5-equip-row ff5-equip-row-btn career-equip-row${unlocked ? "" : " is-locked"}${checked ? " ff5-equip-row--on" : ""}`;
    btn.disabled = !unlocked;
    btn.setAttribute("aria-pressed", checked ? "true" : "false");
    btn.setAttribute(
      "aria-label",
      unlocked
        ? `${def.name}（${def.kind}）${checked ? "を外す" : "をつける"}`
        : `${def.name} — 累計 ${def.unlockPts} pt で解放`
    );

    const inner = document.createElement("span");
    inner.className = "ff5-equip-row-inner";

    const sprite = document.createElement("span");
    sprite.className = `ff5-equip-sprite ff5-equip-sprite--${def.id}`;
    sprite.setAttribute("aria-hidden", "true");

    const meta = document.createElement("span");
    meta.className = "ff5-equip-meta";
    meta.innerHTML = `<strong>${escapeHtml(def.name)}</strong><span>${escapeHtml(def.kind)}${
      unlocked ? (checked ? " — 装着中" : "") : ` — 解放 ${def.unlockPts} pt`
    }</span>`;

    inner.append(sprite, meta);
    btn.appendChild(inner);
    btn.addEventListener("click", () => {
      if (!unlocked) return;
      onEquipToggle(def.id, !checked);
    });
    body.appendChild(btn);
  });
}

function renderEquipsModalBody() {
  renderEquipPicker("equipsModalBody", "equipsModalHint", false);
}

function onEquipToggle(id, on) {
  let sel = [...(equipModalDraft ?? getEquippedIds())];
  if (on) {
    if (sel.includes(id)) return;
    if (sel.length >= MAX_EQUIPPED) {
      showEquipLimitToast();
      return;
    }
    sel.push(id);
  } else {
    sel = sel.filter((x) => x !== id);
  }
  equipModalDraft = sel;
  saveEquippedIds(sel);
  refreshCareerHud();
  refreshHomeCareer();
  refreshBunnyEquipVisual();
  renderEquipsModalBody();
  if (!$("equipHubPanel")?.classList.contains("hidden")) {
    renderEquipPicker("equipHubBody", "equipHubHint", true);
    const ec = $("equipHubCount");
    if (ec) ec.textContent = String(getEquippedIds().length);
  }
}

function openEquipsModal() {
  migrateEquippedStorageIfNeeded();
  equipModalDraft = [...getEquippedIds()];
  renderEquipsModalBody();
  const m = $("equipsModal");
  if (m) m.classList.remove("hidden");
}

/* ── 話モード ── */

function setStoryDialog(text) {
  const el = $("storyDialog");
  if (el) el.textContent = text;
}

function updateStoryHud() {
  const php = $("storyPlayerHp");
  const ehp = $("storyEnemyHp");
  if (php) php.textContent = String(Math.max(0, storyState.playerHp));
  if (ehp) ehp.textContent = String(Math.max(0, storyState.enemyHp));
}

function renderStoryChapterList() {
  const list = $("storyChapterList");
  const meta = $("storyMenuMeta");
  if (meta) {
    meta.textContent = `全 ${STORY_CHAPTER_COUNT} 章。クリア済み ${loadStoryProgress()} 章。`;
  }
  if (!list) return;
  const cleared = loadStoryProgress();
  list.innerHTML = "";
  STORY_CHAPTERS.forEach((ch, i) => {
    const locked = i > cleared;
    const li = document.createElement("li");
    li.className = `story-chapter-item${locked ? " is-locked" : ""}${i < cleared ? " is-cleared" : ""}`;
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "story-chapter-btn";
    btn.disabled = locked;
    const badge = i < cleared ? "クリア済み" : locked ? "ロック中" : `${ch.enemies.length} 体の敵`;
    btn.innerHTML = `<strong>${escapeHtml(ch.title)}</strong><span>${escapeHtml(badge)}</span>`;
    if (!locked) btn.addEventListener("click", () => startStoryChapter(i));
    li.appendChild(btn);
    list.appendChild(li);
  });
}

function beginStoryBattle() {
  storyState.active = true;
  storyState.phraseBusy = false;
  hideAllMainScreens();
  $("storyStageWrap")?.classList.remove("hidden");
  $("storyResultPanel")?.classList.add("hidden");
  document.body.classList.add("is-story");
  attachStoryKeyCapture();
  refreshBunnyEquipVisual();
  void resumeGomaAudio();
  startGomaFieldBgm();
  $("storyGhostInput")?.focus({ preventScroll: true });
}

function startStoryChapter(chapterIdx) {
  const ch = STORY_CHAPTERS[chapterIdx];
  if (!ch) return;
  storyState.chapterIdx = chapterIdx;
  storyState.enemyIdx = 0;
  storyState.playerHp = 100;
  storyState.playerMaxHp = 100;
  setStoryDialog(ch.intro);
  beginStoryBattle();
  window.setTimeout(() => {
    if (storyState.active) startStoryEnemy();
  }, 1400);
}

function startStoryEnemy() {
  const ch = STORY_CHAPTERS[storyState.chapterIdx];
  const enemy = ch.enemies[storyState.enemyIdx];
  if (!enemy) return;
  storyState.enemyMaxHp = enemy.hp;
  storyState.enemyHp = enemy.hp;
  storyState.phraseSec = enemy.phraseSec;
  const nameEl = $("storyEnemyName");
  const spriteEl = $("storyEnemySprite");
  if (nameEl) nameEl.textContent = enemy.name;
  if (spriteEl) {
    spriteEl.className = "story-enemy__sprite";
    spriteEl.classList.add(`story-enemy__sprite--${enemy.sprite}`);
  }
  setStoryDialog(`${enemy.name} があらわれた！ お題を打って攻撃しよう。`);
  updateStoryHud();
  storyNewPhrase();
  cancelAnimationFrame(storyState.raf);
  storyState.raf = requestAnimationFrame(storyLoop);
}

function storyNewPhrase() {
  storyState.phraseBusy = false;
  storyState.currentPhrase = pickStoryPhrase();
  const baseRomaji = yomiToRomaji(storyState.currentPhrase.yomi);
  storyState.targetChars = [...baseRomaji];
  storyState.romajiCandidates = buildRomajiVariants(baseRomaji);
  storyState.typedRomaji = "";
  storyState.typosThisPhrase = 0;
  const now = performance.now();
  storyState.phraseStartedAt = now;
  storyState.phraseEndAt = now + storyState.phraseSec * 1000;
  const textEl = $("storyPhraseText");
  if (textEl) {
    textEl.innerHTML = phraseRubyHtml(storyState.currentPhrase.text, storyState.currentPhrase.yomi);
  }
  storyRenderTypeline();
  const inp = $("storyGhostInput");
  if (inp) inp.value = "";
}

function storyRenderTypeline() {
  const guide =
    storyState.romajiCandidates.find((s) => s.startsWith(storyState.typedRomaji)) ||
    storyState.targetChars.join("");
  const rest = guide.slice(storyState.typedRomaji.length);
  const line = $("storyTargetLine");
  if (line) line.innerHTML = `<span class="rest">${escapeHtml(rest)}</span>`;
  const caret = $("storyCaret");
  if (caret) caret.classList.remove("caret--hide");
}

function storyOnPhraseSuccess() {
  if (storyState.phraseBusy) return;
  storyState.phraseBusy = true;
  const remain = Math.max(0, (storyState.phraseEndAt - performance.now()) / 1000);
  const speedBonus = Math.floor(remain * 3);
  const accuracyBonus = storyState.typosThisPhrase === 0 ? 6 : 0;
  const lenBonus = Math.floor(storyState.targetChars.length / 3);
  const dmg = 8 + speedBonus + accuracyBonus + lenBonus;
  storyState.enemyHp = Math.max(0, storyState.enemyHp - dmg);
  const enemy = STORY_CHAPTERS[storyState.chapterIdx].enemies[storyState.enemyIdx];
  setStoryDialog(
    `${enemy.name} に ${dmg} ダメージ！${speedBonus >= 6 ? " 速い！" : ""}${accuracyBonus ? " ミスなしボーナス！" : ""}`
  );
  updateStoryHud();
  flashStoryEnemyHit();
  if (storyState.enemyHp <= 0) {
    window.setTimeout(() => storyOnEnemyDefeated(), 600);
    return;
  }
  window.setTimeout(() => storyNewPhrase(), 450);
}

function flashStoryEnemyHit() {
  const el = $("storyEnemy");
  if (!el) return;
  el.classList.remove("story-enemy--hit");
  void el.offsetWidth;
  el.classList.add("story-enemy--hit");
}

function storyOnEnemyDefeated() {
  const ch = STORY_CHAPTERS[storyState.chapterIdx];
  const defeated = ch.enemies[storyState.enemyIdx];
  storyState.enemyIdx += 1;
  if (storyState.enemyIdx >= ch.enemies.length) {
    finishStoryChapter();
    return;
  }
  setStoryDialog(`${defeated.name} をたおした！ つぎの敵が現れた…`);
  window.setTimeout(() => startStoryEnemy(), 1100);
}

function storyPlayerHit(dmg, msg) {
  storyState.playerHp = Math.max(0, storyState.playerHp - dmg);
  setStoryDialog(`${msg} ごまちゃんが ${dmg} ダメージを受けた。`);
  updateStoryHud();
  const bunny = $("storyBunny");
  if (bunny) {
    bunny.classList.remove("bunny--hurt");
    void bunny.offsetWidth;
    bunny.classList.add("bunny--hurt");
  }
  if (storyState.playerHp <= 0) {
    window.setTimeout(() => storyOnDefeat(), 700);
  }
}

function storyOnTypo() {
  storyState.typosThisPhrase += 1;
  storyPlayerHit(5, "打ち間違い！");
  if (storyState.playerHp <= 0) return;
  storyState.typedRomaji = "";
  storyState.romajiCandidates = buildRomajiVariants(storyState.targetChars.join(""));
  storyRenderTypeline();
}

function storyOnTimeout() {
  if (storyState.phraseBusy) return;
  storyState.phraseBusy = true;
  storyPlayerHit(10, "時間切れ！");
  if (storyState.playerHp <= 0) return;
  window.setTimeout(() => storyNewPhrase(), 500);
}

function storyOnDefeat() {
  storyResultVictory = false;
  storyState.active = false;
  stopGomaBgm();
  detachStoryKeyCapture();
  cancelAnimationFrame(storyState.raf);
  document.body.classList.remove("is-story");
  hideAllMainScreens();
  $("storyResultPanel")?.classList.remove("hidden");
  $("storyResultHeading").textContent = "冒険失敗…";
  $("storyResultText").textContent =
    "ごまちゃんは力尽きました。練習モードでタイピングを鍛えて、もう一度挑戦しましょう。";
  const cont = $("storyContinueBtn");
  if (cont) cont.textContent = "章を選び直す";
}

function finishStoryChapter() {
  storyResultVictory = true;
  stopGomaBgm();
  detachStoryKeyCapture();
  cancelAnimationFrame(storyState.raf);
  document.body.classList.remove("is-story");
  const ch = STORY_CHAPTERS[storyState.chapterIdx];
  const prog = loadStoryProgress();
  if (storyState.chapterIdx + 1 > prog) saveStoryProgress(storyState.chapterIdx + 1);
  hideAllMainScreens();
  $("storyResultPanel")?.classList.remove("hidden");
  $("storyResultHeading").textContent = `${ch.title} クリア！`;
  $("storyResultText").textContent = ch.outro;
  const cont = $("storyContinueBtn");
  if (cont) {
    const next = storyState.chapterIdx + 1;
    cont.textContent =
      next < STORY_CHAPTERS.length && next <= loadStoryProgress() ? "つぎの章へ" : "章一覧にもどる";
  }
}

function quitStory() {
  if (storyState.active && !window.confirm("冒険をやめてホームにもどりますか？")) return;
  storyState.active = false;
  stopGomaBgm();
  detachStoryKeyCapture();
  cancelAnimationFrame(storyState.raf);
  document.body.classList.remove("is-story");
  showHome();
}

function storyProcessTypedChar(ch) {
  if (!storyState.active || storyState.phraseBusy || storyState.playerHp <= 0) return;
  const nextPrefix = `${storyState.typedRomaji}${ch}`;
  const narrowed = storyState.romajiCandidates.filter((romaji) => romaji.startsWith(nextPrefix));
  if (narrowed.length === 0) {
    storyOnTypo();
    return;
  }
  storyState.romajiCandidates = narrowed;
  storyState.typedRomaji = nextPrefix;
  saveCareerRomaji(loadCareerRomaji() + 1);
  storyRenderTypeline();
  const done = narrowed.length === 1 && narrowed[0] === storyState.typedRomaji;
  if (done) storyOnPhraseSuccess();
}

function onStoryKeydown(ev) {
  if (!storyState.active || storyState.phraseBusy) return;
  if (ev.metaKey || ev.ctrlKey || ev.altKey) return;
  if (ev.isComposing) return;
  if (ev.key === "Enter" || ev.key === "Backspace" || ev.key === " " || ev.key === "　") {
    ev.preventDefault();
    return;
  }
  if (!/^[a-zA-Z]$/.test(ev.key)) return;
  ev.preventDefault();
  ev.stopPropagation();
  storyProcessTypedChar(ev.key.toLowerCase());
}

function attachStoryKeyCapture() {
  detachStoryKeyCapture();
  window.addEventListener("keydown", onStoryKeydown, true);
}

function detachStoryKeyCapture() {
  window.removeEventListener("keydown", onStoryKeydown, true);
}

function storyLoop(now) {
  if (!storyState.active) return;
  const remain = (storyState.phraseEndAt - now) / 1000;
  const pt = $("storyPhraseTimer");
  if (pt) pt.textContent = Math.max(0, remain).toFixed(1);
  if (!storyState.phraseBusy && remain <= 0) storyOnTimeout();
  storyState.raf = requestAnimationFrame(storyLoop);
}

function onStoryContinue() {
  if (!storyResultVictory) {
    showStoryMenu();
    return;
  }
  const next = storyState.chapterIdx + 1;
  if (next < STORY_CHAPTERS.length && next <= loadStoryProgress()) {
    startStoryChapter(next);
    return;
  }
  showStoryMenu();
}

function init() {
  hideAllMainScreens();
  $("homePanel")?.classList.remove("hidden");
  $("stageWrap")?.classList.add("hidden");

  $("goPracticeBtn")?.addEventListener("click", showPracticePanel);
  $("goEquipBtn")?.addEventListener("click", showEquipHub);
  $("goStoryBtn")?.addEventListener("click", showStoryMenu);
  $("backHomeFromPracticeBtn")?.addEventListener("click", showHome);
  $("backHomeFromEquipBtn")?.addEventListener("click", showHome);
  $("backHomeFromStoryBtn")?.addEventListener("click", showHome);
  $("quitStoryBtn")?.addEventListener("click", quitStory);
  $("storyContinueBtn")?.addEventListener("click", onStoryContinue);
  $("storyBackHomeBtn")?.addEventListener("click", showHome);

  $("startBtn").addEventListener("click", startGame);
  $("againBtn").addEventListener("click", startGame);
  $("backBtn").addEventListener("click", resetToSetup);
  $("openRankingBtn").addEventListener("click", openRanking);
  $("closeRankBtn").addEventListener("click", closeRanking);

  $("openTitlesBtn").addEventListener("click", openTitlesModal);
  document.getElementById("openEquipsBtn")?.addEventListener("click", openEquipsModal);
  $("closeTitlesBtn").addEventListener("click", closeTitlesModal);
  $("closeEquipsBtn").addEventListener("click", closeEquipsModal);
  document.querySelectorAll("[data-career-close]").forEach((el) => {
    el.addEventListener("click", () => {
      if (el.dataset.careerClose === "titles") closeTitlesModal();
      if (el.dataset.careerClose === "equips") closeEquipsModal();
    });
  });

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
  $("storyScene")?.addEventListener("click", () => {
    if (storyState.active) $("storyGhostInput")?.focus({ preventScroll: true });
  });
  $("storyGhostInput")?.addEventListener("input", (ev) => {
    if (storyState.active) ev.target.value = "";
  });
  $("storyGhostInput")?.addEventListener("paste", (ev) => {
    if (storyState.active) ev.preventDefault();
  });
  $("difficulty").addEventListener("change", () => {
    if (!state.playing) {
      state.diff = DIFFICULTY[$("difficulty").value];
      setSceneDifficultyClass();
    }
  });

  setSceneDifficultyClass();
  refreshCareerHud();
  refreshHomeCareer();
  refreshBunnyEquipVisual();
}

init();
