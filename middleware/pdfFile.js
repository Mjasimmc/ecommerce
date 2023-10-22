const PDFDocument = require('pdfkit');
const doc = new PDFDocument;
doc.addPage()

doc.pipe(fs.createWriteStream('PDF Name'));
module.exports = doc