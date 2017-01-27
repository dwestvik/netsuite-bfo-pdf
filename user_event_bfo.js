/**
 * 
 * Used on a sample request form (for product samples) 
 * User event script deployed on the custom record 
 
 *  Adds buttons on custom form to print a PDF pick ticket form.
 
 */
function sampleBeforeLoad(type, form, request){

    if (type == 'view') {
        var scriptPick = "window.open(nlapiResolveURL(\'SUITELET\', \'customscript_pdf_generator\', \'customdeploy_sample_pick\') + \'&recid=\' + nlapiGetRecordId());";
        form.addButton('custpage_printitempick','Print Sample Pick', scriptPick);
    } 
}
