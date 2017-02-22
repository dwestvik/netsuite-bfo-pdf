# netsuite-bfo
Generic form printer for Netsuite via Freemarker and BFO.
This is done by calling a suitelet that accepts the following URL query parameters.
* 'rec' - Name of the record. Can be native Netsuite record or custom record.
* 'f' - Format name. This is the name of the format file in the file area WITHOUT PATH or XML extension.
* 'recid' (internal id) of the record to print.

# User Event Script
The script user_event_bfo.js is a sample user event script that shows how to put a button on a record in view mode that will call the PdfWriter suitelet.

# PDF Generator Script (PdfWriter.js)
This is the suitelet script that is called by the client record via the button added via a user event script. The suitlet script will use the 'createPDF' function.

## Deployment
The script deployment has the following parameter that needs to be entered.

* custscript_template_path: This is the file path int the Netsuite file folder where the format files can be found. ("Templates > Custom Templates").

# Usage
The PDF is generated via a custom button in view mode on a record. The button is added to the form through a user event script attached to the record.
The deployment will set the above parameters and the 'user_event_bfo.js' file has an example of adding a button that calls the suitelet.

Note, in the PDF template, the record that is in scope (current record) is passed to the template as the 'recid' variable. See the example BFO template 'sample_request_form.xml'.

If you save the PDF output, it will create a PDF file named for the 'templateFileName_recordId.pdf'. This will create a unique PDF filename for each record you print.

# Gotchas
This example works with custom records we defined that look alot like a sales order. So, the template is not a plug and play file. But it gives you some examples to 'sift through'.

Also, this does NOT pass the nlobjConfiguration object found on native Netsuite PDF templates.
Ths is due to a minor flaw in Netsuite Freemarker interface that only allows you to bind nlobjRecord types.

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