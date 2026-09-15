function doGet() {
  return HtmlService.createHtmlOutputFromFile("index")
    .setTitle("Lorem Ipsum Generator")
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
    .addMetaTag("viewport", "width=device-width, initial-scale=1");
}
