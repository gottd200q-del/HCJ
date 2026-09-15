# 📄 TextRank Document Summarizer & Google Apps Script Hub

> **PDF, Word (.docx), TXT 문서의 텍스트를 로컬 브라우저에서 직접 파싱하고, TextRank 알고리즘을 통해 1~5문장으로 핵심 요약 및 Google Workspace (`Code.gs`)와 연동할 수 있는 올인원 웹 애플리케이션입니다.**

---

## 📁 프로젝트 파일 구성 (다운로드 및 배포 안내)

본 프로젝트는 의존성 설치(`npm install` 등) 없이 브라우저나 Google Workspace에서 즉시 동작하도록 구성되어 있습니다.

| 파일명 | 유형 | 역할 및 설명 |
| :--- | :--- | :--- |
| **`index.html`** | Web App (Client) | PDF/DOCX 파싱, 1~5문장 슬라이더 제어, TextRank 네트워크 그래프 시각화, 원문 하이라이트 대조를 포함한 반응형 올인원 웹 앱 |
| **`Code.gs`** | Google Apps Script | Google Docs 확장 프로그램용 백엔드 엔진. 구글 문서 메뉴 등록 및 최상단 서식화 요약 박스 자동 삽입 지원 |
| **`README.md`** | Documentation | 프로젝트 설치, 알고리즘 원리, 배포 가이드 및 사용법 문서 |

---

## 🌟 주요 기능

1. **클라이언트 사이드 무설치 멀티 포맷 파싱**
   - **PDF (`.pdf`)**: `PDF.js`를 통해 브라우저 내부에서 페이지별 텍스트 레이어 직접 추출
   - **Word (`.docx`)**: `Mammoth.js` 기반 워드 바이너리 파싱
   - **일반 텍스트 (`.txt`, `.md`, `.json`, `.csv`)**: 네이티브 `FileReader` API로 즉각 로드
   - 드래그 앤 드롭(Drag & Drop) 및 파일 첨부 창 완벽 지원
   - **100% 온디바이스 로컬 처리**: 문서를 외부 AI 서버로 전송하지 않아 기밀 문서도 안전하게 보호

2. **슬라이드 바 기반 동적 분량 조절 (1~5문장)**
   - 최소 1문장(초압축 핵심)에서 최대 5문장(종합 요약)까지 슬라이더를 통해 실시간으로 조절
   - **정렬 모드 지원**:
     - `원문 순서`: 문서의 원래 시간적/논리적 맥락 흐름 유지
     - `중요도 순`: PageRank 점수가 가장 높은 결정적 문장부터 정렬

3. **TextRank 비지도 추출 요약 (Extractive Summarization)**
   - 구글 창립자들의 PageRank 논문을 자연어 문장 그래프로 확장한 모델 ($d = 0.85$)
   - 문장 간 어휘 공통도(Log-Cosine Overlap) 기반 유사도 가중치 행렬 생성
   - 한국어 및 영어 불용어(Stopwords) 필터링 및 동시출현(Co-occurrence) 기반 핵심 키워드(#) 자동 추출

4. **인터랙티브 시각화 & 실시간 메트릭**
   - **문장 관계 네트워크 그래프**: HTML5 Canvas로 문장 간 연관도 및 상위 노드(PageRank 점수) 시각화
   - **원문 하이라이트 뷰어**: 추출된 핵심 문장을 원문 속에서 형광펜 스타일로 표시
   - **실시간 메트릭**: 압축 전후 문장 수, 글자 수 변화 및 압축 효율(%) 실시간 계산

5. **원클릭 파일 다운로드 및 내보내기**
   - 웹 애플리케이션 상단 **[소스코드 전체 다운로드]** 버튼을 통해 `index.html`과 `Code.gs` 파일을 즉시 브라우저로 저장 가능
   - 요약 결과 텍스트 복사 및 `.txt` 파일 내보내기 지원

---

## 🚀 실행 및 Google Workspace (`Code.gs`) 연동 방법

### 방법 A. 로컬 웹 애플리케이션 실행
1. `index.html` 파일을 다운로드합니다.
2. 크롬, 엣지, 사파리 등 현대 웹 브라우저에서 더블 클릭하여 바로 실행합니다. (별도 웹서버 구축 불필요)

### 방법 B. Google Docs 메뉴 연동 (Google Apps Script)
1. [Google Docs](https://docs.google.com)에서 요약하고 싶은 문서를 엽니다.
2. 상단 메뉴에서 **확장 프로그램(Extensions) → Apps Script**를 클릭합니다.
3. 기본 코드 창의 내용을 지우고, 함께 제공된 **`Code.gs`** 파일의 전체 코드를 붙여넣은 뒤 저장(`Ctrl + S`)합니다.
4. Google Docs 문서를 새로고침하면 상단 툴바에 **[📄 AI 텍스트랭크 요약]** 메뉴가 생성됩니다.
5. 메뉴에서 **💡 3문장 핵심 요약**, **⚡ 1문장 초압축 요약**, **📑 5문장 종합 상세 요약** 중 하나를 선택하면 문서 서두에 예쁜 콜아웃 박스로 핵심 요약이 자동 삽입됩니다.

---

## 📐 알고리즘 수학적 모델 (TextRank)

문장 $S_i$와 $S_j$ 사이의 정규화된 어휘 유사도 가중치 $w_{ij}$는 다음과 같이 계산됩니다:

$$Similarity(S_i, S_j) = \frac{|\{w \mid w \in S_i \ \& \ w \in S_j\}|}{\log(|S_i|) + \log(|S_j|)}$$

문장 노드의 PageRank 점수 $WS(V_i)$는 댐핑 팩터 $d = 0.85$를 적용하여 수렴할 때까지 반복 계산됩니다:

$$WS(V_i) = (1 - d) + d \sum_{V_j \in In(V_i)} \frac{w_{ji}}{\sum_{V_k \in Out(V_j)} w_{jk}} WS(V_j)$$

---

## 🛠️ 기술 스택
- **프론트엔드**: Pure HTML5, Tailwind CSS (CDN), Lucide Icons
- **문서 파싱**: PDF.js 3.11, Mammoth.js 1.6
- **백엔드/클라우드**: Google Apps Script (V8 Runtime, Google Docs DocumentApp API)