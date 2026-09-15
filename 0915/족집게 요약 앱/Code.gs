/**
 * ====================================================================
 * TextRank Document Summarizer for Google Workspace (Google Docs Add-on)
 * File: Code.gs
 * ====================================================================
 * Google Docs 문서 본문을 읽어 TextRank 알고리즘으로 중요 문장을 
 * 자동 추출하고 문서 서두에 예쁜 콜아웃 박스로 삽입합니다.
 */

// 1. Google Docs 커스텀 메뉴 등록
function onOpen() {
  const ui = DocumentApp.getUi();
  ui.createMenu('📄 AI 텍스트랭크 요약')
    .addItem('💡 3문장 핵심 요약 (기본)', 'summarizeToDoc3')
    .addItem('⚡ 1문장 초압축 요약', 'summarizeToDoc1')
    .addItem('📑 5문장 종합 상세 요약', 'summarizeToDoc5')
    .addSeparator()
    .addItem('🖥️ 웹앱 사이드바 열기', 'showSidebarApp')
    .addToUi();
}

function summarizeToDoc1() { runDocSummarization(1); }
function summarizeToDoc3() { runDocSummarization(3); }
function summarizeToDoc5() { runDocSummarization(5); }

/**
 * Google Docs 본문에서 직접 TextRank 요약을 수행하고 문서 상단에 삽입
 */
function runDocSummarization(sentenceCount) {
  const doc = DocumentApp.getActiveDocument();
  const body = doc.getBody();
  const fullText = body.getText().trim();
  
  if (!fullText || fullText.length < 50) {
    DocumentApp.getUi().alert(
      '요약 알림', 
      '문서 내용이 너무 짧거나 비어 있어 요약할 수 없습니다. 최소 50자 이상의 본문이 필요합니다.', 
      DocumentApp.getUi().ButtonSet.OK
    );
    return;
  }

  // TextRank 요약 엔진 실행
  const summaryResult = runTextRankEngine(fullText, sentenceCount);
  
  if (!summaryResult || summaryResult.length === 0) {
    DocumentApp.getUi().alert('결과 안내', '추출 가능한 핵심 문장을 찾지 못했습니다.', DocumentApp.getUi().ButtonSet.OK);
    return;
  }

  // 문서 최상단에 서식화된 요약 박스 삽입
  const titleParagraph = body.insertParagraph(0, `📌 [TextRank AI 핵심 요약 (상위 ${summaryResult.length}문장)]`);
  titleParagraph.setHeading(DocumentApp.ParagraphHeading.HEADING3);
  titleParagraph.setForegroundColor('#4338ca');

  summaryResult.forEach((sentence, index) => {
    const p = body.insertParagraph(index + 1, `• ${sentence}`);
    p.setIndentStart(18);
    p.setFontSize(10.5);
    p.setForegroundColor('#1e293b');
    p.setLineSpacing(1.3);
  });

  body.insertHorizontalRule(summaryResult.length + 1);
  doc.saveAndClose();
}

/**
 * Google Apps Script Web App 서빙용 진입점 (doGet)
 */
function doGet() {
  return HtmlService.createHtmlOutputFromFile('Index')
    .setTitle('TextRank Document Summarizer')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
    .addMetaTag('viewport', 'width=device-width, initial-scale=1');
}

/**
 * Google Docs 내부 사이드바 서빙
 */
function showSidebarApp() {
  const html = HtmlService.createHtmlOutputFromFile('Index')
    .setTitle('TextRank 문서 요약기');
  DocumentApp.getUi().showSidebar(html);
}

/**
 * 순수 Google Apps Script V8 엔진용 TextRank 알고리즘
 * @param {string} text - 원문 텍스트
 * @param {number} targetCount - 추출할 문장 수 (1~5)
 * @returns {Array<string>} 추출된 문장 목록 (원문 순서 유지)
 */
function runTextRankEngine(text, targetCount) {
  const STOPWORDS = new Set([
    '이', '그', '저', '것', '수', '등', '들', '및', '에', '에서', '를', '을', '의', '가', '은', '는', '으로', '로',
    '과', '와', '도', '하다', '있다', '되다', '되', '한', '때', '위해', '대한', '통해', '따라', '함께', '또한',
    '하고', '하며', '그리고', '그러나', '하지만', '또는', '때문에', '관련', '경우', '모든', '통한', '있는', '없는',
    'the', 'is', 'at', 'which', 'on', 'a', 'an', 'and', 'or', 'in', 'to', 'for', 'of', 'with', 'as', 'by', 
    'that', 'this', 'it', 'from', 'be', 'are', 'was', 'were', 'have', 'has', 'had', 'been', 'will', 'would'
  ]);

  // 1. 문장 분리
  const rawSentences = text.replace(/\r\n/g, '\n').replace(/\r/g, '\n').split(/(?<=[.?!])(?=[\s"'\u201d\u2019\n])|\n+/);
  const sentences = rawSentences.map(s => s.trim()).filter(s => s.length >= 10);
  const n = sentences.length;
  if (n === 0) return [];
  if (n <= targetCount) return sentences;

  // 2. 단어 토큰화
  const tokenized = sentences.map(s => {
    const words = s.toLowerCase().match(/[a-z0-9]+|[가-힣]+/g) || [];
    return words.filter(w => w.length >= 2 && !STOPWORDS.has(w));
  });

  // 3. 문장 간 유사도(Log-Cosine Overlap) 가중치 행렬 생성
  const weights = Array.from({ length: n }, () => new Array(n).fill(0));
  const outSum = new Array(n).fill(0);

  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      const setA = new Set(tokenized[i]);
      const setB = new Set(tokenized[j]);
      let common = 0;
      for (const item of setA) {
        if (setB.has(item)) common++;
      }
      if (common > 0) {
        const sim = common / (Math.log(tokenized[i].length + 1) + Math.log(tokenized[j].length + 1));
        weights[i][j] = sim;
        weights[j][i] = sim;
      }
    }
  }

  for (let i = 0; i < n; i++) {
    let sum = 0;
    for (let j = 0; j < n; j++) sum += weights[i][j];
    outSum[i] = sum;
  }

  // 4. PageRank 반복 계산 (Damping Factor 0.85)
  let scores = new Array(n).fill(1.0 / n);
  const d = 0.85;

  for (let iter = 0; iter < 45; iter++) {
    const nextScores = new Array(n).fill(0);
    let maxDiff = 0;

    for (let i = 0; i < n; i++) {
      let incoming = 0;
      for (let j = 0; j < n; j++) {
        if (i !== j && outSum[j] > 0) {
          incoming += (weights[j][i] / outSum[j]) * scores[j];
        }
      }
      nextScores[i] = (1 - d) / n + d * incoming;
      const diff = Math.abs(nextScores[i] - scores[i]);
      if (diff > maxDiff) maxDiff = diff;
    }

    scores = nextScores;
    if (maxDiff < 0.0001) break;
  }

  // 5. 상위 K개 선택 및 원문 순서로 재정렬
  const ranked = sentences.map((text, idx) => ({ index: idx, text: text, score: scores[idx] }));
  ranked.sort((a, b) => b.score - a.score);
  const selected = ranked.slice(0, targetCount);
  selected.sort((a, b) => a.index - b.index);

  return selected.map(item => item.text);
}