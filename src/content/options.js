var DLOptions =
{
    pref:null,
    saveAndExit:function()
    {
        var element = document.getElementById("selectsDragUrLink");
        DLOptions.pref.setValue("LinkOption",element.selectedIndex);
        close();
    },

    onLoad:function()
    {
        DLOptions.pref = new JGuoer.PrefImpl();
        var option = DLOptions.pref.getValue("LinkOption");
        var element = document.getElementById("selectsDragUrLink");
        element.selectedIndex=option;
    }
}

addEventListener("load", DLOptions.onLoad , false);