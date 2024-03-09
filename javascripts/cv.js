function downloadPDF() {
    // Replace 'path/to/your/file.pdf' with the actual path to your PDF file
    var pdfLink = 'path/to/your/file.pdf';
    // Create a temporary link element
    var link = document.createElement('a');
    // Set the download attribute and file path
    link.download = 'downloaded_file.pdf';
    link.href = pdfLink;
    // Append the link to the document
    document.body.appendChild(link);
    // Trigger a click on the link element
    link.click();
    // Remove the link element from the document
    document.body.removeChild(link);
}