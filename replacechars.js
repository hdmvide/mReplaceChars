/*
 * jQuery mReplaceChars v.1
 *
 * Copyright (c) 2018 Dario Montalbano
 * 
 * 
 */

(function($) {

	$.fn.extend({
		mReplaceChars: function(params) {

			params = $.extend({}, $.mReplaceChars.defaults, params);

			return this.each(function() {
				new $.mReplaceChars(this, params);
			});

		}
	});
	
	$.mReplaceChars = function(_this, params) {
		if (params.viewchar && (params.maxlength && typeof params.maxlength === 'number')){
			$(_this).parent().append("<div class=\"maxchar_subfield\" style=\"padding: 10px 0px 10px 0px; color: #a70f31; width: "+$(_this).outerWidth()+"px; text-align: right;\">0 / "+params.maxlength+"</div>");
		}
		$(_this).keypress(function(event) {
			if ($(this).attr("maxlength")) {
				if ($(this).val().length < $(this).attr("maxlength")) {
					if (params.char && typeof params.char === 'object'){
						$.mReplaceChars.replace($(this), event, params);
					}
				}
			}else{
				$.mReplaceChars.replace($(this), event, params);
			}
			if (params.regex){
				if (!$.mReplaceChars.regex(event, params.regex)){
					event.preventDefault();
				}
			}
		});
		$(_this).bind('input', function (event) {
			if (params.forceTo && typeof params.forceTo === 'string'){
				if (params.forceTo == 'lower'){
					var start = $(this).prop("selectionStart");
					var end = $(this).prop("selectionEnd");
					var text = $(this).val();
					var before = text.substring(0, start);
					var after  = text.substring(end, text.length);
					$(this).val(before + after);
					$(this).val($(this).val().toLowerCase());
					$(this)[0].selectionStart = $(this)[0].selectionEnd = start;
				}
				if (params.forceTo == 'upper'){
					var start = $(this).prop("selectionStart");
					var end = $(this).prop("selectionEnd");
					var text = $(this).val();
					var before = text.substring(0, start);
					var after  = text.substring(end, text.length);
					$(this).val(before + after);
					$(this).val($(this).val().toUpperCase());
					$(this)[0].selectionStart = $(this)[0].selectionEnd = start;
				}
			}
			$.mReplaceChars.countchar(this, params);
		});
		$(_this).bind('change', function (event) {
			$.mReplaceChars.countchar(this, params);
		});
    $(_this).bind('copy', function (e) {
			if (!params.copy){
				e.preventDefault();
			}
    });
    $(_this).bind('paste', function (e) {
			if (!params.paste){
				e.preventDefault();
			}
    });
		$(_this).trigger("change");
	}
	
	$.mReplaceChars.countchar = function(_this, params) {
		if (params.maxlength && typeof params.maxlength === 'number'){
			var lengthfield = $(_this).val().length;
			if (params.maxlength){
				$(_this).next(".maxchar_subfield").html(lengthfield + ' / ' + params.maxlength);
			}
			if(lengthfield >= params.maxlength) {
				var $contenuto = $(_this).val().substr(0, params.maxlength);
				$(_this).val($contenuto);
			}
		}
	}
	
	$.mReplaceChars.replace = function(_this, event, params) {
		$.each(params.char, function( key, value ) {
			var character;
			if (params.keycode){
				character = event.which;
			}else{
				character = String.fromCharCode(event.which);
			}
			if (character == key) {
				event.preventDefault();
				var start = _this.prop("selectionStart");
				var end = _this.prop("selectionEnd");
				var text = _this.val();
				var before = text.substring(0, start);
				var after  = text.substring(end, text.length);
				_this.val(before + value + after);
				_this[0].selectionStart = _this[0].selectionEnd = start + value.length;
			}
		});
	}
	
	$.mReplaceChars.forceToLower = function(_this, event, params) {
		var start = _this.prop("selectionStart");
		var end = _this.prop("selectionEnd");
		var text = _this.val();
		var before = text.substring(0, start);
		var after  = text.substring(end, text.length);
		_this.val(before + after).toLowerCase();
		_this[0].selectionStart = _this[0].selectionEnd = start;
	}
	
	$.mReplaceChars.forceToUpper = function(_this, event, params) {
		var start = _this.prop("selectionStart");
		var end = _this.prop("selectionEnd");
		var text = _this.val();
		var before = text.substring(0, start);
		var after  = text.substring(end, text.length);
		_this.val(before + after).toUpperCase();
		_this[0].selectionStart = _this[0].selectionEnd = start;
	}
	
	$.mReplaceChars.regex = function (event, goods){
		var key, keychar;
		key = event.which;
		if (key == null) return true;
		keychar = String.fromCharCode(key);
		keychar = keychar.toLowerCase();
		var regex = new RegExp(goods);
		if (regex.test(keychar)) {
			return true;
		}
		if (key==null || key==0 || key==8 || key==9 || key==27){
			return true;
		}
		//combinazioni di tasti ctrl + (v,c,z,x,V,C,Z,X)
		if ((event.metaKey || event.ctrlKey) && (key == 118 || key == 99 || key == 122 || key == 120 || key == 86 || key == 67 || key == 90 || key == 88)) {
			return true;
		}
		return false;
	}
	
	$.mReplaceChars.defaults = {
		chars: '',
		regex: '',
		forceTo: false,
		keycode: false,
		copy: true,
		paste: true,
		maxlength: false,
		viewchar: false
	}
	
}(jQuery));