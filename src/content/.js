var FasterSearch  = {
    onLoad: function() {
        // initialization code
        this.initialized = true;
        this.gfiltersimportexportBundle = Components.classes["@mozilla.org/intl/stringbundle;1"].getService(Components.interfaces.nsIStringBundleService);
        this.mystrings = this.gfiltersimportexportBundle.createBundle("chrome://{appname}/locale/overlay.properties");

        FasterSearchProcess.RunProcess();
    },
    getString:function(key)
    {
        try{
            var str = this.mystrings.GetStringFromName(key);
                    return str;
        }catch(e){
            return key;
        }
    },
    OnSwitchesClick: function(){
        FasterSearchProcess.SwitchesProcess();
        FasterSearchProcess.RunProcess();
    }
};

window.addEventListener("load", function(e) { FasterSearch.onLoad(e); }, false);