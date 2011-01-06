var DLOptions =
{
    pref:null,
    saveAndExit:function()
    {
        var element = document.getElementById("selects{appname}");
        DLOptions.pref.setValue("LinkOption",element.selectedIndex);
        close();
    },

    onLoad:function()
    {
        DLOptions.pref = new ___.PrefImpl();
        var option = DLOptions.pref.getValue("LinkOption");
        var element = document.getElementById("selects{appname}");
        element.selectedIndex=option;
    }
}

addEventListener("load", DLOptions.onLoad , false);