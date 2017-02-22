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
 *  URL parameters 
 *  rec - The name of the record type to load via nlapiLoadRecord()
 *  f - Freemarker / BFO formatted template file (WITHOUT EXTENSION) used to render record data. This script will add the .XML
 *  recid - Internal ID of the current record
 * 
 * Deployment Parameters:
 * Template Path
 * Used to define where in the file area the template XML file can be found. (No trailing /)
 * 
 * Example template path:
 * Templates/Custom Templates
 * 
 * 
 * The URL format is:
 * https://system.sandbox.netsuite.com/app/site/hosting/scriptlet.nl?script=188&deploy=1&rec=customrecord_sample_request&f=sample_request_form&recid=122
 * 
 *  To put a button on a form to print, put the following in a User Event "beforeLoad'
 *  The key is the ending part: &rec=customrecord_sample_request&f=sample_request_form&recid=122
 *  
 *  Parameters:  record: customrecord_sample_request   form: sample_request_form  (This is a file named 'sample_request_form.xml')   recid: Internal id from record (returned by nlapiGetRecordId())
 *  
 *  EXAMPLE OF USER SCRIPT:  (Adds button on view of form to print document)
    if (type == 'view') {
        var scriptForm = "window.open(nlapiResolveURL(\'SUITELET\', \'customscript_cb_pdf_printer\', \'customdeploy_cb_pdf_printer\') + \'&rec=customrecord_sample_request&f=sample_request_form&recid=\' + nlapiGetRecordId());";
        form.addButton('custpage_printitempick','New Pick', scriptForm);
    } 

 *
 * The URL can be generated in a text field on a saved search to provide a link to print the document
 *  
 *   Text Formula for view (Assumes system.na1 datacenter, scriptid=187 and deployment=1)
 *   '<a name="PrintPick" id="PrintPick" href="https://system.na1.netsuite.com/app/site/hosting/scriptlet.nl?script=187&deploy=1&rec=RECORD_TYPE&f=FORM_FILENAME&recid='||{internalid}||'"  target="_blank" >Link Text</a>'
 * 
 * Version    Date            Author           Remarks
 * 1.00       07 Dec 2016     dwestvik
 * 2.00       Feb 2017        dwestvik         Update to use createPDF as new version. Deployment points to template path. All params passed in url
 */

/**
 * @param {nlobjRequest} request Request object
 * @param {nlobjResponse} response Response object
 * @returns {Void} Any output is written via response object
 */
function createPDF(request, response){
	 try {
			var templatePath = nlapiGetContext().getSetting('SCRIPT', 'custscript_template_path');
		 
			
			var recordType = request.getParameter('rec');
	        if(! recordType) {
	            response.write('Record Type missing (rec)');
	            return;
	        }
			
		 	// Get 'sample_id' from URL query
			var format = request.getParameter('f');
	        if(! format) {
	            response.write('format filename missing (f)');
	            return;
	        }
			
	        var id = request.getParameter('recid');
	        if(! id) {
	            response.write('Record ID missing (recid)');
	            return;
	        }

	        // Load the record
	        var record = nlapiLoadRecord(recordType, id);
	        
	        
	        // Build the template path in the file dir
	        var pdfTemplate = templatePath + '/' + format + '.xml';
	        
	        // Build the name of the saved PDF file.  (format name + record name)
	        //var pdfDocName = format + '_' + record.getFieldValue('name') + '.pdf';
	        var pdfDocName = format + '_' + record.getFieldValue('id') +  '.pdf';
	        	        
	        // Create a Freemarker render instance
	        var renderer = nlapiCreateTemplateRenderer();
	        
	        // Set the Freemarker template file (text)
	        //var template = nlapiLoadFile('Templates/Custom Templates/template_form.xml');
	        var template = nlapiLoadFile(pdfTemplate);
	        renderer.setTemplate(template.getValue());			// Passes in raw string of template to be transformed by FreeMarker
	
	        // Binds [record] object to Freemarker template variable ('rec')    [${rec.fldname}]  / also bind to record to match native Netsuite style templates.
	        renderer.addRecord('rec', record);
	        renderer.addRecord('record', record);

	        
	        // Call Freemarker to render output of template
	        //   Returns (XML) template content interpreted by FreeMarker as XML string that can be passed to the nlapiXMLToPDF function.
	        var xml = renderer.renderToString();

	        
	        xml.replace(/&/g, '&amp;')
	        .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&apos;');
            
	        //response.setContentType('XML', pdfDocName, 'inline');
	        //response.write(xml);
        	//return;

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
