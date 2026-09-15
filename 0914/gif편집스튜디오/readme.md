# Smart GIF Studio (Free GIF Editor)

웹 브라우저 상에서 서버 전송 없이 100% 클라이언트 사이드로 구동되는 반응형 GIF 편집 웹 애플리케이션입니다.

---

## 📌 프로젝트 소개 (Overview)

**Smart GIF Studio**는 별도의 프로그램 설치나 서버 업로드 없이, 순수 웹 브라우저 메모리 상에서 GIF 파일을 분석하고 편집할 수 있는 웹 기반 도구입니다. 데이터 유출 걱정 없이 안전하고 빠르게 GIF 최적화, 프레임 자르기, 배속 조절, 역재생 등의 기능을 수행할 수 있습니다.

- **브랜드/로고 연동**: 좌측 상단 로고 클릭 시 공식 링크(`https://nanalab.kr`) 이동
- **다국어 지원**: 헤더 우측 상단 `KO | EN` 토글 버튼을 통해 한/영 실시간 언어 전환 가능
- **보안성**: 모든 연산 및 렌더링이 사용자 브라우저 내부에서만 수행됨 (Client-side Only)

---

## ✨ 주요 기능 (Key Features)

### 1. 업로드 및 뷰어 (Upload & Viewer)
- **드래그 앤 드롭 및 파일 탐색기**: 직관적인 영역 드롭 및 `Choose File` 버튼 지원
- **동적 화면 전환**: 파일 업로드 완료 시 메인 소개 화면이 숨겨지고 편집 패널로 전환
- **반응형 레이아웃**:
  - **데스크톱 (Desktop)**: 좌측 GIF 미리보기 / 우측 편집 도구 패널 (2열 분할)
  - **모바일 (Mobile)**: 상단 GIF 미리보기 / 하단 편집 도구 패널 (수직 배치)
- **레터박스 없는 반응형 뷰어**: 종횡비를 유지하며 여백 낭비 없이 렌더링
- **실시간 메타데이터 추출**:
  - `DIMENS`: 원본 해상도 (Width x Height)
  - `SIZE`: 파일 용량 (KB / MB 자동 단위 변환)
  - `FRAMES`: 총 애니메이션 프레임 수
  - `FPS`: 초당 재생 프레임 수 계산
- **다운로드 & 리셋**:
  - 우측 상단 `Download` 버튼으로 편집된 파일 즉시 저장
  - `Choose Another File` 클릭 시 메모리 정리(Object URL Revoke) 및 전체 작업 상태 초기화

### 2. 편집 도구 (Editor Tools)
- **Cut (구간 자르기)**:
  - 시작 프레임 및 끝 프레임 번호 입력/슬라이더 조절
  - 선택한 시작/종료 프레임의 캔버스 썸네일 실시간 프리뷰 지원
- **Optimize (용량 최적화)**:
  - 화질 손실을 최소화하면서 불필요한 프레임 및 팔레트를 압축해 파일 용량 감축
- **Speed (재생 속도 조절)**:
  - 배속 옵션(0.5x, 1.5x, 2.0x 등) 지정 후 프레임 딜레이 재연산
- **Reverse (역재생)**:
  - 디코딩된 프레임 배열을 역순으로 재배열하여 역재생 GIF 생성
- **기타 준비 도구 UI**: Resize, Crop, Downsizing, Convert, Rotate

---

## 🛠 기술 스택 (Tech Stack)

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Icons**: [Lucide Icons](https://lucide.dev/)
- **GIF Decoder**: [omggif](https://github.com/deanm/omggif) (GIF 바이너리 파싱 및 프레임 딜레이 분석)
- **GIF Encoder**: [gifshot](https://github.com/yahoo/gifshot) (클라이언트 사이드 실시간 GIF 인코딩)

---

## 📂 파일 구성 (File Structure)

```text
├── index.html        # 전체 애플리케이션 단일 구동 파일 (HTML, CSS, JS 포함)
└── README.md         # 프로젝트 설명 문서
