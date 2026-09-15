/**
 * 점심 메뉴에 대하여 - MT 점심 메뉴 설문 웹앱
 * - doGet: index.html을 렌더링
 * - submitForm: 클라이언트에서 넘어온 데이터를 구글 스프레드시트에 저장
 */

var SPREADSHEET_URL = 'https://docs.google.com/spreadsheets/d/1dD0YDJoYxmoI7lxPhT8aE7VZpl4fs_pKPhUzlB5JG3A/edit?gid=0#gid=0';

// 데이터를 저장할 시트 이름 (헤더: 이름 / 이메일 / 먹고 싶은 메뉴)
var SHEET_NAME = '시트1';

function doGet() {
  return HtmlService.createHtmlOutputFromFile('index')
    .setTitle('점심 메뉴에 대하여')
    .addMetaTag('viewport', 'width=device-width, initial-scale=1')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

/**
 * 클라이언트(index.html)에서 google.script.run으로 호출하는 함수
 * @param {{name: string, email: string, menu: string}} formData
 * @return {{success: boolean, error?: string}}
 */
function submitForm(formData) {
  try {
    if (!formData || !formData.name || !formData.email || !formData.menu) {
      throw new Error('이름, 이메일, 먹고 싶은 메뉴는 필수 입력 항목입니다.');
    }

    var ss = SpreadsheetApp.openByUrl(SPREADSHEET_URL);
    var sheet = ss.getSheetByName(SHEET_NAME);

    // 시트가 없으면 새로 만들고 헤더를 추가
    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
    }
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(['이름', '이메일', '먹고 싶은 메뉴']);
    }

    sheet.appendRow([
      formData.name,
      formData.email,
      formData.menu
    ]);

    return { success: true };
  } catch (err) {
    return { success: false, error: err.message };
  }
}
