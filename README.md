# mReplaceChars

**mReplaceChars** is a jQuery plugin that permit, by the parameters configuration, to manipulate the data entry of a text field or textarea

The following example manipulates the insertion of character:

```code
<script src="replacechars.js" type="text/javascript"></script>
<script>
$(document).ready(function(){

    $('.field').mReplaceChars({
        char: { ' ':'_' } // ... you can add infinite character combinations { ' ':'_', ..., ..., ... }
    });

});
</script>
```


The following example applies a rule with a regex

```code
<script src="replacechars.js" type="text/javascript"></script>
<script>
$(document).ready(function(){

    $('.field').mReplaceChars({
        char: { ' ':'_' }, // ... you can add infinite character combinations { ' ':'_', ..., ..., ... }
        regex: '^[0-9a-zA-Z]+$'
    });

});
</script>
```


The following example force to upper or lower case

```code
<script src="replacechars.js" type="text/javascript"></script>
<script>
$(document).ready(function(){

    $('.field').mReplaceChars({
        char: { ' ':'_' }, // ... you can add infinite character combinations { ' ':'_', ..., ..., ... }
        regex: '^[0-9a-zA-Z]+$',
        forceTo: 'upper'
    });

});
</script>
```


The following example disable copy and paste event from field

```code
<script src="replacechars.js" type="text/javascript"></script>
<script>
$(document).ready(function(){

    $('.field').mReplaceChars({
        char: { ' ':'_' }, // ... you can add infinite character combinations { ' ':'_', ..., ..., ... }
        regex: '^[0-9a-zA-Z]+$',
        forceTo: 'upper',
        copy: false,
        paste: false
    });

});
</script>
```

The following example applies to maxlength and shows the character counter under field

```code
<script src="replacechars.js" type="text/javascript"></script>
<script>
$(document).ready(function(){

    $('.field').mReplaceChars({
        char: { ' ':'_' }, // ... you can add infinite character combinations { ' ':'_', ..., ..., ... }
        regex: '^[0-9a-zA-Z]+$',
        forceTo: 'upper',
        copy: false,
        paste: false,
        maxlength: 255,
        viewchar: true
    });

});
</script>
```

## jQuery Compatibility

Works with jQuery 1.4.2 and newer.

It is known to be working with all the major browsers on all available platforms (Win/Mac/Linux)

 * IE 6/7/8+
 * FF 1.5/2/3+
 * Opera-9+
 * Safari-3+
 * Chrome-0.2+
