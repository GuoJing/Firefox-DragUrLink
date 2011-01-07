var DragUrLink =
{
    x:0,
    y:0,
    times:0,
    method:"new",
    rx:0,
    ry:0,
    pref:null,

    OnMainLoad: function()
    {
        DragUrLink.pref = new JGuoer.PrefImpl();

        if(!DragUrLink.pref.getValue("Installed"))
        {
            DragUrLink.pref.setValue("Installed",true);
            DragUrLink.pref.setValue("LinkOption",1);
        }

        getBrowser().addEventListener('dragend', function(event){DragUrLink.GoToPage(event,'no');}, false);
        getBrowser().addEventListener('dragstart', function(event){DragUrLink.StartDrag(event,'no');}, false);
        getBrowser().addEventListener('dragover', function(event){DragUrLink.StartDrag(event,'no');}, false);
        getBrowser().addEventListener('drop', function(event){DragUrLink.StartDrag(event,'no');}, false);
        getBrowser().addEventListener('mousedown', function(event){DragUrLink.StartDrag(event,'down');}, false);
        getBrowser().addEventListener('mouseup', function(event){DragUrLink.StartDrag(event,'up');}, false);
    },

    GoToPage:function(event)
    {
        var value = event.dataTransfer.getData("text/uri-list");
        if(value != ""&&value != null)
        {
            this.times=0;
            var option = DragUrLink.pref.getValue("LinkOption");

            switch(option)
            {
                case 0:openUILink(value, null, false, true);break;
                case 1:gBrowser.addTab(value);break;
                case 2:gBrowser.selectedTab = gBrowser.addTab(value);break;
            }
        }
    },

    GoTo:function()
    {
        gBrowser.selectedTab = gBrowser.addTab("http://www.jguoer.com/");
    },

    StartDrag:function(event,type)
    {
        if(event.button!=1)
        {
            //alert('start');
            var dx = 0;
            var dy = 0;
            //check if the first time drag
            //this method will be called lots of time
            if(this.times!=0)
            {
                dx = event.clientX - this.x;
                dy = event.clientY - this.y;
                if(dx>0)
                {
                    //open page in new tab
                    this.method="new";
                }
                else if(dx<0)
                {
                    //open page in this tab
                    this.method="this";
                }
            }
            else
            {
                this.x = event.clientX;
                this.y = event.clientY;
            }

            this.times++;
        }
        else
        {
            if(type=='down')
            {
                this.rx = event.clientX;
                this.ry = event.clientY;
            }
            else
            {
                if(event.clientX-this.rx<0)
                {
                    getBrowser().goBack();
                }
            }
        }
    },

    DragOver:function(event)
    {

    },

    DragDrop:function(event)
    {

    }
};

addEventListener("load", DragUrLink.OnMainLoad , false);