/**
 * 
 * Used on a sample request form (for product samples) 
 * User event script deployed on the custom record 
 
 *  Adds buttons on custom form to print a PDF pick ticket form.
 * Set the URL parameters 'rec'=Netsuite Record Name, 'f'=Freemarker / XML / BFO Template
 * The addButton must have a unique name and must begin with 'custpage_'. It's not used for anything but it needs to be set.
 * The 'customscript_cb_pdf_printer' is the script name
 * 'customdeploy_cb_pdf_printer' is the deployment of that script.
 * NOTE: In the initial version of this script, the record and form name were set as deployment parameters.
 *   Now that those values are passed via the URL, you only need one suitlet deployment and only a user event script to add the button.
 *    Or, you could add a button in edit mode and hand craft the 'window.open' javascript below into your client script.
 */
function sampleBeforeLoad(type, form, request){

    if (type == 'view') {
	
        var scriptForm = "window.open(nlapiResolveURL(\'SUITELET\', \'customscript_cb_pdf_printer\', \'customdeploy_cb_pdf_printer\') + \'&rec=customrecord_sample_request&f=sample_request_form&recid=\' + nlapiGetRecordId());";
        form.addButton('custpage_btnpick','Sample Pick Form', scriptForm);
		
    } 
}
