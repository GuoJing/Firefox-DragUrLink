if(typeof(JGuoer)=="undefined"||!JGuoer) JGuoer ={};
if(!JGuoer.PrefImpl) JGuoer.PrefImpl = function(){};

JGuoer.PrefImpl.prototype  =
{
    _branchName:"",
	_pref : Components.classes["@mozilla.org/preferences-service;1"].
	getService(Components.interfaces.nsIPrefService).
	getBranch("extensions.jguo.DragUrLink."),

	getValue: function(prefName, defaultValue)
	{
		var prefType=this._pref.getPrefType(prefName);

		if (prefType==this._pref.PREF_INVALID)
		{
			return null;
		}

		switch (prefType)
		{
			case this._pref.PREF_STRING: return this._pref.getCharPref(prefName);
			case this._pref.PREF_BOOL: return this._pref.getBoolPref(prefName);
			case this._pref.PREF_INT: return this._pref.getIntPref(prefName);
		}
	},

	setValue: function(prefName, value)
	{
		var prefType=typeof(value);

		switch (prefType)
		{
            case "string":
            case "boolean":
                break;
            case "number":
                if (value % 1 != 0)
                {
                    throw new Error("Cannot set preference to non integral number");
                }
                break;
            default:
                throw new Error("Cannot set preference with datatype: " + prefType);
		}

		if (this.exists(prefName) && prefType != typeof(this.getValue(prefName)))
		{
			this.remove(prefName);
		}

		// set new value using correct method
		switch (prefType)
		{
			case "string": this._pref.setCharPref(prefName, value); break;
			case "boolean": this._pref.setBoolPref(prefName, value); break;
			case "number": this._pref.setIntPref(prefName, Math.floor(value)); break;
		}
	},
	
	setBoolValue: function(prefName, value)
	{
		var prefType=typeof(value);
		
		if (this.exists(prefName) && prefType != typeof(this.getValue(prefName)))
		{
			this.remove(prefName);
		}
		
		if(!value)
		{
			value = false;
		}
		this._pref.setBoolPref(prefName, value);
	},
	
	setIntValue: function(prefName, value)
	{
		var prefType=typeof(value);
		
		if (this.exists(prefName) && prefType != typeof(this.getValue(prefName)))
		{
			this.remove(prefName);
		}
		
		if(!value)
		{
			value = 0;
		}
		
		this._pref.setIntPref(prefName, Math.floor(value));
	},
	
	getBoolValue: function(prefName, value)
	{
		return this.getValue(prefName);
	},
	
	getIntValue: function(prefName, value)
	{
		return this.getValue(prefName);
	},
	
	getDefaultBranch: function()
	{
		this._pref.getDefaultBranch();
	},

	remove: function(prefName)
	{
		this._pref.deleteBranch(prefName);
	},
	
	deleteBranch: function()
	{
		var children = this._pref.getChildList("", {});
		var prefNum=0;
		for(prefNum=0;prefNum<children.length;prefNum++)
		{
			this.remove(children[prefNum]);
		}
	},

	exists: function(prefName)
	{
		return this._pref.getPrefType(prefName) != 0;
	}
};