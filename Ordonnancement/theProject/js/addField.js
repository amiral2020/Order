var theIProcessus = 0;


$(function()
{
    $(document).on('click', '.btn-add', function(e)
    {
        e.preventDefault();
        var dataParent = $(this).attr('data-parent');
        console.log(dataParent);
        var controlForm = $('.'+dataParent+' form:last'),
            currentEntry = $(this).parents('.entry:last'),
            newEntry = $(currentEntry.clone()).appendTo(controlForm);

        newEntry.find('input').val('');
        controlForm.find('.entry:not(:first) .btn-add')
            .removeClass('btn-add').addClass('btn-remove')
            .removeClass('btn-success').addClass('btn-danger')
            .html('<span class="glyphicon glyphicon-minus"></span>');
        theIProcessus ++;
        $('.'+dataParent+' .processuName:last').html("P"+theIProcessus);
    }).on('click', '.btn-remove', function(e)
    {
        $(this).parents('.entry:last').remove();
        theIProcessus --;
        e.preventDefault();
        return false;
    });
});
