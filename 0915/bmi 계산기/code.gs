/**
 * 체중 계산기 웹앱 - Google Apps Script 진입점
 *
 * 배포 방법:
 * 1. script.google.com 에서 새 프로젝트 생성
 * 2. 이 파일 내용을 코드.gs(또는 기본 Code.gs)에 붙여넣기
 * 3. index.html 파일을 추가하고 index.html 내용을 붙여넣기
 * 4. 배포 > 새 배포 > 유형: 웹 앱 선택
 * 5. 실행 사용자 / 액세스 권한 설정 후 배포
 */

function doGet() {
  return HtmlService.createHtmlOutputFromFile('index')
    .setTitle('체중 계산기')
    .addMetaTag('viewport', 'width=device-width, initial-scale=1')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}
