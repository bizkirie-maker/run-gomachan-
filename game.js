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

/** 累計の正解打鍵で全体秒ボーナス（30文字ごとに＋1秒） */
const TIME_BONUS_WAVE_STEP = 30;
const TIME_BONUS_MILESTONES = [{ off: 30, sec: 1 }];

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

/** 装備部位 → うさぎの見た目スロット（名前どおりの位置） */
const EQUIP_KIND_SLOT = {
  冠: "head",
  衣: "body",
  剣: "weapon",
  靴: "feet",
  指輪: "ring",
};

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

/** 話モード：桃太郎タイピング風（全200章） */
const STORY_CHAPTER_COUNT = 200;

/** 桃太郎の仲間（章クリア数で解放）— ココア版桃太郎タイピングのキャスト＝ごまちゃん版 */
const STORY_HERO = {
  id: "gomachan",
  name: "ごまちゃん",
  icon: "🐰",
  role: "主人公（桃太郎役）",
  skillName: "菜の花斬り",
};

const STORY_COMPANIONS = [
  { id: "dog", name: "犬", icon: "🐕", unlockClear: 20, attackBonus: 1, defenseSecBonus: 0, hpBonus: 5, skillName: "かみつき" },
  { id: "monkey", name: "サル", icon: "🐒", unlockClear: 50, attackBonus: 1, defenseSecBonus: 0.6, hpBonus: 3, skillName: "もうふパンチ" },
  { id: "pheasant", name: "キジ", icon: "🐦", unlockClear: 85, attackBonus: 0, defenseSecBonus: 0, hpBonus: 6, skillName: "つつき", defenseReduceBonus: 0.1 },
];

/** ココア版桃太郎タイピング風 chibi スプライト（CSS で描画） */
function cocoaCharSpriteHtml(charId, size = "md") {
  return `<div class="cocoa-sprite cocoa-sprite--ally cocoa-sprite--${charId} cocoa-sprite--${size}" aria-hidden="true"><span class="cocoa-sprite__shadow"></span></div>`;
}

function cocoaMonsterSpriteHtml(spriteId, isBoss = false) {
  const id = spriteId || "slime";
  return `<div class="cocoa-sprite cocoa-sprite--foe cocoa-sprite--${id}${isBoss ? " cocoa-sprite--boss" : ""}" aria-hidden="true"><span class="cocoa-sprite__shadow"></span></div>`;
}

/** 桃太郎タイピング風：げんきゲージ（100たまると大技） */
const STORY_GAUGE_MAX = 100;
const STORY_GAUGE_PER_NORMAL = 34;

/** 話バトルのテンポ（ゆっくり＋攻撃演出の待ち時間） */
const STORY_BATTLE_PACE = {
  phraseSecBase: 8.5,
  phraseSecMin: 6.2,
  defenseSecBase: 6.2,
  defenseSecMin: 4.5,
  specialPhraseBonus: 1.8,
  actionPauseMs: 1100,
  phaseGapMs: 1300,
  missGapMs: 850,
  spawnGapMs: 1500,
  defeatGapMs: 900,
};

/** ごまちゃんの技 */
const STORY_PLAYER_SKILLS = {
  normal: { name: "通常攻撃", short: "こうげき" },
  special: { name: "菜の花大技", short: "大技！" },
};

/** ココア風：最初 HP10 前後 → 章クリア・Lv でじわじわ増える */
const STORY_HP_BASE = 10;
const STORY_HP_PER_CLEAR = 2;
const STORY_HP_PER_LEVEL = 4;

/** 桃太郎タイピング風：モンスター（敵）カタログ — ココア版のモンスター退治 */
const STORY_ENEMY_TYPES = [
  {
    id: "slime",
    name: "スライム",
    category: "モンスター",
    icon: "💧",
    sprite: "slime",
    tagline: "ぷるぷる跳ねる定番モンスター",
    appearLine: "プルプル… スライムが あらわれた！",
    defeatLine: "スライムは 水たまりに 溶けていった…",
    normalMove: "体当たり",
    specialMove: "大ジャンプ",
  },
  {
    id: "bat",
    name: "こうもり",
    category: "モンスター",
    icon: "🦇",
    sprite: "bat",
    tagline: "暗がりから襲う空の魔物",
    appearLine: "キーキー！ こうもりが 飛んできた！",
    defeatLine: "こうもりは 森の奥へ 逃げた。",
    normalMove: "かみつき",
    specialMove: "超音波",
  },
  {
    id: "goblin",
    name: "ゴブリン",
    category: "モンスター",
    icon: "👺",
    sprite: "goblin",
    tagline: "小柄だけど素早い緑の魔物",
    appearLine: "ギャッ！ ゴブリンが 棒を振り回す！",
    defeatLine: "ゴブリンは 逃げ出していった。",
    normalMove: "棒殴り",
    specialMove: "乱れ打ち",
  },
  {
    id: "mushroom",
    name: "キノコ魔",
    category: "モンスター",
    icon: "🍄",
    sprite: "mushroom",
    tagline: "胞子をまく森の魔物",
    appearLine: "モクモク… キノコ魔が 現れた！",
    defeatLine: "キノコ魔は 地面に 倒れた。",
    normalMove: "胞子散らし",
    specialMove: "毒の胞子",
  },
  {
    id: "skeleton",
    name: "がいこつ",
    category: "モンスター",
    icon: "💀",
    sprite: "skeleton",
    tagline: "カチカチ音を立てる亡者",
    appearLine: "ガタガタ… がいこつが 立ちはだかる！",
    defeatLine: "骨は バラバラに 崩れた。",
    normalMove: "骨投げ",
    specialMove: "骨乱舞",
  },
  {
    id: "orc",
    name: "オーク",
    category: "モンスター",
    icon: "🐗",
    sprite: "orc",
    tagline: "力持ちの猪型モンスター",
    appearLine: "ウォオ！ オークが 突進してくる！",
    defeatLine: "オークは 地面に 倒れた。",
    normalMove: "突進",
    specialMove: "大振り",
  },
  {
    id: "ghost",
    name: "ゆうれい",
    category: "モンスター",
    icon: "👻",
    sprite: "ghost",
    tagline: "すり抜ける不気味な魔物",
    appearLine: "ウウウ… ゆうれいが 漂ってきた！",
    defeatLine: "ゆうれいは 消え去った…",
    normalMove: "呪いの手",
    specialMove: "幽霊大技",
  },
  {
    id: "dragon",
    name: "ドラゴン",
    category: "モンスター",
    icon: "🐉",
    sprite: "dragon",
    tagline: "火を吐く空の強敵",
    appearLine: "ゴオオ！ ドラゴンが 空から 降りてきた！",
    defeatLine: "ドラゴンは 山の向こうへ 飛び去った。",
    normalMove: "爪攻撃",
    specialMove: "火炎",
  },
  {
    id: "demon",
    name: "魔人",
    category: "ボスモンスター",
    icon: "😈",
    sprite: "demon",
    tagline: "鬼ヶ島手前の強敵",
    appearLine: "ハッハッハ！ 魔人が 立ちはだかる！",
    defeatLine: "魔人は 消え去った…",
    normalMove: "魔の一撃",
    specialMove: "魔人大技",
  },
  {
    id: "oni",
    name: "鬼",
    category: "ボスモンスター",
    icon: "👹",
    sprite: "oni",
    tagline: "最後の壁・鬼ヶ島の大将",
    appearLine: "ウオオオ！ 鬼が 金棒を 振り上げた！",
    defeatLine: "鬼は 海の向こうへ 逃げ去った…",
    normalMove: "金棒殴り",
    specialMove: "鬼の大技・鉄棒乱舞",
  },
];

const STORY_PORTRAITS = {
  gomachan: { icon: "🐰", label: "ごまちゃん", side: "left" },
  dog: { icon: "🐕", label: "犬", side: "left" },
  monkey: { icon: "🐒", label: "サル", side: "left" },
  pheasant: { icon: "🐦", label: "キジ", side: "left" },
};

const STORY_LOCATIONS = [
  "花畑の村",
  "きびだんご街道",
  "菜の花原",
  "にんじん坂",
  "たんぽぽ草原",
  "ごま団子森",
  "耳とらの森",
  "鬼ヶ島手前",
  "鬼ヶ島",
  "桃の木の下",
];

function storyArcLabel(chapterIdx) {
  if (chapterIdx < 30) return "第1幕：旅立ち";
  if (chapterIdx < 70) return "第2幕：仲間を集める";
  if (chapterIdx < 150) return "第3幕：鬼ヶ島への道";
  return "第4幕：鬼退治";
}

function buildStoryIntro(n, loc, enemyName) {
  if (n === 1) return "花畑の村に、大きな菜の花からごまちゃんが生まれました。モンスターを退治する旅に出ます。";
  if (n === 20) return "旅の途中、犬がきびだんごをねだってきました。「つれていって」——犬が仲間になりました！";
  if (n === 50) return "猿が木の上から。「きびだんごくれ」——サルが仲間になりました！";
  if (n === 85) return "キジが空から舞い降りて。「ぼくも行く」——キジが仲間になりました！";
  if (n >= 190) return `いよいよ鬼ヶ島。${enemyName}が 最後の壁を 守っています。`;
  return `ごまちゃん一行は「${loc}」へ。${enemyName}が 道を ふさいでいます。`;
}

