# 🐶 Smart QR — NaNa Lab

URL을 입력하면 즉시 QR 코드를 생성하고, 클릭 한 번으로 고해상도 JPG 파일로 저장할 수 있는 인터랙티브 웹 애플리케이션입니다.

---

## 📁 디렉터리 구조
├── index.html       # Smart QR 메인 웹 애플리케이션
├── logo.png         # NaNa Lab 상단 로고 이미지
└── README.md        # 프로젝트 안내 문서

## ✨ 주요 기능
1. **상단 브랜딩 헤더**:
   - 좌측: `logo.png` 로고 배치 (파일 누락 시 자체 SVG 벡터 로고로 자동 폴백)
   - 우측: `Smart QR` 타이틀 및 앰버 액센트 인디케이터 적용
2. **동적 레이아웃 애니메이션**:
   - 화면 중앙 입력창에 링크 입력 후 **확인** 클릭 시, 입력창이 부드럽게 하단으로 이동하며 화면 정중앙에 QR 코드 생성
   - 하단 입력창에서 URL을 바꾸어 실시간 재갱신 가능
3. **마우스 반응형 인터랙티브 그라데이션**:
   - 마우스 커서의 움직임에 따라 유기적으로 빛의 방향이 변하는 화사하고 밝은 파스텔 피치 톤 배경
4. **원클릭 고화질 JPG 내보내기**:
   - 중앙 QR 코드 카드 클릭 시 HTML5 Canvas API를 통해 1080×1080 고해상도 순백색 배경의 `.jpg` 파일 즉시 다운로드 및 완료 토스트 표시

---

## 🛠️ 기술 스택
- **언어 및 스타일**: HTML5, CSS3 (Glassmorphism, CSS Custom Properties), Vanilla JavaScript (ES6+)
- **외부 리소스**: QRCode.js (CDN), FontAwesome 6, Pretendard 웹폰트

---

## 🚀 실행 방법
1. `문서/k-move/front/0914_1/` 폴더에 위 `index.html`, `logo.png`, `README.md`를 함께 배치합니다.
2. `index.html`을 더블 클릭해 웹 브라우저(Chrome, Edge 등)로 실행합니다.
3. 변환할 URL 입력 후 **확인**을 누르고, 중앙에 생성된 QR 코드를 클릭하여 JPG 이미지를 다운로드합니다.
