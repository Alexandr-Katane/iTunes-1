 

 $(document).ready(function(){
    $('input[type=text]').focus(function () {
        $(this).val('');
        $(this).removeClass('search__input_empty');
    });
});


function PopUpShow(){
    $("#popup1").show();
}

function PopUpHide(){
    $("#popup1").hide();
}        

function millisToMinutesAndSeconds(millis) {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
}


function performSearch() {
    let input = document.querySelector('#search-keyword');
    if(input.value==''){
        input.value='Поле должно быть заполнено';
        $('input[type=text]').addClass('search__input_empty');
            return false;
        }
    $.ajax({
        url: "http://itunes.apple.com/search?term="+input.value,
        method:'get',
        dataType: 'json',
        success:function(data){
            console.log(data);
            let results = data.results;
            let FinalHTML='';
            if(results.length==0){
                PopUpShow();
            }
            results.forEach(song=>{
            FinalHTML+=`
                <div class="music-item">
                    <div class="music-content">
                        <div class="music__img"><img src="${song.artworkUrl100}" alt=""></div>
                        <p><span class="music_hiden">Artist: </span>${song.artistName}</p>
                        <p><span class="music_hiden">Track: </span>${song.trackName}</p>
                        <p><span class="music_hiden">Collection: </span>${song.collectionName}</p>
                        <p class="music__genre"><span class="Genre">Artist: </span>${song.primaryGenreName}</p>
                    </div>
                    <div class="music-deatails">
                        <div class="music-details__container">
                            <div class="music__header">${song.artistName} - ${song.trackName}<img src="img/music.png" alt=""></div>
                            <div class="music-details__body">
                                <div class="music-details__column">
                                    <p><span>Collection: </span>${song.collectionName}</p>
                                    <p><span>Track Count: </span>${song.trackCount}</p>
                                    <p><span>Price: </span>${song.collectionPrice} USD</p>
                                </div>
                                <div class="music-details__column">
                                    <p><span>Track duration: </span>${ millisToMinutesAndSeconds(song.trackTimeMillis) } min</p>
                                    <p><span>Track Price: </span>${song.trackPrice} USD</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>`
            });
            jQuery('.container').html(FinalHTML);
        }
    })
}

$(document).on('click','.music-content',function(){
    if($('.music').hasClass('one')){
        $('.music-content').not($(this)).removeClass('active');
        $('.music-deatails').not($(this).next()).slideUp(300);
    }
    $(this).toggleClass('active').next().slideToggle(300);
});

