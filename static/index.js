            $(document).ready(function() {
            // Handle click on send button
            $('#sendButton').click(function() {
                // Get message from input field
                var message = $('#messageInput').val();

                // Clear input field
                $('#messageInput').val('');

                // Add user message to chatbox on the left
                $('#chatbox').append('<div class="user-message">' + message + '</div>');

                // Simulate AI response with a delay of 1 second
//                setTimeout(function() {
//                    // Generate AI response
////                    var response = 'AI will respond';
//
//                    // Add AI response to chatbox on the right
////                    $('#chatbox').append('<div class="ai-message">' + response + '</div>');
//                }, 1000);



// Inside the setTimeout function
//setTimeout(function() {
//    // Make an AJAX request to the Flask server
//    $.ajax({
//        type: 'POST',
//        url: '/ask', // The Flask route you created
//        data: {}, // You can send any necessary data to the server here
//        success: function(response) {
//            // Handle the AI response received from the server
//            var aiResponse = response;
//
//            // Add AI response to chatbox on the right
//            $('#chatbox').append('<div class="ai-message">' + aiResponse + '</div>');
//        },
//        error: function(error) {
//            // Handle any errors that occur during the AJAX request
//            console.error('Error:', error);
//        }
// });
//},1000);
// Inside the setTimeout function
setTimeout(function() {
    // Make an AJAX request to the FastAPI route
    $.ajax({
        type: 'POST',
        url: '/ask', // Replace with your FastAPI server address
        data: {question: message}, // You can send any necessary data to the server here
        success: function(response) {
            // Handle the AI response received from the server
            var aiResponse = response;

            // Add AI response to chatbox on the right
            $('#chatbox').append('<div class="ai-message">' + aiResponse + '</div>');
        },
        error: function(error) {
            // Handle any errors that occur during the AJAX request
            console.error('Error:', error);
        }
 });
},1000);




            });

            // Handle click on upload button
            $('#uploadButton').click(function() {
                // Get file from input field
                var file = $('#fileInput')[0].files[0];

                // Add file message to chatbox on the left
                $('#chatbox').
                // Add file message to chatbox on the left
                $('#chatbox').append('<div class="user-message">File uploaded: ' + file.name + '</div>');
            });
        });








//    $(document).ready(function() {
//        // Handle click on send button
//        $('#sendButton').click(function() {
//            // Get message from input field
//            var message = $('#messageInput').val();
//
//            // Clear input field
//            $('#messageInput').val('');
//
//            // Add user message to chatbox on the left
//            $('#chatbox').append('<div class="user-message">' + message + '</div>');
//
//            // Send user message to the server
//            $.ajax({
//                type: 'POST',
//                url: '/ask',
//                data: { question: message },
//                success: function(response) {
//                    // Add AI response to chatbox on the right
//                    $('#chatbox').append('<div class="ai-message">' + response + '</div>');
//                },
//                error: function(xhr, status, error) {
//                    console.error('Error:', error);
//                }
//            });
//        });
//
//        // Handle click on upload button
//        $('#uploadButton').click(function() {
//            // Get file from input field
//            var file = $('#fileInput')[0].files[0];
//
//            // Add file message to chatbox on the left
//            $('#chatbox').append('<div class="user-message">File uploaded: ' + file.name + '</div>');
//        });
//    });

