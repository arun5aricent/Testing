export class TaskChannelMap {
    private static instanceObject: TaskChannelMap = null;
    private channelMap: Map<number, Map<number, string>> = null;
    private subChannelTypeMap: Map<number, string> = null;
    private TaskChannelMap() {
    }
    public static getInstance(): TaskChannelMap {
        if (this.instanceObject == null) {
            this.instanceObject = new TaskChannelMap();
        }
        return this.instanceObject;
    }

    public getChannelMap() {
        if (this.channelMap == null) {
            return this.generateMap();
        } else {
            return this.channelMap;
        }
    }


    // -1 key gives defualt values
    generateMap() {
        //add map values when channel type is 1 or 2
        this.subChannelTypeMap = new Map()
            .set(130, "phone")
            .set(170, "phone-outbound")
            .set(180, "phone-campaign")
            .set(-1, "phone");
        this.channelMap = new Map()
            .set(1, this.subChannelTypeMap)
            .set(2, this.subChannelTypeMap);

        //add map values when channel type is 3
        this.subChannelTypeMap = new Map()
            .set(-1, "webchat");
        this.channelMap.set(3, this.subChannelTypeMap);

        //add map values when channel type is 4
        this.subChannelTypeMap = new Map()
            .set(150, "email")
            .set(155, "email-outbound")
            .set(-1, "email");
        this.channelMap.set(4, this.subChannelTypeMap);


        //add map values when channel type is 5
        this.subChannelTypeMap = new Map()
            .set(-1, "sms");
        this.channelMap.set(5, this.subChannelTypeMap);

        //add map values when channel type is 6
        this.subChannelTypeMap = new Map()
            .set(-1, "mail");
        this.channelMap.set(6, this.subChannelTypeMap);

        //add map values when channel type is 7
        this.subChannelTypeMap = new Map()
            .set(-1, "fax");
        this.channelMap.set(7, this.subChannelTypeMap);

        //add map values when channel type is 8
        this.subChannelTypeMap = new Map()
            .set(300, "facebook")
            .set(301, "social")
            .set(302, "twitter")
            .set(-1 , "social");
        this.channelMap.set(8, this.subChannelTypeMap);

        //add map values when channel type is 9
        this.subChannelTypeMap = new Map()
            .set(-1, "channel-web");
        this.channelMap.set(7, this.subChannelTypeMap);


        //add map values for default
        this.subChannelTypeMap = new Map()
            .set(-1, "channel-anytask");
        this.channelMap.set(-1, this.subChannelTypeMap);
        return this.channelMap
    }

}