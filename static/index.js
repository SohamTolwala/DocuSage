$(document).ready(function() {
    // Handle click on send button
    $('#sendButton').click(function() {
        // Get message from input field
        var message = $('#messageInput').val();

        // Clear input field
        $('#messageInput').val('');

        // Add user message to chatbox on the left
        $('#chatbox').append('<div class="user-message">' + message + '</div>');
        console.log('User message: ', message)

        // Simulate AI response with a delay of 1 second
        setTimeout(function() {
            // Make an AJAX request to fetch the response from response.json
              $.ajax({
                 type: 'POST',
                 url: '/ask',
                 data: {question: message},
                 success: function(response){
//                    var aiResponse = response;
                    response=JSON.parse(response);
                    var aiResponse = response[0].answer;
                    console.log(aiResponse);

                    $('#chatbox').append('<div class="ai-message">' + aiResponse + '</div>');
//                    console.log('Response :', aiResponse)
                 },
                 error: function(error){
                    console.log('Error: ', error);
                 }
              });
//            $.getJSON('static/response.json', function(response) {
//                // Assuming you want the first response from the JSON file
//                var aiResponse = response[0].answer;
//                console.log('AI response: ', aiResponse)
//
//                // Add AI response to chatterbox on the right
//                $('#chatbox').append('<div class="ai-message">' + aiResponse + '</div>');
//            });
        }, 1000);
    });

    // Handle click on upload button
    $('#uploadButton').click(function() {
        // Get file from input field
        var file = $('#fileInput')[0].files[0];

        // Add file message to chatterbox on the left
        $('#chatbox').append('<div class="user-message">File uploaded: ' + file.name + '</div>');
    });
});
