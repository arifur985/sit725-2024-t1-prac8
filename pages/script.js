
const clickMe = () => {
  $('#modal1').modal('open');
};

const submitForm = () => {
  let formData = {
    email: $('#email').val()
  };
  
  $.ajax({
    type: "POST",
    url: "/submit-form",
    data: formData,
    success: function(response) {
      console.log("Server response:", response);
      Materialize.toast('Form Submitted Successfully!', 4000); // Display success message
    },
    dataType: "json"
  });
};

const addCards = (items) => {
  items.forEach(item => {
    let itemToAppend = `<div class="col s4 center-align">
      <div class="card medium">
        <div class="card-image waves-effect waves-block waves-light">
          <img class="activator" src="${item.image}">
        </div>
        <div class="card-content">
          <span class="card-title activator grey-text text-darken-4">${item.title}<i class="material-icons right">more_vert</i></span>
          <p><a href="#">${item.link}</a></p>
        </div>
        <div class="card-reveal">
          <span class="card-title grey-text text-darken-4">${item.title}<i class="material-icons right">close</i></span>
          <p class="card-text">${item.description}</p>
        </div>
      </div>
    </div>`;
    $("#card-section").append(itemToAppend);
  });
};

$(document).ready(function () {
  $('.materialboxed').materialbox();
  $('#formSubmit').click(() => {
    submitForm();
  });
  getProjects();
  $('.modal').modal();
});

const getProjects = () => {
  $.get('/api/projects', (response) => {
    if (response.statusCode == 200) {
      addCards(response.data);
    }
  });
};
