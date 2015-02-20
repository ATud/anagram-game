QUnit.module("Anagram Test", {
    setup: function() {
        //here any init needed
        document.getElementById('result-list').innerHTML = '';
    },
    teardown: function() {
        // here I clean the anangram input
        document.getElementById('inputAnagram').value='';     
    }
});

QUnit.test( "test anagram", function( assert ) {
    document.getElementById('inputAnagram').value = 'really';
    $('#submitAnagram').trigger('click');
    assert.equal( $('#result-list li').length > 0 , true);
});