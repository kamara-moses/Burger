$(() => {
    $('#submit-button').on('click', (event) => {
      event.preventDefault();
  
      var newBurger = {
        burger_name: $('#new_burger').val().trim()
      };
     
      $.ajax('/api/burgers', {
        type: 'POST',
        data: newBurger
      }).then(() => {
        console.log('Added new burger');
        location.reload();
      });
    });
  
    $('.devour-button').on('click', function(event) {
      event.preventDefault();

    var id = $(this).data('id');
    var devourData = {
      devoured: 1
    };
    $.ajax('/api/burgers/' + id, {
      type: 'PUT',
      data: devourData
    }).then(function() {
      console.log('Burger Devoured');
      location.reload();
    });
  });
  
    $('.delete-button').on('click', function(event) {
      event.preventDefault();
  
      var id = $(this).data('id');
  
      // Send the DELETE request.
      $.ajax({
        type: 'DELETE',
        url: '/api/burgers/' + id
      }).then(location.reload());
    });
  });