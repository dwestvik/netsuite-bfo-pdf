/**
 * Suitelet to render out a record using Freemarker and BFO PDF creator.
 * Used as a 'generic' PDF form generator.
 * 
 * 
 * Freemarker: Does template rendering of ANY text file. Text file contains Freemarker variables
 * 
 * BFO: Accepts an XML file (in XHTML syle format) and generates a PDF file output.
 * 
 * So, create a text template for BFO with Freemarker template tags.
 * 
 * Flow:
 * (suitelet [lookup record]) [bind/addrecord] -> (Freemarker [template/data]) -> (BFO [freemarker out])
 * 
 * The key is the Freemarker template, must contain the syntax of the BFO PDF creater.
 * 
 * 
 *  Script parameters (set in deployment)
 *  custscript_record_type - The name of the record type to load via nlapiLoadRecord()
 *  custscript_pdf_template - Freemarker / BFO formatted template used to render record data.
 *  custscript_pdf_docname - Name of PDF file (if you choose to save it)
 *  
 * 
 * Version    Date            Author           Remarks
 * 1.00       07 Dec 2016     dwestvik
 *
 */

/**
 * @param {nlobjRequest} request Request object
 * @param {nlobjResponse} response Response object
 * @returns {Void} Any output is written via response object
 */
function generatePDF(request, response){
	 try {
	        // Pull settings from scipt deployment.
			var recordType = nlapiGetContext().getSetting('SCRIPT', 'custscript_record_type');
			var pdfTemplate = nlapiGetContext().getSetting('SCRIPT', 'custscript_pdf_template');
			var pdfDocName = nlapiGetContext().getSetting('SCRIPT', 'custscript_pdf_filename');
		 
		 	// Get 'recid' from URL query
	        var id = request.getParameter('recid');
	        if(! id) {
	            response.write('recid parameter missing');
	            return;
	        }

	        // Load the record
	        var record = nlapiLoadRecord(recordType, id);
	        
	        // Create a Freemarker render instance
	        var renderer = nlapiCreateTemplateRenderer();
	        
	        // Set the Freemarker template file (text)
	        var template = nlapiLoadFile(pdfTemplate);
	        renderer.setTemplate(template.getValue());  				// Passes in raw string of template to be transformed by FreeMarker
	
	        // Binds [record] object to Freemarker template variable ('rec')    [${rec.fldname}]
	        renderer.addRecord('rec', record);
	        
	        // Call Freemarker to render output of template
	        //   Returns (XML) template content interpreted by FreeMarker as XML string that can be passed to the nlapiXMLToPDF function.
	        var xml = renderer.renderToString();

	        // Call BFO xml to PDF converter (The Freemarker template must output valid BFO input document)
	        var pdf = nlapiXMLToPDF(xml);
	        response.setContentType('PDF', pdfDocName, 'inline');
	        
	        // Dump out the PDF to the browser
	        response.write(pdf.getValue());

	    } catch(err) {
	        response.write(err);
	        return;
	    }

}
