function setUpHTMLFixture() {
    jasmine.getFixtures().set(' *********Email sender******** \
\
                                <div class="div3">  \
                                    <a id="sender-0"> \
\
                                             ********* removeIncomingAttachmentsFromTab ******** \
                                               <div id="newLineBR"></div> \
                                                <div class="sender-attachments"></div> \
                                                 <div class="attachmentiFramecls" style="margin-left:10px;"></div> \
                                             *********End removeIncomingAttachmentsFromTab ******** \
\
                                     </a> \
                                 </div> \
\
                                *********End email sender******** \
\
\
                                ********* createIFrameFormForPost ******** \
\
                                    <div id="iFrameFormForContainer"></div> \
\
                                *********End createIFrameFormForPost ******** \
\
\
                                ********* initEmailBody ******** \
\
                                    <div id="emailBody">Email Sending Test from UWF at 7/18/2018 8:06:56 AM \
                                                        hi, here is a a link http://testlabz.com/ \
                                                        This is an automated test email. \
                                                         Please do not reply</div> \
\
                                 ********* End initEmailBody ******** \
\
       ');
}
