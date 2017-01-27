# netsuite-bfo
Generic form printer for Netsuite via Freemarker and BFO.
This is done by calling a suitelet that accepts the 'recid' (internal id) of the record to print from a custom button added by a user event (before load) event.

# PdfWriter Script
The script PdfWriter.js is the user event script tied to the record you wish to print. It requires 3 parameters set in the deploymnet

* custscript_record_type: This is the internal name of the built in or custom record the deployment is connected with
* custscript_pdf_template: This is the name of the file in the file area that contains the BFO XML pdf template.
* custscript_pdf_filename: This is the file name used should you save the generated PDF file. Normally, the PDF output will display in your browser where you can print directly.

# PDF Generator Script
This is the suitelet script that is called by the client record via the button added in the PdfWriter user event script. Each different pdf form needs it's own deployment (suitelet).
In the future, I may just pass all the parameters via the URL so there only needs to be one deployment of the suitelet.


# Usage
The PDF is generated via a custom button in view mode on a record. The button is added to the form through a user event script attached to the record.
The deployment will set the above parameters and the 'user_event_bfo.js' file has an example of adding a button that calls the suitelet.

Note, in the PDF template, the record that is in scope (current record) is passed to the template as the 'rec' variable. See the example BFO template 'sample_request_form.xml'.

# Gotchas

This example works with custom records we defined that look alot like a sales order. So, the template is not a plug and play file. But it gives you some examples to 'sift through'.


# License
This is free and unencumbered software released into the public domain.

Anyone is free to copy, modify, publish, use, compile, sell, or
distribute this software, either in source code form or as a compiled
binary, for any purpose, commercial or non-commercial, and by any
means.

In jurisdictions that recognize copyright laws, the author or authors
of this software dedicate any and all copyright interest in the
software to the public domain. We make this dedication for the benefit
of the public at large and to the detriment of our heirs and
successors. We intend this dedication to be an overt act of
relinquishment in perpetuity of all present and future rights to this
software under copyright law.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR
OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.

For more information, please refer to <http://unlicense.org>