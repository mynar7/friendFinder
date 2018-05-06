let modal = document.getElementById('modal');
let modalContent = $('.modal-content');
window.onclick = function(event) {
    if(event.target == modal) {
        modal.style.display = 'none';
    }
}

$('.modal').on('click', '.close', function() {
    modal.style.display = 'none';
});

$('button').on('click', function(event){
    event.preventDefault();
    let name = $('#name').val().trim();
    let pic = $('#pic').val().trim();
    if(name == "" || pic == "") {
        return warning("Must Include Name and Pic URL");
    }
    let answers = [];
    answers.push($('input[name="q1"]:checked').val());
    answers.push($('input[name="q2"]:checked').val());
    answers.push($('input[name="q3"]:checked').val());
    answers.push($('input[name="q4"]:checked').val());
    answers.push($('input[name="q5"]:checked').val());
    //console.log(answers);
    for(let i = 0; i < answers.length; i++) {
        if(!answers[i]) {
            return warning("Please answer all questions");
        }
        answers[i] = parseInt(answers[i]);
    }
    $('#name').val("");
    $('#pic').val("");
    $('input[name="q1"]').prop('checked', false);
    $('input[name="q2"]').prop('checked', false);
    $('input[name="q3"]').prop('checked', false);
    $('input[name="q4"]').prop('checked', false);
    $('input[name="q5"]').prop('checked', false);

    let newFriend = {
        name: name,
        pic: pic,
        answers: answers
    }
    $.post('/api/friends', newFriend, function(data){
        if(data) {
            modalContent.empty();
            $('<span>').addClass('close').html('&times;').appendTo(modalContent);
            $('<h3>').html("You're a match to:").appendTo(modalContent);
            let matchName = $('<h4>').html(data.name);
            matchName.appendTo(modalContent);
            let matchPic = $('<img>').addClass('friendPic').attr('src', data.pic);
            matchPic.appendTo(modalContent);
            $('.modal').fadeIn(500);
        }
    });
});

function warning(str) {
    modalContent.empty();
    $('<span>').addClass('close').html('&times;').appendTo(modalContent);
    $('<h4>').html(str).appendTo(modalContent);
    $('.modal').fadeIn(500);    
}