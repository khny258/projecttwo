let init = () => {
    $('#searchBtn').on('click', (e) => {
        let searchFeature = checkActive();

        console.log(searchFeature)
        console.log(grabSearchValue())
        console.log('/api/books/' + searchFeature + '/')
        if(grabSearchValue()){
            let userQuery = grabSearchValue();
        $.ajax({
            url: '/api/books/' + searchFeature + '/' + userQuery, 
            method: 'GET'
        }).then(data => {
            console.log(data)
            populateBooks(data)
        })
    }

    })

    let grabSearchValue = () => {
        let searchQuery = $('#userSearch').val().trim();

        if(searchQuery.length > 1){
            return searchQuery;
        }else{
            return false;
        }
    }

    let checkActive = () => {
        let activeFeature = '';
        //console.log($('#searchCats')[0].children)
        for(let a of $('#searchCats')[0].children){
            if($(a)[0].classList[$(a)[0].classList.length - 1] === 'active'){
                activeFeature = $(a)[0].children[0].dataset.searchname;
            }   
        }
        return activeFeature;
    }

    setupAddBookModal();
};

let setupAddBookModal = () => {
    let bookName = $('<div>').attr('class', 'form-group').attr('id', 'bookName');
    $('#addBook .modal-body').append(bookName)
    $('#bookName').append($('<label>').attr('for', 'bookNameInput').text('Book Name: (Required)'));
    $('#bookName').append($('<input>').attr('id', 'bookNameInput').attr('type', 'text').attr('class', 'form-control'));

    let authorName = $('<div>').attr('class', 'form-group').attr('id', 'authorName');
    $('#addBook .modal-body').append(authorName)
    $('#authorName').append($('<label>').attr('for', 'authorNameInput').text('Author Name: (Required)'));
    $('#authorName').append($('<input>').attr('id', 'authorNameInput').attr('type', 'text').attr('class', 'form-control'));

    let isbnNumber = $('<div>').attr('class', 'form-group').attr('id', 'isbnNumber');
    $('#addBook .modal-body').append(isbnNumber)
    $('#isbnNumber').append($('<label>').attr('for', 'isbnNumberInput').text('ISBN-13: (Required)'));
    $('#isbnNumber').append($('<input>').attr('id', 'isbnNumberInput').attr('type', 'text').attr('class', 'form-control'));

    let bookRating = $('<div>').attr('class', 'form-group').attr('id', 'bookRating');
    $('#addBook .modal-body').append(bookRating)
    $('#bookRating').append($('<label>').attr('for', 'bookRatingInput').text('Good Reads Rating: (Required)'));
    $('#bookRating').append($('<input>').attr('id', 'bookRatingInput').attr('type', 'text').attr('class', 'form-control'));

    let bookGenre = $('<div>').attr('class', 'form-group').attr('id', 'bookGenre');
    $('#addBook .modal-body').append(bookGenre)
    $('#bookGenre').append($('<label>').attr('for', 'bookGenreInput').text('Genres: (Required) Ex: Sci-fi,Fantasy'));
    $('#bookGenre').append($('<input>').attr('id', 'bookGenreInput').attr('type', 'text').attr('class', 'form-control'));

    let bookImage = $('<div>').attr('class', 'form-group').attr('id', 'bookImage');
    $('#addBook .modal-body').append(bookImage)
    $('#bookImage').append($('<label>').attr('for', 'bookImageInput').text('Book Image: (Required)'));
    $('#bookImage').append($('<input>').attr('id', 'bookImageInput').attr('type', 'text').attr('class', 'form-control'));

    let newBTN = $('<button>').attr('id', 'addNewBookBtn').attr('class', 'btn btn-default text-left').attr('type', 'button')
    newBTN.text('Add')
    $('#addBook .modal-footer').append(newBTN);

    $('#addNewBookBtn').on('click', (e) => {
        let imageReg = /(http(s?):)*\.(?:jpg|jpeg|gif|png)/g;
        let isbnReg = /[0-9]/g;
        let ratingReg = /[0-9.]/g
        let checked = 0;

        if($('#bookNameInput').val().length > 0){
            checked++;
            $('#bookNameInput').css('border', 'none');
        }else{
            $('#bookNameInput').css('border', '1px solid red');
        }

        if($('#authorNameInput').val().length > 0){
            checked++;
            $('#authorNameInput').css('border', 'none');
        }else{
            $('#authorNameInput').css('border', '1px solid red');
        }

        if($('#isbnNumberInput').val().length === 13 && isbnReg.exec($('#isbnNumberInput').val())){
            checked++;
            $('#isbnNumberInput').css('border', 'none');
        }else{
            $('#isbnNumberInput').css('border', '1px solid red');
        }

        if($('#bookRatingInput').val().length > 1 && ratingReg.exec($('#bookRatingInput').val())){
            checked++;
            $('#bookRatingInput').css('border', 'none');
        }else{
            $('#bookRatingInput').css('border', '1px solid red');
        }

        if($('#bookGenreInput').val().length > 0){
            checked++;
            $('#bookGenreInput').css('border', 'none');
        }else{
            $('#bookGenreInput').css('border', '1px solid red');
        }

        if(imageReg.exec($('#bookImageInput').val())){
            $('#bookImageInput').css('border', 'none');
            checked++;
        }else{
            $('#bookImageInput').css('border', '1px solid red');
        }

        
        
        
        
        if(checked === 6){
            let newBook = {
                title: $('#bookNameInput').val().trim(),
                author: $('#authorNameInput').val().trim(),
                book_isbn: $('#isbnNumberInput').val(),
                book_rating: $('#bookRatingInput').val().trim(),
                book_genre: $('#bookGenreInput').val().split(',').join('|'),
                image_URL: $('#bookImageInput').val().trim()
            }

            $.ajax({
                url: '/api/books/', 
                method: 'POST',
                data: newBook
            }).then(data => {
                $('#bookName').val('');
                $('#authorName').val('');
                $('#isbnNumber').val('');
                $('#bookRating').val('');
                $('#bookGenre').val('');
                $('#bookImage').val('');
                $('#addBook').modal('hide');
            });
        }

    })
}


let populateBooks = (books) => {
    console.log(books);
    $('#bookContainer').empty();
    for(let a in books){

        let genreString = books[a].book_genre.split('|').join(' ');
        console.log(genreString)
        
        let newBook = $('<div>').attr('id', 'book_' + a).attr('class', 'bookDiv float-left')
        $('#bookContainer').append(newBook);

        let bookImgHolder = $('<div>').attr('class', 'bookImgHolder')
        $('#book_' + a).append(bookImgHolder);
        
        let newBookImg = $('<img>').attr('src', books[a].image_URL).attr('class', 'rounded').attr('width', '200px').attr('height', '300px')
        $('#book_' + a + ' .bookImgHolder').append(newBookImg);

        let newTitle = $('<h5>').attr('class', 'h5 text-center').text(books[a].title);
        $('#book_' + a).append(newTitle);

        let newAuthor = $('<h5>').attr('class', 'h5 text-center').text(books[a].author);
        $('#book_' + a).append(newAuthor);

        let newRating = $('<p>').attr('class', 'p text-left').text('Rating: ' + books[a].book_rating);
        $('#book_' + a).append(newRating);
        
        let newISBN = $('<p>').attr('class', 'p text-left').text('ISBN: ' + books[a].book_isbn);
        $('#book_' + a).append(newISBN);
    }

    let contentHeight = $("#content").height();
    $('#bookContainer').css('height', contentHeight + 'px');
}


init();