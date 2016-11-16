'use strict';

(function() {
  // This function renders the sidebar list of breweries.
  // For each brewery it adds and <li><a></a></li> tag with the breweries name and id
  function renderBreweriesList(breweries) {
    let $el = $('#beer-list')
    let html = ""

    breweries.forEach((brewery) => {
      html += `<li><a href="/breweries/${brewery.id}">${brewery.name}</a></li>`
    })
    $el.html(html)
  }

  // This function renders the brewery details for a specific brewery
  function renderBreweryDetails(brewery) {
    let $el = $('.brewery-details')
    let html = `<div class="brewery-details--header" style="background-image: url('${brewery.imageURL}')">
                  <div class="brewery-details--header--mask"></div>
                  <h2 class="brewery-details--name">${brewery.name}</h2>
                </div>

                <div class="brewery-details--description">${brewery.description}</div>
               `
    $('.brewery-form').hide()
    $el.html(html).show()
  }

  function showNewBreweryForm() {
    $('.brewery-details').hide()
    $('.brewery-form').show()
  }

  function loadBrewery(url) {
    $.ajax(url).done( brewery => {
      renderBreweryDetails(brewery)
    })
  }

  function loadBreweries() {
    $.ajax('/breweries')
     .done( breweries => {
       renderBreweriesList(breweries)
     })
  }

  function submitBrewery() {
    let $nameEl = $('#brewery-form--name')
    let $descriptionEl = $('#brewery-form--description')
    let $imageURLEl = $('#brewery-form--image-url')

    // create a brewery object that will be sent to the server
    let brewery = {
      name:        $nameEl.val(),
      description: $descriptionEl.val(),
      imageURL:    $imageURLEl.val()
    }

    $.ajax('/breweries', {
      method: "POST",
      data: brewery
    }).done((brewery) => {
      loadBreweries()
      renderBreweryDetails(brewery)

      // Remove the field values so they don't show up filled in next time
      $nameEl.val('')
      $descriptionEl.val('')
      $imageURLEl.val('')
    })
  }

  function initApp() {
    // Init code
    loadBreweries()
    $('.brewery-details').html('<h1>Select a Brewery</h1>')

    // when you click on a <a> tag to load a brewery
    $('#beer-list').on('click', function(event) {
      event.preventDefault()

      // if the target is not the <a> tag don't do anything
      if (event.target.tagName !== 'A') {
        return
      }
      loadBrewery(event.target.href)
    })

    // when you click 'Add Brewery'
    $("#beer-add").on('click', (event) => {
      event.preventDefault()
      showNewBreweryForm()
    })

    // handle the submission of the form
    $('.brewery-form').on('submit', (event) => {
      event.preventDefault()
      submitBrewery()
    })
  }

  $(document).ready(() => {
    initApp()
  })
})()