function buildStoryOutro(n, loc) {
  if (n === 200) return "鬼を退治し、花畑の村に平和が戻りました。ごまちゃんは英雄です！";
  if (n === 20 || n === 50 || n === 85) return "仲間が増え、旅は続きます。つぎの章へ進みましょう。";
  return `第${n}章クリア！ ${loc}を越え、鬼ヶ島へ一歩近づきました。`;
}

function getStoryEnemyType(typeId) {
  return STORY_ENEMY_TYPES.find((t) => t.id === typeId) || STORY_ENEMY_TYPES[0];
}

function storyLocationBg(loc) {
  if (loc.includes("鬼")) return "oni";
  if (loc.includes("森")) return "forest";
  if (loc.includes("村") || loc.includes("桃")) return "village";
  if (loc.includes("街道") || loc.includes("坂")) return "road";
  return "field";
}

/** 章開始前の「動画風」カットシーン（クリックで進む） */
function buildChapterCutscene(ch, chapterIdx) {
  const n = chapterIdx + 1;
  const loc = ch.title.split("　")[1] || "";
  const bg = storyLocationBg(loc);
  const lead = ch.enemies[0];
  const type = getStoryEnemyType(lead.typeId);
  const scenes = [];

  if (n === 1) {
    scenes.push({
      bg: "peach",
      speaker: "ナレーション",
      text: "むかしむかし、菜の花畑の村に 大きな菜の花が咲きました。",
      portrait: null,
    });
    scenes.push({
      bg: "peach",
      speaker: "ナレーション",
      text: "その中から 白いうさぎ「ごまちゃん」が 生まれたのです。",
      portrait: "gomachan",
    });
  }

  scenes.push({
    bg,
    speaker: "ナレーション",
    text: ch.intro,
    portrait: n <= 3 ? "gomachan" : null,
  });

  if (n === 20) {
    scenes.push({ bg: "road", speaker: "犬", text: "きびだんごくれ！ つれていって！", portrait: "dog" });
  } else if (n === 50) {
    scenes.push({ bg: "forest", speaker: "サル", text: "きびだんごくれ！ 木の上から 援護するぞ！", portrait: "monkey" });
  } else if (n === 85) {
    scenes.push({ bg: "field", speaker: "キジ", text: "ぼくも行く！ 空から 守ってあげる！", portrait: "pheasant" });
  }

  scenes.push({
    bg: "battle",
    speaker: type.name,
    text: type.appearLine,
    portrait: type.id,
    side: "right",
    enemyReveal: true,
  });

  return scenes;
}

function buildStoryChapters(count) {
  const chapters = [];
  for (let i = 0; i < count; i += 1) {
    const n = i + 1;
    const loc = STORY_LOCATIONS[i % STORY_LOCATIONS.length];
    const enemyCount = Math.min(6, Math.max(2, 2 + Math.floor(i / 12) + (i % 3)));
    const enemies = [];
    for (let e = 0; e < enemyCount; e += 1) {
      const type = STORY_ENEMY_TYPES[(i + e) % STORY_ENEMY_TYPES.length];
      const isBoss = type.id === "oni" || type.id === "demon";
      enemies.push({
        typeId: type.id,
        name: enemyCount > 1 && e > 0 ? `${type.name}${e + 1}` : type.name,
        category: type.category,
        icon: type.icon,
        tagline: type.tagline,
        appearLine: type.appearLine,
        defeatLine: type.defeatLine,
        sprite: type.sprite,
        isBoss,
        normalMove: type.normalMove,
        specialMove: type.specialMove,
        hp: 5 + Math.floor(i * 0.42) + e * 4 + (isBoss ? 8 : 0),
        attack: 2 + Math.floor(i * 0.14) + e * 2 + (isBoss ? 3 : 0),
        phraseSec: Math.max(STORY_BATTLE_PACE.phraseSecMin, STORY_BATTLE_PACE.phraseSecBase - Math.floor(i / 55)),
        defenseSec: Math.max(STORY_BATTLE_PACE.defenseSecMin, STORY_BATTLE_PACE.defenseSecBase - Math.floor(i / 70)),
      });
    }
    const arc = storyArcLabel(i);
    const ch = {
      id: `ch${n}`,
      title: `第${n}章　${loc}`,
      arc,
      intro: buildStoryIntro(n, loc, enemies[0].name),
      enemies,
      outro: buildStoryOutro(n, loc),
    };
    ch.cutscene = buildChapterCutscene(ch, i);
    chapters.push(ch);
  }
  return chapters;
}

const STORY_CHAPTERS = buildStoryChapters(STORY_CHAPTER_COUNT);

const LS_STORY_PROGRESS = "gomaStoryChapterClear";

const cutsceneState = {
  active: false,
  scenes: [],
  index: 0,
  onComplete: null,
};

