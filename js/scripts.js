let socket = io();
socket.on('number', (message) => {
    console.log('random number: ' + message);
});

const addCards = (items) => {
    items.forEach(item => {
      let itemToAppend = `<div class="col s4 center-align">
        <div class="card medium">
          <div class="card-image waves-effect waves-block waves-light">
            <img class="activator" src="${item.image}">
          </div>
          <div class="card-content">
            <span class="card-title activator grey-text text-darken-4">${item.title}<i class="material-icons right">more_vert</i></span>
            <p><a href="${item.linkUrl || '#'}">${item.link}</a></p>
          </div>
          <div class="card-reveal">
            <span class="card-title grey-text text-darken-4">${item.title}<i class="material-icons right">close</i></span>
            <p class="card-text grey-text text-darken-4">${item.description}</p>
          </div>
        </div>
      </div>`;
      $('#card-section').append(itemToAppend);
    });
  };
  
  const clickMe = () => {
    alert('Thanks for clicking me. Hope you have a nice day!')
  }
  
  const submitForm = () => {
    let formData = {
        title: $('#title').val(),
        image: $('#path').val(),  // Changed from $('#image').val() to $('#path').val()
        link: $('#subTitle').val(),  // Assuming 'link' should use the subtitle/color
        description: $('#description').val()
    };
    
    console.log('Form Data Submitted: ', formData);
    postcats(formData);
  };
  
  
  const postcats = (project) => {
    $.ajax({
      url: '/api/cats',
      data: JSON.stringify(project),
      contentType: 'application/json',
      method: 'POST',
      success: (result) => {
        alert('Cat posted');
        location.reload();
      },
      error: (jqXHR, textStatus, errorThrown) => {
        alert(`Error: ${textStatus}`);
      }
    })
  }
  
  const getproducts = () => {
    $.get('/api/cats', (response) => {
      if (response.statusCode === 200) {
        addCards(response.data);
      } else {
        console.error(response);
      }
    }).fail((jqXHR, textStatus, errorThrown) => {
      console.error(`Error fetching products: ${textStatus}`);
    });
  }
  
  $(document).ready(function(){
    $('.materialboxed').materialbox();
    $('#formSubmit').click(submitForm);
    $('.modal').modal();
    getproducts();
  });