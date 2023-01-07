window.addEventListener('load', function () 
{
    
    $('#Preloader').addClass('loaded');
    $('.content').addClass('loaded');
    $('#Preloader').addClass('loaded');
    if ($('#Preloader').hasClass('loaded')) 
    {
        $('#Preloader').delay(1000).queue(function() 
        {
            $(this).remove();
        }
    );}        
})