const storyState = {
  active: false,
  chapterIdx: 0,
  enemyIdx: 0,
  enemyHp: 0,
  enemyMaxHp: 0,
  playerHp: 10,
  playerMaxHp: 10,
  phraseEndAt: 0,
  phraseStartedAt: 0,
  currentPhrase: null,
  targetChars: [],
  romajiCandidates: [],
  typedRomaji: "",
  phraseSec: 5,
  defenseSec: 4,
  raf: 0,
  typosThisPhrase: 0,
  phraseBusy: false,
  /** attack | defense — 桃太郎タイピング風ターン制 */
  phase: "attack",
  /** normal | special — プレイヤーの攻撃種別 */
  moveKind: "normal",
  moveName: "",
  enemyMoveName: "",
  enemyTurnCount: 0,
  gauge: 0,
  attackCount: 0,
  currentEnemy: null,
  /** 桃太郎タイピング風：1文字ずつ打つパネル列 */
  panelKeys: [],
  panelIndex: 0,
  panelTypoFlash: false,
  /** 防御時のみ：こうげき失敗で次の被ダメが増える */
  enemyAttackMul: 1,
  /** 章内の全敵（HP・撃破状態つき） */
  battleEnemies: [],
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
  "storyCutsceneWrap",
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

function storyCompanionHpBonus() {
  return getUnlockedCompanions().reduce((s, c) => s + (c.hpBonus || 0), 0);
}

/** 冒険の進み具合で Lv が上がる（章3クリアごとに+1） */
function storyPlayerLevel() {
  const cleared = loadStoryProgress();
  return Math.max(1, 1 + Math.floor(cleared / 3));
}

/** ココア風：Lv・クリア章数・仲間・装備で最大HPが伸びる */
function storyCalcPlayerMaxHp() {
  const cleared = loadStoryProgress();
  const lv = storyPlayerLevel();
  const equip = aggregateEquipBonus(loadCareerPoints());
  const raw =
    STORY_HP_BASE +
    cleared * STORY_HP_PER_CLEAR +
    (lv - 1) * STORY_HP_PER_LEVEL +
    storyCompanionHpBonus() +
    equip.storyHpBonus;
  return Math.min(140, Math.max(STORY_HP_BASE, raw));
}

function storyCalcEnemyAttack(enemy, chapterIdx) {
  const base = enemy?.attack || 10 + Math.floor(chapterIdx * 0.7);
  return Math.round(base * (storyState.enemyAttackMul || 1));
}

function storyDefenseTier() {
  const remain = Math.max(0, (storyState.phraseEndAt - performance.now()) / 1000);
  const total = Math.max(0.1, storyState.phraseSec);
  const speedRatio = remain / total;
  const typos = storyState.typosThisPhrase;
  if (typos === 0 && speedRatio >= 0.38) return "perfect";
  if (typos === 0 && speedRatio >= 0.12) return "good";
  if (typos <= 1) return "partial";
  return "bad";
}

function storyCompanionDefenseReduceBonus() {
  return getUnlockedCompanions().reduce((s, c) => s + (c.defenseReduceBonus || 0), 0);
}

function storyDefenseDamageMultiplier(tier) {
  /** 桃太郎タイピング：防御は完全無効ではなく軽減 */
  if (tier === "perfect") return 0.2;
  if (tier === "good") return 0.42;
  if (tier === "partial") return 0.72;
  return 1;
}

function storyEquipBonus() {
  return aggregateEquipBonus(loadCareerPoints());
}

function storyCalcDefenseDamage(baseAtk, tier) {
  let mul = storyDefenseDamageMultiplier(tier);
  mul *= Math.max(0.5, 1 - storyCompanionDefenseReduceBonus());
  mul *= Math.max(0.55, 1 - storyEquipBonus().storyDefReduce);
  return Math.max(1, Math.round(baseAtk * mul));
}

function storyDefenseTierLabel(tier) {
  if (tier === "perfect") return "大成功防御";
  if (tier === "good") return "防御成功";
  if (tier === "partial") return "不完全防御";
  return "防御失敗";
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
  closeStoryCutscene();
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
  syncPracticeSettingsFromUi();
  refreshPhrasePointsPreview();
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
  closeStoryCutscene();
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

/** 装備解放段階（2000ptごと）。段階が上がるほど効果が跳ね上がる */
function getEquipTier(def) {
  if (!def) return 0;
  return Math.floor((def.unlockPts || 0) / EQUIP_UNLOCK_STEP);
}

/** Lvが上がるほど効果が加速（Lv20で約85相当） */
function equipLevelPower(lv) {
  if (lv <= 0) return 0;
  return lv + Math.floor((lv * lv) / 4);
}

function equipEffectPower(def, lv) {
  const tier = getEquipTier(def);
  return equipLevelPower(lv) * (1 + tier * 0.55);
}

function aggregateEquipBonus(careerPts) {
  const ids = getEquippedIds();
  let phraseSecAdd = 0;
  let mulAdd = 0;
  let startStock = 0;
  let startBonusMs = 0;
  let storyAtkBonus = 0;
  let storyHpBonus = 0;
  let storyDefReduce = 0;
  let storyGaugeBonus = 0;
  for (const id of ids) {
    const d = EQUIP_BY_ID[id];
    if (!d) continue;
    const lv = getEquipLevel(id, careerPts);
    const power = equipEffectPower(d, lv);
    phraseSecAdd += (d.secPerLevel || 0) * power;
    mulAdd += (d.mulPerLevel || 0) * power;
    startStock += d.startStock || 0;
    startBonusMs += d.startBonusMs || 0;
    if (d.kind === "剣") storyAtkBonus += power * 0.85;
    if (d.kind === "冠") storyHpBonus += Math.max(1, Math.floor(power * 0.9));
    if (d.kind === "衣") storyDefReduce += power * 0.022;
    if (d.kind === "靴") storyAtkBonus += power * 0.15;
    if (d.kind === "指輪") {
      storyGaugeBonus += Math.floor(power * 0.55);
      storyHpBonus += Math.floor(power * 0.35);
    }
  }
  return {
    phraseSecAdd: Math.min(8, phraseSecAdd),
    scoreMult: Math.min(5.5, 1 + mulAdd),
    startStock,
    startBonusMs: Math.min(12000, startBonusMs),
    storyAtkBonus: Math.min(48, storyAtkBonus),
    storyHpBonus: Math.min(55, storyHpBonus),
    storyDefReduce: Math.min(0.45, storyDefReduce),
    storyGaugeBonus: Math.min(22, storyGaugeBonus),
  };
}

/** 装備1個の効果説明（UI用） */
function formatEquipEffectLines(def, lv, equipped) {
  if (!def || lv <= 0) return [];
  const lines = [];
  const power = equipEffectPower(def, lv);
  const tier = getEquipTier(def);
  const scorePct = Math.round((def.mulPerLevel || 0) * power * 100);
  const sec = ((def.secPerLevel || 0) * power).toFixed(2);
  if (tier > 0) lines.push(`解放段階 ${tier + 1} — 効果ブースト`);
  if (scorePct > 0) lines.push(`練習：得点 +${scorePct}%`);
  if (Number(sec) > 0) lines.push(`練習：お題 +${sec}秒`);
  if (def.startStock) lines.push(`練習：開始ストック +${def.startStock}`);
  if (def.startBonusMs) lines.push(`練習：開始 +${(def.startBonusMs / 1000).toFixed(1)}秒`);
  if (def.kind === "剣" && equipped) lines.push(`話：攻撃 +${Math.round(power * 0.85)}`);
  if (def.kind === "冠" && equipped) lines.push(`話：最大HP +${Math.max(1, Math.floor(power * 0.9))}`);
  if (def.kind === "衣" && equipped) lines.push(`話：被ダメ軽減 +${Math.round(power * 2.2)}%`);
  if (def.kind === "靴" && equipped) lines.push(`話：攻撃 +${Math.round(power * 0.15)}`);
  if (def.kind === "指輪" && equipped) {
    lines.push(`話：げんき +${Math.floor(power * 0.55)}/攻撃`);
    lines.push(`話：HP +${Math.floor(power * 0.35)}`);
  }
  return lines;
}

function formatAggregateEquipSummary(careerPts) {
  const b = aggregateEquipBonus(careerPts);
  const ids = getEquippedIds();
  if (ids.length === 0) return "装備なし — 効果は付きません";
  const parts = [];
  if (b.scoreMult > 1) parts.push(`練習得点 ×${b.scoreMult.toFixed(2)}`);
  if (b.phraseSecAdd > 0) parts.push(`お題 +${b.phraseSecAdd.toFixed(1)}秒`);
  if (b.startStock > 0) parts.push(`開始ストック +${b.startStock}`);
  if (b.startBonusMs > 0) parts.push(`開始 +${(b.startBonusMs / 1000).toFixed(1)}秒`);
  if (b.storyAtkBonus > 0) parts.push(`話・攻撃 +${Math.round(b.storyAtkBonus)}`);
  if (b.storyHpBonus > 0) parts.push(`話・HP +${b.storyHpBonus}`);
  if (b.storyDefReduce > 0) parts.push(`話・防御 +${Math.round(b.storyDefReduce * 100)}%`);
  if (b.storyGaugeBonus > 0) parts.push(`話・げんき +${b.storyGaugeBonus}`);
  return parts.join(" ／ ");
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
  const careerPts = loadCareerPoints();
  for (const bunnyId of ["bunny"]) {
    const bunny = $(bunnyId);
    const gear = $("bunnyGear");
    if (!bunny) continue;
    for (let i = 0; i <= 16; i += 1) bunny.classList.remove(`equip-tier-${i}`);
    bunny.classList.toggle("bunny--equip-theme-speed", speedTheme);
    if (gear) {
      gear.innerHTML = "";
      const usedSlots = new Set();
      ids.forEach((id) => {
        const def = EQUIP_BY_ID[id];
        if (!def) return;
        let slot = EQUIP_KIND_SLOT[def.kind] || "body";
        if (usedSlots.has(slot)) slot = `${slot}2`;
        usedSlots.add(slot);
        const sp = document.createElement("span");
        sp.className = `gear-slot gear-slot--${slot} gear--${id}`;
        sp.title = `${def.name} Lv.${getEquipLevel(id, careerPts)}`;
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
  const eqFx = $("careerEquipEffects");
  if (eqFx) eqFx.textContent = formatAggregateEquipSummary(p);
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

function pickStoryDefensePhrase() {
  const candidates = PHRASES.filter((p) => {
    const n = yomiCharCount(p.yomi);
    return n >= 2 && n <= 5;
  });
  if (candidates.length > 0) return candidates[randomInt(0, candidates.length - 1)];
  return PHRASES[randomInt(0, Math.min(20, PHRASES.length - 1))];
}

function pickStoryPhrase() {
  const candidates = PHRASES.filter((p) => {
    const n = yomiCharCount(p.yomi);
    return n >= 2 && n <= 10;
  });
  if (candidates.length > 0) return candidates[randomInt(0, candidates.length - 1)];
  return PHRASES[randomInt(0, PHRASES.length - 1)];
}

/** 桃太郎タイピング風：ホームポジション中心のキー（序盤は j→f→…） */
const MOMO_PANEL_POOL_EARLY = "fjaskldgh";
const MOMO_PANEL_POOL_MID = "asdfghjklqwertyuiop";

/** 桃太郎タイピング本家：バーチャルキーボード（F/J ホームポジション） */
const MOMO_VKBD_ROWS = ["qwertyuiop", "asdfghjkl", "zxcvbnm"];

/** 章の進みでパネル数が増える（桃太郎タイピングのステップアップ方式） */
function buildStoryPanelTask(isDefense, chapterIdx, isSpecial = false) {
  const progress = chapterIdx + loadStoryProgress();
  const pool = progress < 12 ? MOMO_PANEL_POOL_EARLY : MOMO_PANEL_POOL_MID;
  const baseLen = isDefense ? 3 : 4;
  let len = Math.min(isDefense ? 6 : 10, baseLen + Math.floor(progress / 6) + (isDefense ? 0 : 1));
  if (isSpecial) len = Math.min(isDefense ? 8 : 14, len + 4);

  if (progress < 10) {
    const keys = [];
    for (let i = 0; i < len; i += 1) {
      keys.push(pool[i % pool.length] || pool[randomInt(0, pool.length - 1)]);
    }
    const text = isDefense
      ? isSpecial
        ? "大技防御"
        : "ぼうぎょ"
      : isSpecial
        ? STORY_PLAYER_SKILLS.special.name
        : "こうげき";
    return { text, yomi: keys.join(""), panelKeys: keys };
  }

  const phrase = isDefense ? pickStoryDefensePhrase() : pickStoryPhrase();
  const romaji = yomiToRomaji(phrase.yomi);
  const maxLen = isDefense ? (isSpecial ? 10 : 8) : isSpecial ? 16 : 14;
  const keys = [...romaji].slice(0, maxLen);
  const text = isDefense
    ? isSpecial
      ? "大技ぼうぎょ"
      : phrase.text
    : isSpecial
      ? STORY_PLAYER_SKILLS.special.name
      : phrase.text;
  return { text, yomi: phrase.yomi, panelKeys: keys };
}

function storyPickEnemyMove(enemy) {
  storyState.enemyTurnCount += 1;
  const type = getStoryEnemyType(enemy.typeId);
  const useSpecial =
    enemy.isBoss
      ? storyState.enemyTurnCount % 2 === 0
      : storyState.enemyTurnCount >= 3 && (storyState.enemyTurnCount % 3 === 0 || Math.random() < 0.22);
  if (useSpecial) {
    return {
      name: enemy.specialMove || type.specialMove || "モンスター大技",
      isSpecial: true,
      mul: enemy.isBoss ? 1.65 : 1.45,
    };
  }
  return {
    name: enemy.normalMove || type.normalMove || "通常攻撃",
    isSpecial: false,
    mul: 1,
  };
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
  syncPracticeSettingsFromUi();
  $("rankContext").textContent = `${state.diff.label} × ${state.lenMode.label} × ${state.mistakeMode.label}（1プレイのスコア）`;
  renderRankList();
  $("rankPanel").classList.remove("hidden");
  $("rankPanel").classList.add("rank-overlay");
}

function closeRanking() {
  $("rankPanel").classList.add("hidden");
  $("rankPanel").classList.remove("rank-overlay");
}

function syncPracticeSettingsFromUi() {
  const diffEl = $("difficulty");
  const lenEl = $("lengthMode");
  const misEl = $("mistakeMode");
  if (diffEl?.value && DIFFICULTY[diffEl.value]) state.diff = DIFFICULTY[diffEl.value];
  if (lenEl?.value && LENGTH_MODE[lenEl.value]) state.lenMode = LENGTH_MODE[lenEl.value];
  if (misEl?.value && MISTAKE_MODE[misEl.value]) state.mistakeMode = MISTAKE_MODE[misEl.value];
}

function phrasePointsBreakdown() {
  syncPracticeSettingsFromUi();
  const diffPts = state.diff?.points ?? 1;
  const lenPts = state.lenMode?.bonus ?? 0;
  const mult = aggregateEquipBonus(loadCareerPoints()).scoreMult;
  const total = Math.max(1, Math.floor((diffPts + lenPts) * mult));
  return { diffPts, lenPts, mult, total };
}

function phrasePoints() {
  return phrasePointsBreakdown().total;
}

function refreshPhrasePointsPreview() {
  const el = $("pointsPerPhrase");
  const hint = $("pointsBreakdownHint");
  if (!el && !hint) return;
  const b = phrasePointsBreakdown();
  if (el) el.textContent = String(b.total);
  if (hint) {
    hint.textContent = `内訳：難易度 +${b.diffPts} ／ 野菜 +${b.lenPts}${b.mult > 1 ? ` ／ 装備 ×${b.mult.toFixed(2)}` : ""}`;
  }
}

function showScoreGainPopup(pts) {
  if (!pts || pts <= 0) return;
  const pop = $("scoreGainPopup");
  if (!pop) return;
  pop.textContent = `+${pts} pt`;
  pop.classList.remove("is-show");
  void pop.offsetWidth;
  pop.classList.add("is-show");
  window.clearTimeout(showScoreGainPopup._t);
  showScoreGainPopup._t = window.setTimeout(() => pop.classList.remove("is-show"), 900);
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
let gomaBgmMode = "field";
let gomaStoryMelodyStep = 0;

/** 桃太郎タイピング風バトル曲（オリジナル・ペンタトニック） */
const MOMO_BATTLE_MELODY = [523.25, 587.33, 659.25, 783.99, 880, 783.99, 659.25, 587.33, 523.25, 659.25, 783.99, 880];
const MOMO_BATTLE_BASS = [261.63, 329.63, 392, 329.63];

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
  gomaBgmMode = "field";
}

function playStoryBattleBgmTick(when) {
  const ctx = gomaAudioCtx;
  const master = gomaMasterGain;
  if (!ctx || !master || !storyState.active) return;
  const melIdx = gomaStoryMelodyStep % MOMO_BATTLE_MELODY.length;
  const bassIdx = Math.floor(gomaStoryMelodyStep / 2) % MOMO_BATTLE_BASS.length;
  gomaStoryMelodyStep += 1;

  const lead = ctx.createOscillator();
  const leadG = ctx.createGain();
  lead.type = "triangle";
  lead.frequency.value = MOMO_BATTLE_MELODY[melIdx];
  leadG.gain.setValueAtTime(0.0001, when);
  leadG.gain.linearRampToValueAtTime(0.09, when + 0.04);
  leadG.gain.exponentialRampToValueAtTime(0.0001, when + 0.42);
  lead.connect(leadG);
  leadG.connect(master);
  lead.start(when);
  lead.stop(when + 0.45);

  if (gomaStoryMelodyStep % 2 === 0) {
    const bass = ctx.createOscillator();
    const bassG = ctx.createGain();
    bass.type = "sine";
    bass.frequency.value = MOMO_BATTLE_BASS[bassIdx];
    bassG.gain.setValueAtTime(0.0001, when);
    bassG.gain.linearRampToValueAtTime(0.055, when + 0.03);
    bassG.gain.exponentialRampToValueAtTime(0.0001, when + 0.35);
    bass.connect(bassG);
    bassG.connect(master);
    bass.start(when);
    bass.stop(when + 0.38);
  }

  if (melIdx % 4 === 0) {
    [1046.5, 1318.5].forEach((f, i) => {
      const h = ctx.createOscillator();
      const hg = ctx.createGain();
      h.type = "sine";
      h.frequency.value = f;
      hg.gain.setValueAtTime(0.0001, when);
      hg.gain.linearRampToValueAtTime(0.018 - i * 0.004, when + 0.02);
      hg.gain.exponentialRampToValueAtTime(0.0001, when + 0.2);
      h.connect(hg);
      hg.connect(master);
      h.start(when);
      h.stop(when + 0.22);
    });
  }
}

function tickGomaStoryBattleBgm() {
  if (!storyState.active || gomaBgmMode !== "story") return;
  const ctx = ensureGomaAudio();
  if (!ctx) return;
  playStoryBattleBgmTick(ctx.currentTime + 0.02);
}

function startGomaStoryBattleBgm() {
  stopGomaBgm();
  gomaBgmMode = "story";
  gomaStoryMelodyStep = 0;
  if (!ensureGomaAudio()) return;
  tickGomaStoryBattleBgm();
  gomaBgmInterval = window.setInterval(tickGomaStoryBattleBgm, 480);
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
  gomaBgmMode = "field";
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

/** 累計の正解打鍵が 30 文字ごとに ＋1 秒 */
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
  showScoreGainPopup(pts);

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
  syncPracticeSettingsFromUi();
  setSceneDifficultyClass();
  updateStockHudLabel();
  refreshPhrasePointsPreview();
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

  const done = state.typedRomaji.length > 0 && state.romajiCandidates.includes(state.typedRomaji);
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
      ? `累計 ${p} pt。解放済み ${unlockedCount} 種類。ボタンで装着 ON/OFF（最大 ${MAX_EQUIPPED} つ）。`
      : `累計 ${p} pt（装備は ${EQUIP_UNLOCK_STEP} pt ごとに解放）／ 同時 ${MAX_EQUIPPED} スロット`;
  }
  const fxEl = $("equipHubActiveEffects");
  if (fxEl && isHub) fxEl.textContent = `いまの効果：${formatAggregateEquipSummary(p)}`;
  body.innerHTML = "";
  EQUIP_CATALOG.forEach((def) => {
    const unlocked = p >= def.unlockPts;
    const checked = sel.includes(def.id);
    const lv = unlocked ? getEquipLevel(def.id, p) : 0;
    const fxLines = formatEquipEffectLines(def, lv, checked);
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
    const fxHtml =
      unlocked && fxLines.length > 0
        ? `<span class="ff5-equip-fx">${fxLines.map((l) => escapeHtml(l)).join(" ／ ")}</span>`
        : "";
    meta.innerHTML = `<strong>${escapeHtml(def.name)}</strong><span>${escapeHtml(def.kind)}${
      unlocked ? ` Lv.${lv}${checked ? " — 装着中" : ""}` : ` — 解放 ${def.unlockPts} pt`
    }</span>${fxHtml}`;

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

/* ── 話モード（桃太郎タイピング風） ── */

function getUnlockedCompanions() {
  const cleared = loadStoryProgress();
  return STORY_COMPANIONS.filter((c) => cleared >= c.unlockClear);
}

function renderStoryCompanionStrip() {
  const strip = $("storyCompanionStrip");
  const cleared = loadStoryProgress();
  const html = [
    `<span class="momo-companion is-on" title="${STORY_HERO.name}（主人公）">${STORY_HERO.icon} ${STORY_HERO.name}</span>`,
    ...STORY_COMPANIONS.map((c) => {
      const on = cleared >= c.unlockClear;
      return `<span class="momo-companion${on ? " is-on" : ""}" title="${on ? `${c.name}（仲間）` : `第${c.unlockClear}章クリアで仲間`}">${c.icon} ${c.name}</span>`;
    }),
  ].join("");
  if (strip) strip.innerHTML = html;
}

/** バトル左列：ごまちゃん＋犬・サル・キジ（ココア版桃太郎タイピング風 chibi） */
function renderStoryPartyPanel() {
  const col = $("storyPartyColumn");
  if (!col) return;
  const cleared = loadStoryProgress();
  const curP = Math.max(0, storyState.playerHp ?? storyCalcPlayerMaxHp());
  const maxP = storyState.playerMaxHp ?? storyCalcPlayerMaxHp();
  const pPct = maxP > 0 ? Math.max(0, (curP / maxP) * 100) : 0;
  let html = `<div class="cocoa-party-slot cocoa-party-slot--hero" id="storyHeroSlot">
    <div class="cocoa-party-slot__fig">${cocoaCharSpriteHtml("gomachan", "lg")}</div>
    <div class="cocoa-party-slot__info">
      <span class="cocoa-party-slot__name">${STORY_HERO.name}</span>
      <span class="cocoa-party-slot__sub">${STORY_HERO.role}</span>
      <div class="cocoa-hp-bar" aria-hidden="true"><div class="cocoa-hp-fill cocoa-hp-fill--ally" id="storyPlayerHpBar" style="width:${pPct}%"></div></div>
      <span class="cocoa-party-slot__hpnum"><strong id="storyPlayerHp">${curP}</strong>/<span id="storyPlayerMaxHp">${maxP}</span></span>
    </div>
  </div>`;
  STORY_COMPANIONS.forEach((c) => {
    const on = cleared >= c.unlockClear;
    html += `<div class="cocoa-party-slot${on ? "" : " cocoa-party-slot--locked"}" title="${on ? c.skillName : `第${c.unlockClear}章`}">
      <div class="cocoa-party-slot__fig">${cocoaCharSpriteHtml(c.id, on ? "md" : "sm")}</div>
      <div class="cocoa-party-slot__info">
        <span class="cocoa-party-slot__name">${c.name}</span>
        <span class="cocoa-party-slot__sub">${on ? c.skillName : "？？？"}</span>
      </div>
    </div>`;
  });
  col.innerHTML = html;
}

function storyCompanionAttackBonus() {
  return getUnlockedCompanions().reduce((s, c) => s + (c.attackBonus || 0), 0);
}

function storyCompanionDefenseSecBonus() {
  return getUnlockedCompanions().reduce((s, c) => s + (c.defenseSecBonus || 0), 0);
}

function setStoryDialog(text, speaker = "ごまちゃん") {
  const el = $("storyDialog");
  const sp = $("storySpeakerName");
  if (el) el.textContent = `【${speaker}】${text}`;
  if (sp) sp.textContent = speaker;
}

function renderStoryEnemyVisual(enemy) {
  if (!enemy) return;
  const type = getStoryEnemyType(enemy.typeId);
  const card = $("storyEnemyCard");
  const catEl = $("storyEnemyCategory");
  const iconEl = $("storyEnemyIcon");
  const nameEl = $("storyEnemyName");
  const tagEl = $("storyEnemyTagline");
  const spriteEl = $("storyEnemySprite");
  const banner = $("storyEnemySpawnBanner");
  const nameHud = $("storyEnemyNameHud");

  if (catEl) catEl.textContent = enemy.category || type.category;
  if (iconEl) iconEl.textContent = enemy.icon || type.icon;
  if (nameEl) nameEl.textContent = enemy.name;
  if (tagEl) tagEl.textContent = enemy.tagline || type.tagline;
  if (nameHud) nameHud.textContent = enemy.name;
  if (spriteEl) {
    spriteEl.innerHTML = cocoaMonsterSpriteHtml(enemy.sprite || type.sprite, enemy.isBoss);
  }
  if (card) {
    card.classList.toggle("cocoa-enemy-card--boss", !!enemy.isBoss);
    card.dataset.enemyType = type.id;
  }
  if (banner) {
    banner.classList.remove("is-show");
    void banner.offsetWidth;
    banner.innerHTML = `<span class="cocoa-enemy-spawn__badge">${escapeHtml(enemy.category || type.category)}</span><strong>${escapeHtml(enemy.icon || type.icon)} ${escapeHtml(enemy.name)}</strong><span class="cocoa-enemy-spawn__sub">${escapeHtml(enemy.tagline || type.tagline)}</span>`;
    banner.classList.add("is-show");
  }
}

function showCutsceneScene(scene) {
  const wrap = $("storyCutsceneWrap");
  const bg = $("storyCutsceneBg");
  const speaker = $("storyCutSpeaker");
  const text = $("storyCutText");
  const left = $("storyCutPortraitLeft");
  const right = $("storyCutPortraitRight");
  const reveal = $("storyCutEnemyReveal");

  if (bg) {
    bg.className = "momo-cutscene__bg";
    bg.classList.add(`momo-cutscene__bg--${scene.bg || "field"}`);
  }
  if (speaker) speaker.textContent = scene.speaker || "ナレーション";
  if (text) text.textContent = scene.text || "";

  [left, right].forEach((el) => {
    if (el) {
      el.classList.add("hidden");
      el.innerHTML = "";
    }
  });

  const pid = scene.portrait;
  if (pid) {
    const enemyType = STORY_ENEMY_TYPES.find((t) => t.id === pid);
    const companion = STORY_PORTRAITS[pid];
    const side = scene.side || companion?.side || (enemyType ? "right" : "left");
    const target = side === "right" ? right : left;
    const icon = enemyType?.icon || companion?.icon || "🐰";
    const label = enemyType?.name || companion?.label || scene.speaker;
    if (target) {
      target.classList.remove("hidden");
      target.innerHTML = `<span class="momo-cutscene__portrait-icon">${icon}</span><span class="momo-cutscene__portrait-name">${escapeHtml(label)}</span>`;
      target.classList.toggle("momo-cutscene__portrait--enemy", !!enemyType);
    }
  }

  if (reveal) {
    reveal.classList.toggle("hidden", !scene.enemyReveal);
    if (scene.enemyReveal && scene.portrait) {
      const et = getStoryEnemyType(scene.portrait);
      reveal.innerHTML = `<span class="momo-cutscene__reveal-badge">${escapeHtml(et.category)} 登場！</span><span class="momo-cutscene__reveal-icon">${et.icon}</span><strong>${escapeHtml(et.name)}</strong>`;
    }
  }

  if (wrap) {
    wrap.classList.remove("momo-cutscene--fade");
    void wrap.offsetWidth;
    wrap.classList.add("momo-cutscene--fade");
  }
}

function advanceStoryCutscene() {
  if (!cutsceneState.active) return;
  cutsceneState.index += 1;
  if (cutsceneState.index >= cutsceneState.scenes.length) {
    closeStoryCutscene();
    const done = cutsceneState.onComplete;
    cutsceneState.onComplete = null;
    if (done) done();
    return;
  }
  showCutsceneScene(cutsceneState.scenes[cutsceneState.index]);
}

function playStoryCutscene(scenes, onComplete) {
  cutsceneState.active = true;
  cutsceneState.scenes = scenes;
  cutsceneState.index = 0;
  cutsceneState.onComplete = onComplete;
  hideAllMainScreens();
  $("storyCutsceneWrap")?.classList.remove("hidden");
  document.body.classList.add("is-cutscene");
  showCutsceneScene(scenes[0]);
}

function closeStoryCutscene() {
  cutsceneState.active = false;
  cutsceneState.scenes = [];
  cutsceneState.index = 0;
  $("storyCutsceneWrap")?.classList.add("hidden");
  document.body.classList.remove("is-cutscene");
}

function onCutsceneAdvance(ev) {
  if (!cutsceneState.active) return;
  if (ev.type === "keydown" && ev.key !== "Enter" && ev.key !== " ") return;
  if (ev.type === "keydown") ev.preventDefault();
  advanceStoryCutscene();
}

function updateStoryPhaseUi() {
  const banner = $("storyTurnBanner");
  const ribbon = $("storyPhaseRibbon");
  const card = $("storyPhraseCard");
  const moveEl = $("storyMoveName");
  const flowAtk = $("storyFlowAttack");
  const flowDef = $("storyFlowDefense");
  if (!banner) return;
  const isDef = storyState.phase === "defense";
  const isSpecial = !isDef && storyState.moveKind === "special";
  if (isDef) {
    banner.textContent = "ぼうぎょ！";
    if (ribbon) ribbon.className = "momo-phase-ribbon momo-phase-ribbon--defense";
    setStoryArenaMode("defense");
  } else if (isSpecial) {
    banner.textContent = "大技！";
    if (ribbon) ribbon.className = "momo-phase-ribbon momo-phase-ribbon--special";
    setStoryArenaMode("attack");
  } else {
    banner.textContent = "こうげき！";
    if (ribbon) ribbon.className = "momo-phase-ribbon momo-phase-ribbon--attack";
    setStoryArenaMode("attack");
  }
  if (moveEl) {
    moveEl.textContent = isDef
      ? `敵の技「${storyState.enemyMoveName || "攻撃"}」を防御`
      : isSpecial
        ? `大技「${storyState.moveName}」`
        : `技「${storyState.moveName || STORY_PLAYER_SKILLS.normal.name}」`;
  }
  if (flowAtk) {
    flowAtk.classList.toggle("momo-flow__step--on", !isDef);
    flowAtk.classList.remove("momo-flow__step--defense");
  }
  if (flowDef) {
    flowDef.classList.toggle("momo-flow__step--on", isDef);
    flowDef.classList.toggle("momo-flow__step--defense", isDef);
  }
  if (card) {
    card.classList.toggle("momo-phrase-card--defense", isDef);
    card.classList.toggle("momo-phrase-card--attack", !isDef && !isSpecial);
    card.classList.toggle("momo-phrase-card--special", isSpecial);
  }
  updateStoryNextKeyHint();
}

function updateStoryHud() {
  const plv = $("storyPlayerLv");
  const pBar = $("storyPlayerHpBar");
  const eBar = $("storyEnemyHpBar");
  const eNameHud = $("storyEnemyNameHud");
  const curP = Math.max(0, storyState.playerHp);
  const maxP = storyState.playerMaxHp;
  const curE = Math.max(0, storyState.enemyHp);
  const maxE = storyState.enemyMaxHp;
  const pPct = maxP > 0 ? Math.max(0, (curP / maxP) * 100) : 0;
  const ePct = maxE > 0 ? Math.max(0, (curE / maxE) * 100) : 0;
  const hpEl = $("storyPlayerHp");
  const maxHpEl = $("storyPlayerMaxHp");
  if (hpEl) hpEl.textContent = String(curP);
  if (maxHpEl) maxHpEl.textContent = String(maxP);
  if (plv) plv.textContent = `Lv.${storyPlayerLevel()}`;
  const eHpEl = $("storyEnemyHp");
  const eMaxEl = $("storyEnemyMaxHp");
  if (eHpEl) eHpEl.textContent = String(curE);
  if (eMaxEl) eMaxEl.textContent = String(maxE);
  if (pBar) {
    pBar.style.width = `${pPct}%`;
    pBar.classList.toggle("momo-hp-fill--low", pPct > 0 && pPct <= 28);
  }
  if (eBar) eBar.style.width = `${ePct}%`;
  if (eNameHud && storyState.currentEnemy) eNameHud.textContent = storyState.currentEnemy.name;
  const atkHint = $("storyEnemyAtkHint");
  if (atkHint && storyState.currentEnemy) {
    const atk = storyCalcEnemyAttack(storyState.currentEnemy, storyState.chapterIdx);
    if (storyState.phase === "defense") {
      const reduced = storyCalcDefenseDamage(atk, "good");
      atkHint.textContent = storyState.enemyMoveName
        ? `⚠ ${storyState.enemyMoveName}：${atk}ダメ → 防御成功で約${reduced}`
        : `⚠ 攻撃力 ${atk}`;
      atkHint.classList.add("is-active");
    } else {
      atkHint.textContent = `${storyState.currentEnemy.icon || ""} ${storyState.currentEnemy.category || "モンスター"} — こうげきターン`;
      atkHint.classList.remove("is-active");
    }
  }
  const gaugeBar = $("storyGaugeBar");
  const gaugeText = $("storyGaugeText");
  const gPct = Math.min(100, (storyState.gauge / STORY_GAUGE_MAX) * 100);
  if (gaugeBar) gaugeBar.style.width = `${gPct}%`;
  if (gaugeText) {
    gaugeText.textContent =
      storyState.gauge >= STORY_GAUGE_MAX
        ? "げんき MAX — 大技！"
        : `げんき ${storyState.gauge}/${STORY_GAUGE_MAX}`;
  }
}

function showStoryDamagePopup(amount, target = "player") {
  if (amount <= 0) return;
  const pop = $("storyDamagePopup");
  if (!pop) return;
  pop.textContent = `-${amount}`;
  pop.className = `momo-damage-popup momo-damage-popup--${target} is-show`;
  window.clearTimeout(showStoryDamagePopup._t);
  showStoryDamagePopup._t = window.setTimeout(() => pop.classList.remove("is-show"), 1200);
}

function flashStoryHpBar(which) {
  if (which === "player") {
    const slot = $("storyHeroSlot");
    const bar = $("storyPlayerHpBar")?.closest(".cocoa-hp-bar");
    [slot, bar].forEach((el) => {
      if (!el) return;
      el.classList.remove("momo-hp-bar--hit");
      void el.offsetWidth;
      el.classList.add("momo-hp-bar--hit");
    });
    return;
  }
  const bar = $("storyEnemyHpBar")?.closest(".cocoa-hp-bar");
  if (!bar) return;
  bar.classList.remove("momo-hp-bar--hit");
  void bar.offsetWidth;
  bar.classList.add("momo-hp-bar--hit");
}

function renderStoryChapterList() {
  const list = $("storyChapterList");
  const meta = $("storyMenuMeta");
  const cleared = loadStoryProgress();
  renderStoryCompanionStrip();
  if (meta) {
    const lv = storyPlayerLevel();
    const maxHp = storyCalcPlayerMaxHp();
    const eqSum = formatAggregateEquipSummary(loadCareerPoints());
    meta.textContent = `旅のしおり — 全 ${STORY_CHAPTER_COUNT} 章。クリア ${cleared} 章。ごまちゃん Lv.${lv}（HP ${maxHp}）／ ${eqSum}`;
  }
  if (!list) return;
  list.innerHTML = "";
  STORY_CHAPTERS.forEach((ch, i) => {
    const locked = i > cleared;
    const li = document.createElement("li");
    li.className = `story-chapter-item${locked ? " is-locked" : ""}${i < cleared ? " is-cleared" : ""}`;
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "story-chapter-btn momo-chapter-btn";
    btn.disabled = locked;
    const lead = ch.enemies[0];
    const badge = i < cleared ? "クリア済み" : locked ? "ロック" : ch.arc;
    btn.innerHTML = `<strong>${escapeHtml(ch.title)}</strong><span>${lead.icon} ${escapeHtml(lead.name)}（${escapeHtml(lead.category)}）— ${ch.enemies.length} 戦</span>`;
    if (!locked) btn.addEventListener("click", () => startStoryChapter(i));
    li.appendChild(btn);
    list.appendChild(li);
  });
}

function beginStoryBattle() {
  storyState.active = true;
  storyState.phraseBusy = false;
  storyState.phase = "attack";
  hideAllMainScreens();
  $("storyStageWrap")?.classList.remove("hidden");
  $("storyResultPanel")?.classList.add("hidden");
  document.body.classList.add("is-story");
  renderStoryCompanionStrip();
  renderStoryPartyPanel();
  attachStoryKeyCapture();
  void resumeGomaAudio();
  startGomaStoryBattleBgm();
  setStoryBattleLive(true);
  $("storyGhostInput")?.focus({ preventScroll: true });
}

function startStoryChapter(chapterIdx) {
  const ch = STORY_CHAPTERS[chapterIdx];
  if (!ch) return;
  storyState.chapterIdx = chapterIdx;
  storyState.enemyIdx = 0;
  storyState.enemyAttackMul = 1;
  storyState.playerMaxHp = storyCalcPlayerMaxHp();
  storyState.playerHp = storyState.playerMaxHp;
  storyState.attackCount = 0;
  storyState.gauge = 0;
  storyState.enemyTurnCount = 0;
  storyState.moveKind = "normal";
  storyState.active = true;
  document.body.classList.add("is-story");
  void resumeGomaAudio();
  startGomaStoryBattleBgm();
  const label = $("storyChapterLabel");
  if (label) label.textContent = ch.title;
  playStoryCutscene(ch.cutscene || buildChapterCutscene(ch, chapterIdx), () => {
    beginStoryBattle();
    startStoryEnemy();
  });
}

function startStoryEnemy() {
  const ch = STORY_CHAPTERS[storyState.chapterIdx];
  const enemy = ch.enemies[storyState.enemyIdx];
  if (!enemy) return;
  storyState.currentEnemy = enemy;
  storyState.enemyMaxHp = enemy.hp;
  storyState.enemyHp = enemy.hp;
  storyState.phraseSec = enemy.phraseSec;
  storyState.defenseSec = enemy.defenseSec || Math.max(2.5, enemy.phraseSec - 1);
  storyState.attackCount = 0;
  storyState.enemyTurnCount = 0;
  storyState.enemyAttackMul = 1;
  renderStoryEnemyVisual(enemy);
  renderStoryPartyPanel();
  updateStoryHud();
  const enemyEl = $("storyEnemy");
  if (enemyEl) {
    enemyEl.classList.remove("is-spawn");
    void enemyEl.offsetWidth;
    enemyEl.classList.add("is-spawn");
  }
  setStoryDialog(`${enemy.appearLine || enemy.name + " があらわれた！"} こうげきターンから始まる！`, enemy.name);
  storyStartAttackPhrase();
  cancelAnimationFrame(storyState.raf);
  storyState.raf = requestAnimationFrame(storyLoop);
}

function storySetupPanels(task) {
  storyState.currentPhrase = { text: task.text, yomi: task.yomi };
  storyState.panelKeys = task.panelKeys.map((k) => k.toLowerCase());
  storyState.typosThisPhrase = 0;
  storyResetPanelTyping();
  const now = performance.now();
  storyState.phraseStartedAt = now;
  storyState.phraseEndAt = now + storyState.phraseSec * 1000;
  const wordEl = $("storyPanelWord");
  if (wordEl) wordEl.textContent = task.text;
  renderStoryPanels();
  const inp = $("storyGhostInput");
  if (inp) inp.value = "";
}

function updateStoryNextKeyHint() {
  const el = $("storyNextKeyHint");
  if (!el) return;
  if (storyIsPhraseComplete()) {
    el.textContent = "打ち終わり！";
    return;
  }
  const opts = storyPanelNextKeyOptions();
  if (opts.length === 0) {
    el.textContent = "パネルを順番に打て！";
  } else if (opts.length === 1) {
    el.innerHTML = `つぎ → <strong>${escapeHtml(opts[0])}</strong> を打て！`;
  } else {
    el.innerHTML = `つぎ → <strong>${opts.map((o) => escapeHtml(o)).join(" か ")}</strong> を打て！`;
  }
}

function renderStoryVirtualKeyboard() {
  const el = $("storyVirtualKeyboard");
  if (!el) return;
  const opts = storyPanelNextKeyOptions().map((k) => k.toLowerCase());
  const highlightSet = new Set(opts);
  el.innerHTML = MOMO_VKBD_ROWS.map(
    (row) =>
      `<div class="momo-vkbd-row">${[...row]
        .map((k) => {
          let cls = "momo-vkbd-key";
          if ("fj".includes(k)) cls += " momo-vkbd-key--home";
          if (highlightSet.has(k)) cls += " momo-vkbd-key--next";
          return `<span class="${cls}">${k.toUpperCase()}</span>`;
        })
        .join("")}</div>`,
  ).join("");
}

function renderStoryPanels() {
  const board = $("storyPanelBoard");
  if (!board) return;
  const keys = storyState.panelKeys;
  const idx = storyState.panelIndex;
  const complete = storyIsPhraseComplete();
  const nextOpts = storyPanelNextKeyOptions();
  board.innerHTML = keys
    .map((k, i) => {
      let cls = "momo-key-panel";
      const isDone = complete || i < idx;
      const isCurrent = !complete && i === idx;
      if (isDone) cls += " momo-key-panel--done";
      else if (isCurrent) cls += " momo-key-panel--current";
      if (isCurrent && storyState.panelTypoFlash) cls += " momo-key-panel--miss";
      let label = k.toUpperCase();
      if (isCurrent && nextOpts.length > 1) label = nextOpts.join("・");
      else if (isCurrent && nextOpts.length === 1) label = nextOpts[0];
      return `<span class="${cls}">${escapeHtml(label)}</span>`;
    })
    .join("");
  updateStoryNextKeyHint();
  renderStoryVirtualKeyboard();
  const remain = Math.max(0, storyState.phraseEndAt - performance.now());
  const total = Math.max(1, storyState.phraseSec * 1000);
  const fill = $("storyPanelTimerFill");
  if (fill) fill.style.width = `${(remain / total) * 100}%`;
}

function storyStartAttackPhrase() {
  storyState.phase = "attack";
  storyState.phraseBusy = false;
  storyState.enemyAttackMul = 1;
  const useSpecial = storyState.gauge >= STORY_GAUGE_MAX;
  storyState.moveKind = useSpecial ? "special" : "normal";
  if (useSpecial) storyState.gauge = 0;
  const companions = getUnlockedCompanions();
  let moveName = useSpecial ? STORY_PLAYER_SKILLS.special.name : STORY_PLAYER_SKILLS.normal.name;
  if (useSpecial && companions.length > 0) {
    moveName = `${moveName}＋${companions.map((c) => c.skillName).join("・")}`;
  }
  storyState.moveName = moveName;
  const equip = storyEquipBonus();
  storyState.phraseSec = (storyState.currentEnemy?.phraseSec || 5) + (useSpecial ? STORY_BATTLE_PACE.specialPhraseBonus : 0) + equip.phraseSecAdd;
  updateStoryPhaseUi();
  updateStoryHud();
  const msg = useSpecial
    ? `げんき MAX！ 大技 — 上のパネルを全部打て！`
    : "こうげき！ 上のパネルを順番に打て！";
  setStoryDialog(msg, "ごまちゃん");
  storySetupPanels(buildStoryPanelTask(false, storyState.chapterIdx, useSpecial));
}

function storyStartDefensePhrase(boostMul = 1) {
  storyState.phase = "defense";
  storyState.phraseBusy = false;
  const enemy = storyState.currentEnemy;
  const move = storyPickEnemyMove(enemy);
  storyState.enemyMoveName = move.name;
  storyState.enemyAttackMul = Math.max(storyState.enemyAttackMul, boostMul) * move.mul;
  let sec = storyState.currentEnemy?.defenseSec || 3.2;
  sec += storyCompanionDefenseSecBonus();
  sec += storyEquipBonus().phraseSecAdd;
  if (move.isSpecial) sec += 0.5;
  storyState.phraseSec = sec;
  updateStoryPhaseUi();
  updateStoryHud();
  const atk = storyCalcEnemyAttack(enemy, storyState.chapterIdx);
  const hintReduced = storyCalcDefenseDamage(atk, "perfect");
  const intro = move.isSpecial
    ? `${enemy?.name}の大技「${move.name}」！ ${atk}ダメージ — 打てば軽減（最小${hintReduced}）`
    : `${enemy?.name}の「${move.name}」！ ${atk}ダメージ — 防御で軽減`;
  setStoryDialog(intro, enemy?.name || "敵");
  storySetupPanels(buildStoryPanelTask(true, storyState.chapterIdx, move.isSpecial));
  flashStoryEnemyAttack();
  playStoryBattleFx("enemy-attack");
}

function storyOnAttackSuccess() {
  if (storyState.phraseBusy) return;
  storyState.phraseBusy = true;
  storyState.attackCount += 1;
  const remain = Math.max(0, (storyState.phraseEndAt - performance.now()) / 1000);
  const total = Math.max(0.1, storyState.phraseSec);
  const speedRatio = remain / total;
  const companion = storyCompanionAttackBonus();
  const equip = storyEquipBonus();
  const isSpecial = storyState.moveKind === "special";
  let dmg = Math.max(1, Math.round((2 + storyState.panelKeys.length * 0.35) * speedRatio) + companion);
  dmg += Math.round(equip.storyAtkBonus);
  if (isSpecial) dmg = Math.round(dmg * 2.35);
  if (storyState.typosThisPhrase > 0) dmg = Math.max(1, dmg - storyState.typosThisPhrase * 2);
  if (speedRatio >= 0.55 && storyState.typosThisPhrase === 0) dmg += isSpecial ? 4 : 2;
  if (!isSpecial) {
    storyState.gauge = Math.min(
      STORY_GAUGE_MAX,
      storyState.gauge + STORY_GAUGE_PER_NORMAL + equip.storyGaugeBonus,
    );
  }
  storyState.enemyHp = Math.max(0, storyState.enemyHp - dmg);
  const enemy = storyState.currentEnemy;
  let msg = isSpecial
    ? `大技「${storyState.moveName}」${dmg} ダメージ！`
    : `${enemy?.name || "敵"}に ${dmg} ダメージ！`;
  if (companion > 0) msg += " 仲間の援護！";
  if (equip.storyAtkBonus > 0) msg += " 装備の力！";
  if (speedRatio >= 0.5 && storyState.typosThisPhrase === 0) msg += " 速攻！";
  setStoryDialog(msg, "ごまちゃん");
  updateStoryHud();
  showStoryDamagePopup(dmg, "enemy");
  flashStoryEnemyHit();
  flashStoryHpBar("enemy");
  playStoryBattleFx("attack", { isSpecial, companion: companion > 0 });
  if (storyState.enemyHp <= 0) {
    window.setTimeout(() => storyOnEnemyDefeated(), STORY_BATTLE_PACE.defeatGapMs + STORY_BATTLE_PACE.actionPauseMs);
    return;
  }
  window.setTimeout(() => storyStartDefensePhrase(), STORY_BATTLE_PACE.phaseGapMs + STORY_BATTLE_PACE.actionPauseMs);
}

function storyOnDefenseSuccess() {
  if (storyState.phraseBusy) return;
  storyState.phraseBusy = true;
  const tier = storyDefenseTier();
  const baseAtk = storyCalcEnemyAttack(storyState.currentEnemy, storyState.chapterIdx);
  const dmg = storyCalcDefenseDamage(baseAtk, tier);
  const reduced = Math.max(0, baseAtk - dmg);
  storyState.playerHp = Math.max(0, storyState.playerHp - dmg);
  const label = storyDefenseTierLabel(tier);
  setStoryDialog(
    `${label}！ ${storyState.enemyMoveName || "攻撃"} ${baseAtk}→${dmg}（${reduced} 軽減）`,
    "ごまちゃん",
  );
  showStoryDamagePopup(dmg, "player");
  flashStoryHpBar("player");
  playStoryBattleFx("defense", { tier });
  storyState.enemyAttackMul = 1;
  updateStoryHud();
  if (storyState.playerHp <= 0) {
    window.setTimeout(() => storyOnDefeat(), STORY_BATTLE_PACE.defeatGapMs + STORY_BATTLE_PACE.actionPauseMs);
    return;
  }
  window.setTimeout(() => storyStartAttackPhrase(), STORY_BATTLE_PACE.phaseGapMs + STORY_BATTLE_PACE.actionPauseMs);
}

function storyOnPhraseSuccess() {
  if (storyState.phase === "defense") storyOnDefenseSuccess();
  else storyOnAttackSuccess();
}

function setStoryArenaMode(mode) {
  const arena = $("storyScene");
  if (!arena) return;
  arena.classList.remove("momo-arena--attack", "momo-arena--defense", "momo-arena--fighting");
  if (mode) {
    arena.classList.add(`momo-arena--${mode}`, "momo-arena--fighting");
  }
}

function setStoryBattleLive(on) {
  const el = $("storyBattleLive");
  if (!el) return;
  el.classList.toggle("is-on", !!on);
}

function playStoryBattleFx(kind, opts = {}) {
  const fx = $("storyBattleFx");
  if (!fx) return;
  fx.classList.remove("is-show", "is-attack", "is-defense", "is-special", "is-enemy-attack", "is-companion");
  void fx.offsetWidth;
  if (kind === "attack") {
    fx.classList.add("is-attack", "is-show");
    if (opts.isSpecial) fx.classList.add("is-special");
    if (opts.companion) {
      fx.classList.add("is-companion");
      flashStoryCompanions();
    }
    flashStoryPlayerAttack(opts.isSpecial);
  } else if (kind === "defense") {
    fx.classList.add("is-defense", "is-show");
    flashStoryPlayerBlock(opts.tier);
  } else if (kind === "enemy-attack") {
    fx.classList.add("is-enemy-attack", "is-show");
  }
  window.clearTimeout(playStoryBattleFx._t);
  playStoryBattleFx._t = window.setTimeout(
    () => fx.classList.remove("is-show", "is-attack", "is-defense", "is-special", "is-enemy-attack", "is-companion"),
    STORY_BATTLE_PACE.actionPauseMs,
  );
}

function flashStoryPlayerAttack(isSpecial = false) {
  const hero = $("storyHeroSlot");
  if (!hero) return;
  hero.classList.remove("is-attacking", "is-attacking--special");
  void hero.offsetWidth;
  hero.classList.add("is-attacking", isSpecial ? "is-attacking--special" : "");
}

function flashStoryPlayerBlock(tier) {
  const hero = $("storyHeroSlot");
  if (!hero) return;
  hero.classList.remove("is-blocking", "is-blocking--perfect", "is-blocking--good", "is-blocking--bad");
  void hero.offsetWidth;
  hero.classList.add("is-blocking", tier ? `is-blocking--${tier}` : "");
}

function flashStoryCompanions() {
  const col = $("storyPartyColumn");
  if (!col) return;
  col.querySelectorAll(".cocoa-party-slot:not(.cocoa-party-slot--locked):not(.cocoa-party-slot--hero)").forEach((slot) => {
    slot.classList.remove("is-assist");
    void slot.offsetWidth;
    slot.classList.add("is-assist");
  });
}

function flashStoryEnemyHit() {
  const el = $("storyEnemy");
  if (!el) return;
  el.classList.remove("story-enemy--hit");
  void el.offsetWidth;
  el.classList.add("story-enemy--hit");
}

function flashStoryEnemyAttack() {
  const el = $("storyEnemy");
  if (!el) return;
  el.classList.remove("story-enemy--attack");
  void el.offsetWidth;
  el.classList.add("story-enemy--attack");
}

function storyOnEnemyDefeated() {
  const ch = STORY_CHAPTERS[storyState.chapterIdx];
  const defeated = ch.enemies[storyState.enemyIdx];
  storyState.enemyIdx += 1;
  if (storyState.enemyIdx >= ch.enemies.length) {
    finishStoryChapter();
    return;
  }
  const line = defeated.defeatLine || `${defeated.name} をたおした！`;
  setStoryDialog(`${line} つぎの敵が現れた…`, "ナレーション");
  window.setTimeout(() => startStoryEnemy(), STORY_BATTLE_PACE.spawnGapMs);
}

function storyPlayerHit(dmg, msg, speaker = "ナレーション") {
  storyState.playerHp = Math.max(0, storyState.playerHp - dmg);
  setStoryDialog(`${msg} ごまちゃんは ${dmg} ダメージ。`, speaker);
  updateStoryHud();
  showStoryDamagePopup(dmg, "player");
  flashStoryHpBar("player");
  const hero = $("storyHeroSlot");
  if (hero) {
    hero.classList.remove("is-hit");
    void hero.offsetWidth;
    hero.classList.add("is-hit");
  }
  if (storyState.playerHp <= 0) {
    window.setTimeout(() => storyOnDefeat(), 700);
  }
}

function storyApplyEnemyAttack(reason) {
  const base = storyCalcEnemyAttack(storyState.currentEnemy, storyState.chapterIdx);
  const bonus = reason === "timeout" ? 1.4 : reason === "typo" ? 1.28 : 1;
  const dmg = Math.max(1, Math.round(base * bonus));
  const msg =
    reason === "timeout"
      ? "ぼうぎょ間に合わず！"
      : reason === "typo"
        ? "ぼうぎょしっぱい！"
        : "敵の強烈な一撃！";
  storyState.enemyAttackMul = 1;
  storyPlayerHit(dmg, msg, storyState.currentEnemy?.name || "敵");
  playStoryBattleFx("enemy-attack");
}

function storyOnTypo() {
  storyState.typosThisPhrase += 1;
  if (storyState.phase === "defense") {
    storyApplyEnemyAttack("typo");
    if (storyState.playerHp <= 0) return;
    storyResetPanelTyping();
    storyState.panelTypoFlash = false;
    renderStoryPanels();
    storyState.phraseBusy = false;
    return;
  }
  storyState.panelTypoFlash = true;
  renderStoryPanels();
  window.setTimeout(() => {
    storyState.panelTypoFlash = false;
    renderStoryPanels();
  }, 280);
}

function storyOnTimeout() {
  if (storyState.phraseBusy) return;
  storyState.phraseBusy = true;
  if (storyState.phase === "defense") {
    storyApplyEnemyAttack("timeout");
    if (storyState.playerHp <= 0) return;
    window.setTimeout(() => storyStartAttackPhrase(), STORY_BATTLE_PACE.missGapMs + STORY_BATTLE_PACE.actionPauseMs);
    return;
  }
  setStoryDialog("時間切れ！ こうげきはずれ — 敵のターン！", "ごまちゃん");
  window.setTimeout(() => storyStartDefensePhrase(1.2), STORY_BATTLE_PACE.missGapMs);
}

function storyOnDefeat() {
  storyResultVictory = false;
  storyState.active = false;
  setStoryBattleLive(false);
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
  const newMax = storyCalcPlayerMaxHp();
  $("storyResultText").textContent = `${ch.outro}（Lv.${storyPlayerLevel()} / HP ${newMax}）`;
  const cont = $("storyContinueBtn");
  if (cont) {
    const next = storyState.chapterIdx + 1;
    cont.textContent =
      next < STORY_CHAPTERS.length && next <= loadStoryProgress() ? "つぎの章へ" : "章一覧にもどる";
  }
}

function quitStory() {
  if (storyState.active && !cutsceneState.active && !window.confirm("冒険をやめてホームにもどりますか？")) return;
  if (cutsceneState.active && !window.confirm("ストーリーを中断してホームにもどりますか？")) return;
  storyState.active = false;
  setStoryBattleLive(false);
  closeStoryCutscene();
  stopGomaBgm();
  detachStoryKeyCapture();
  cancelAnimationFrame(storyState.raf);
  document.body.classList.remove("is-story");
  showHome();
}

function storyPanelNextKeyOptions() {
  const typed = storyState.typedRomaji || "";
  const opts = new Set();
  for (const r of storyState.romajiCandidates || []) {
    const rest = r.slice(typed.length);
    if (rest) opts.add(rest[0].toUpperCase());
  }
  return [...opts].sort();
}

function storyIsPhraseComplete() {
  const typed = storyState.typedRomaji || "";
  return typed.length > 0 && (storyState.romajiCandidates || []).some((r) => r === typed);
}

function storyResetPanelTyping() {
  storyState.panelIndex = 0;
  storyState.typedRomaji = "";
  storyState.panelBaseRomaji = storyState.panelKeys.join("");
  storyState.romajiCandidates = buildRomajiVariants(storyState.panelBaseRomaji);
}

function storyProcessTypedChar(ch) {
  if (!storyState.active || storyState.phraseBusy || storyState.playerHp <= 0) return;
  if (!storyState.panelKeys?.length) return;

  const nextPrefix = `${storyState.typedRomaji || ""}${ch}`.toLowerCase();
  const narrowed = (storyState.romajiCandidates || []).filter((r) => r.startsWith(nextPrefix));
  if (narrowed.length === 0) {
    storyOnTypo();
    return;
  }
  storyState.romajiCandidates = narrowed;
  storyState.typedRomaji = nextPrefix;
  storyState.panelIndex = nextPrefix.length;
  saveCareerRomaji(loadCareerRomaji() + 1);
  renderStoryPanels();
  if (storyIsPhraseComplete()) storyOnPhraseSuccess();
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
  renderStoryPanels();
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
  $("storyCutsceneWrap")?.addEventListener("click", onCutsceneAdvance);
  window.addEventListener("keydown", (ev) => {
    if (cutsceneState.active) onCutsceneAdvance(ev);
  });
  $("difficulty").addEventListener("change", () => {
    syncPracticeSettingsFromUi();
    if (!state.playing) {
      setSceneDifficultyClass();
      refreshPhrasePointsPreview();
    }
  });
  $("lengthMode").addEventListener("change", () => {
    syncPracticeSettingsFromUi();
    if (!state.playing) refreshPhrasePointsPreview();
  });

  setSceneDifficultyClass();
  syncPracticeSettingsFromUi();
  refreshPhrasePointsPreview();
  showHome();
  refreshBunnyEquipVisual();
}

init();
