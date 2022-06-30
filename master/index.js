
        let apiKey = 'AIzaSyCZKNhsezUtpi0GwccsU5RK-lZGyora7YA'
        let URL = 'https://youtube.googleapis.com/youtube/v3/videos'
        let country = ""


        var options = {
            part: 'snippet,statistics',
            chart: 'mostPopular',
            regionCode: country,
            key: apiKey,
            videoCategoryId: "0",
            maxResults: 50
        }
        function getResult(URL, options) {
            $.getJSON(URL, options, function (data) {
                showResult(data);

            })

        }
        getResult(URL, options)

        function showResult(data) {
            
            let html = "";
            let tableBody = document.getElementById("list");


            data.items.forEach((element, index) => {
                html += `<tr class="border">
        <th scope="row">${index + 1}</th>
        <td>${element.snippet.title}</td>
        <td><button class="btn  rounded btn-primary"><a href='https://youtu.be/${element.id}' target="_blank" style="color:white">Watch</a></button></td>
        <td>${(element.statistics.viewCount / 1000000).toFixed(3)}M</td>

    </tr>`;

            });

            tableBody.innerHTML = html;

        }




        document.getElementById('country').addEventListener('change', function () {
            document.getElementById('searchBox').value=""
            let countryList = document.getElementById('country').getElementsByTagName('option');
            country = document.getElementById('country').value;
            let countryName;
            options.regionCode = country;
            Array.from(countryList).forEach(element => {
                if (element.value == country) {
                    countryName = element.innerText;
                }
            })

            let heading = `Trending Videos from ${countryName}`;
            document.getElementById('itemslist').getElementsByTagName('h2')[0].innerText = heading;

            getResult(URL, options)

        })
        function operations(index) {
            document.getElementById('searchBox').value=""
            searchOperation()
            button = document.getElementById('gbutton').getElementsByTagName('button')
            Array.from(button).forEach(function (element) {
                if (element.id == index) {
                    element.setAttribute('class', 'btn btn-danger my-1')

                }
                else {
                    element.setAttribute('class', 'btn btn-success my-1')
                }


            })


            country = document.getElementById('country').value;
            options.regionCode = country;
            options.videoCategoryId = index;
            getResult(URL, options)

        }


        //search operation
        
        let searchBox = document.getElementById("searchBox");
        searchBox.addEventListener('input', searchOperation);
        function searchOperation() {
            
            
            let videoList = document.getElementById('list').getElementsByTagName('tr');
            // console.log(videoList[0].style.display);
            Array.from(videoList).forEach(element => {
                searchTxt = document.getElementById('searchBox').value.toLowerCase();
                
                title = element.getElementsByTagName('td')[0].innerText.toLowerCase();
                if (title.includes(searchTxt)) {
                   element.style.boxSizing='border-box';
                   element.style.display = 'table-row ';
                    element.style.width='100%'

                }
                else {
                    element.style.display = 'none';
                   // element.style.boxSizing='border-box';
                    
                }


            })

        }


   