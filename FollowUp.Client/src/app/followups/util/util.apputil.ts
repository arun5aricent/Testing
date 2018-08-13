import { Followup } from '../followup-models/followup';

declare var upstream: any;

export class AppUtil {

    public static getFollowup(): Followup {
        var comments = [{ "CommentDesc": "demo1", "CommentDate": "demo2", "CommentUser": "demo3" }];
        var notification = [];
        var followup = new Followup("102", 1, 1, "subject subject", "122", "test name", "date", 1, 3,
            "modifieddate", "completeddate", "modifieduser", "fist comment", "last comment", "12", "123", false, "owner", comments, notification, 0);

        return followup;
    }
    /**
     * initialize enable followup
     */
    public static getEnableFollowUp() {
        var enableFollowUp = upstream.modules.utilities.getQueryStringParameter('url', 'enableFollowUp');
        if (!enableFollowUp)
            enableFollowUp = upstream.modules.utilities.getQueryStringParameter('url', 'enablefollowup');
        if (!enableFollowUp)
            enableFollowUp = upstream.modules.utilities.getQueryStringParameter('url', 'EnableFollowUp');
        if (enableFollowUp)
            enableFollowUp = (enableFollowUp).toLowerCase();
        return enableFollowUp;
    }

    public static getTemplate(): string {
        let source = `
                <html>
		                <head>
			                <title>{{Title}}</title>
			                <meta charset="UTF-8" />
			                <style>
				                body { background-color: #fff; padding: 20px; }
				                body > label { margin-bottom: 0px; font-weight:bold; }
                                notificationWindow {
                                    width: 280px;
                                    height: 60px;
                                    background: white;
                                    border: 1px solid #EFEFEF;
                                }
                            .notificationWindow > :first-child {
                                float: left;
                                width: 60px;
                                height: 60px;
                                background-color: #F0F0F0;
                            }
                            .notificationWindow > :nth-child(2) {
                                padding-left: 65px;
                            }
                            .notificationWindowIcon > img{
                                width: 60px;
                                height: 60px;
                                }
			                </style>
			               <script>
			                  window.onload = setTimeout(function(){ window.close(); }, 10000);
                            </script>
		                </head>
		                <body  onclick="window.close();">
			               <div class="notificationWindow" style="float:left;">
                                <div class="notificationWindowIcon"><img src="{{iconPath}}"></div>
                                <div>
                                  <div class="notificationWindowHeader">
                                    <span class="notificationWindowTitle">{{title}}</span>
                                  </div>
                                  <div class="notificationWindowBody">{{Status}}</div>
                                </div>
                              </div>
		                </body>
	                    </html>`;
        return source;
    }
}